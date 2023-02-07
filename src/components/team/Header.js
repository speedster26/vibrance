import React from 'react'
import Navbar from '../Navbar'
import teamBanner from '../../assets/images/team.png'
import Body from './Body'

const Header = () => {
  return (
    <div className='flex flex-col bg-[#D7FDFF] '>
      {/* Navbar component */}
        <Navbar/>
        <div className='flex justify-center mx-2'>
          <img src={teamBanner} alt="team" />
        </div>
        <Body/>
    </div>
  )
}

export default Header
