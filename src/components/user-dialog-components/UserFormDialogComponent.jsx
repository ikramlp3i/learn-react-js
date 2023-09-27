import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8000";

const UserCreateDialogComponent = ({
  isOpen,
  onClose,
  title,
  userID,
  onGetUsers,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });

  useEffect(() => {
    resetForm();
    if (isOpen && userID > 0) {
      handleUpdate(userID);
    }
  }, [isOpen]);

  const handleUpdate = (userId) => {
    axios.get(`${API_URL}/users/${userId}`).then((response) => {
      const data = response.data;
      console.log("userId");
      console.log(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post(`${API_URL}/users`, formData).then((response) => {
      resetForm();
      onGetUsers();
      onClose();

      Swal.fire("Berhasil", "Data berhasil ditambahkan");
    });
  };

  const handleUpdateSubmit = () => {
    axios.put(`${API_URL}/users/${userID}`, formData).then((response) => {
      resetForm();
      onGetUsers();
      onClose();

      Swal.fire("Berhasil", "Data berhasil diubah");
    });
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      username: "",
    });
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      dialogClassName="modal-dialog modal-lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="email"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onClose}>
          Close
        </Button>
        <Button onClick={userID > 0 ? handleUpdateSubmit : handleSubmit}>
          {userID > 0 ? "Update User" : "Create User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateDialogComponent;
