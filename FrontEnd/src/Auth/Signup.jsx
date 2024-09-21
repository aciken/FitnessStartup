import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../../Assets/Images/GoogleLogo.png'
import axios from 'axios';
import { useEffect } from 'react';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';



export function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();

    const clientID = '998700739226-o1vqp0lqu98l37tvmmhkm2oo6ibhg4do.apps.googleusercontent.com'

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
    } else if (!email.trim()) {
      setError('Please enter an email');
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email');
    } else if (!password.trim()) {
      setError('Please enter a password');
    } else {
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
                    
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    navigate('/verification', {state: {email: email}})
                }
                console.log(res)

        }
        )
    }
  };


  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: (response) => {
      setData(response);
    },
    onError: (error) => {
      console.log(error);
    },
    clientId: clientID,


  });

    useEffect(
    () => {
        if (data) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${data.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res.data.id);
                    axios.put('http://localhost:3000/signinGoogle', {
                        id: res.data.id,
                        googleMail: res.data.email
                    })
                    .then((res) => {
                      console.log(res.data.user)
                        if(res.data.user.username == ''){
                            navigate('/set-username', {state: {id: res.data.user._id}})
                        } else {
                          localStorage.setItem('user', JSON.stringify(res.data.user))
                          if(res.data.user.step != 1){
                            navigate('/feed/all')
                          } else {
                            navigate('/setup/personal')
                          }
                        }
                        console.log(res.data.user);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    },
    [ data ]
);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup} noValidate>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={GoogleLogo} alt="Google" className="mr-2 h-5 w-5" />
                Continue with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}