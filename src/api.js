// update to use Firebase with subcollections
import { db, auth } from './firebaseConfig.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import crypto from 'crypto'

// --------------------- Van API Functions ---------------------
// Fetch all vans or a specific van by ID
export async function getVans (id) {
  try {
    if (id) {
      // Get a specific van by ID
      const vanDoc = await getDoc(doc(db, 'vans', id))

      if (!vanDoc.exists()) {
        throw {
          message: 'Van not found',
          status: 404
        }
      }

      // Add the id field to match your expected structure
      return { id: vanDoc.id, ...vanDoc.data() }
    } else {
      // Get all vans
      const vansSnapshot = await getDocs(collection(db, 'vans'))
      const vans = vansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return vans
    }
  } catch (error) {
    throw {
      message: 'Failed to fetch vans',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// Fetch all Host Vans - with hostId filtering
export async function getHostVans (id) {
  try {
    // Hard-coded hostId to match your implementation
    const hostId = '123'

    if (id) {
      // Get a specific host van by ID
      const vanDoc = await getDoc(doc(db, 'vans', id))

      if (!vanDoc.exists()) {
        throw {
          message: 'Host van not found',
          status: 404
        }
      }

      const van = vanDoc.data()

      // Only return if it belongs to the host
      if (van.hostId !== hostId) {
        throw {
          message: 'No van with that id found for host',
          status: 404
        }
      }

      return { id: vanDoc.id, ...van }
    } else {
      // Get all vans for the specific host
      const hostVansQuery = query(
        collection(db, 'vans'),
        where('hostId', '==', hostId)
      )

      const vansSnapshot = await getDocs(hostVansQuery)
      const hostVans = vansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return hostVans
    }
  } catch (error) {
    throw {
      message: 'Could not fetch Host vans',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Reviews API Functions ---------------------

// Fetch reviews for a specific van using subcollection
export async function getVanReviews (vanId) {
  try {
    if (!vanId) {
      throw {
        message: 'Van ID is required to fetch reviews',
        status: 400
      }
    }

    const reviewsSnapshot = await getDocs(
      query(collection(db, 'vans', vanId, 'reviews'), orderBy('date', 'desc'))
    )

    const reviews = reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      vanId // Add back the vanId for consistency
    }))

    return reviews
  } catch (error) {
    throw {
      message: 'Failed to fetch reviews',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Testimonial API Functions ---------------------

// Fetch testimonials for homepage
export async function getTestimonials () {
  try {
    const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'))
    const testimonials = testimonialsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return testimonials
  } catch (error) {
    throw {
      message: 'Failed to fetch testimonials',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Transaction API Functions ---------------------

// Fetch transaction data for a user with optional date filtering
export async function getUserTransactions (userId = '123', startDate, endDate) {
  try {
    let transactionsQuery

    if (startDate && endDate) {
      transactionsQuery = query(
        collection(db, 'users', userId, 'transactions'),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'asc')
      )
    } else {
      transactionsQuery = query(
        collection(db, 'users', userId, 'transactions'),
        orderBy('date', 'asc')
      )
    }

    const transactionsSnapshot = await getDocs(transactionsQuery)
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      userId
    }))

    return transactions
  } catch (error) {
    throw {
      message: 'Failed to fetch transactions',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Monthly Data API Functions ---------------------

// Fetch monthly data for a specific user with optional year filtering
export async function getUserMonthlyData (userId = '123', year) {
  try {
    let monthlyDataQuery

    if (year) {
      monthlyDataQuery = query(
        collection(db, 'users', userId, 'monthlyData'),
        where('year', '==', year),
        orderBy('month')
      )
    } else {
      monthlyDataQuery = query(
        collection(db, 'users', userId, 'monthlyData'),
        orderBy('year'),
        orderBy('month')
      )
    }

    const monthlyDataSnapshot = await getDocs(monthlyDataQuery)
    const monthlyData = monthlyDataSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      userId
    }))

    return monthlyData
  } catch (error) {
    throw {
      message: 'Failed to fetch monthly data',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Authentication API Functions ---------------------
function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Login users with credentials
export async function loginUser (credentials) {
  try {
    // 1. first find user with the email query
    const usersQuery = query(
      collection(db, 'users'),
      where('email', '==', credentials.email)
    )

    // 2. Execute query to retrieve matching documents
    const usersSnapshot = await getDocs(usersQuery)

    // 3. If no user is found, throw error indicating credentials invalid
    if (usersSnapshot.empty) {
      throw {
        message: 'No user with those credentials found',
        code: 401
      }
    }

    // 4. Retrieve first users data and its uniuque id
    const userData = usersSnapshot.docs[0].data()
    const userId = usersSnapshot.docs[0].id

    // 5. Hash provided password for comparison
    const hashedPassword = hashPassword(credentials.password)

    // 6. If hashed password does not match stored hashed password, throw error
    if (userData.password !== hashedPassword) {
      throw {
        message: 'Invalid password',
        code: 401
      }
    }

    // 7. Create a user object that includes all user data and user ID
    const user = { ...userData, id: userId }

    // 8. Remove password from user object
    delete user.password

    // 9. Return user object along with token
    return {
      user,
      token: "Pat the Shiba Inu on the head. Here's your token"
    }
  } catch (error) {
    throw {
      message: error.message || 'Login failed',
      statusText: error.statusText,
      status: error.status || 401
    }
  }
}

//
