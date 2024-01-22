import './DataServiceCard.css'
import DataService from "../../models/dataService";
import { Card, Container } from 'react-bootstrap';


const img = new URL('/binary.png', import.meta.url).href

export interface DataServiceCardProps {
    ds: DataService,
    onClick?: (id: number) => void,
    childButton?: JSX.Element
    imgStyle?: React.CSSProperties
    children?: JSX.Element
}

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = img;
}

const DataServiceCard = ({ ds, onClick, imgStyle, childButton, children }: DataServiceCardProps) => {

    let onClickHandler = undefined;
    if (onClick) {
        onClickHandler = () => onClick(ds.id)
    }

    const imgCurStyle = imgStyle ?? { width: '100%', height: '100%' };

    return (
        <Card className="card" style={{width: '70', height: '70'}}>
            {ds.active ?
                <>
                    <Card.Img src={ds.image} alt='' style={imgCurStyle} onError={handlerImgError} />
                    <Card.ImgOverlay style={{width: '70', height: '70'}} >
                        <Card.Body style={{width: '70', height: '70'}}>
                            <div onClick={onClickHandler}>
                                <Card.Title >{ds.name}</Card.Title>
                                <div className='card_id'>  ID: {ds.id} </div>
                                <div style={{ width: '100%' }}>{ds.blob}</div>
                            </div>
                            {children}
                            {childButton}
                        </Card.Body>
                    </Card.ImgOverlay>
                </>
                :
                <h2>Данные удалены</h2>
            }
        </Card>
    );
};

export default DataServiceCard;
