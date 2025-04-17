// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyALBANFnnuxBbxeBuicvxRWkJtlK4cPDrs',
  authDomain: 'journeyvan-life.firebaseapp.com',
  projectId: 'journeyvan-life',
  storageBucket: 'journeyvan-life.firebasestorage.app',
  messagingSenderId: '870352165992',
  appId: '1:870352165992:web:4809430d1355c9c2662fdd',
  measurementId: 'G-NMBZDK2GVT'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app) // Get Firestore instance

// firebase authentication and firestore
export const auth = getAuth(app)
export const db = firestore

const analytics = getAnalytics(app)

export default app
