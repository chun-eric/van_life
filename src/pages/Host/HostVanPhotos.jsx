import { useOutletContext } from "react-router-dom";

const HostVanPhotos = () => {
  const { van, onImageChange, currentImageIndex } = useOutletContext();

  console.log(van.imageUrl);
  return (
    <div className='flex flex-row flex-wrap gap-4 my-6 overflow-hidden'>
      {van.imageUrl.map((image, index) => (
        <div
          key={index}
          className={`relative rounded-lg overflow-hidden
            ${
              currentImageIndex === index
                ? "border border-orange-400 rounded-lg"
                : ""
            }`}
        >
          {" "}
          <img
            src={image}
            alt={`Photo of ${image + 1} of ${van.name}`}
            className={`w-24 h-24 rounded-lg shadow-sm cursor-pointer ${
              currentImageIndex === index
                ? "border border-orange-400 rounded-lg"
                : "hover:opacity-80"
            }`}
            onClick={() => onImageChange(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default HostVanPhotos;
