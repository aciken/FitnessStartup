import { HomePage } from "../MainPage/HomePage"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";

export function SetupStep3() {

    const navigate = useNavigate();

    const skipSetup = () => {
        axios.put('http://localhost:3000/skipSetup', {
            email: JSON.parse(localStorage.getItem('user')).user.email
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/feed/home')
    }).catch((err) => {
        console.log(err)
    })
    }

    const finishSetup = () => {
        axios.put('http://localhost:3000/finishSetup', {
            email: JSON.parse(localStorage.getItem('user')).user.email
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/feed/home')
        }).catch((err) => {
            console.log(err)
        }
        )
    }


    return (
        <div className="min-h-[100vh] w-full relative">
                <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white w-[500px] h-[500px]  p-4 rounded shadow-lg relative">
                    <button onClick={() => skipSetup()} className="font-poppins font-medium text-base absolute top-4 right-2 text-gray-400 underline hover:text-gray-600 ">Skip for now</button>
                        <h2 className="text-xl mb-4">Let's Set up your profile</h2>
                        <p>This is the popup content.</p>
                        <button onClick={() => finishSetup()} className="px-4 py-1 bg-blue-500 text-white rounded-md absolute right-2 bottom-2 text-lg font-poppins font-base hover:bg-blue-600">Finish</button>
                        <button onClick={() => navigate('/setup/exercise')} className="px-4 py-1 bg-blue-500 text-white rounded-md absolute left-2 bottom-2 text-lg font-poppins font-base hover:bg-blue-600">Back</button>
                    </div>
                </div>
                {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage/>}
        </div>
    );
}