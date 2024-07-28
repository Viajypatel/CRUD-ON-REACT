"use client";
import { useState } from 'react';

export default function Home() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [array, setArray] = useState([]);
  const [error, setError] = useState(""); // State for error messages
  const [editIndex, setEditIndex] = useState(null); // State for tracking the index of the item being edited

  // Validate mobile number
  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  // Validate email address
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the mobile number and email address
    if (!validateMobileNumber(mob)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear error message if validation passes
    setError("");

    if (editIndex !== null) {
      // Update the existing item
      const updatedArray = array.map((item, i) =>
        i === editIndex ? { name, email, mob } : item
      );
      setArray(updatedArray);
      setEditIndex(null);
    } else {
      // Add a new item to the array
      setArray([...array, { name, email, mob }]);
    }

    // Clear the form fields
    setName('');
    setEmail('');
    setMob('');
  };

  // Handle item deletion
  const handleDelete = (index) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  // Handle editing an item
  const handleEdit = (index) => {
    const item = array[index];
    setName(item.name);
    setEmail(item.email);
    setMob(item.mob);
    setEditIndex(index);
  };

  // Map over the array to create list items
  const temp = array.map((e, i) => (
    <li key={i} className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>
        <h2>{e.name}</h2>
        <h2>{e.email}</h2>
        <h2>{e.mob}</h2>
      </div>
      <div>
        <button
          onClick={() => handleEdit(i)}
          className='p-2 bg-blue-600 text-white rounded mr-2'
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(i)}
          className='p-2 bg-red-600 text-white rounded'
        >
          Delete
        </button>
      </div>
    </li>
  ));

  return (
    <>
      <div className="bg-black h-16 text-white flex justify-center items-center">
        <h1 className='text-lg font-bold text-2xl font-semibold'>CRUD ON REACT</h1>
      </div>

      <div className='m-2 w-full'>
        <form onSubmit={handleSubmit} className='flex'>
          <div className='flex flex-grow w-2/3 gap-1'>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-black border-2 w-1/3'
              placeholder='Name'
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-black border-2 w-1/3'
              placeholder='Email'
              required
            />
            <input
              type="tel"
              value={mob}
              onChange={(e) => setMob(e.target.value)}
              pattern="[0-9]{10}"
              className='border border-black border-2 w-1/3'
              placeholder='Mobile No.'
              title="Please enter a valid 10-digit mobile number"
              required
            />
          </div>
          <div className='flex flex-none w-1/3 ml-2'>
            <button type="submit" className='p-3 m-1 bg-green-700 rounded'>
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>
        {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
      </div>

      <ul>
        {temp}
      </ul>
    </>
  );
}
