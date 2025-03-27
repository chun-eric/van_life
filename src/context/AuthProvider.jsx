import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext.jsx'
import PropTypes from 'prop-types'
import { auth } from '../firebaseConfig.js'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig.js'

export const AuthProvider = ({ children }) => {
  // tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // on first mount check local storage
  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('loggedin')
  //   const userData = localStorage.getItem('user')
  //   if (loggedIn && userData) {
  //     try {
  //       const parsedUser = JSON.parse(userData)
  //       setIsLoggedIn(true)
  //       setUser(parsedUser)
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error)
  //       localStorage.removeItem('loggedin')
  //       localStorage.removeItem('user')
  //     }
  //   }
  // }, [])

  // on first mount check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setIsLoggedIn(true)
        setUser({
          id: currentUser.uid,
          email: currentUser.email
        })
        localStorage.setItem('loggedin', 'true')
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: currentUser.uid,
            email: currentUser.email
          })
        )
      } else {
        setIsLoggedIn(false)
        setUser(null)
        localStorage.removeItem('loggedin')
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [])

  // login function
  const login = async credentials => {
    try {
      // First, check if we have the required credentials
      if (!credentials?.email) {
        throw new Error('Email is required')
      }

      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(credentials)
      // })

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      const user = userCredentials.user

      // check if user exists in database
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      // if user doc doesnt exist, create it
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date()
        })
      }

      const userData = {
        id: userCredentials.user.uid,
        email: userCredentials.user.email
      }

      localStorage.setItem('loggedin', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setIsLoggedIn(true)

      return userData
    } catch (error) {
      console.error('Login error:', error)
      throw {
        message: error.message || 'Invalid email or password',
        statusText: error.code || 'Error',
        status: error.status || 401
      }
    }
  }

  // Google Login Function
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // check if user exists in database
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      // if user doc doesnt exist, create it
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date()
        })
      }

      const userData = {
        id: result.user.uid,
        email: result.user.email
      }
      localStorage.setItem('loggedin', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setIsLoggedIn(true)
      return userData
    } catch (error) {
      console.error('Google login error:', error)
      throw {
        message: error.message || 'Google login failed',
        statusText: error.code || 'Error',
        status: error.status || 401
      }
    }
  }

  // logout function
  const logout = () => {
    auth.signOut()
    localStorage.removeItem('loggedin')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    // makes our state and functions accessible to all our children
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
