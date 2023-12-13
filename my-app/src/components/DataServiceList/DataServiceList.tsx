import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import {DataService} from "../../models/models.ts";
import { Button, Spinner } from "react-bootstrap"
import filterDataList from "../../modules/filterDataServices.ts";
import { dataServicesMock } from "../../Consts.tsx";

const DataServiceList = () => {
    const [dataServices, setDataServices] = useState<DataService[]>(dataServicesMock);  

    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('')

    const navigate = useNavigate()

    const fetchDSList = async () => {
        const dsList: DataService[] = await filterDataList(searchValue);
        setDataServices(dsList)
        setLoading(false)
    };

    useEffect(() => {
        fetchDSList();
    }, [searchValue])

    return (
        <div>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

            <div className="cards">
                <div className="inputField">
                    <input value={searchValue} onChange={(event => setSearchValue(event.target.value))}/>
                </div>
                
                {dataServices.map((ds) => (
                    <DataServiceCard 
                        ds={ds}
                        onClick={(id) => (navigate(`service/${id}`, {state: {ds: ds}}))}
                    />
                ))}
            </div>
        </div>
    );
};

export default DataServiceList;
