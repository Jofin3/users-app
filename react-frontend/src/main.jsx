import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

  <Auth0Provider
  domain='dev-dhtcsec1v610ng10.eu.auth0.com'
  clientId='CQ50aPWunQUKy7rkBAOVrWDpwvOMZ1AN'
  authorizationParams={{ 
    audience: "http://localhost:8080",
    redirect_uri: window.location.origin 
    }}>

  <StrictMode>
    <App />
  </StrictMode>,
</Auth0Provider>
);