import React, { useState } from 'react'
import login from '../../assets/Login.png'
import Google from '../../assets/Google.png'
import { Link, json, useNavigate, } from 'react-router-dom'
import { PiEye, PiEyeSlash } from 'react-icons/pi'
import { getAuth, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../../Slices/UserSlice'

const Login = () => {

    const disPatch = useDispatch()

    const auth = getAuth();

    const provider = new GoogleAuthProvider();

    const navigate = useNavigate(); //ak page thake onno page e jaite hole useNavigate hook use korte hbe..

    const [Email, setEmail] = useState('');
    const [EmailErr, SetEmailErr] = useState('')

    const [ShowPassword, SetShowPassword] = useState(false);

    const [Password, Setpassword] = useState('');
    const [PasswordErr, SetpasswordErr] = useState('');

    const [loginErr, setLoginErr] = useState('');

    const HandleEmail = (e) => {
        setEmail(e.target.value);
        SetEmailErr('');
    }
    const HandlePassword = (e) => {
        Setpassword(e.target.value);
        SetpasswordErr('');
    }

    const Handleforgot = () => {
        console.log('sgfhash');
        toast.success("please waite");
        navigate('/Forgot');

    }

    const HandleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("Login susccesfully Done");
                setTimeout(() => {
                    navigate('/home');
                }, 1000)

            }).catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }

    const HandleSubmit = () => {
        if (!Email) {
            SetEmailErr('please give me email !');
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
                SetEmailErr('You have entered an invalid email address!');
            }
        }
        if (!Password) {
            SetpasswordErr("password is required");
        } else if (!/(?=.*[a-z])/.test(Password)) {
            SetpasswordErr("1 lowercase alphabetical character")
        }
        else if (!/(?=.*[A-Z])/.test(Password)) {
            SetpasswordErr("1 uppercase alphabetical character")
        } else if (!/(?=.*[0-9])/.test(Password)) {
            SetpasswordErr(" 1 numeric character")
        } else if (!/(?=.*[!@#$%^&*])/.test(Password)) {
            SetpasswordErr("  at least one special character")
        } else if (!/(?=.{8,})/.test(Password)) {
            SetpasswordErr("The string must be eight characters or longer")
        }
        if (Email && Password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)
            && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(Password)) {
            signInWithEmailAndPassword(auth, Email, Password)

                .then((user) => {
                    toast.success("Login susccesfully Done");
                    sendEmailVerification(auth.currentUser)
                    disPatch(userLoginInfo(user.user))
                    localStorage.setItem('userLoginInfo',JSON.stringify(user))
                    setEmail('');
                    Setpassword('');

                    setTimeout(() => {
                        navigate('/home');
                    }, 1000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('auth/invalid-login-credentials')) {
                        setLoginErr('please give right email & password');
                    }

                });
        }
    }
    return (
        <div>
            <div className='md:flex items-center'>
                <div className='md:w-1/2 flex justify-center'>
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
                        <div>
                            <h2 className='font-Nunito font-bold text-[34.4px] text-praimary mb-[50px]'>
                                Login to your account!</h2>
                            {
                                loginErr && <p className=' font-Nunito text-[13px] text-praimary
                                 py-2 text-center font-sans  bg-red-500 font-bold px-4  mt-[-40px] absolute rounded'>{loginErr}</p>
                            }
                        </div>
                        <div onClick={HandleGoogleSignin} className='flex items-center w-[220px] border-gray-500 border-2 rounded-lg
                         gap-3 py-[21px] px-[29px] mb-9 shadow-xl'>
                            <picture>
                                <img src={Google} alt="" />
                            </picture>
                            <h2 className='text-praimary font-sans font-bold text-[13px]'>
                                Login with Google
                            </h2>
                        </div>
                        <div className=' relative mb-[60px] hover:shadow-xl'>
                            <input type="email" value={Email} placeholder='enter your email' onChange={HandleEmail}
                                className='py-[15px] px-5 outline-none border-b-2 border-red-600 w-full ' />
                            {
                                EmailErr && <p className=' font-Nunito text-[14px] text-white
                                font-normal py-2 text-center  bg-red-500 w-full mt-1 absolute rounded'>{EmailErr}</p>
                            }
                            <p className='text-Nunito text-praimary font-semibold text-[13px] bg-white
                             absolute top-0  mt-[-17px] '> Email Address</p>
                        </div>
                        <div className=' relative mb-[50px] hover:shadow-xl'>
                            <input type={ShowPassword ? 'text' : 'password'} value={Password} onChange={HandlePassword} placeholder='enter your password'
                                className='py-[15px] px-5 outline-none border-b-2 border-red-600  w-full' />
                            {
                                PasswordErr && <p className=' font-Nunito text-[14px] text-white
                                font-normal py-2 text-center  bg-red-500 w-full mt-1 absolute rounded'>{PasswordErr}</p>
                            }
                            {
                                ShowPassword ?
                                    <PiEye onClick={() => SetShowPassword(!ShowPassword)} className=' absolute top-5 right-[30px]' />
                                    :
                                    <PiEyeSlash onClick={() => SetShowPassword(!ShowPassword)} className=' absolute top-5 right-[30px]' />
                            }
                            <p className='text-Nunito text-praimary font-semibold text-[13px] bg-white
                           absolute top-0  mt-[-17px] '> password </p>

                        </div>
                        <div className='mb-[38px]'>
                            <button onClick={HandleSubmit} className='bg-[#5F35F5] py-5 px-[125px] rounded-full w-full
                             text-white  text-xl font-Nunito font-semibold'>Login to Continue</button>
                        </div>
                        <div className='flex ml-10 items-center'>
                            <p className='font-sans text-praimary font-medium text-[13px]'>Don’t have an account ?</p>

                            <Link className='font-bold text-[#EA6C00] ' to='/Registration'>Sign Up</Link>
                            
                        </div>
                        <div>
                            <h2 className='font-bold text-center text-[#EA6C00] mt-4'
                                to='/Registration' onClick={Handleforgot}>Forgot Password</h2>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <div>
                        <picture>
                            <img className='w-full h-screen  object-cover' src={login} alt="" />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login