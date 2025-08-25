package de.philgenstock.choremaster.data.repository

import de.philgenstock.choremaster.data.api.HouseholdApiService
import de.philgenstock.choremaster.data.model.Household
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Repository class for handling household-related API calls.
 */
class HouseholdRepository(private val householdApiService: HouseholdApiService) {

    /**
     * Get all households from the API.
     *
     * @return Result containing a list of households or an exception
     */
    suspend fun getAllHouseholds(): Result<List<Household>> = withContext(Dispatchers.IO) {
        try {
            val response = householdApiService.getAllHouseholds()

            if (response.isSuccessful) {
                val households = response.body() ?: emptyList()
                Result.success(households)
            } else {
                Result.failure(Exception("Error fetching households: ${response.code()} ${response.message()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
