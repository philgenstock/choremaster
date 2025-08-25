package de.philgenstock.choremaster.di

import de.philgenstock.choremaster.data.repository.HouseholdRepository
import org.koin.dsl.module

/**
 * Koin module that provides repository dependencies.
 */
val repositoryModule = module {
    
    // HouseholdRepository
    single { 
        HouseholdRepository(get()) 
    }
}