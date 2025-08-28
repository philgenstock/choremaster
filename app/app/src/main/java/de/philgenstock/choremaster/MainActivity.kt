package de.philgenstock.choremaster

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import de.philgenstock.choremaster.data.TokenDataStore
import de.philgenstock.choremaster.ui.components.HouseholdList
import de.philgenstock.choremaster.ui.components.LoginButton
import de.philgenstock.choremaster.ui.theme.ChoremasterTheme
import org.koin.android.ext.android.inject

class MainActivity : ComponentActivity() {
    private val tokenDataStore: TokenDataStore by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ChoremasterTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    val token by tokenDataStore.getToken().collectAsState(initial = null)

                    Column(
                        modifier =
                            Modifier
                                .fillMaxSize()
                                .padding(innerPadding),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        LoginButton(modifier = Modifier.padding(top = 16.dp))

                        Spacer(modifier = Modifier.height(16.dp))
                        if (!token.isNullOrEmpty()) {
                            HouseholdList(modifier = Modifier.weight(1f))
                        }
                    }
                }
            }
        }
    }

    companion object {
        const val TAG = "MainActivity"
    }
}
