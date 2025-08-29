package de.philgenstock.choremaster.nav.overview

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import de.philgenstock.choremaster.data.SelectedHouseHoldDataStore
import de.philgenstock.choremaster.ui.components.ChoreList
import kotlinx.serialization.Serializable
import org.koin.compose.koinInject

@Serializable
object HouseHoldOverviewRoute

@Composable
fun HouseHoldOverviewScreen(selectedHouseHoldDataStore: SelectedHouseHoldDataStore = koinInject()) {
    val id by selectedHouseHoldDataStore.getId().collectAsState(initial = null)

    if (id != null) {
        ChoreList(houseHoldId = id!!)
    }
}
