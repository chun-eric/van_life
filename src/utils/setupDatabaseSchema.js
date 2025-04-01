import { db, auth } from '../firebaseConfig.js'
import {
  collection,
  doc,
  setDoc,
  writeBatch,
  getDocs,
  query,
  where
} from 'firebase/firestore'

// Import mock data to populate database
import { reviewsData, transactionData, monthlyData } from '../data.js'

/* What does this script do
1. Creates monthlyData subCollection
2. Creates transactions subCollection
3. Creates reviews subCollection
*/

async function setupDatabasesSchema () {
  // check if user is logged in
  const currentUser = auth.currentUser

  if (!currentUser) {
    console.error(
      'No user is logged in. Please log in before running this script.'
    )
    return
  }

  try {
    console.log('Setting up database schema for user:', currentUser.uid)

    // Create batches for each type of data (batches have limits of 500 operations)
    const monthlyDataBatch = writeBatch(db)
    const transactionsBatch = writeBatch(db)
    const reviewsBatch = writeBatch(db)

    // --------------- Set up monthlyData subcollection ---------------
    console.log('Setting up monthlyData subcollection..')

    monthlyData.forEach((monthData, index) => {
      const docRef = doc(
        collection(db, 'users', currentUser.uid, 'monthlyData')
      )
      monthlyDataBatch.set(docRef, {
        ...monthData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    // --------------- Set up reviews subcollection ---------------
    console.log('Setting up reviews subcollection..')

    reviewsData.forEach((review, index) => {
      const docRef = doc(collection(db, 'users', currentUser.uid, 'reviews'))
      reviewsBatch.set(docRef, {
        ...review,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    // --------------- Set up transactions subcollection ---------------
    console.log('Setting up transactions subcollection..')

    transactionData.forEach((transaction, index) => {
      const docRef = doc(
        collection(db, 'users', currentUser.uid, 'transactions')
      )
      transactionsBatch.set(docRef, {
        ...transaction,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    // Commit all batches
    console.log('Committing all batches to Firestore')
    await monthlyDataBatch.commit()
    console.log('Monthly data batch committed')

    await reviewsBatch.commit()
    console.log('Reviews batch committed')

    await transactionsBatch.commit()
    console.log('Transactions batch committed')

    console.log('Database schema setup complete!')

    return {
      success: true,
      message: 'Database schema setup complete',
      details: {
        monthlyDataCount: monthlyData.length,
        reviewsCount: reviewsData.length,
        transactionsCount: transactionData.length
      }
    }
  } catch (error) {
    console.error('Error setting up database schema:', error)
    return {
      success: false,
      message: 'Failed to set up database schema',
      error: error.message
    }
  }
}

export default setupDatabasesSchema
