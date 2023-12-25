import React, { useEffect, useState } from 'react'
import { RxDotsVertical } from "react-icons/rx";
import GroupImg from '../../../assets/GroupImg.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    // const data = useSelector(state => state.userLoginInfo.userInfo.user);
    // const data = useSelector(state => state.userLoginInfo.userInfo.user);
    const data = useSelector(state => state.userLoginInfo.userInfo)
    console.log(data,'data');
    const [userlist, setUserlist] = useState([])
    
    const [userList, SetuserList] = useState([]);
    const [FriendRequstList, setFriendRequstList] = useState([]);
    const [FriendList, setFriendList] = useState([]);
    useEffect(()=>{
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
          snapshot.forEach((item)=>{
            if(data.email != item.val().email){
                arr.push({...item.val(), userid: item.key})
            }
          })
          setUserlist(arr)
        });
        
    },[])

    console.log(userlist,'fhfh');


    // useEffect(() => {
    //     const userRef = ref(db, 'users/');
    //     onValue(userRef, (snapshot) => {
    //         let arr = []
    //         snapshot.forEach((item) => {
    //             console.log(item.val(), 'vjdkfjdf');
    //             console.log(item.key);
    //             if(data.uid != item.key){
    //                 arr.push(item.val()) 
    //             }
    //             // if (data.uid != item.key) {
    //             //     arr.push({ ...item.val(), userid: item.key });
    //             // }
    //         })
    //         SetuserList(arr)
    //     });
    // }, [])
  

    useEffect(() => {
        const FriendRequst = ref(db, 'FriendRequst/');
        onValue(FriendRequst, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().reciverid + item.val().Senderid)
                // console.log(item.val().reciverid+item.val().Senderid);
            })
            setFriendRequstList(arr)
        });
    }, [])

    useEffect(() => {
        const FriendRequst = ref(db, 'Friend/');
        onValue(FriendRequst, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().reciverid + item.val().Senderid)
                //  console.log(item.val());
            })
            setFriendList(arr)
        });
    }, [])
    console.log(FriendList);

    const HandleFriendRequst = (item) => {
        set(push(ref(db, 'FriendRequst/')), {
            SenderName: data.displayName,
            Senderid: data.uid,
            reciverName: item.username,
            reciverid: item.userid
        });
    }


    return (
        <div className='w-[344px] h-[451px] flex flex-col gap-[43px] overflow-y-scroll'>
            <div className='p-[13px] rounded-[20px] shadow-boxShadow flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-[20px] font-semibold font-Poppins'>User list</h2>
                    <RxDotsVertical className='text-[19px] text-primary' />
                </div>
                {/* {
                    userlist.map((item, index)=>(
                        <div key={index}>
                        <h2>name: {item.username}</h2>
                        <p>email: {item.email}</p>
                        </div>
                    ))
                } */}
            
                {
                    userlist.map((item) => (
                        <div>
                            <div className='flex justify-around items-center'>
                                <div className='w-[70px] h-[70px] rounded-full'>
                                    <picture>
                                        <img className=' rounded-full' src={data.photoURL} alt="" />
                                    </picture>
                                </div>
                                <div>
                                    <h2 className=' font-Poppins text-[#000] font-semibold'>{item.username}</h2>
                                    <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                </div>
                                <div>
                                    {
                                        FriendList.includes(item.userid + data.uid)
                                            ||
                                            FriendList.includes(data.uid + item.userid)
                                            ?
                                            <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>friend</button>
                                            :
                                            FriendRequstList.includes(item.userid + data.uid)
                                                ||
                                                FriendRequstList.includes(data.uid + item.userid)
                                                ?
                                                <button className=' px-5 bg-primary text-white text-[20px] rounded-lg'>pending</button>
                                                :
                                                <button onClick={() => HandleFriendRequst(item)} className=' px-5 bg-primary text-white text-[20px] rounded-lg'>+</button>
                                    }
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

export default UserList