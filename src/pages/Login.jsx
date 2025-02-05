import "../server.js";
import { useState } from "react";
import { useNavigate, useLocation, replace } from "react-router-dom";
import { loginUser } from "../api.js";

const Login = () => {
  // setting state for form values
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const location = useLocation();

  // "b@b.com" as the username and "p123" as the password
  function handleSubmit(e) {
    e.preventDefault();

    setStatus("submitting");

    loginUser(formValues)
      .then((data) => {
        console.log(data);
        localStorage.setItem("loggedin", true);
        navigate("/host", { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className=' max-w-[500px] mx-auto max-h-[500px] '>
      <div className='flex flex-col gap-4 px-6 py-12 mx-auto my-10 bg-white rounded-lg'>
        {location.state?.message && (
          <div className='bg-white rounded-lg mx-auto max-w-[500px] p-8 mt-4 '>
            <h3 className='text-xl font-bold text-center text-red-500'>
              {location.state.message}
            </h3>
          </div>
        )}
        <h1 className='mb-3 text-2xl font-bold text-center text-black capitalize'>
          Sign in
        </h1>
        {error?.message && (
          <p className='bg-white rounded-lg mx-auto max-w-[500px] p-8 mt-4 font-bold text-center text-red-500'>
            {error.message}
          </p>
        )}
        <form action='' onSubmit={handleSubmit} className='flex flex-col '>
          <input
            type='email'
            name='email'
            onChange={handleChange}
            placeholder='email address'
            value={formValues.email}
            className='border h-[40px] shadow-sm  text-sm rounded indent-[10px] text-black outline-none py-6 placeholder-neutral-500'
          />
          <input
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='password'
            value={formValues.password}
            className='border h-[40px] shadow-sm  rounded indent-[10px] outline-none py-6 placeholder-neutral-500 text-sm'
          />
          <button
            disabled={status === "submitting"}
            className={`py-3 mt-6 text-base font-semibold text-white bg-[#FF8C38] rounded hover:bg-[black] transition-colors duration-200 `}
          >
            {status === "submitting" ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
