import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ProductComponent(props) {
    const navigate = useNavigate();

    const redirectTo = (path) => {
        navigate(path)    
    }
    return (
        <Card style={{ cursor: 'pointer' }} onClick={() => redirectTo('/product/'+props.data?.id)}>
            <Card.Img height={'150px'} variant="top" src={props.data.image_url} />
            <Card.Body>
                <Card.Subtitle style={{textAlign: 'center'}}>{ props.data.name }</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default ProductComponent;