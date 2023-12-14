import {useLocation} from 'react-router-dom';

const DataServicePage = () => {
    let {state} = useLocation()
    let {ds} = state
    return (
        <div>
            <div className = 'title'> {ds.name} </div>
            <div> ID: {ds.id} </div>
            <div style={{ width: '100%' }}>{ds.blob}</div> 
        </div>
    );
};

export default DataServicePage;
