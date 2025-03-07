import { db } from './src/firebaseConfig.js'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

// help function to hash passwords
function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Van data from Mirage JS
const vans = [
  {
    id: '1',
    name: 'Modest Explorer',
    price: 60,
    description:
      'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!',
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png'
    ],
    type: 'simple',
    hostId: '123'
  },
  {
    id: '2',
    name: 'Beach Bum',
    price: 80,
    description:
      "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/beach-bum.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png'
    ],
    type: 'rugged',
    hostId: '123'
  },

  {
    id: '3',
    name: 'Reliable Red',
    price: 100,
    description:
      "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/reliable-red.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png'
    ],
    type: 'luxury',
    hostId: '456'
  },
  {
    id: '4',
    name: 'Dreamfinder',
    price: 65,
    description:
      'Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.',
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png'
    ],
    type: 'simple',
    hostId: '789'
  },
  {
    id: '5',
    name: 'The Cruiser',
    price: 120,
    description:
      'The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.',
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png'
    ],
    type: 'luxury',
    hostId: '789'
  },
  {
    id: '6',
    name: 'Green Wonder',
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png'
    ],
    type: 'rugged',
    hostId: '123'
  },
  {
    id: '7',
    name: 'Green Wonder',
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png'
    ],
    type: 'luxury',
    hostId: '123'
  },
  {
    id: '8',
    name: 'Green Wonder',
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",

    imageUrl: [
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png'
    ],
    type: 'rugged',
    hostId: '123'
  }
]

// User Data
const users = [
  {
    id: '123',
    email: 'bob@gmail.com',
    // In a real app, NEVER store plain text passwords
    // This is just for demo purposes
    password: hashPassword('123'),
    name: 'Bob'
  }
]

// Reviews Data - will be added as subcollections to vans
// endpoint point = vans/{vanId}/reviews/{reviewId}
const reviewsData = [
  {
    id: '1',
    rating: 5,
    name: 'Elliot',
    date: 'January 3, 2023',
    text: 'The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!',
    vanId: '2' // Beach Bum van
  },
  {
    id: '2',
    rating: 5,
    name: 'Sandy',
    date: 'December 12, 2022',
    text: 'This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!',
    vanId: '1' // Modest Explorer van
  },
  {
    id: '3',
    rating: 5,
    name: 'Kevin',
    date: 'December 1, 2022',
    text: 'The Modest Explorer was nice. We loved the comfort and ease of the van. The host was very responsive and helpful. We will definitely rent from them again in the four however there was some cleanliness issues.',
    vanId: '1' // Modest Explorer van
  },
  {
    id: '4',
    rating: 4,
    name: 'Rachel',
    date: 'November 15, 2022',
    text: 'The Cruiser was decent for our weekend trip. The van ran well, but the interior could use some updating. The host was communicative but pickup took longer than expected. Might consider other options next time.',
    vanId: '5' // The Cruiser van
  },
  {
    id: '5',
    rating: 5,
    name: 'Marcus',
    date: 'November 2, 2022',
    text: 'What an incredible experience with the Dreamfinder! Everything worked perfectly, and the solar panels were a game-changer for our off-grid adventure. The host provided excellent instructions and was always available for questions.',
    vanId: '4' // Dreamfinder van
  },
  {
    id: '6',
    rating: 4,
    name: 'Lisa',
    date: 'October 28, 2022',
    text: 'Really enjoyed our trip with the Green Wonder. The van was well-maintained and comfortable. Only giving 4 stars because the pickup location was quite far from the city center, but otherwise a great experience!',
    vanId: '6' // Green Wonder van
  }
]

