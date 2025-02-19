import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumbs = ({ van }) => {
  return (
    <nav className='flex items-start gap-2 text-xs text-black'>
      <Link to='/' className='hover:underline'>
        Explore All
      </Link>
      <span className='text-black'>&gt;</span>
      <Link to='/vans' className='hover:underline'>
        Vans
      </Link>
      <span className='text-black'>&gt;</span>
      <span className='font-bold text-black'>{van.name}</span>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  van: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrumbs;
