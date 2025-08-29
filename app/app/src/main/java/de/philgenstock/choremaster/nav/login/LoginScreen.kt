package de.philgenstock.choremaster.nav.login

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import de.philgenstock.choremaster.nav.household.HouseHoldRoute
import de.philgenstock.choremaster.ui.components.LoginButton
import kotlinx.serialization.Serializable

@Serializable
object LoginRoute

@Composable
fun LoginScreen(navController: NavController) {
    LoginButton(modifier = Modifier.padding(top = 16.dp), onLogin = {
        navController.navigate(HouseHoldRoute)
    })
}
