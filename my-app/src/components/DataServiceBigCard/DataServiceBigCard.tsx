import './DataServiceBigCard.css'
import {DataService} from '../../models/models.ts'
import { Card, Container, Image } from 'react-bootstrap';

export interface DataServiceBigCardProps {
    ds: DataService,
}

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/binary.png';
}

const DataServiceBigCard = ({ds}: DataServiceBigCardProps) => {
    return (
        <Container className="page_card">
            { ds.active ?
            <Container>
                <div>
                    <Card.Title className = 'page_card_title'>{ds.name}</Card.Title>
                    <div className = 'page_card_id'>  ID: {ds.id} </div>
                    <div className = 'page_blob' style={{ width: '100%' }}>{ds.blob}</div>
                    <div className = 'page_card_encode'> {ds.encode ? 'Данные зашифрованы' : 'Данные расшифрованы'} </div>
                </div>
            <Image src={ds.image} alt='' style={{width: '40%', height: '40%'}} onError={handlerImgError}/>
            </Container> :
            <h2>Данные удалены</h2>
            }
        </Container>
    );
};

export default DataServiceBigCard;
