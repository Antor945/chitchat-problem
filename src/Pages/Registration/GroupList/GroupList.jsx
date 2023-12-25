import React from 'react'
import { FaSearch } from "react-icons/fa";
import { RxDotsVertical } from "react-icons/rx";
import GroupImg from '../../../assets/GroupImg.png'

const GroupList = () => {
    return (
        <div className='w-[344px] h-[451px] flex flex-col gap-[43px] overflow-y-scroll'>
            <div className='flex bg-white justify-between items-center py-[23px] px-5 shadow-boxShadow rounded-xl absolute'>
                <div className='flex items-center gap-9'>
                    <FaSearch />
                    <input className='px-[10px] outline-none' type="search" placeholder='Search' />
                </div>
                <RxDotsVertical className='text-[19px] text-primary' />
            </div>
            <div className='p-[13px] rounded-[20px] shadow-boxShadow flex flex-col gap-4 mt-16'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-[20px] font-semibold font-Poppins'>Groups List</h2>
                    <RxDotsVertical className='text-[19px] text-primary' />
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
                <div>
                    <div className='flex justify-around items-center'>
                        <div className='w-[70px] h-[70px] rounded-full'>
                            <picture>
                                <img src={GroupImg} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>Friends Reunion</h2>
                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                        </div>
                        <div>
                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>Join</button>
                        </div>
                    </div>
                    <div className='h-[1px] bg-slate-400 mt-2'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupList