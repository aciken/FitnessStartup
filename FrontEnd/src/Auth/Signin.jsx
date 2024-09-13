import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../../Assets/Images/GoogleLogo.png'
import axios from 'axios'
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';


export function Signin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clientID = '998700739226-o1vqp0lqu98l37tvmmhkm2oo6ibhg4do.apps.googleusercontent.com'

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter email');
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
      await axios.post('http://localhost:3000/signinEmail', {
        email: email
        })
        .then((res) => {
            console.log(res)
            if(res.data != 'User not found'){
                navigate('/continue-signin', {state: {email: email}})
            } else {
        setError('User not found')
        setTimeout(() => {
                setError('')
            }, 2000)
        }

}).catch((err) => {
    console.log(err)
})

    }
  };

  const handleGoogleSignIn = useGoogleLogin({
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
                    })
                    .then((res) => {
                      console.log(res.data.user)
                        if(res.data.user.username == ''){
                            navigate('/set-username', {state: {id: res.data.user._id}})
                        } else {
                          localStorage.setItem('user', JSON.stringify(res.data.user))
                          if(res.data.user.step != 1){
                            navigate('/feed/home')
                          } else {
                            navigate('/setup/food')
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

  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleEmailSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>

              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
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
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={GoogleLogo} alt="Google" className="mr-2 h-5 w-5" />
                Continue with Google
              </button>
                         {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}