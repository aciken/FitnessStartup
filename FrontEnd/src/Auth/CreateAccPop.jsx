import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'


export function CreateAccPop() {

    const navigate = useNavigate()

    const [error, setError] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }


    const createAccount = async () => {
        await axios.put('http://localhost:3000/createAccount', {
            email: email,
            password: password,
            username: username
        }).then(
            (res) => {
                if(res.data == 'Email already exists'){
                    setError('Email already exists')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                } else if(res.data == 'Username already exists'){ 
                    setError('Username already exists')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                } else {
                    
                    localStorage.setItem('user', JSON.stringify(res.data))
                    navigate('/verification', {state: {email: email}})
                }
                console.log(res)

        }
        )
    }

    return(
        <div className='w-[420px] h-[480px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100'>
            <div className=" w-full h-full relative flex flex-col items-center blur-0 border border-gray-400 drop-shadow-lg bg-white p-4 rounded-xl">
            <h1 className="font-poppins font-semibold text-gray-600 text-2xl">Create your account</h1>
            <div className="mt-12 flex flex-col items-center gap-6">
                <input onChange={(e) => changeUsername(e)} type="text" placeholder="Username" className="border border-gray-300 rounded-lg p-2 w-80" />
                <input onChange={(e) => changeEmail(e)} type="email" placeholder="Email" className="border border-gray-300 rounded-lg p-2 w-80" />
                <input onChange={(e) => changePassword(e)} type="password" placeholder="Password" className="border border-gray-300 rounded-lg p-2 w-80" />
                <div className="w-full text-right">
                    <button onClick={() => createAccount()} className="bg-blue-500 w-80 h-10 rounded-full text-white font-poppins font-medium">Submit</button>
                    <h1 onClick={() => navigate('/signin')} className="font-poppins font-normal ">Already have account? <a href="#" className="text-blue-600 underline hover:text-blue-800">sign in</a></h1>
                </div>
                <h1 className='text-base font-poppins font-medium text-blue-400'>{error}</h1>
            </div>

            <button onClick={() => navigate('/signup')} className="absolute top-0 right-2 mt-0 font-poppins font-medium text-lg rounded-full">x</button>
            </div>
        </div>
    )
}


