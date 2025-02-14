import ButtonSet from "./ButtonSet";

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4 py-16 mx-auto text-center bg-white h-[450px]'>
      <div className='flex flex-col items-center justify-center max-w-2xl gap-3 px-4 mx-auto bg-white sm:px-6 lg:px-8'>
        <h1 className='mb-4 text-4xl font-bold'>Your Adventure Awaits!</h1>
        <p className='mb-6 text-gray-600'>
          Discover our premium fleet of vans and start your journey today.
        </p>

        <ButtonSet
          button1Text='Explore'
          button1Link='/vans'
          button2Text='Book'
          button2Link='/book'
        />
      </div>
    </div>
  );
};

export default CallToAction;
