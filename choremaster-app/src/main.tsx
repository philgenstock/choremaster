import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import App from "./App"
import {store} from "./app/store"
import "./index.css"
import {GoogleOAuthProvider} from "@react-oauth/google"

const container = document.getElementById("root")

if (container) {
    const root = createRoot(container)

    root.render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId='226274128441-m3nqoupr0ml257g0mg084i16lpj7mpr2.apps.googleusercontent.com'>
                <Provider store={store}>
                    <App/>
                </Provider>
            </GoogleOAuthProvider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
