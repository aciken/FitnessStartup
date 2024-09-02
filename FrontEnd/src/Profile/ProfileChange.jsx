import { useState } from "react";
import { ProfilePage } from "./ProfilePage";

export function ProfileChange() {
    return (
        <div className="min-h-[100vh] w-full relative">
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Change Information</h2>
                        <p className="mb-4">Here you can add the form or content for changing the information.</p>
                        <button
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
                <ProfilePage/>

        </div>
    )
}