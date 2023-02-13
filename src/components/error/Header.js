import React from 'react'
import Navbar from '../Navbar/Navbar'
import Body from './Body'

const Header = () => {
    return (
        <div className='flex flex-col bg-[#F5B8FF] min-h-screen px-2 pb-0 md:space-y-20 space-y-10'>
            {/* Navbar component */}
            <Navbar />
            <div className='flex flex-col space-y-6'>
                <Body />
            </div>
        </div>
    )
}

export default Header
