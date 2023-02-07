import React from 'react'
import Navbar from '../Navbar'
import merchBanner from '../../assets/images/merch.png'
import Body from './Body'
import { motion } from "framer-motion"

const Header = () => {
  return (
      <div className='flex flex-col bg-[#D7FDFF] min-h-screen md:space-y-10'>
      {/* Navbar component */}
        <Navbar/>
        <motion.div initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} transition={{duration:0.5}} className='flex justify-center mx-2'>
          <img src={merchBanner} alt="merch" />
        </motion.div>
        <Body/>
    </div>
  )
}

export default Header
