import { useState, useEffect } from "react";
import "../../server.js";

const HostVans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  console.log(vans);

  return (
    <div className='flex flex-col gap-5 my-4'>
      <p className='text-2xl font-bold'>Your listed vans</p>
      <div className='flex flex-col flex-1 gap-5'>
        {vans.map((van) => (
          <div className='flex flex-col gap-4 p-5 bg-white' key={van.id}>
            <div className='flex flex-row items-center gap-6 rounded-lg'>
              <img
                className='object-cover rounded-lg cursor-pointer h-28 w-28'
                src={van.imageUrl}
                alt={`This is a ${van.type}  ${van.name} van`}
              />
              <div className='flex flex-col'>
                <p className='mb-2 text-xl font-bold'>{van.name}</p>
                <p className=''>
                  <span className=''>${van.price}/day</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostVans;
