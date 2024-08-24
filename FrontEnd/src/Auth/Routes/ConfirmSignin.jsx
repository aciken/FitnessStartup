import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import {useState} from 'react'

import axios from 'axios'



import { ConfirmPop } from '../ConfirmPop'


export function ConfirmSignin(){

    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState(location.state.email)

    const [password , setPassword] = useState('')

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const signin = async () => {
        await axios.post('http://localhost:3000/signinConfirm', {
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res.data)
            if(res.data != 'Incorrect password'){

                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/home')
            } else {
                console.log('Incorrect password')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>
        <div className={`flex flex-col items-center space-y-2`}>
            <button className='flex flex-row items-center justify-center bg-white h-12 w-80 rounded-full border border-gray-600 shadow-lg p-6 space-x-2 hover:bg-gray-100'>
                <img src={GoogleLogo} className='w-6 h-6' alt="" />
                <h1 className='font-poppins font-medium text-base text-gray-600'>Sign in with Google</h1>
            </button>
            <h1 className="font-poppins font-semibold text-gray-600  text-lg">or</h1>
            <button className='flex flex-row justify-center items-center bg-blue-500 h-12 w-80 rounded-full  shadow-lg p-6 space-x-2 hover:bg-blue-600'>
                <h1 className='font-poppins font-medium text-base text-white'>Sign in</h1>
            </button>
            <div className='pt-8'>
                <h1 className='font-poppins font-semibold text-gray-600  text-lg'>Already have Account?</h1>
                <button className='flex flex-row justify-center items-center border border-blue-500 bg-white h-12 w-80 rounded-full shadow-lg p-6 space-x-2 hover:bg-gray-100 mt-2'>
                    <h1  className='font-poppins font-semibold text-base text-blue-500'>Sign in</h1>
                 </button>
            </div>
        </div>


            <ConfirmPop email={email} changePassword={changePassword} signin={signin} />

       

        
       

    </div>  
    )
}