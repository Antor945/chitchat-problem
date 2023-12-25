import React, { useEffect, useState } from 'react'
import { RxDotsVertical } from "react-icons/rx";
import GroupImg from '../../../assets/GroupImg.png'
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo.user)
  //  console.log(data.uid);
    const [friend, setfriend] = useState([])

    useEffect(() => {
        const FriendRequst = ref(db, 'Friend/');
        onValue(FriendRequst, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().reciverid == data.uid || item.val().Senderid == data.uid) {
                    arr.push(item.val());
                }
            })
            setfriend(arr)
        });
    }, [])

   // console.log(friend, 'friends');



    return (
        <div className='w-[344px] h-[451px] flex flex-col gap-[43px] overflow-y-scroll'>
            <div className='p-[13px] rounded-[20px] shadow-boxShadow flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-[20px] font-semibold font-Poppins'>Friends</h2>
                    <RxDotsVertical className='text-[19px] text-primary' />
                </div>
                {
                    friend.map((item) => (
                        <div>
                            <div className='flex justify-around items-center'>
                                <div className='w-[70px] h-[70px] rounded-full'>
                                    <picture>
                                        <img src={GroupImg} alt="" />
                                    </picture>
                                </div>
                                <div>
                                    <h2 className=' font-Poppins text-[#000] font-semibold'>
                                        {
                                            item.reciverid == data.uid ? item.SenderName : item.reciverName
                                        }
                                    </h2>
                                    <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                </div>
                                <div>
                                    <button className=' px-3 bg-primary text-white text-[15px] rounded-lg'>Block</button>
                                </div>
                            </div>
                            <div className='h-[1px] bg-slate-400 mt-2'>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Friends