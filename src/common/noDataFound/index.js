import React, { memo } from 'react';

const NoDataFound = (props) => {
    const { title } = props;
    return <div className='flex items-center justify-center w-full h-[200px]'>
        <div className='text-white text-6xl max-sm:text-3xl font-bold uppercase'>
            {
                title
            }
        </div>
    </div>;
};
export default memo(NoDataFound);

