'use client'

import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('rasel.learn22@gmail.com');
    const [password, setPassword] = useState('123');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.length === 0) {
            alert("Email Required");
            return;
        } else if (password.length === 0) {
            alert("Password Required");
            return;
        }
        try {
            const response = await fetch('/api/login', {
                method: 'POST', // Use POST method for sending data
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ // Convert data to JSON format
                    email: email,
                    password: password,
                }),
            });

            const jsonResponse = await response.json();
            if (jsonResponse.status === 'success') {
                const token = jsonResponse.tokenValue;
                emailSend(email, token);
                alert("Login success");
            } else {
                alert(jsonResponse.message);
            }
        } catch (error) {
            // Handle network or other unexpected errors
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };


    const emailSend = async (email, token) => {
        try {
            const response = await fetch('/api/email', {
                method: 'POST', // Use POST method for sending data
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ // Convert data to JSON format
                    email: email,
                    token: token,
                }),
            });

            const jsonResponse = await response.json();
            if (jsonResponse.status === 'success') {
                alert("email send");
            } else {
                alert(jsonResponse.message);
            }
        } catch (error) {
            // Handle network or other unexpected errors
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}