
import React, { useState } from "react";

function RegistrationForm() {

  // Store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: ""
  });

  // Store validation errors
  const [errors, setErrors] = useState({});

  // Store success message
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear previous error for changed field
    setErrors({
      ...errors,
      [name]: ""
    });

    setSuccess("");
  };

  // Validate all form fields
  const validateForm = () => {

    let newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Enter a valid first name";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Enter a valid last name";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile number validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
    ) {
      newErrors.password =
        "Include uppercase, lowercase and a number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must contain at least 5 characters";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.city.trim())) {
      newErrors.city = "Enter a valid city name";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Registration completed successfully!");

      console.log("Registration Data:", formData);
    } else {
      setSuccess("");
    }
  };

  // Reset form
  const handleReset = () => {

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
      address: "",
      city: ""
    });

    setErrors({});
    setSuccess("");
  };

  return (
    <div className="registration-container">

      <div className="registration-card">

        <h1>Registration Form</h1>

        <p className="subtitle">
          Please fill in your details to create an account
        </p>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-grid">

            {/* First Name */}
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10-digit number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
              />
              {errors.mobile && (
                <span className="error">{errors.mobile}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <span className="error">{errors.dob}</span>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
              {errors.gender && (
                <span className="error">{errors.gender}</span>
              )}
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>

            {/* City */}
            <div className="form-group full-width">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="button-group">

            <button type="submit" className="submit-btn">
              Register
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default RegistrationForm;
