import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const mailtoLink = `mailto:l201027@lhr.nu.edu.pk?subject=Contact Us Message from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom:%20${name}%0D%0AEmail:%20${email}`;
    window.location.href = mailtoLink;

    alert("You are being redirected to your email client. If it does not open, please check your email client settings or copy the following information and send it manually:\n\n" +
      "To: l201027@lhr.nu.edu.pk\n" +
      `Subject: Contact Us Message from ${name}\n` +
      `Message: ${message}\n` +
      `From: ${name}\n` +
      `Email: ${email}`);

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" value={message} onChange={onChange} required></textarea>
        </div>
        <button type="submit" className="btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
