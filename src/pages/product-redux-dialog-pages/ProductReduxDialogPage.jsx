import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import HeaderComponent from "../../components/header-components/HeaderComponent";
import ProductReduxCreateDialogComponent from "../../components/product-redux-dialog-components/ProductFormReduxDialogComponent";
import { Container, Card, Button, Table, Row, Col, Image } from "react-bootstrap";
import { getProducts, deleteProduct, titleProduct, findProduct } from "../../redux/actions/products";
import { deleteProductAsync, findProductAsync, getProductsAsync } from "../../redux/services/products";

function ProductReduxDialogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetProducts();
  }, []);
  
  const handleGetProducts = async () => {
    const res = await getProductsAsync();
    dispatch(getProducts(res));
  }
  
  const handleDeleteProduct = async ( productId ) => {
    await deleteProductAsync(productId);
    dispatch(deleteProduct({ id: productId }));
    Swal.fire("Berhasil", "Data berhasil dihapus");
  };

  const handleFormAddOpen = () => {
    dispatch(findProduct(null));
    dispatch(titleProduct('Create Product'))
    setIsOpen(true);
  }

  const handleFormEditOpen = async (productId = null) => {
    const res = await findProductAsync(productId);
    dispatch(findProduct(res));
    dispatch(titleProduct('Edit Product'))
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
            <ProductReduxCreateDialogComponent
              isOpen={isOpen}
              onClose={handleFormClose}
              />

            <Card>
              <Card.Header>Product List</Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td><Image src={product.image_url} width={'100px'} fluid></Image></td>
                        <td>{product.description}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleFormEditOpen(product.id)}
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

export default ProductReduxDialogPage;
