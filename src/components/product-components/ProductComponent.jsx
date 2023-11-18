import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ProductComponent(props) {
    const navigate = useNavigate();

    const redirectTo = (path) => {
        navigate(path)    
    }
    return (
        <Card style={{ cursor: 'pointer' }} onClick={() => redirectTo('/product/'+props.data?.id)}>
            <Card.Img variant="top" src={props.data.image_url} />
            <Card.Body>
                <Card.Title>{ props.data.name }</Card.Title>
                <Card.Text>
                    {props.data.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductComponent;