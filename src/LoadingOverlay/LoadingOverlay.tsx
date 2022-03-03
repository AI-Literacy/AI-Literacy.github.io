import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadingOverlay = () => (
    <div className='fixed w-full h-full flex align-center z-50 bg-black bg-opacity-50'>
        <div className="flex w-full h-full justify-center">
            <div className="flex self-center">
                <PacmanLoader color={'white'} size={100} />
            </div>
        </div>
    </div>
);

export default LoadingOverlay;