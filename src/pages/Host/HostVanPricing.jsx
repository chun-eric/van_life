import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanPricing = () => {
  const { van } = useOutletContext();
  return (
    <div className='my-6'>
      <p className='text-lg font-bold'>
        ${van.price}
        <span className='text-base font-normal'>/day</span>
      </p>
    </div>
  );
};

export default HostVanPricing;
