package de.philgenstock.choremaster

import android.app.Application
import de.philgenstock.choremaster.di.appModules
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin
import org.koin.core.logger.Level

class ChoreMasterApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidLogger(Level.ERROR)
            androidContext(this@ChoreMasterApplication)
            modules(appModules)
        }
    }
}
