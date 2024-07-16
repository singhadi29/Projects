import React from 'react'

function Pagination({pageNo, handlePrev, handleNext}) {
    return (
        <div className='m-8 p-4 flex justify-center bg-gray-400'>
            <div onClick={handlePrev} className='px-8'>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className='font-bold'>
                {pageNo}
            </div>
            <div onClick={handleNext} className='px-8'>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    )
} 

export default Pagination