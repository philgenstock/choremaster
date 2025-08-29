package de.philgenstock.choremaster.data.api

import android.util.Log
import de.philgenstock.choremaster.data.TokenDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor(
    private val tokenDataStore: TokenDataStore,
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()

        val token =
            runBlocking {
                tokenDataStore.getToken().first()
            }
        if (token.isNullOrEmpty()) {
            return chain.proceed(originalRequest)
        }
        val newRequest =
            originalRequest
                .newBuilder()
                .header("Authorization", "Bearer $token")
                .build()

        val response = chain.proceed(newRequest)
        Log.d("AuthInterceptor", "Response code: ${response.code}")
        if (response.code == 401) {
            runBlocking {
                tokenDataStore.clearToken()
            }
        }
        return response
    }
}
