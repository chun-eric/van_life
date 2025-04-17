// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
 
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app) // Get Firestore instance

// firebase authentication and firestore
export const auth = getAuth(app)
export const db = firestore

const analytics = getAnalytics(app)

export default app
