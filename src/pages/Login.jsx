import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // setting state for form values
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formValues);
  }
  return (
    <div className=' max-w-[500px] mx-auto max-h-[500px] '>
      <div className='flex flex-col gap-4 px-6 py-12 mx-auto my-10 bg-white rounded-lg'>
        <h1 className='mb-3 text-2xl font-bold text-center text-black capitalize'>
          Sign in
        </h1>
        <form action='' onSubmit={""} className='flex flex-col '>
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
          <button className='py-3 mt-6 text-base font-semibold text-white bg-black rounded hover:bg-[#FF8C38] transition-colors duration-200 '>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
