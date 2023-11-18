import React, { useEffect, Fragment } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import HeaderComponent from '../../components/header-components/HeaderComponent';
import { useDispatch, useSelector } from "react-redux";
import { findProductAsync } from "../../redux/services/products";
import { findProduct } from "../../redux/actions/products";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
    const product = useSelector((state) => state.products.product);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const res = await findProductAsync(id);
        dispatch(findProduct(res));

        console.log('product')
        console.log(product)
    };

    return (
    <Fragment>
        <HeaderComponent />
        <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Card>
                    <Card.Img variant="top" src={ product?.image_url } />
                    <Card.Body>
                        <Card.Title>{ product?.name }</Card.Title>
                        <Card.Text>
                            { product?.description }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    </Fragment>
);
}

export default ProductDetailPage;