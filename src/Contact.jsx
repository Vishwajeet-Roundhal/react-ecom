import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "./styles/Button"

function Contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3005/api/auth/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      if (res.ok) {
        // Handle successful registration
        alert("msg sent thanks:)")
        setContact({
          username:"",
          email:"",
          message:""
        })
        console.log('User registered successfully');
      } else {
        // Handle registration failure
        alert("could not send msg")
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error in registration', error);
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.91455641541671!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1664345115285!5m2!1sen!2sin"
        width="100%"
        height="400"
        title="maps"
        name="maps"
        alt="maps"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-inputs">
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              value={contact.username}
              onChange={handleInput}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={contact.email}
              onChange={handleInput}
            />

            <textarea
              name="message"
              id="message"
              value={contact.message}
              onChange={handleInput}
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"
            ></textarea>

            <Button type="submit" value="send">Submit</Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

export default Contact;