// Home Page Testimonials - These will remain as a separate testimonial collection
const homePageTestimonials = [
  {
    id: 'home-1',
    rating: 5,
    name: 'Marcus',
    position: 'Adventure Enthusiast',
    date: 'November 2, 2022',
    text: 'What an incredible experience with the Dreamfinder! ',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'home-2',
    rating: 5,
    name: 'Elliot',
    position: 'Travel Blogger',
    date: 'January 3, 2023',
    text: 'The Beach Bum is such an awesome van! Highly recommend!',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'home-3',
    rating: 5,
    name: 'Sandy',
    position: 'Frequent Traveler',
    date: 'December 12, 2022',
    text: 'No complaints, absolutely perfect!',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'home-4',
    rating: 5,
    name: 'Lisa',
    position: 'Nature Photographer',
    date: 'October 28, 2022',
    text: 'A truly unique travel experience.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'home-5',
    rating: 5,
    name: 'James',
    position: 'Weekend Explorer',
    date: 'September 15, 2022',
    text: "Can't wait to book again!",
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'home-6',
    rating: 5,
    name: 'Sarah',
    position: 'Digital Nomad',
    date: 'August 22, 2022',
    text: 'The perfect mobile office setup.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }
]

// Monthly data for charts/reports - user specific, will be added to user subcollection
// endpoint = users/{userId}/monthlyData/{year-month}
const monthlyData = [
  { month: 'Jan', amount: 2500, year: 2024, userId: '123' },
  { month: 'Feb', amount: 1800, year: 2024, userId: '123' },
  { month: 'Mar', amount: 2200, year: 2024, userId: '123' },
  { month: 'Apr', amount: 3000, year: 2024, userId: '123' },
  { month: 'May', amount: 2600, year: 2024, userId: '123' },
  { month: 'Jun', amount: 3200, year: 2024, userId: '123' },
  { month: 'Jul', amount: 3800, year: 2024, userId: '123' },
  { month: 'Aug', amount: 1200, year: 2024, userId: '123' },
  { month: 'Sep', amount: 2800, year: 2024, userId: '123' },
  { month: 'Oct', amount: 2400, year: 2024, userId: '123' },
  { month: 'Nov', amount: 1500, year: 2024, userId: '123' },
  { month: 'Dec', amount: 560, year: 2024, userId: '123' },
  { month: 'Jan', amount: 2860, year: 2025, userId: '123' }
]

// Transaction data - will be added as subcollections to users
// endpoint = users/{userId}/transactions/{transactionId}
const transactionData = [
  // January 2024 transactions (Total: 2500)
  { amount: 1200, date: '2024-01-08', id: '1', userId: '123' },
  { amount: 1300, date: '2024-01-20', id: '2', userId: '123' },

  // February 2024 transactions (Total: 1800)
  { amount: 800, date: '2024-02-05', id: '3', userId: '123' },
  { amount: 1000, date: '2024-02-15', id: '4', userId: '123' },

  // March 2024 transactions (Total: 2200)
  { amount: 1400, date: '2024-03-10', id: '5', userId: '123' },
  { amount: 800, date: '2024-03-25', id: '6', userId: '123' },

  // April 2024 transactions (Total: 3000)
  { amount: 1600, date: '2024-04-12', id: '7', userId: '123' },
  { amount: 1400, date: '2024-04-28', id: '8', userId: '123' },

  // May 2024 transactions (Total: 2600)
  { amount: 1500, date: '2024-05-05', id: '9', userId: '123' },
  { amount: 1100, date: '2024-05-18', id: '10', userId: '123' },

  // June 2024 transactions (Total: 3200)
  { amount: 2000, date: '2024-06-10', id: '11', userId: '123' },
  { amount: 1200, date: '2024-06-22', id: '12', userId: '123' },

  // July 2022 transactions (Total: 3800)
  { amount: -1200, date: '2024-07-05', id: '13', userId: '123' },
  { amount: 1600, date: '2024-07-15', id: '14', userId: '123' },
  { amount: 1000, date: '2024-07-28', id: '15', userId: '123' },

  // August 2024 transactions (Total: 1200)
  { amount: 800, date: '2024-08-10', id: '16', userId: '123' },
  { amount: 400, date: '2024-08-25', id: '17', userId: '123' },

  // September 2024 transactions (Total: 2800)
  { amount: 1500, date: '2024-09-08', id: '18', userId: '123' },
  { amount: 1300, date: '2024-09-22', id: '19', userId: '123' },

  // October 2024 transactions (Total: 2400)
  { amount: 900, date: '2024-10-07', id: '20', userId: '123' },
  { amount: -800, date: '2024-10-18', id: '21', userId: '123' },
  { amount: 700, date: '2024-10-29', id: '22', userId: '123' },

  // November 2024 transactions (Total: 1500)
  { amount: 800, date: '2024-11-12', id: '23', userId: '123' },
  { amount: 700, date: '2024-11-25', id: '24', userId: '123' },

  // December 2024 transactions (Total: 560)
  { amount: 320, date: '2024-12-08', id: '25', userId: '123' },
  { amount: -240, date: '2024-12-20', id: '26', userId: '123' },

  // January 2025 transactions (Total: 2860)
  { amount: -620, date: '2025-01-10', id: '27', userId: '123' },
  { amount: 2240, date: '2025-01-14', id: '28', userId: '123' }
]

// Seed the database function
async function seedDatabase () {
  try {
    /* -----------------------  VANS COLLECTION    ----------------------- */
    // step 1: Seed vans collection with custom IDs
    // 1. loop through vanData array (forEach)
    for (const van of vans) {
      // 2. For each van: // a) extract id to use as document ID
      const vanId = van.id
      // b) create copy of van data without ID field
      const vanWithoutId = { ...van }
      delete vanWithoutId.id // simply delete the id field as it will be the vanId instead

      // c) use setDoc to create new document in vans collection
      await setDoc(doc(db, 'vans', vanId), vanWithoutId) // vans is the collection name and vanId is the documentId, vanWithoutId is the object data where we want to store
      // vans > vanId > vanWithoutId (data)

      // 3. After each van document is created:
      // a) filter reviews data to find only reviews for specific van
      const vanReviews = reviewsData.filter(review => review.vanId === vanId)

      // b) for each matching review:
      for (const review of vanReviews) {
        // 1) extract review id to use as the document id
        const reviewId = review.id
        // 2) create copy of review data
        const reviewData = { ...review }
        // 3) remove unnecessary fields like id and vanId
        delete reviewData.id
        delete reviewData.vanId

        // c) use fireStore path syntax to create review as subcollection document
        await setDoc(doc(db, 'vans', vanId, 'reviews', reviewId), reviewData)
        // vans > vanId > reviews > reviewId > reviewData
        console.log(`Added review with ID: ${reviewId} to van: ${vanId}`)
      }
    }

    /* -----------------------  USERS COLLECTION    ----------------------- */
    // step 2: Seed users collection with custom IDs and their subcollections
    // 1. loop through users array (forEach)
    for (const user of users) {
      // 2. For each user:
      const userId = user.id
      // a) extract id to use as document ID
      const userWithoutId = { ...user }
      // b) create copy of user data without ID field
      delete userWithoutId.id

      // c) use setDoc to create new document in users collection
      await setDoc(doc(db, 'users', userId), userWithoutId)
      console.log(`Added user with ID: ${userId}`)

      // 3. After each user document is created:
      // a) filter reviews data to find only reviews for specific user
      const userTransactions = transactionData.filter(
        transaction => transaction.userId === userId
      )
      // b) for each matching transaction:
      for (const transaction of userTransactions) {
        // 1) extract transaction id to use as the document id
        const transactionId = transaction.id
        // 2) create copy of transaction data
        const transactionData = { ...transaction }

        // 3) remove unnecessary fields (ID and userId)
        delete transactionData.id
        delete transactionData.userId // we dont need this in the transactions collection

        // 4) use fireStore path syntax to create transaction as subcollection document
        await setDoc(
          doc(db, 'users', userId, 'transactions', transactionId),
          transactionData
        )
        console.log(
          `Added transaction with ID: ${transactionId} to user: ${userId}`
        )
      }

      // 4. Add monthly data as subcollection for this user:
      // a) filter montly data for this user
      const userMonthlyData = monthlyData.filter(data => data.userId === userId)
      // b) For each months data:
      for (const monthData of userMonthlyData) {
        // 1) Create copy of the data
        const monthCopyData = { ...monthData }
        // 2) Remove userId field
        delete monthCopyData.userId

        // 3) Create custom document ID string using year-month format for easier query
        const docId = `${monthCopyData.year}-${monthCopyData.month}`

        // 4) Use fireStore path syntax to create monthly data as subcollection document
        await setDoc(
          doc(db, 'users', userId, 'monthlyData', docId),
          monthCopyData
        )
        console.log(`Added monthly data with ID: ${docId} to user: ${userId}`)
      }
    }

    /* -----------------------  TESTIMONIALS COLLECTION    ----------------------- */
    // step 3: Seed testimonials collection (remains separate)
    // 1. Iterate through testimonials array (forEach)
    for (const testimonial of homePageTestimonials) {
      // 2. For each testimonial:
      // a) extract id to use as document ID
      const testimonialId = testimonial.id
      // b) create copy of data without ID field
      const testimonialWithoutId = { ...testimonial }
      delete testimonialWithoutId.id
      // c) use setDoc to create new document in testimonials collection
      await setDoc(doc(db, 'testimonials', testimonialId), testimonialWithoutId)
      console.log(``)
    }
  } catch (error) {
    console.error('Error seeding database:', error)
    console.error(error.stack)
  }
}

seedDatabase()
