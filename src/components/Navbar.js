import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const handleClick = () => {
        setMenu(!menu);
    }

    return (
        <>
            <nav className='mx-auto md:mt-10 hidden md:block bg-[#262A43] px-28 rounded-xl shadow-5xl'>
                <div className='flex text-white space-x-24'>
                    <div className='font-main text-[40px]'>Vibrance'23</div>
                    <ul className='flex items-center justify-center font-secondary space-x-28 text-2xl'>
                        <li><a href='/'>events</a></li>
                        <li><a href='/'>pro shows</a></li>
                        <li><a href='/'>merchandise</a></li>
                        <li><a href='/'>sponsors</a></li>
                        <li><a href='/'>team</a></li>
                    </ul>
                </div>
            </nav>
            <nav className={`flex md:hidden flex-col sticky top-0 mb-5 shadow-5xl z-50 ${menu ? 'rounded-none' : 'rounded-xl'}`}>
                <div className={`flex px-6 items-center py-3 bg-[#262A43] shadow-5xl ${menu ? 'rounded-none' : 'rounded-bl-xl'}`}>
                    {!menu && <div className='text-4xl hover:cursor-pointer text-white'><AiOutlineMenu onClick={handleClick} /></div>}
                    {menu && <div className='text-4xl hover:cursor-pointer text-white'><AiOutlineClose onClick={handleClick} /></div>}
                    <div className='flex justify-center w-full'>
                        <div className='font-main text-3xl text-white'>Vibrance'23</div>
                    </div>
                </div>
                {menu && <div className={`min-h-screen bg-[#262A43] z-40 ${menu ? '' : 'shadow-none'}`}>
                    <div className='flex flex-col pt-10'>
                        <ul className='flex flex-col items-center justify-center font-secondary space-y-4 text-2xl text-white'>
                            <li><a href='/'>events</a></li>
                            <li><a href='/'>pro shows</a></li>
                            <li><a href='/'>merchandise</a></li>
                            <li><a href='/'>sponsors</a></li>
                            <li><a href='/'>team</a></li>
                        </ul>
                    </div>
                </div>}
            </nav>
        </>

    )
}

export default Navbar
