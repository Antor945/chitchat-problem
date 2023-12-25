import React, { useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlineMessage, AiOutlineSetting, AiOutlineLogout, AiOutlineNotification } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { IoCloudUploadOutline } from "react-icons/io5";
import GroupList from './GroupList/GroupList';
import Friends from './Friends/Friends';
import UserList from './UserList/UserList';
import FriendRequst from './FriendRequst/FriendRequst';
import MyGroup from './MyGroup/MyGroup';
import BlockUser from './BlockUser/BlockUser';
import { userLoginInfo } from '../../Slices/UserSlice';
const Home = () => {
    const auth = getAuth();
    const dispatch = useDispatch()
    const [verify, setVerify] = useState(false)
    const navigate = useNavigate();

     //console.log(antor,'data');
    const data = useSelector((state => state.userLoginInfo.userInfo));

    console.log(data, 'home');
    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    }, [])

 

    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
            setVerify(true);
            dispatch(userLoginInfo(user));
            localStorage.setItem('userLoginInfo', JSON.stringify(user))
        //     dispatch((user.user))
        //    localStorage.setItem('userLoginInfo', JSON.stringify(user))
        }

    });


    const HandleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login')
            localStorage.removeItem('userLoginInfo')

        }).catch((error) => {
        });
    }
    return (
        <>
            {
                verify ?
                    <div className='container-xl '>
                        <div className='flex gap-[43px]'>
                            <div className='w-[300px]  h-screen'>
                                <div className='bg-[#5F35F5] flex flex-col  rounded-[20px] justify-center gap-[60px] mx-auto '>
                                    <div className='d-flex mt-10' >
                                        <div className=' flex flex-col items-center relative'>
                                            <picture>
                                                <img className='h-[100px] w-[100px] rounded-full x-auto ' src={data.photoURL} alt="" />
                                            </picture>
                                            <Link className='h-[100px] w-[100px] bg-overlay rounded-full absolute
                                            flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer 'to='/ImgUplod'>
                                                <IoCloudUploadOutline className='text-[30px] text-slate-50' />
                                            </Link>
                                            <h2 className=' text-white mt-3  text-[20px] font-Nunito font-semibold'>
                                                {
                                                    data.displayName
                                                }
                                            </h2>
                                        </div>
                                    </div>
                                    <div className='mx-auto relative'>
                                        <AiOutlineHome className='text-[46px] text-white cursor-pointer ' />
                                    </div>
                                    <div className='mx-auto'>
                                        <AiOutlineMessage className='text-[46px] text-white cursor-pointer' />
                                    </div>
                                    <div className='mx-auto'>
                                        <AiOutlineNotification className='text-[46px] text-white cursor-pointer' />
                                    </div>
                                    <div className='mx-auto'>
                                        <AiOutlineSetting className='text-[46px] text-white cursor-pointer' />
                                    </div>
                                    <div className='mx-auto pb-5'>
                                        <AiOutlineLogout onClick={HandleSignOut} className='text-[46px] cursor-pointer text-white' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-[20px]'>
                                <GroupList />
                                <UserList />
                                <Friends />
                                <FriendRequst />
                                <MyGroup />
                                <BlockUser />
                            </div>
                        </div>
                    </div>
                    :
                    <div className='bg-[#5F35F5] h-screen w-full flex justify-center items-center'>
                        <div className=' flex flex-col gap-5 text-center'>
                            <div>
                                <h1 className=' text-white  text-[30px] font-Nunito font-semibold'>please verify your email</h1>
                            </div>
                            <div>
                                <button className=' text-white bg-red-600 px-[50px] py-2  text-[30px]
                               font-Nunito font-semibold rounded-full'>
                                    <Link to="/login">Back to Login </Link>
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Home