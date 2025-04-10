import React from 'react'

function InvalidPage() {
    return (
        <>
            <div className='flex justify-center '>
                <img src="/images/UnAuthorized.jpg" alt="INVALID CERTIFICATE" className="max-h-full max-w-fit mt-20 " />
            </div>
            <div className='flex justify-center'>
            <p className='font-bold text-2xl text-red-600 justify-center mt-5'>
               Invalid Certificate
            </p>
            </div>
        </>
    )
}

export default InvalidPage