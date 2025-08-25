package de.philgenstock.choremaster

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import de.philgenstock.choremaster.ui.components.LoginButton
import de.philgenstock.choremaster.ui.theme.ChoremasterTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ChoremasterTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    LoginButton(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }

    companion object {
        const val TAG = "MainActivity"
    }
}
