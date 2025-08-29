package de.philgenstock.choremaster.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import de.philgenstock.choremaster.data.SelectedHouseHoldDataStore
import de.philgenstock.choremaster.data.model.Household
import de.philgenstock.choremaster.data.repository.HouseHoldRepository
import de.philgenstock.choremaster.nav.overview.HouseHoldOverviewRoute
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.koin.compose.koinInject

/**
 * Composable that displays a list of households.
 */
@Composable
fun HouseholdList(
    modifier: Modifier = Modifier,
    householdRepository: HouseHoldRepository = koinInject(),
    selectedHouseHoldDataStore: SelectedHouseHoldDataStore = koinInject(),
    navController: NavController,
) {
    var households by remember { mutableStateOf<List<Household>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    val coroutineScope = rememberCoroutineScope()

    // Fetch households when the composable is first composed
    LaunchedEffect(key1 = Unit) {
        isLoading = true
        error = null

        try {
            val result =
                withContext(Dispatchers.IO) {
                    householdRepository.getAllHouseholds()
                }

            result.fold(
                onSuccess = { householdList ->
                    households = householdList
                },
                onFailure = { exception ->
                    error = exception.message ?: "Unknown error"
                },
            )
        } catch (e: Exception) {
            error = e.message ?: "Unknown error"
        } finally {
            isLoading = false
        }
    }

    Column(modifier = modifier) {
        Text(
            text = "Households",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(16.dp),
        )

        when {
            isLoading -> {
                Text(
                    text = "Loading households...",
                    modifier = Modifier.padding(16.dp),
                )
            }
            error != null -> {
                Text(
                    text = "Error: $error",
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(16.dp),
                )
            }
            households.isEmpty() -> {
                Text(
                    text = "No households found",
                    modifier = Modifier.padding(16.dp),
                )
            }
            else -> {
                LazyColumn {
                    items(households) { household ->
                        HouseholdItem(household = household, onClick = {
                            coroutineScope.launch {
                                selectedHouseHoldDataStore.saveId(household.id)
                                navController.navigate(HouseHoldOverviewRoute)
                            }
                        })
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }
    }
}

/**
 * Composable that displays a single household item.
 */
@Composable
fun HouseholdItem(
    household: Household,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
) {
    Card(
        modifier =
            modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        onClick = onClick,
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = household.name,
                style = MaterialTheme.typography.titleMedium,
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "ID: ${household.id}",
                style = MaterialTheme.typography.bodyMedium,
            )
        }
    }
}
