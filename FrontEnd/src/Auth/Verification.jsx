import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

export function Verification() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const verifyAccount = async () => {
        if (!verificationCode.trim()) {
            setError('Please enter the verification code');
            return;
        }

        try {
            const res = await axios.put('http://localhost:3000/confirmVerification', {
                email: email,
                verification: verificationCode
            });

            if (res.data !== 'Incorrect verification code') {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                if (res.data.user.step === 0) {
                    navigate('/feed/all');
                } else {
                    navigate('/profile-picture', {state: {id: res.data.user._id}});
                }
            } else {
                setError('Incorrect verification code');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } catch (err) {
            console.log(err);
            setError('An error occurred. Please try again.');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verify Your Account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                                    disabled
                                    value={email}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                                Verification Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="verificationCode"
                                    name="verificationCode"
                                    type="text"
                                    required
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter verification code"
                                />
                            </div>
                        </div>

                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                        <div>
                            <button
                                type="button"
                                onClick={verifyAccount}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verify Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={goBack}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaArrowLeft className="mr-2" />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}