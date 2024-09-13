
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import React from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'



createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="998700739226-o1vqp0lqu98l37tvmmhkm2oo6ibhg4do.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>
)
