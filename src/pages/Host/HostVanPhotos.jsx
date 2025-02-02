import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanPhotos = () => {
  const { van } = useOutletContext();
  return (
    <div className='my-6'>
      <img
        src={van.imageUrl}
        alt={`Photo of ${van.name}`}
        className='h-20 rounded-lg'
      />
    </div>
  );
};

export default HostVanPhotos;
