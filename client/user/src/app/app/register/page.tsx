"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (message) {
      timeoutId = setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userData = { name, email, phone };

    try {
      const checkResponse = await axios.get(
        "http://localhost:8080/api/v1/wallet",
        {
          params: {
            email,
            phone,
          },
        }
      );

      if (checkResponse.data) {
        setMessage(
          checkResponse.data.exists
            ? "User already exists"
            : "User created successfully"
        );
        if (checkResponse.data.exists) {
          return;
        }
      }

      const createResponse = await axios.post(
        "http://localhost:8080/api/v1/wallet",
        userData
      );
      setMessage("User created successfully");

      setWalletDetails(createResponse.data);

      setName("");
      setEmail("");
      setPhone("");

      console.log("User created:", createResponse.data);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm ml-5">
      <h1 className="dark:text-white text-[35px] flex justify-center item center text-bold">
        Create wallet
      </h1>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
        >
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create User
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default UserForm;
