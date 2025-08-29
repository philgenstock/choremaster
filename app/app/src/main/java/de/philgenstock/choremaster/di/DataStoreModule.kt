package de.philgenstock.choremaster.di

import de.philgenstock.choremaster.data.SelectedHouseHoldDataStore
import de.philgenstock.choremaster.data.TokenDataStore
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module

val dataStoreModule =
    module {
        single {
            TokenDataStore(androidContext())
        }
        single {
            SelectedHouseHoldDataStore(androidContext())
        }
    }
