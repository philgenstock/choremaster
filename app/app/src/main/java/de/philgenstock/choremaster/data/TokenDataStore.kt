package de.philgenstock.choremaster.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// Extension property for Context to create a single DataStore instance
val Context.tokenDataStore: DataStore<Preferences> by preferencesDataStore(name = "user_preferences")

/**
 * Utility class to handle token storage using DataStore Preferences
 */
class TokenDataStore(private val context: Context) {

    companion object {
        // Define the key for the token
        private val TOKEN_KEY = stringPreferencesKey("token")
    }

    /**
     * Save the token to DataStore
     * @param token The token to save
     */
    suspend fun saveToken(token: String) {
        context.tokenDataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
        }
    }

    /**
     * Get the token as a Flow
     * @return Flow of the token string, null if not found
     */
    fun getToken(): Flow<String?> {
        return context.tokenDataStore.data.map { preferences ->
            preferences[TOKEN_KEY]
        }
    }

    /**
     * Clear the token from DataStore
     */
    suspend fun clearToken() {
        context.tokenDataStore.edit { preferences ->
            preferences.remove(TOKEN_KEY)
        }
    }
}