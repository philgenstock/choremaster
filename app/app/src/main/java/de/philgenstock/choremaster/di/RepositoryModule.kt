package de.philgenstock.choremaster.di

import de.philgenstock.choremaster.data.repository.ChoreRepository
import de.philgenstock.choremaster.data.repository.HouseHoldRepository
import org.koin.dsl.module

val repositoryModule =
    module {

        single {
            HouseHoldRepository(get())
        }
        single {
            ChoreRepository(get())
        }
    }
