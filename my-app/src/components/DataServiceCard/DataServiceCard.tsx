import './DataServiceCard.css'
import {DataService} from '../../models/models.ts'
import { Card } from 'react-bootstrap';

export interface DataServiceCardProps {
    ds: DataService,
    onClick: (id: number) => void,
}

const DataServiceCard = ({ds, onClick}: DataServiceCardProps) => {
    return (
        <Card className="card">
            <Card.Body>
                <Card.Img src={ds.image} alt=''/>
                <div onClick={() => onClick(ds.id)}>
                    <Card.Title className = 'card_title'>{ds.name}</Card.Title>
                    <div className = 'card_id'>  ID: {ds.id} </div>
                    <div style={{ width: '100%' }}>{ds.blob}</div> 
                </div>
            </Card.Body>
        </Card>
    );
};

/*<div className='delete' onClick={deleteHandler}>
                    <img src="/static/img/delete.png" />
                </div>*/

export default DataServiceCard;
