import './DataServiceBigCard.css'
import {DataService} from '../../models/models.ts'
import { Card } from 'react-bootstrap';

export interface DataServiceBigCardProps {
    ds: DataService,
}

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/binary.png';
}

const DataServiceBigCard = ({ds}: DataServiceBigCardProps) => {
    return (
        <Card className="page_card">
            { ds.active ?
            <Card.Body>
                <div>
                    <Card.Title className = 'page_card_title'>{ds.name}</Card.Title>
                    <div className = 'page_card_id'>  ID: {ds.id} </div>
                    <div className = 'page_blob' style={{ width: '100%' }}>{ds.blob}</div>
                    <div className = 'page_card_encode'> {ds.encode ? 'Данные зашифрованы' : 'Данные расшифрованы'} </div>
                </div>
            <Card.Img src={ds.image} alt='' style={{width: '70%', height: '70%'}} onError={handlerImgError}/>
            </Card.Body> :
            <h2>Данные удалены</h2>
            }
        </Card>
    );
};

export default DataServiceBigCard;
