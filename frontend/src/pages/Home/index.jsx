import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './styles.css';
import { Table, Button } from 'react-bootstrap';

export function Home() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [user, setUser] = useState({ name: '', avatar: '' })

  const [users, setUsers] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState();
  
  function clearInput() {
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setUserPassword("");
  }

  function handleAdduser() {
    const newuser = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
    };

    axios.post("http://localhost:8080/users", newuser).then(result => {
      setFlagUpdate(result)
    });

    clearInput()

  }

  function handleDelete(id) {
    axios.delete("http://localhost:8080/users/" + id).then(result => {
      setFlagUpdate(result)
    });
  }

  function handleUpdate(id) {

    const newuser = {
      name: userName,
      email: userEmail,
      phone: userPhone,
    };

    axios.put("http://localhost:8080/users/" + id, newuser).then(result => {
      setFlagUpdate(result)
    });

    clearInput()
  }

  useEffect(() => {
    fetch("https://api.github.com/users/DanielFieni")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/users").then(result => {
      setUsers(result.data)
    })
  }, [flagUpdate])

  return (
    <div className='container'> 
      <header>
        <h1>Spring & React</h1>
        <div>
          <strong>{ user.name }</strong>
          <img src={ user.avatar } alt="Foto de perfil" />
        </div>
      </header>

      <input 
        required
        type="text" 
        placeholder="Digite um nome..." 
        value={ userName }
        onChange={e => setUserName(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="Digite um Email..." 
        value={ userEmail }
        onChange={e => setUserEmail(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="Digite um telefone..." 
        value={ userPhone }
        onChange={e => setUserPhone(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="Digite uma senha..." 
        value={ userPassword }
        onChange={e => setUserPassword(e.target.value)}
      />

      <button type="button" onClick={handleAdduser} className="adicionar">
        Adicionar
      </button>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr key={ user.id }>
              <td>{ user.name }</td>
              <td>{ user.email }</td>
              <td>{ user.phone }</td>
              <td>{ user.password }</td>
              <td>
                <Button variant="danger" onClick={ () => handleUpdate(user.id) }>Atualizar</Button>{' '}
                <Button variant="dark" onClick={ () => handleDelete(user.id) }>Excluir</Button>
                </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
      
    </div>
  )
}