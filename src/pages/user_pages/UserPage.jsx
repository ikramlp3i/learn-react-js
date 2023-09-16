import { Fragment, useEffect, useState } from 'react';
import { Container, Table, Button, Card, Form } from 'react-bootstrap';
import HeaderComponent from '../../components/header_component/HeaderComponent';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL_API = 'http://localhost:8000';

const UserPage = () => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState({
      first_name: '',
      last_name: '',
      username: ''
    });
    const [ID, setID] = useState(0);

    useEffect(() => {
      getUser();
    }, [])

    const getUser = () => {
      axios.get(`${URL_API}/users`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log('err')
          console.log(err)
        })  
    }

    const removeFormUser = () => {
      setData({
        first_name: '',
        last_name: '',
        username: ''
      })
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value
      })
    };

    const handleSubmit = () => {
      axios.post(`${URL_API}/users`, data)
      .then((res) => {
        setUser([...user, res.data]);
        removeFormUser();
        Swal.fire("Berhasil", "Berhasil tambah data", "success")
      })
    }

    const handleDelete = (userId) => {
      axios.delete(`${URL_API}/users/${userId}`)
      .then(() => {
        getUser();
        Swal.fire("Berhasil", "Berhasil hapus data", "success")
      })
    }

    const handleEdit = (userId) => {
      axios.get(`${URL_API}/users/${userId}`)
      .then((res) => {
        const resData = res.data;
        setData({
          first_name: resData.first_name,
          last_name: resData.last_name,
          username: resData.username
        })
        setID(userId)
      })
    }

    const handleEditSubmit = () => {
      axios.put(`${URL_API}/users/${ID}`, data)
      .then(() => {
        getUser();
        removeFormUser();
        Swal.fire("Berhasil", "Berhasil ubah data", "success")
      })
    }

    return (
    <Fragment>
        <HeaderComponent />
        <Container>
          <Card>
            <Card.Header>Create User</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    name="first_name" 
                    placeholder="Enter First Name"
                    value={data.first_name}
                    onChange={handleInputChange} 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    name="last_name" 
                    value={data.last_name}
                    placeholder="Enter Last Name" 
                    onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    name="username" 
                    value={data.username}
                    placeholder="Enter Username" 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button 
                onClick={ID > 0 ? handleEditSubmit : handleSubmit}
              >
                Submit
              </Button>
            </Card.Footer>
          </Card>
          <Card className='mt-5'>
            <Card.Header>Data Users</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    user.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.username}</td>
                        <td>
                          <Button 
                            variant='danger' 
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                          <Button 
                            variant='primary' 
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </Fragment>
    )
}

export default UserPage;