package de.philgenstock.choremaster.di

import de.philgenstock.choremaster.data.api.AuthInterceptor
import de.philgenstock.choremaster.data.api.ChoreApiService
import de.philgenstock.choremaster.data.api.HouseholdApiService
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

/**
 * Koin module that provides network-related dependencies.
 */
val networkModule =
    module {

        single {
            HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }
        }

        // Auth interceptor
        single {
            AuthInterceptor(get())
        }

        // OkHttpClient
        single {
            OkHttpClient
                .Builder()
                .connectTimeout(30L, TimeUnit.SECONDS)
                .readTimeout(30L, TimeUnit.SECONDS)
                .writeTimeout(30L, TimeUnit.SECONDS)
                .addInterceptor(get<AuthInterceptor>())
                .addInterceptor(get<HttpLoggingInterceptor>())
                .build()
        }

        // Retrofit
        single {
            Retrofit
                .Builder()
                .baseUrl("http://10.0.2.2:8080")
                .client(get<OkHttpClient>())
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }

        single {
            get<Retrofit>().create(HouseholdApiService::class.java)
        }
        single {
            get<Retrofit>().create(ChoreApiService::class.java)
        }
    }
