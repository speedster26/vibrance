import React, { useEffect, useState } from 'react'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import manImg from '../../assets/images/man.png'
// import arrow from '../../assets/images/arrow.png'
import { motion } from "framer-motion"
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../utils/Spinner';
import ReactImageFallback from "react-image-fallback";


const Body = () => {

  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [teamNames, setTeamNames] = useState([]);



  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/team?" +
      new URLSearchParams({
        page: page,
      })
    );
    const data = await response.json();
    console.log(data);

    setTeams([...teams, ...data.team]);

    setPage(data.next_page);

    let arr = teamNames
    data.team_names.forEach(e => {
      if (!teamNames.includes(e)) {
        arr.push(e)
        setTeamNames(arr)
      }
    });
    if (data.team.length === 0) {
      setHasMore(false);
    }
  };
  console.log(teams);
  useEffect(() => {
    fetchData();
  }, []);
  const cardVariants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <>
      <InfiniteScroll
        dataLength={teams.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner color={'#26B7FB'} bgColor={'#D7FDFF'} />
        }>
        {teamNames.map((team, index) => {
          return (
            <div key={index} className='flex flex-col md:space-y-6 space-y-6'>
              {/* filter */}

              {/* merch mx-5 lg:mx-28 md:mx-10 xl:mx-40 590 787 */}


              {/*  w-11/12 mdlg1:w-9/12 mdlg2:w-7/12 mdlg3:w-1/2  mx-auto*/}
              {/* <div className='flex'> */}
              <div className='w-10/12 mx-auto'>
                <span className='font-black text-2xl md:text-[40px] md:leading-[48px] font-secondary'>{team}</span>
                {/* </div> */}
              </div>
              <div className='team grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-10/12 mx-auto md:w-11/12 md:mx-auto md:gap-4 gap-10 items-center pb-10'>
                {teams.map((item, idx) => {
                  if (item.team_name === team) return (
                    <motion.div key={idx} initial="offscreen" whileInView="onscreen" viewport={{ once: true }} variants={cardVariants} className={`group hover:scale-105 transition-all team-items md:max-w-sm flex flex-col justify-center items-start space-y-2 md:p-6  rounded-lg border-[#008A93] md:hover:bg-[#008A93]`}>
                      <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
                        <div className='relative w-full'>
                          <ReactImageFallback src={item.image ? "https://vitvibrance.onrender.com" + item.image : manImg} fallbackImage={manImg} initialImage={manImg} alt={item.title} className='w-full md:max-h-72 rounded-lg' />
                          {/* <div className='absolute top-1 right-2 w-fit'>
                      <span className='text-[14px] leading-[10px] text-white font-main font-thin'>figma fanatic</span>
                    </div>
                    <div className='absolute top-7 right-5 w-fit'>
                      <img src={arrow} className='w-8/12' alt="arrow" />
                    </div> */}
                        </div>
                      </div>
                      <div className='flex flex-col w-full -space-y-2 relative'>
                        <div className='flex'><span className='font-secondary text-xl md:text-[32px] md:leading-[39px] font-bold md:group-hover:text-white'>{item.name}</span></div>
                        <div className='flex md:flex-col w-full justify-between md:justify-center md:items-start items-center'>

                          <div className='flex'>
                            <span className='font-secondary text-[14px] leading-[30px] font-normal md:group-hover:text-white/80'>{item.role}</span>
                          </div>
                          <div className='absolute md:static right-0 top-2 flex space-x-3 md:opacity-0 group-hover:opacity-100'>
                            <span className='font-secondary md:text-[20px] text-2xl md:leading-[19px] font-normal p-1 bg-[#008A93]/10 border rounded-full border-[#008A93] md:hover:border-white transition duration-500'><a href={"mailto:" + item.email}><AiOutlineMail className='hover:cursor-pointer text-[#008A93] md:group-hover:text-white' /></a></span>
                            <span className='font-secondary md:text-[20px] text-2xl md:leading-[19px] font-normal p-1 bg-[#008A93]/10 border rounded-full border-[#008A93] md:hover:border-white transition'><a href={"tel:" + item.phone}><AiOutlinePhone className='hover:cursor-pointer text-[#008A93] md:group-hover:text-white' /></a></span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                  else {
                    return null
                  }
                })}
                {/* <IoMdResize/> */}

              </div>
            </div>
          )
        })}
      </InfiniteScroll>
    </>
  )
}

export default Body
