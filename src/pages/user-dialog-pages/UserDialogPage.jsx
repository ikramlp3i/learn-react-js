import React, { useState, useEffect, Fragment } from "react";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import UserCreateDialogComponent from "../../components/user-dialog-components/UserFormDialogComponent";
import HeaderComponent from "../../components/header-components/HeaderComponent";

const API_URL = "http://localhost:8000";

function UserDialogPage() {
  const [users, setUsers] = useState([]);

  const [userID, setUserID] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Title");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(`${API_URL}/users`).then((response) => {
      setUsers(response.data);
    });
  };

  const handleDelete = (userId) => {
    axios.delete(`${API_URL}/users/${userId}`).then(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      Swal.fire("Berhasil", "Data berhasil dihapus");
    });
  };

  const handleOpen = (userId = null) => {
    setIsOpen(true);
    setTitle("Create User");
    setUserID(null);
    if (userId) {
      setTitle("Edit User");
      setUserID(userId);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <HeaderComponent />
      <Container className="pt-3">
        <Row>
          <Col xl="12">
            <Button onClick={handleOpen}>Create</Button>
          </Col>
          <Col xl="12">
            <UserCreateDialogComponent
              isOpen={isOpen}
              title={title}
              userID={userID}
              onClose={handleClose}
              onGetUsers={getUsers}
            />

            <Card>
              <Card.Header>User List</Card.Header>
              <Card.Body>
                <Table>
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
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleOpen(user.id)}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default UserDialogPage;
