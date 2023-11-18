import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createProductAsync,
  updateProductAsync,
} from "../../redux/services/products";
import { createProduct, updateProduct } from "../../redux/actions/products";

const ProductCreateReduxDialogComponent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const title = useSelector((state) => state.products.title);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    description: "",
  });

  useEffect(() => {
    resetForm();
    handleFormUpdate();
  }, [isOpen]);

  const handleFormUpdate = async () => {
    if (product?.id)
      setFormData({
        name: product.name,
        image_url: product.image_url,
        description: product.description,
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if( (form.checkValidity() === false)) {
      return setValidated(true);
    }

    const res = await createProductAsync(formData);
    dispatch(createProduct(res));

    resetForm();
    onClose();
    Swal.fire("Berhasil", "Data berhasil ditambahkan");
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if( (form.checkValidity() === false)) {
      return setValidated(true);
    }
    const res = await updateProductAsync(product.id, formData);
    dispatch(updateProduct(res));

    resetForm();
    onClose();
    Swal.fire("Berhasil", "Data berhasil diubah");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image_url: "",
      description: "",
    });
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      dialogClassName="modal-dialog modal-lg"
      centered
    >
      <Form noValidate validated={validated} onSubmit={product?.id ? handleUpdateSubmit : handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Description is required
              </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={onClose}>
            Close
          </Button>
          <Button type="submit">
            {product?.id ? 'Update Product' : 'Create Product'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductCreateReduxDialogComponent;
