import React, { createRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import Profile from '../../assets/Profile.jpg'
import { getAuth, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';

const ImgUplod = () => {
    const data = useSelector((state => state.userLoginInfo.userInfo));
    const auth = getAuth();
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState('');
    const cropperRef = createRef();
    const storage = getStorage();
    

    const HandleCropImg = (e) => {

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);

    };
    const getCropData = () => {

        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const storageRef = ref(storage, auth.currentUser.uid);

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');

                getDownloadURL(storageRef).then((downloadURL) => {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    })
                    console.log('File available at', downloadURL);
                    navigate('/home')
                    setImage('')
                    setCropData('')
                });
            });
        }
    };

    return (
        <div className='h-screen bg-red-500 flex justify-center items-center'>
            <div className='p-5 bg-white flex flex-col items-center w-[500px]'>
                <h1 className='font-bold text-[34px] text-[#5F35F5] mb-3'>
                    Image upolad
                </h1>
                {
                    image ?
                        <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                            <div className='img-preview w-full h-full'>

                            </div>
                        </div>
                        :
                        <div>
                            <picture>
                                <img className='h-[100px] w-[100px] rounded-full x-auto ' src={data.photoURL} alt="" />
                            </picture>
                        </div>
                }


                <div className='flex flex-col gap-3  items-center'>
                    <div>
                        <input onChange={HandleCropImg} type="file" />
                        {/* <button style={{ float: "right" }} >
                            Crop Image
                        </button> */}

                    </div>
                    {
                        image &&
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            guides={true}
                        />
                    }

                    <div className='flex gap-3'>
                        <button onClick={getCropData} className='text-[#5F35F5] bg-amber-500 w-[100px] px-5 py-3 
                        font-bold text-[15px] mt-3 rounded-lg'>Upload</button>

                        <Link to='/Home' className='text-[#5F35F5] bg-amber-500 px-5 py-3 
                         font-bold text-[15px] mt-3 rounded-lg'> Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgUplod