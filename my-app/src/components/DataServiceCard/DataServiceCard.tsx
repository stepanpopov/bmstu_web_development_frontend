import './DataServiceCard.css'
import DataService from "../../models/dataService";
import { Button, Card, Container } from 'react-bootstrap';

import {useAppDispatch} from "../../store";
import { addToDraft } from '../../store/dataServiceList'

const img = new URL('/binary.png', import.meta.url).href

export interface DataServiceCardProps {
    ds: DataService,
    onClick?: (id: number) => void,
    draftButtonExists?: boolean
}

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = img;
}

const DataServiceCard = ({ds, onClick, draftButtonExists}: DataServiceCardProps) => {

    let onClickHandler = undefined;
    if (onClick) {
        onClickHandler = () => onClick(ds.id)
    }

    const dispatch = useAppDispatch()
    const handleAddToDraft = () => dispatch(addToDraft(ds.id))

    return (
        <Card className="card">
            { ds.active ?
            <Container>
            <Card.Img src={ds.image} alt='' style={{width: '100%', height: '100%'}} onError={handlerImgError} />
                <Card.ImgOverlay>
                    <Card.Body>
                        <div onClick={onClickHandler}>
                            <Card.Title className = 'card_title'>{ds.name}</Card.Title>
                            <div className = 'card_id'>  ID: {ds.id} </div>
                            <div style={{ width: '100%' }}>{ds.blob}</div>
                        </div>
                        {draftButtonExists && 
                            <Button variant="primary" type="submit" className="w-100 mt-4" onClick={handleAddToDraft}
                                        style={{borderRadius: '10px'}}>
                                    Добавить в Корзину
                            </Button>
                        }
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
