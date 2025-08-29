package de.philgenstock.choremaster.nav.household

import androidx.compose.runtime.Composable
import de.philgenstock.choremaster.ui.components.HouseholdList
import kotlinx.serialization.Serializable

@Serializable
object HouseHoldRoute

@Composable
fun HouseHoldScreen() {
    HouseholdList()
}
