import { Fragment, useEffect } from 'react';
import HeaderComponent from '../../components/header-components/HeaderComponent';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAsync } from '../../redux/services/products';
import { getProducts } from '../../redux/actions/products';
import ProductComponent from '../../components/product-components/ProductComponent';

const HomePage = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetProducts();
    }, []);
    
    const handleGetProducts = async () => {
        const res = await getProductsAsync();
        dispatch(getProducts(res));
    }

    return (
        <Fragment>
            <HeaderComponent />

            <Container>
                <h1>Banner</h1>
                <div>
                    <Row>
                        {
                            products.map((product, index) => (
                                <Col md="2" sm="6" key={index}>
                                    <ProductComponent data={product} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Container>
        </Fragment>
    )
}

export default HomePage;