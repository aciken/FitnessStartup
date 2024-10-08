import GoogleLogo from '../../Assets/Images/GoogleLogo.png'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'


export function SigninPop() {

    const navigate = useNavigate()

    const [error, setError] = useState('')

    const [email, setEmail] = useState('')

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const signinNext = async() => {
        if(email != ''){

        
        await axios.post('http://localhost:3000/signinEmail', {
            email: email
    })
    .then((res) => {
        console.log(res)
        if(res.data != 'User not found'){
            navigate('/confirm-signin', {state: {email: email}})
        } else {
            setError('User not found')
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }).catch((err) => {
        console.log(err)
    })
} else {
    console.log('Email is empty')
}
}



    return(

        <div className='w-[420px] h-[480px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100'>
            <div className=" w-full h-full relative flex flex-col items-center gap-12   blur-0 border border-gray-400 drop-shadow-lg bg-white p-4 rounded-xl">
            <h1 className="font-poppins font-semibold text-gray-600 text-2xl">Welcome Back</h1>
            <div className='flex flex-col space-y-2 items-center'>
                <button className='flex flex-row items-center justify-center bg-white h-12 w-80 rounded-full border border-gray-600 shadow-lg p-6 space-x-2 hover:bg-gray-100'>
                            <img src={GoogleLogo} className='w-6 h-6' alt="" />
                            <h1 className='font-poppins font-medium text-base text-gray-600'>Sign in with Google</h1>
                        </button>
                        <h1 className='font-poppins font-semibold text-lg text-gray-800'>or</h1>
                <input onChange={(e) => changeEmail(e)} type="text" placeholder="Email" className="border border-gray-300 rounded-lg p-2 w-80" />
            </div>
            <div className='flex-col justify-end text-end space-y-2'>
                <button onClick={() => signinNext()} className='bg-blue-500 w-80 h-10 rounded-full text-white font-poppins font-medium text-lg hover:bg-blue-600'>Next</button>
                <h1 className='font-poppins font-normal '>Forgot password? <a href="#" className=' font-poppins font-medium text-blue-600 underline hover:text-blue-900'>restart</a></h1>
            </div>
            <h1 className='text-base font-poppins font-semibold text-blue-400'>{error}</h1>

            <button onClick={() => navigate('/signup')} className='absolute top-0 right-2 mt-0 font-poppins font-medium text-lg'>x</button>

                </div>
        </div>

    )

}

