package de.philgenstock.choremaster.ui.components

import android.content.Context
import android.util.Log
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
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
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch

@Composable
fun LoginButton() {
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current
    Button(onClick = {
        coroutineScope.launch {
            googleLogin(context)
        }
    }) {
        Text(text = "Login")
    }
}

private lateinit var credentialManager: CredentialManager

suspend fun googleLogin(context: Context) {
    if (!::credentialManager.isInitialized) {
        credentialManager = CredentialManager.create(context)
    }
    val googleIdOption: GetGoogleIdOption =
        GetGoogleIdOption
            .Builder()
            .setFilterByAuthorizedAccounts(false)
            .setServerClientId("226274128441-ss9th5jhomqjbsl4fl58rj3img2ppugf.apps.googleusercontent.com")
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
            handleSignIn(result = result)
        } catch (e: GetCredentialException) {
            Log.e(MainActivity.TAG, "Failed to login user", e)
        }
    }
}

fun handleSignIn(result: GetCredentialResponse) {
    val credential = result.credential
    when (credential) {
        is CustomCredential -> {
            if (credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL) {
                try {
                    val googleIdTokenCredential =
                        GoogleIdTokenCredential
                            .createFrom(credential.data)

                    val token = googleIdTokenCredential.idToken
                } catch (e: GoogleIdTokenParsingException) {
                    Log.e(MainActivity.TAG, "Received an invalid google id token response", e)
                }
            } else {
                // Catch any unrecognized custom credential type here.
                Log.e(MainActivity.TAG, "Unexpected type of credential")
            }
        }
        else -> {
            Log.e(MainActivity.TAG, "Unexpected type of credential")
        }
    }
}
