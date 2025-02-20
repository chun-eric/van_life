import "../server.js";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { loginUser } from "../api.js";
import { useAuth } from "../context/useAuth";
import GoogleLogo from "../assets/google-logo.svg";

const Login = () => {
  // setting state for form values
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/host";
  const { login } = useAuth();

  // "b@b.com" as the username and "p123" as the password

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await login(formValues);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err);
      setStatus("idle");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // check if user is already logged after initial mount, if so redirect to /host
  useEffect(() => {
    const authenticated = localStorage.getItem("loggedin");
    if (authenticated) {
      navigate("/host", { replace: true });
    }
  }, [navigate]);

  const buttonBaseClasses =
    "w-full px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out";

  return (
    <div className='flex items-center justify-center min-h-screen px-3 '>
      <div className=' max-w-[400px] mx-auto max-h-[auto] border rounded-2xl  w-full mb-20 shadow-sm border-gray-300'>
        <div className='flex flex-col gap-4 px-6 py-12 mx-auto my-10 bg-white rounded-lg'>
          {location.state?.message && (
            <div className='bg-white rounded-lg mx-auto max-w-[500px] p-8 mt-4 '>
              <h3 className='text-xl font-bold text-center text-red-500'>
                {location.state.message}
              </h3>
            </div>
          )}
          <h1 className='mb-3 text-2xl font-bold text-center text-black capitalize border-b pb-4 '>
            Sign in
          </h1>
          {error?.message && (
            <p className='bg-white rounded-lg mx-auto max-w-[500px] p-8 mt-4 font-bold text-center text-red-500'>
              {error.message}
            </p>
          )}
          <form
            action=''
            onSubmit={handleSubmit}
            className='flex flex-col mt-3 '
          >
            <input
              type='email'
              name='email'
              onChange={handleChange}
              placeholder='email address'
              value={formValues.email}
              className='border h-[40px] shadow-sm  text-sm  indent-[10px] text-black outline-none py-6  rounded-lg mb-2 pl-2 border-slate-400 bg-white focus:bg-white active:bg-white'
            />
            <input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='password'
              value={formValues.password}
              className='border h-[40px] shadow-sm   indent-[10px] outline-none py-6  text-sm rounded-lg pl-2  border-slate-400 bg-white focus:bg-white active:bg-white'
            />
            <div className='mt-4'>
              <button
                disabled={status === "submitting"}
                className={`${buttonBaseClasses} bg-[#FDBA74] hover:bg-gray-50 rounded-lg`}
              >
                {status === "submitting" ? "Signing in..." : "Sign in"}
              </button>
            </div>
            {/* or */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t border-gray-300'></div>
              <span className='text-xs px-4 text-gray-500'>or</span>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            {/* Google sign in button */}
            <div className='mt-4 '>
              <button className='border border-gray-400 shadow-sm rounded-lg w-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 relative'>
                <div className='absolute left-4'>
                  <img
                    src={GoogleLogo}
                    alt='Google logo'
                    className='w-4 h-4 mr-3'
                  />
                </div>
                <span className='sm:text-sm px-6 py-3 font-semibold text-slate-700 text-xs'>
                  <span className='sm:inline hidden'>Sign in with Google</span>
                  <span className='sm:hidden inline'>Sign-in</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
