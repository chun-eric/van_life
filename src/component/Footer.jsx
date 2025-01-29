import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className='bg-[#252525] w-full h-[120px] flex items-center justify-center'>
      <div className=''>
        <h3 className='text-base  flex gap-4 text-gray-400 leading-6'>
          <span className=''>&copy; {year}</span>#VANLIFE
        </h3>
      </div>
    </div>
  );
};

export default Footer;
