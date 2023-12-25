import React, { useEffect, useState } from 'react'
import { RxDotsVertical } from "react-icons/rx";
import GroupImg from '../../../assets/GroupImg.png'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const FriendRequst = () => {

    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo.user)

    const [friendRequst, setfriendRequst] = useState([])

    useEffect(() => {
        const FriendRequst = ref(db, 'FriendRequst/');
        onValue(FriendRequst, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                // if (item.val().reciverid == data.uid) {
                //     arr.push(item.val());                    // problem.........................
                // }
                arr.push({ ...item.val(), id: item.key });
            })
            setfriendRequst(arr)
        });
    }, [])

    //  console.log(friendRequst);

    const HandleAccept = (item) => {
        set(push(ref(db, 'Friend/')), {
            ...item
        }).then(() => {
            remove(ref(db, 'FriendRequst/' + item.id))
        })
    }

    return (
        <div className='w-[344px] h-[451px] flex flex-col gap-[43px] overflow-y-scroll'>
            <div className='p-[13px] rounded-[20px] shadow-boxShadow flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-[20px] font-semibold font-Poppins'>friendRequst</h2>
                    <RxDotsVertical className='text-[19px] text-primary' />
                </div>
                {
                    friendRequst.map((item) => (
                        <div>
                            <div className='flex justify-around items-center'>
                                <div className='w-[70px] h-[70px] rounded-full'>
                                    <picture>
                                        <img src={GroupImg} alt="" />
                                    </picture>
                                </div>
                                <div>
                                    <h2 className=' font-Poppins text-[#000] font-semibold'>{item.SenderName}</h2>
                                    <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                </div>
                                <div>
                                    <button onClick={() => HandleAccept(item)} className=' px-5 bg-primary text-white text-[20px] rounded-lg'>accept</button>
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

export default FriendRequst