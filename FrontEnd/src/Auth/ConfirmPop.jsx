import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'




export function ConfirmPop() {

    const navigate = useNavigate()

    const location = useLocation()

    const [error, setError] = useState('')

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
            if(res.data == 'Verify'){
                navigate('/verification', {state: {email: email}})

            } else{
                console.log(res.data)
            if(res.data != 'Incorrect Password'){

                console.log('red')
                localStorage.setItem('user', JSON.stringify(res.data))
                console.log(res.data.user.step)
                console.log(res.data.user.step)
                if(res.data.user.step == 0 || res.data.user.step == 2){
                    navigate('/feed/home')
                } else {
                    navigate('/setup/food')
                }
            }
             else {
                setError('Incorrect Password')
                setTimeout(() => {
                    setError('')
                }, 2000)
            }
        }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return(

        <div className='w-[420px] h-[480px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100'>
            <div className=" w-full h-full relative flex flex-col items-center blur-0 border border-gray-400 drop-shadow-lg bg-white p-4 rounded-xl">
            <h1 className="font-poppins font-semibold text-gray-600 text-2xl">Sign in</h1>
            <div className="mt-12 flex flex-col items-center gap-6">
            <input value={email} type="email" placeholder="Email" className="border border-gray-300 rounded-lg p-2 w-80 bg-gray-200 text-gray-400 focus:outline-0 focus:outline-gray-400" readOnly />
                <input onChange={(e) => changePassword(e)}  type="password" placeholder="Password" className="border border-gray-300 rounded-lg p-2 w-80" />
                <div className="w-full text-right">
                    <button onClick={() => signin()}  className="bg-blue-500 w-80 h-10 rounded-full text-white font-poppins font-medium">Submit</button>
                    <h1 onClick={() => navigate('/create-account')} className="font-poppins font-normal ">Don't have account? <a href="#" className="text-blue-600 underline hover:text-blue-800">sign up</a></h1>
                </div>
                <h1 className='text-base font-poppins font-semibold text-blue-400'>{error}</h1>
            </div>

            <button onClick={() => navigate('/signup')} className="absolute top-0 right-2 mt-0 font-poppins font-medium text-lg rounded-full">x</button>
            </div>
        </div>

    )

}

