import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdResize } from 'react-icons/io';
import { HiCurrencyRupee } from 'react-icons/hi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import dummyImg from '../../assets/images/dummy.jpg'
import dummyImg2 from '../../assets/images/unisex.svg'
import dummyImg3 from '../../assets/images/size.svg'
import { motion } from "framer-motion"
import InfiniteScroll from "react-infinite-scroll-component";

const Body = () => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/merchandise?" +
        new URLSearchParams({
          page: page,
        })
    );
    const data = await response.json();
    console.log(data);

    setItems([...items, ...data.merchandise]);

    setPage(page + 1);
    if (data.length === 0) setHasMore(false);
  };

  const optionsSize = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'X-Large' }
  ]
  const optionsCombo = [
    { value: 'combo1', label: 'Combo 1' },
    { value: 'combo2', label: 'Combo 2' },
    { value: 'combo3', label: 'Combo 3' }
  ]
  const dummyString = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim explicabo cum nam consequuntur saepe provident dolorum eveniet ipsa fugiat tempore, sint harum blanditiis sunt accusantium deleniti commodi numquam exercitationem.';
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #343D4C',
      borderRadius: '32px',
      padding: '6px 16px',
      '&:hover': {
        border: state.isFocused ? '1px solid #343D4C' : '1px solid #343D4C',
        backgroundColor: '#fff',
        cursor: 'pointer'
      },
      backgroundColor: '#D7FDFF',
      color: '#343D4C',
      fontFamily: 'fredoka',
      '@media (max-width: 375px)': {
        padding: '3px 8px',
        fontSize: '12px',
      },
      '@media (max-width: 200px)': {
        display: 'none'
      },
      innerHeight: '100%',
      '&:focus': {
        backgroundColor: '#fff',
        color: '#343D4C'
      }
      
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#a8b2c3' : state.isFocused ? '#cbd1db' : null,
      color: state.isSelected ? '#343D4C' : state.isFocused ? '#343D4C' : null,
      '&:hover': {
        cursor: 'pointer'
      },
      '&:active': {
        backgroundColor: '#343D4C',
        color: '#343D4C'
      },
      fontFamily: 'fredoka'
    }),
    menuList: (base) => ({
      ...base,
      padding: '0'
    }),
    singleValue: (base) => ({
      ...base,
      color: '#343D4C',
      fontFamily: 'fredoka'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#343D4C',
      fontFamily: 'fredoka'
    }),
    indicatorSeparator: (base) => ({
      ...base,
      color: '#343D4C'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#343D4C'
    })
  }
  const arr = [0,1,2,3,4,5,6,7,8,9,10,11]
  
  const handleVClick = (e) => {
    console.log(e)
  }
  const cardVariants = {
    offscreen: {
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };


  return (
    <div className='flex flex-col space-y-3'>
      {/* filter */}
      <div className='filters flex md:flex-row flex-col-reverse justify-center lg:justify-evenly items-center py-5 lg:space-x-52 md:space-x-20 md:space-y-0 mx-3'>
        <div className='flex space-x-5 mt-5 md:mt-0 items-center justify-center'>
          <Select styles={customStyles} placeholder="Size" options={optionsSize}/>
          <Select styles={customStyles} placeholder="Combo" options={optionsCombo}/>
        </div>
        <div className='flex justify-center focus-within:bg-white hover:bg-white space-x-5 h-full items-center md:px-5 pl-5 md:w-auto w-auto mx-4 pr-10 py-2 border-black border rounded-[32px] text-xl'>
          <label htmlFor='search'>
            <AiOutlineSearch className='hover:cursor-pointer'/>
          </label>
          <input className='bg-transparent focus:outline-none text-lg w-full' id='search' placeholder='Search..' type="text" />
        </div>
      </div>

      {/* merch mx-5 lg:mx-28 md:mx-10 xl:mx-40 590 787 */ }

      <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          // loader={
          //   <h4 className="text-center font-secondary my-8">Loading...</h4>
          // }
        >
{/*  w-11/12 mdlg1:w-9/12 mdlg2:w-7/12 mdlg3:w-1/2  mx-auto*/}
      <motion.div className='merch grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-5 md:w-11/12 md:mx-auto gap-10 items-center'>
        {arr.map((i,idx)=>{return <motion.div initial="offscreen" whileInView="onscreen" viewport={{once:true, amount:0.1}} id={i} key={i} variants={cardVariants} className={`${i} hover:shadow-5xl hover:bg-white group hover:scale-105 transition-all merch-items md:max-w-sm flex flex-col justify-center items-start border space-y-2 rounded-3xl p-3 border-black`}>
          <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
            <div className='relative w-full'>
              <img className='w-full h-full rounded-xl' src={dummyImg} alt="" />
              <div className='absolute top-1 right-2 w-fit flex justify-center -space-x-1 items-center text-xs rounded-2xl font-semibold bg-white py-1 pl-2 pr-3'>
                <img src={dummyImg2} alt="" className='scale-75' /><span className='text-xs font-secondary'>Unisex</span>
              </div>
            </div>
          </div>
          <div className='m-2'><p className='font-secondary font-black text-[28px] leading-[34px]'>{dummyString.slice(0,20)}</p></div>
          <div className='flex justify-center items-center py-2 pl-2 pr-3 bg-white rounded-4xl text-xs space-x-1 place-items-start font-secondary group-hover:border-[#26B7FB] border-[#D7FDFF] border transition-all'><span className='p-0.5'><img src={dummyImg3} alt="" /></span><p>Available Sizes: <span className='font-sm font-bold'>S, M, L, XL, XXL</span></p></div>
          <div className='flex justify-center items-center py-2 pl-2 pr-3 bg-white rounded-4xl space-x-1 text-sm font-secondary group-hover:border-[#26B7FB] border-[#D7FDFF] border transition-all'><span className=' '><HiCurrencyRupee className='text-xl'/></span><p className='text-sm font-black'>499</p></div>
          <div className='w-full'><button className='bg-[#26B7FB] w-full justify-center rounded-4xl py-3 text-white font-secondary flex items-center space-x-2 hover:bg-[#00A3EF]'><span className='font-semibold'>Buy Now </span><span className='text-xs'><FaExternalLinkAlt/></span></button></div>
        </motion.div>}) }
        {/* <IoMdResize/> */}


        {/* <div className='merch-items md:max-w-xs flex flex-col justify-center items-center border space-y-2 rounded-3xl p-3 border-black'>
          <div className='relative object-cover w-fit object-center'>
            <img className=' rounded-xl' src={dummyImg} alt="" />
            <div className='absolute top-1 right-2 flex text-xs space-x-1 rounded-2xl bg-white p-1'><img src={dummyImg2} alt="" /><span>Unisex</span></div>
          </div>
          <div className='m-2'><p className='font-secondary'>{dummyString.slice(0,100)}. <span className='font-bold hover:cursor-pointer'>view more</span></p></div>
          <div className='flex justify-center items-center p-2 bg-white rounded-xl text-xs space-x-3  place-items-start'><span className='p-0.5 bg-black text-white'><IoMdResize/></span><p>Available Sizes: <span>S, M, L, XL, XX</span></p></div>
          <div className='flex justify-center items-center p-2 bg-white rounded-xl space-x-2'><span className=' '><HiCurrencyRupee/></span><p className='text-sm'>499</p></div>
          <div className='w-full'><button className='bg-[#26B7FB] w-full justify-center rounded-2xl py-3 text-white font-secondary flex items-center space-x-2'><span className='font-semibold'>Buy Now </span><span className='text-xs'><FaExternalLinkAlt/></span></button></div>

        </div> */}

      </motion.div>
      </InfiniteScroll>
    </div>
  )
}

export default Body
