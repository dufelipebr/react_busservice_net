import React, { useState } from 'react';
import {API_BASE_URL} from '.config.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    email: '', // Add state to store email error message
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    // Update error message on change
    if (event.target.name === 'email') {
      setErrors({
        email: validateEmail(event.target.value) ? '' : 'Invalid email format',
      });
    }
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for validation errors before submitting
    if (!errors.email) {
      console.log('Form Submitted:', formData);

      try {
        const url = `${API_BASE_URL}/cadastro`;
        const response = await axios.post(url, formData); // Replace with your API endpoint
        console.log('API response:', response.data);
        // Handle successful API response (e.g., display success message)
        setFormData({ name: '', email: '', phone: '' }); // Reset form after success
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle API errors (e.g., display error message)
      }

    } else {
      console.error('Form submission failed due to validation errors');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={errors.email ? 'error-input' : ''} // Add error class if validation fails
      />
      <br />
      {errors.email && <span className="error-message">{errors.email}</span>} {/* Display error message */}

      <label htmlFor="phone">Phone: </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <br />

      <button type="submit" disabled={errors.email}>
        Submit
      </button>
    </form>
  );
};

export default UserInfoForm;