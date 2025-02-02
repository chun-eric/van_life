import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanInfo = () => {
  const { van } = useOutletContext();
  return (
    <div className='flex flex-col gap-4 my-6'>
      <p className='text-sm font-bold'>
        Name: <span className='ml-2 font-normal'> {van.name}</span>
      </p>
      <p className='text-sm font-bold'>
        Category:{" "}
        <span className='ml-2 font-normal capitalize'>{van.type}</span>
      </p>
      <p className='text-sm font-bold'>
        Description: <span className='ml-2 font-normal'>{van.description}</span>
      </p>
      <p className='text-sm font-bold'>
        Visibility: <span className='ml-2 font-normal'> Public</span>
      </p>
    </div>
  );
};

export default HostVanInfo;
