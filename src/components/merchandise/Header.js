import React from 'react'
import Navbar from '../Navbar/Navbar'
import merchBanner from '../../assets/images/merch.png'
import Body from './Body'
import { motion } from "framer-motion"

const Header = () => {
  return (
    <div className='flex flex-col bg-[#D7FDFF] min-h-screen px-2 pb-0 md:space-y-10 space-y-5'>
      {/* Navbar component */}
      <Navbar />
      <div className='flex flex-col space-y-2'>

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={merchBanner} alt="merch" />
        </motion.div>
        <Body />
      </div>
    </div>
  )
}

export default Header
