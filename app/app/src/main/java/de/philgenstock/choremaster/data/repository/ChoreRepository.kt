package de.philgenstock.choremaster.data.repository

import de.philgenstock.choremaster.data.api.ChoreApiService
import de.philgenstock.choremaster.data.model.Chore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class ChoreRepository(
    private val choreApiService: ChoreApiService,
) {
    suspend fun getChoresFor(houseHoldId: Long): Result<List<Chore>> =
        withContext(Dispatchers.IO) {
            try {
                val response = choreApiService.getChoresFor(houseHoldId = houseHoldId)

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
