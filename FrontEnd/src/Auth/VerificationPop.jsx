import GoogleLogo from '../../Assets/Images/GoogleLogo.png'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'


export function VerificationPop() {

    const location = useLocation()

    const navigate = useNavigate()

    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('')

    console.log()

    const verifyAccount = async () => {
        console.log('clciked')
        await axios.put('http://localhost:3000/confirmVerification', {
            email: location.state.email,
            verification: verificationCode
        }
        ).then(res => {
            if (res.data !== 'Incorrect verification code') {
                localStorage.setItem('user', JSON.stringify(res.data));
                if(res.data.user.step == 0){
                navigate('/feed/home');
                } else {
                    navigate('/setup/food');
                }
            } else {
                setError('Incorrect verification code');
                setTimeout(() => {
                    setError('');
                }, 2000);
            }
        }).catch(err => {
            console.log(err)
        })
    }






    return(

        <div className='w-[420px] h-[480px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100'>
            <div className=" w-full h-full relative flex flex-col items-center gap-12   blur-0 border border-gray-400 drop-shadow-lg bg-white p-4 rounded-xl">
            <h1 className="font-poppins font-semibold text-gray-600 text-2xl">Verify Account</h1>
            <div className='flex flex-col space-y-2 items-center'>
                <input onChange={(e) => setVerificationCode(e.target.value) }  type="text" placeholder="Email" className="border border-gray-300 rounded-lg p-2 w-80" />
                <button onClick={() => verifyAccount()} className='bg-blue-500 w-80 h-10 rounded-full text-white font-poppins font-medium text-lg hover:bg-blue-600'>Submit</button>
                <h1 className='text-base font-poppins font-semibold text-blue-400'>{error}</h1>
            <button onClick={() => navigate('/signup')} className='absolute top-0 right-2 mt-0 font-poppins font-medium text-lg'>x</button>

                </div>
        </div>
        </div>


    )

}

