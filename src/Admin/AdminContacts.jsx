import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provideContext";
import styled from "styled-components";

function AdminContacts() {
  const { isAuthenticated } = useProvider();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const getContacts = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      } else {
        setError("Data not found");
      }
    } catch (error) {
      console.log(error, "error at contacts");
      setError("Data not fetched");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <div>
      <h2>Contacts</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.username}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ErrorMsg = styled.p`
  color: red;
`;

export default AdminContacts;
