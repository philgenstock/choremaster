package de.philgenstock.choremaster.ui.components

import android.content.Context
import android.util.Log
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetCredentialResponse
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.android.libraries.identity.googleid.GoogleIdTokenParsingException
import de.philgenstock.choremaster.MainActivity
import de.philgenstock.choremaster.data.TokenDataStore
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import org.koin.compose.koinInject

@Composable
fun LoginButton(
    modifier: Modifier = Modifier,
    tokenDataStore: TokenDataStore = koinInject(),
    onLogin: () -> Unit = {},
) {
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val token by tokenDataStore.getToken().collectAsState(initial = null)

    if (token.isNullOrEmpty()) {
        Button(onClick = {
            coroutineScope.launch {
                googleLogin(context, tokenDataStore)
                onLogin()
            }
        }) {
            Text(text = "Login")
        }
    } else {
        // Show logout button if token exists
        Button(onClick = {
            coroutineScope.launch {
                // Clear the token from DataStore
                tokenDataStore.clearToken()
                Log.d(MainActivity.TAG, "User logged out successfully")
            }
        }) {
            Text(text = "Logout")
        }
    }
}

private lateinit var credentialManager: CredentialManager

suspend fun googleLogin(
    context: Context,
    tokenDataStore: TokenDataStore,
) {
    if (!::credentialManager.isInitialized) {
        credentialManager = CredentialManager.create(context)
    }
    val googleIdOption: GetGoogleIdOption =
        GetGoogleIdOption
            .Builder()
            .setFilterByAuthorizedAccounts(false)
            .setServerClientId("226274128441-0e2re0vo3p5mnf4e2nhok8m2fipncjh5.apps.googleusercontent.com")
            .setAutoSelectEnabled(true)
            .setNonce("Hq123d3")
            .build()
    val request: GetCredentialRequest =
        GetCredentialRequest
            .Builder()
            .addCredentialOption(googleIdOption)
            .build()

    coroutineScope {
        try {
            val result =
                credentialManager.getCredential(
                    request = request,
                    context = context,
                )

            handleSignIn(result = result, tokenDataStore = tokenDataStore)
        } catch (e: GetCredentialException) {
            Log.e(MainActivity.TAG, "Failed to login user", e)
        }
    }
}

suspend fun handleSignIn(
    result: GetCredentialResponse,
    tokenDataStore: TokenDataStore,
) {
    val credential = result.credential
    when (credential) {
        is CustomCredential -> {
            if (credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL) {
                try {
                    val googleIdTokenCredential =
                        GoogleIdTokenCredential
                            .createFrom(credential.data)

                    val token = googleIdTokenCredential.idToken

                    tokenDataStore.saveToken(token)
                } catch (e: GoogleIdTokenParsingException) {
                    Log.e(MainActivity.TAG, "Received an invalid google id token response", e)
                }
            } else {
                Log.e(MainActivity.TAG, "Unexpected type of credential")
            }
        }
        else -> {
            Log.e(MainActivity.TAG, "Unexpected type of credential")
        }
    }
}
