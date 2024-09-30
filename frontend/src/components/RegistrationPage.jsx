import React, { useState } from 'react'
import './RegistrationPage.css'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && address) {
      await fetch('https://user-address-backend1.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address }),
      });
      setName('');
      setAddress('');
      navigate('/users');
    }
    else {
            alert("Please provide both name and address.");
        }
  }

  return (
      <div className='container'>
        <form  onSubmit={handleSubmit} class = "form-container">
           <input 
            type = "text"
            placeholder='Name'
            value  = {name}
            className = 'name-box'
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input
            type = "text"
            placeholder = "Address"
            value = {address}
            className = 'address-box'
            onChange={(e) => setAddress(e.target.value)}
            required
             />
            
            <button className='button' type = 'submit'>Register</button>
        </form>
      </div>
  )
}

export default Registration

