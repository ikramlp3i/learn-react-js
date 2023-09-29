import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createUserAsync,
  updateUserAsync,
} from "../../redux/services/users";
import { createUser, updateUser } from "../../redux/actions/users";

const UserCreateReduxDialogComponent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const title = useSelector((state) => state.users.title);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });

  useEffect(() => {
    resetForm();
    handleFormUpdate();
  }, [isOpen]);

  const handleFormUpdate = async () => {
    if (user?.id)
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const res = await createUserAsync(formData);
    dispatch(createUser(res));

    resetForm();
    onClose();
    Swal.fire("Berhasil", "Data berhasil ditambahkan");
  };

  const handleUpdateSubmit = async () => {
    const res = await updateUserAsync(user.id, formData);
    dispatch(updateUser(res));

    resetForm();
    onClose();
    Swal.fire("Berhasil", "Data berhasil diubah");
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
        <Button onClick={user?.id ? handleUpdateSubmit : handleSubmit}>
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateReduxDialogComponent;
