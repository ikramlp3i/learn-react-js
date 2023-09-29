import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import HeaderComponent from "../../components/header-components/HeaderComponent";
import UserReduxCreateDialogComponent from "../../components/user-redux-dialog-components/UserFormReduxDialogComponent";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import { getUsers, deleteUser, titleUser, findUser } from "../../redux/actions/users";
import { deleteUserAsync, findUserAsync, getUsersAsync } from "../../redux/services/users";

function UserReduxDialogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetUsers();
  }, []);
  
  const handleGetUsers = async () => {
    const res = await getUsersAsync();
    dispatch(getUsers(res));
  }
  
  const handleDeleteUser = async ( userId ) => {
    await deleteUserAsync(userId);
    dispatch(deleteUser({ id: userId }));
    Swal.fire("Berhasil", "Data berhasil dihapus");
  };

  const handleFormAddOpen = () => {
    dispatch(findUser(null));
    dispatch(titleUser('Create User'))
    setIsOpen(true);
  }

  const handleFormEditOpen = async (userId = null) => {
    const res = await findUserAsync(userId);
    dispatch(findUser(res));
    dispatch(titleUser('Edit User'))
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <HeaderComponent />
      <Container className="pt-3">
        <Row>
          <Col xl="12">
            <Button onClick={handleFormAddOpen}>Create</Button>
          </Col>
          <Col xl="12">
            <UserReduxCreateDialogComponent
              isOpen={isOpen}
              onClose={handleFormClose}
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
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleFormEditOpen(user.id)}
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

export default UserReduxDialogPage;
