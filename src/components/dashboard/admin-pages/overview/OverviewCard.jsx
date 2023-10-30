import React from 'react';

const OverviewCard = ({icon, title, data, classes, iconBg}) => {
    return (
        <div className={`w-full h-full rounded-md ${classes} bg-opacity-20 hover:bg-opacity-25 duration-300 transition-all flex flex-col justify-center gap-3 xl:gap-5 items-center py-5 xl:py-7 h-fit`}>
          <div className={`p-7 ${iconBg} bg-opacity-10 rounded-full w-fit`}>
            {icon}
          </div>
          <h1 className='text-4xl font-bold text-primary'>{data}</h1>
          <p className='text-xs text-center lg:text-sm uppercase text-primary opacity-75 font-semibold'>{title}</p>
        </div>
    );
};

export default OverviewCard;