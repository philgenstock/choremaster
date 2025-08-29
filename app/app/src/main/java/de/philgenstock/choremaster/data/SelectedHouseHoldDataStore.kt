package de.philgenstock.choremaster.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.selectedHouseHoldDataStore: DataStore<Preferences> by preferencesDataStore(name = "selected_household")

class SelectedHouseHoldDataStore(
    private val context: Context,
) {
    companion object {
        private val ID_KEY = stringPreferencesKey("id")
    }

    suspend fun saveId(id: String) {
        context.selectedHouseHoldDataStore.edit { preferences ->
            preferences[ID_KEY] = id
        }
    }

    fun getId(): Flow<Long?> =
        context.selectedHouseHoldDataStore.data.map { preferences ->
            preferences[ID_KEY]?.toLong()
        }

    /**
     * Clear the token from DataStore
     */
    suspend fun clearId() {
        context.selectedHouseHoldDataStore.edit { preferences ->
            preferences.remove(ID_KEY)
        }
    }
}
