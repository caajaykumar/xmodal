import React, { useState, useEffect, useRef } from "react";

export default function UserDetailsModal() {
  c const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, process the data
      alert('Form submitted successfully!\n\nData:\n' + 
            `Username: ${formData.username}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n` +
            `Date of Birth: ${formData.dateOfBirth}`);
      
      // Reset form and close modal
      setFormData({
        username: '',
        email: '',
        phone: '',
        dateOfBirth: ''
      });
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    initialCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '30px',
      margin: '0 0 30px 0'
    },
    openButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      maxWidth: '500px',
      width: '100%',
      position: 'relative',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      backgroundColor: '#e9ecef',
      padding: '20px',
      borderRadius: '8px 8px 0 0',
      textAlign: 'center'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 15px 0'
    },
    headerButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer'
    },
    modalBody: {
      padding: '30px'
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: '25px',
      margin: '0 0 25px 0'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#555',
      fontWeight: '500',
      marginBottom: '8px',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    inputError: {
      borderColor: '#dc3545'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '4px'
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '15px',
      transition: 'background-color 0.2s'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#666',
      cursor: 'pointer',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      {/* Initial Page */}
      <div style={styles.initialCard}>
        <h1 style={styles.title}>User Details Modal</h1>
        <button
          style={styles.openButton}
          onClick={() => setIsModalOpen(true)}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
         Open Form
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            {/* <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>User Details Modal</h2>
              <button style={styles.headerButton}>
                Open Form
              </button>
            </div> */}

            {/* Modal Body - Form */}
            <div style={styles.modalBody}>
              <h3 style={styles.formTitle}>Fill Details</h3>
              
              <div>
                {/* Username Field */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.username ? styles.inputError : {})
                    }}
                    placeholder="Enter username"
                  />
                  {errors.username && (
                    <div style={styles.errorText}>{errors.username}</div>
                  )}
                </div>

                {/* Email Field */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id ="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <div style={styles.errorText}>{errors.email}</div>
                  )}
                </div>

                {/* Phone Field */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.phone ? styles.inputError : {})
                    }}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <div style={styles.errorText}>{errors.phone}</div>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id='dob'
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.dateOfBirth ? styles.inputError : {})
                    }}
                  />
                  {errors.dateOfBirth && (
                    <div style={styles.errorText}>{errors.dateOfBirth}</div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  style={styles.submitButton}
                  className='submit-button'
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Close button (X) */}
            <button
              onClick={closeModal}
              style={styles.closeButton}
              onMouseOver={(e) => e.target.style.color = '#333'}
              onMouseOut={(e) => e.target.style.color = '#666'}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}