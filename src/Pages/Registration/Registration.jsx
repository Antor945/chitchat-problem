import React, { useState } from 'react'
import registration from '../../assets/Registration.png'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { PiEye, PiEyeSlash } from 'react-icons/pi'
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => {
    const db = getDatabase();

    const auth = getAuth();

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState('')

    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState('')

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const [ShowPassword, SetShowPassword] = useState(false);

    const HandleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr("")
    }

    const HandleName = (e) => {
        setName(e.target.value);
        setNameErr("")
    }

    const HandelePassword = (e) => {
        setPassword(e.target.value);
        setPasswordErr('')
    }


    const HandleSumbmit = () => {
        if (!email) {
            setEmailErr("please give me email !");
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('You have entered an invalid email address!');
            }
        }

        if (!name) {
            setNameErr("please give me name !");
        }

        if (!password) {
            setPasswordErr("password is required");
        } else if (!/(?=.*[a-z])/.test(password)) {
            setPasswordErr("1 lowercase alphabetical character")
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordErr("1 uppercase alphabetical character")
        } else if (!/(?=.*[0-9])/.test(password)) {
            setPasswordErr(" 1 numeric character")
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPasswordErr("  at least one special character")
        } else if (!/(?=.{8,})/.test(password)) {
            setPasswordErr("The string must be eight characters or longer")
        }
        if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: '../../assets/antor.jpg'
                    }).then(() => {
                      // console.log(user);
                        toast.success("Registration Succees. Please verify your Email");
                        setEmail('');
                        setName('');
                        setPassword('');
                        setTimeout(() => {
                            navigate('/Login')
                        }, 1000)
                    }).then(() => {
                       // console.log(user.user.displayName, 'ok cool');
                       // console.log(user.user.uid);

                        set(ref(db, 'users/ ' + user.user.uid), {
                            username: user.user.displayName,
                            email: user.user.email,
                        });
                    }).catch((error) => {
                            const errorCode = error.code;
                            if (errorCode.includes('auth/email-already-in-use')) {
                                setEmailErr('Email is already use !');
                            }
                        })
                })
        }
    }

    return (

        <div>
            <div className='md:flex items-center'>
                <div className='md:w-1/2 flex justify-center'>
                    <div>
                        <ToastContainer
                            position="top-center"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                        <div>
                            <h2 className='font-Nunito font-bold text-[34.4px] text-praimary'>
                                Get started with easily register</h2>
                            <p className='font-Nunito text-[20.6px] font-medium text-[#8d8a8a] mt-4 mb-[39px]'>
                                Free register and you can enjoy it</p>

                        </div>
                        <div className=' relative mb-[70px] w-[300px]'>
                            <input onChange={HandleEmail} value={email} type="email" placeholder='enter your email' className='pl-[52px] pr-[62px] py-[26px]
                        rounded-lg border-[#797878] border-[2px] outline-none' />
                            {
                                emailErr && <p className=' font-Nunito text-[14px] text-white
                                font-normal py-2 text-center  bg-red-500 w-full mt-1 absolute rounded'>{emailErr}</p>
                            }
                            <p className='text-Nunito text-praimary font-semibold text-[13px] bg-white px-5
                        absolute top-0 left-12 mt-[-17px] outline-none'> Email Address</p>
                        </div>
                        <div className=' relative mb-[64px] w-[300px]'>
                            <input onChange={HandleName} value={name} type="name" placeholder='enter your full name' className='pl-[52px] pr-[62px] py-[26px]
                        rounded-lg border-[#797878] border-[2px] outline-none' />
                            {
                                nameErr && <p className=' font-Nunito text-[14px] text-white
                                font-normal py-2 text-center  bg-red-500 w-full mt-1 absolute rounded'>{nameErr}</p>
                            }
                            <p className='text-Nunito text-praimary font-semibold text-[13px] bg-white px-5
                        absolute top-0 left-12 mt-[-17px] outline-none'> Full name</p>
                        </div>
                        <div onChange={HandelePassword} className=' relative mb-[55px] w-[300px]'>
                            <input value={password} type={ShowPassword ? "text" : "password"} placeholder='enter your password'
                                className='pl-[52px] pr-[62px] py-[26px]
                        rounded-lg border-[#797878] border-[2px] outline-none w-full' />
                            {
                                ShowPassword ?
                                    <PiEye onClick={() => SetShowPassword(!ShowPassword)} className=' absolute top-8 right-[30px]' />
                                    :
                                    <PiEyeSlash onClick={() => SetShowPassword(!ShowPassword)} className=' absolute top-8 right-[30px]' />
                            }
                            {
                                passwordErr && <p className=' font-Nunito text-[14px] text-white
                                font-normal py-2 text-center  bg-red-500 w-full mt-1 absolute rounded'>{passwordErr}</p>
                            }
                            <p className='text-Nunito text-praimary font-semibold text-[13px] bg-white px-5
                        absolute top-0 left-12 mt-[-17px] outline-none'> Password</p>
                        </div>
                        <div className='w-[300px]'>
                            <button onClick={HandleSumbmit} className='bg-[#5F35F5] py-5 px-[100px] w-full rounded-full
                          text-white  text-xl font-Nunito font-semibold'>Sign Up</button>
                        </div>
                        <div className='flex ml-10 items-center'>
                            <p className='font-sans text-praimary font-medium text-[13px]'>Already  have an account ?</p>
                            <Link className='font-bold text-[#EA6C00]' to='/login'>Login</Link>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <div>
                        <picture>
                            <img className='w-full h-screen  object-cover' src={registration} alt="" />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration