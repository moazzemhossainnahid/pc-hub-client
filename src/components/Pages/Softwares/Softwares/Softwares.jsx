import React from 'react';
import SoftwaresCard from '../SoftwaresCard/SoftwaresCard';

const Softwares = ({softwares}) => {
    return (
        <div className='w-11/12 md:w-5-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto pb-20 pt-10'>
        {softwares?.map((software) => (
          <SoftwaresCard key={software?._id} software={software} />
        ))}
      </div>
    );
};

export default Softwares;