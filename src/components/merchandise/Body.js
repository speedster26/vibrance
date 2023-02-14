import React, { useEffect, useState } from "react";
import Select from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaExternalLinkAlt } from "react-icons/fa";
import altImg from "../../assets/images/Placeholder.png";
import dummyImg2 from "../../assets/images/unisex.svg";
import dummyImg3 from "../../assets/images/size.svg";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../utils/Spinner";
import ReactImageFallback from "react-image-fallback";

const Body = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/merchandise?" +
        new URLSearchParams({
          query: search,
          page: page,
        })
    );
    const data = await response.json();
    console.log(data.merchandise);
    if (data.merchandise.length == 0) {
      if (search != "") {
        setItems([]);
      }
      setHasMore(false);
    } else {
      setItems([...items, ...data.merchandise]);
      setHasMore(true);
      setPage(data.next_page);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const optionsSize = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "X-Large" },
  ];
  const optionsCombo = [
    { value: "combo1", label: "Combo 1" },
    { value: "combo2", label: "Combo 2" },
    { value: "combo3", label: "Combo 3" },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "1px solid #343D4C",
      borderRadius: "32px",
      padding: "6px 16px",
      "&:hover": {
        border: state.isFocused ? "1px solid #343D4C" : "1px solid #343D4C",
        backgroundColor: "#fff",
        cursor: "pointer",
      },
      backgroundColor: "#D7FDFF",
      color: "#343D4C",
      fontFamily: "fredoka",
      "@media (max-width: 375px)": {
        padding: "3px 8px",
        fontSize: "12px",
      },
      "@media (max-width: 200px)": {
        display: "none",
      },
      innerHeight: "100%",
      "&:focus": {
        backgroundColor: "#fff",
        color: "#343D4C",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#a8b2c3"
        : state.isFocused
        ? "#cbd1db"
        : null,
      color: state.isSelected ? "#343D4C" : state.isFocused ? "#343D4C" : null,
      "&:hover": {
        cursor: "pointer",
      },
      "&:active": {
        backgroundColor: "#343D4C",
        color: "#343D4C",
      },
      fontFamily: "fredoka",
    }),
    menuList: (base) => ({
      ...base,
      padding: "0",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#343D4C",
      fontFamily: "fredoka",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#343D4C",
      fontFamily: "fredoka",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      color: "#343D4C",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#343D4C",
    }),
  };
  const cardVariants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      setPage(1);
      fetchData();
    }
  }
  function handleBlur() {
    setPage(1);
    fetchData();
  }
  return (
    <div className="flex flex-col space-y-3">
      {/* filter */}
      <div className="filters flex md:flex-row flex-col-reverse justify-center lg:justify-evenly items-center py-5 lg:space-x-52 md:space-x-20 md:space-y-0 mx-3">
        <div className="flex space-x-5 mt-5 md:mt-0 items-center justify-center">
          <Select
            styles={customStyles}
            placeholder="Size"
            options={optionsSize}
          />
          <Select
            styles={customStyles}
            placeholder="Combo"
            options={optionsCombo}
          />
        </div>
        <div className="flex justify-center focus-within:bg-white hover:bg-white space-x-5 h-full items-center md:px-5 pl-5 md:w-auto w-auto mx-4 pr-10 py-2 border-black border rounded-[32px] text-xl">
          <label htmlFor="search">
            <AiOutlineSearch className="hover:cursor-pointer" />
          </label>
          <input
            className="bg-transparent focus:outline-none text-lg w-full font-secondary"
            id="search"
            placeholder="Search.."
            type="text"
            value={search}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* merch mx-5 lg:mx-28 md:mx-10 xl:mx-40 590 787 */}

      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Spinner color={"#26B7FB"} bgColor={"#D7FDFF"} />}
      >
        {/*  w-11/12 mdlg1:w-9/12 mdlg2:w-7/12 mdlg3:w-1/2  mx-auto*/}
        <motion.div className="merch grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-5 md:w-11/12 md:mx-auto gap-10 items-center">
          {items.map((item, index) => {
            return (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                id={index}
                key={index}
                variants={cardVariants}
                className={`hover:shadow-5xl hover:bg-white group hover:scale-105 transition-all merch-items md:max-w-sm flex flex-col justify-center items-start border space-y-2 rounded-3xl p-3 border-black`}
              >
                <div className="flex justify-center w-full object-cover object-center hover:cursor-pointer">
                  <div className="relative w-full">
                    <ReactImageFallback
                      src={
                        item.image
                          ? "https://vitvibrance.onrender.com" + item.image
                          : altImg
                      }
                      fallbackImage={altImg}
                      initialImage={altImg}
                      alt={item.title}
                      className="w-full h-full rounded-xl"
                    />
                    <div className="absolute top-1 right-2 w-fit flex justify-center -space-x-1 items-center text-xs rounded-2xl font-semibold bg-white py-1 pl-2 pr-3">
                      <img src={dummyImg2} alt="" className="scale-75" />
                      <span className="text-xs font-secondary">Unisex</span>
                    </div>
                  </div>
                </div>
                <div className="m-2">
                  <p className="font-secondary font-black text-[28px] leading-[34px]">
                    {item.title}
                  </p>
                </div>
                <div className="flex justify-center items-center py-2 pl-2 pr-3 bg-white rounded-4xl text-xs space-x-1 place-items-start font-secondary group-hover:border-[#26B7FB] border-[#D7FDFF] border transition-all">
                  <span className="p-0.5">
                    <img src={dummyImg3} alt="" />
                  </span>
                  <p>
                    Sizes:{" "}
                    <span className="font-sm font-bold">
                      S, M, L, XL, XXL, XXXL
                    </span>
                  </p>
                </div>
                <div className="flex justify-center items-center py-2 pl-2 pr-3 bg-white rounded-4xl space-x-1 text-sm font-secondary group-hover:border-[#26B7FB] border-[#D7FDFF] border transition-all">
                  <span className=" ">
                    <HiCurrencyRupee className="text-xl" />
                  </span>
                  <p className="text-sm font-black">{item.cost}</p>
                </div>
                <div className="w-full">
                  <button className="bg-[#26B7FB] w-full justify-center rounded-4xl py-3 text-white font-secondary flex items-center space-x-2 hover:bg-[#00A3EF]">
                    <span className="font-semibold">Buy Now </span>
                    <span className="text-xs">
                      <FaExternalLinkAlt />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
          {/* <IoMdResize/> */}
        </motion.div>
      </InfiniteScroll>
    </div>
  );
};

export default Body;
