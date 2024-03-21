import React, { useState } from "react";
import styled from "styled-components";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3005/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        // Handle successful registration
        alert("User registered successfully")
        setUser({
          username:"",
          email:"",
          phone:"",
          password:""
        })
        console.log('User registered successfully');
      } else {
        // Handle registration failure
        alert("Registration failed")
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error in registration', error);
    }
  };

  return (
    <FormContainer>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInput}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phone">Phone:</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleInput}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInput}
        />
      </FormGroup>
      <Button type="submit">Register</Button>
    </form>
  </FormContainer>
  );
}
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 3.5rem;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  // width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Register;
