import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Forgot = () => {

  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
  };

  const handleReset = () => {
    if (!email) {
      setEmailErr('Please enter your email address');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr('email is invalid')
    }
    
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('Ok Cool');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    }
  }


  return (
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      <div className="bg-white w-1/2 p-20">
        <h1 className="font-nunito font-bold text-[34px] text[#11175D]">
          Get started with easily register
        </h1>
        <div className="w-96 relative mt-[60px]">
          <input
            onChange={handleEmail}
            value={email}
            type="text"
            className="w-full py-[26px] px-[50px] border-2 border-[#11175D] rounded-lg"
          />
          <p className="absolute top-[-8px] left-[32px] px-[18px] bg-white  font-nunito font-semibold text-[13px] text-[#11175D] tracking-[1px]">
            Email Address
          </p>
          {emailErr && (
            <p className="bg-red-500 text-white p-1 mt-1 text-base rounded">
              {emailErr}
            </p>
          )}
        </div>
        <div
          className="mt-10"
        >
          <Link onClick={handleReset}
            to=""
            className="rounded bg-primary px-[30px] py-[20px] font-nunito text-[20px] text-white font-semibold "
          >
            Reset
          </Link>
          <Link
            to="/login"
            className="ml-[30px] rounded bg-primary px-[30px] py-[20px] font-nunito text-[20px] text-white font-semibold "
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forgot