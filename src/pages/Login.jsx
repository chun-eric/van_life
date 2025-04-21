import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import GoogleLogo from '../assets/google-logo.svg'

const Login = () => {
  // State for form values and UI state
  const [formValues, setFormValues] = useState({
    email: 'bob2@gmail.com',
    password: '123456'
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Navigation and location hooks
  const navigate = useNavigate()
  const location = useLocation()

  // Get redirect path or default to host dashboard
  const redirectPath = location.state?.from || '/host'

  // Get authentication methods from context
  const { login, googleLogin } = useAuth()

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await login(formValues)
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }

  // Handle input field changes
  const handleChange = e => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Check for existing authentication on component mount
  useEffect(() => {
    const authenticated = localStorage.getItem('loggedin')
    if (authenticated) {
      navigate('/host', { replace: true })
    }
  }, [navigate])

  // Common button styles
  const buttonBaseClasses =
    'w-full px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner ' +
    'cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'

  return (
    <div className='flex items-center justify-center min-h-screen px-3'>
      <div className='max-w-[400px] mx-auto max-h-[auto] border rounded-2xl w-full mb-20 shadow-sm border-gray-300'>
        <div className='flex flex-col gap-4 px-6 py-12 mx-auto my-10 bg-white rounded-lg'>
          {/* Display redirect message if any */}
          {location.state?.message && (
            <div className='p-4 text-center bg-red-100 rounded-lg'>
              <h3 className='text-lg font-medium text-red-500'>
                {location.state.message}
              </h3>
            </div>
          )}

          <h1 className='pb-4 mb-3 text-2xl font-bold text-center text-black capitalize border-b'>
            Sign in
          </h1>

          {/* Display error message if any */}
          {error?.message && (
            <div className='p-4 text-center bg-red-100 rounded-lg'>
              <p className='font-medium text-red-500'>{error.message}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className='flex flex-col mt-3'>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              placeholder='Email address'
              value={formValues.email}
              className='h-[48px] border shadow-sm text-sm indent-[10px] text-black outline-none rounded-lg mb-4 pl-2 border-slate-400 bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
              required
            />

            <input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Password'
              value={formValues.password}
              className='h-[48px] border shadow-sm indent-[10px] outline-none text-sm rounded-lg pl-2 border-slate-400 bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
              required
            />

            <div className='mt-6'>
              <button
                type='submit'
                disabled={isLoading}
                className={`${buttonBaseClasses} bg-[#FDBA74] hover:bg-[#FCA957] rounded-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 mr-2 animate-spin'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                        fill='none'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t border-gray-300'></div>
              <span className='px-4 text-xs text-gray-500'>or</span>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            {/* Google sign in button */}
            <button
              type='button'
              className='relative flex items-center justify-center w-full px-6 py-3 mt-2 transition-all duration-300 border border-gray-400 rounded-lg shadow-sm hover:bg-gray-100'
              onClick={googleLogin}
            >
              <div className='absolute left-4'>
                <img src={GoogleLogo} alt='Google logo' className='w-5 h-5' />
              </div>
              <span className='text-sm font-semibold text-slate-700'>
                <span className='hidden sm:inline'>Sign in with Google</span>
                <span className='inline sm:hidden'>Google Sign-in</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
