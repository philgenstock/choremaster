package de.philgenstock.choremaster

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import de.philgenstock.choremaster.data.TokenDataStore
import de.philgenstock.choremaster.ui.components.MainScreen
import org.koin.android.ext.android.inject
import kotlin.getValue

class MainActivity : ComponentActivity() {
    private val tokenDataStore: TokenDataStore by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MainScreen(tokenDataStore = tokenDataStore)
        }
    }

    companion object {
        const val TAG = "MainActivity"
    }
}
