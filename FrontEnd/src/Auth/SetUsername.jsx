import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { storage } from '../Comp/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export function SetUsername() {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id || '';
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!profilePicture) {
      setError('Please upload a profile picture');
      return;
    }
     await axios.put(`http://localhost:3000/setUsername`, { username, id })
    .then((res) => {
        if(res.data === "Username already taken"){
            setError(res.data);

        } else {
          const imageRef = ref(storage, `profilePictures/${profilePicture.name + v4()}`);
          uploadBytes(imageRef, profilePicture).then(() =>{
            getDownloadURL(imageRef).then((url) => {
              axios.put(`http://localhost:3000/updateProfilePicture`, { id, profilePicture: url })
              .then((res) => {
                console.log(res.data)
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/setup/food');
              })
            })
          })

        }
    })
    .catch((err) => {
        console.log(err);
    })

    }
  



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Continue Setup
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1 flex justify-center">
                <div 
                  className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
                  onClick={handlePictureClick}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <FaPlus className="text-gray-400 text-3xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlus className="text-white text-3xl" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

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

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
