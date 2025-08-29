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
import de.philgenstock.choremaster.data.model.Chore
import de.philgenstock.choremaster.data.repository.ChoreRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.koin.compose.koinInject

@Composable
fun ChoreList(
    houseHoldId: Long,
    modifier: Modifier = Modifier,
    choreRepository: ChoreRepository = koinInject(),
) {
    var chores by remember { mutableStateOf<List<Chore>>(emptyList()) }
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
                    choreRepository.getChoresFor(houseHoldId = houseHoldId)
                }

            result.fold(
                onSuccess = { choreList ->
                    chores = choreList
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
            text = "Chores",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(16.dp),
        )

        when {
            isLoading -> {
                Text(
                    text = "Loading chores...",
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
            chores.isEmpty() -> {
                Text(
                    text = "No chores found",
                    modifier = Modifier.padding(16.dp),
                )
            }
            else -> {
                LazyColumn {
                    items(chores) { chore ->
                        ChoreItem(chore = chore)
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
fun ChoreItem(
    chore: Chore,
    modifier: Modifier = Modifier,
) {
    Card(
        modifier =
            modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = chore.name,
                style = MaterialTheme.typography.titleMedium,
            )
            Spacer(modifier = Modifier.height(4.dp))
        }
    }
}
