// update to use Firebase with subcollections
import { db, auth } from './firebaseConfig.js'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  writeBatch
} from 'firebase/firestore'
import crypto from 'crypto'

// --------------------- Van API Functions ---------------------

// Function to update all vans with hostId 123 to use current user's ID
export async function updateVanHostIds () {
  // Get current user
  const currentUser = auth.currentUser

  if (!currentUser) {
    console.error(
      'No user is logged in. Please log in before running this script'
    )
    throw new Error('You must be logged in to update van hostIds')
  }

  try {
    // Create a batch to perform multiple updates at once
    const batch = writeBatch(db)

    // Get all vans with hostId "123"
    const vansRef = collection(db, 'vans')
    const q = query(vansRef, where('hostId', '==', '123456'))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("No vans found with hostId '123456'")
      return
    }

    console.log(`Found ${querySnapshot.size} vans to update`)

    // Update each document with the new hostId
    querySnapshot.forEach(docSnapshot => {
      console.log(`Updating van: ${docSnapshot.id}`)
      batch.update(doc(db, 'vans', docSnapshot.id), {
        hostId: currentUser.uid
      })
    })

    // Commit the batch
    await batch.commit()
    // console.log('Successfully updated all van hostIds to:', currentUser.uid)

    return {
      success: true,
      count: querySnapshot.size
    }
  } catch (error) {
    console.error('Error updating van hostIds:', error)
    throw error
  }
}

// Get all vans (public)
export async function getVans () {
  try {
    const vansCollectionRef = collection(db, 'vans')
    const querySnapshot = await getDocs(vansCollectionRef)
    const vansArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return vansArray
  } catch (error) {
    throw {
      message: error.message,
      statusText: error.code,
      status: 500
    }
  }
}

// Get single van details (public)
export async function getVan (id) {
  try {
    if (id) {
      // Get a specific van by ID - getDoc fetches single document
      const vanDoc = await getDoc(doc(db, 'vans', id))

      if (!vanDoc.exists()) {
        throw {
          message: 'Van not found',
          status: 404
        }
      }
      // Add the id field to match your expected structure
      // .data() returns all other fields
      return { id: vanDoc.id, ...vanDoc.data() }
    }
  } catch (error) {
    throw {
      message: 'Failed to fetch van details',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// Fetch all Host Vans - with hostId filtering
export async function getHostVans () {
  // console.log('getHostVans function called')

  const currentUser = auth.currentUser
  console.log(
    'Current logged in user:',
    currentUser ? currentUser.uid : 'Not logged in'
  )

  // if not logged in user
  if (!currentUser) {
    throw {
      message: 'You must be logged in to view your vans',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    // Fixed: Use collection() instead of doc() for the vans collection
    const vansCollectionRef = collection(db, 'vans')

    // Create a query to find vans where hostId equals current user ID
    const q = query(vansCollectionRef, where('hostId', '==', currentUser.uid))

    const querySnapshot = await getDocs(q) // querying multiple documents

    // Check if any vans were found
    if (querySnapshot.empty) {
      console.log('No vans found for this user')
      return [] // Return empty array instead of throwing error
    }

    const vansArray = querySnapshot.docs.map(doc => {
      const data = doc.data()
      console.log('Van found:', doc.id)
      return {
        id: doc.id,
        ...data
      }
    })

    console.log('Returning vans array:', vansArray.length)
    return vansArray
  } catch (error) {
    console.error('Error in getHostVans:', error)
    throw {
      message: 'Could not fetch Host vans',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Reviews API Functions ---------------------

// Fetch reviews for the current user
export async function getUserReviews () {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to view your reviews',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    // Fixed: Used currentUser.uid instead of undefined vanId
    const reviewsCollectionRef = collection(
      db,
      'users',
      currentUser.uid,
      'reviews'
    )
    const querySnapshot = await getDocs(reviewsCollectionRef)

    if (querySnapshot.empty) {
      console.log('No reviews found for user')
      return []
    }

    const reviewsArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return reviewsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
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
// export async function getTestimonials () {
//   try {
//     const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'))
//     const testimonials = testimonialsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))

//     return testimonials
//   } catch (error) {
//     throw {
//       message: 'Failed to fetch testimonials',
//       statusText: error.message,
//       status: error.code || 500
//     }
//   }
// }

// Fetch multiple testimonials
export async function getTestimonials () {
  try {
    const testimonialsCollectionRef = collection(db, 'testimonials')

    const querySnapshot = await getDocs(testimonialsCollectionRef)

    if (querySnapshot.empty) {
      console.log('No testimonials found')
      return []
    }

    // map docs to an array of testimonial objects
    const testimonials = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log('testimonials', testimonials)

    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    throw {
      message: 'Failed to fetch testimonials',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Transaction API Functions ---------------------

// Fetch transaction data for a user
export async function getUserTransactions () {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to view your transactions',
      statusText: 'Unauthorized',
      status: 401
    }
  }
  try {
    const transactionsCollectionRef = collection(
      db,
      'users',
      currentUser.uid,
      'transactions'
    )
    const querySnapshot = await getDocs(transactionsCollectionRef)

    if (querySnapshot.empty) {
      console.log('No transactions found for user')
      return []
    }

    const transactionsArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      userId: currentUser.uid // Fixed: Added userId properly
    }))
    return transactionsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    throw {
      message: 'Failed to fetch transactions',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// --------------------- Monthly Data API Functions ---------------------

// Fetch monthly data for a specific user
export async function getUserMonthlyData () {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to view your monthly data',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    const monthlyDataCollectionRef = collection(
      db,
      'users',
      currentUser.uid,
      'monthlyData'
    )
    const querySnapshot = await getDocs(monthlyDataCollectionRef)

    if (querySnapshot.empty) {
      console.log('No monthly data found for user')
      return []
    }

    // Fixed: Using querySnapshot instead of undefined monthlyDataSnapshot
    const monthlyDataArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // sort by month order
    const monthOrder = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

    return monthlyDataArray.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    )
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

/// --------------------- Booking API Functions ---------------------

// Create a new booking
export async function createBooking (bookingData) {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to create a booking',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    const bookingRef = await addDoc(collection(db, 'booking'), {
      ...bookingData,
      userId: currentUser.uid,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })

    return {
      id: bookingRef.id,
      ...bookingData
    }
  } catch (error) {
    throw {
      message: 'Failed to create booking',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// Update booking status
export async function updateBookingStatus (bookingId, status) {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to update a booking',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    const bookingRef = doc(db, 'bookings', bookingId)
    await updateDoc(bookingRef, {
      status,
      updatedAt: new Date().toISOString()
    })

    return {
      success: true,
      bookingId
    }
  } catch (error) {
    throw {
      message: 'Failed to update booking status',
      statusText: error.message,
      status: error.code || 500
    }
  }
}

// Get booking by ID
export async function getBooking (bookingId) {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw {
      message: 'You must be logged in to view booking details',
      statusText: 'Unauthorized',
      status: 401
    }
  }

  try {
    const bookingDoc = await getDoc(doc(db, 'bookings', bookingId))

    if (!bookingDoc.exists()) {
      throw {
        throw {
          message: 'Booking not found',
          status: 404
        }
      }
    }

    return {
      id: bookingDoc.id,
      ...bookingDoc.data()
    }
  } catch (error) {
    throw {
      message: 'Failed to fetch booking details',
      statusText: error.message,
      status: error.code || 500
    }
  }
}
