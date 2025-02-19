import { useOutletContext } from "react-router-dom";

const HostVanPhotos = () => {
  const { van } = useOutletContext();

  console.log(van.imageUrl);
  return (
    <div className='flex flex-row flex-wrap gap-4 my-6 overflow-hidden'>
      {van.imageUrl.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Photo of ${image + 1} of ${van.name}`}
          className='w-24 h-24 rounded-lg shadow-sm cursor-pointer'
        />
      ))}
    </div>
  );
};

export default HostVanPhotos;
