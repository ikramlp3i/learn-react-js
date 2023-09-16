import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import HeaderComponent from '../../components/header_component/HeaderComponent';

const UserCreatePage = () => {
    return (
    <Fragment>
        <HeaderComponent />
        
        <Container>
            <h2>User Create</h2>
        </Container>
      </Fragment>
    )
}

export default UserCreatePage;