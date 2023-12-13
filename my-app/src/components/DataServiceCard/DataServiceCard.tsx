import './DataServiceCard.css'
import {DataService} from '../../models/models.ts'

export interface DataServiceCardProps {
    ds: DataService,
    onClick: (id: number) => void,
}

const DataServiceCard = ({ds, onClick}: DataServiceCardProps) => {
    const deleteHandler = () => {
        console.log(`delete ${ds.id}`)
    }
    console.log(ds)

    return (
        <div className="card">
            <a>
                <div onClick={() => onClick(ds.id)}>
                    <div className = 'title'> {ds.name} </div>
                    <div> ID: {ds.id} </div>
                    <div style={{ width: '100%' }}>{ds.blob}</div> 
                </div>
            </a>
        </div>
    );
};

/*<div className='delete' onClick={deleteHandler}>
                    <img src="/static/img/delete.png" />
                </div>*/

export default DataServiceCard;
