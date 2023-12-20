import './DataServiceCard.css'
import {DataService} from '../../models/models.ts'
import { Card, Container } from 'react-bootstrap';

export interface DataServiceCardProps {
    ds: DataService,
    onClick: (id: number) => void,
}

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/binary.png';
}

const DataServiceCard = ({ds, onClick}: DataServiceCardProps) => {
    return (
        <Card className="card">
            { ds.active ?
            <Container>
            <Card.Img src={ds.image} alt='' style={{width: '200px', height: '200px'}} onError={handlerImgError} />
                <Card.ImgOverlay>
                    <Card.Body>
                        <div onClick={() => onClick(ds.id)}>
                            <Card.Title className = 'card_title'>{ds.name}</Card.Title>
                            <div className = 'card_id'>  ID: {ds.id} </div>
                            <div style={{ width: '100%' }}>{ds.blob}</div>
                        </div>
                    </Card.Body>
                </Card.ImgOverlay> 
            </Container>
            :
            <h2>Данные удалены</h2>
            }
        </Card>
    );
};

export default DataServiceCard;
