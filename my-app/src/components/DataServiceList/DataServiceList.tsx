import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import {DataService} from "../../models/models.ts";
import {DOMEN, requestTime, dataServicesMock} from "../../Consts"

const DataServiceList = () => {
    const [dataServices, setDataServices] = useState<DataService[]>([]);  

    const navigate = useNavigate()

    const fetchDataList = async () => {
        try {
            const response = await fetch(`${DOMEN}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                mockDataServices();
                return;
            }

            const dataServices: DataService[] = await response.json()
            setDataServices(dataServices)
        } catch (e) {
            mockDataServices()
        }
    }

    const mockDataServices = () => {
        setDataServices(dataServicesMock)
    }

    useEffect(() => {
        fetchDataList();
    }, [])

    return (
       <div className="cards">
            {dataServices.map((ds) => (
                <DataServiceCard 
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`, {state: {ds: ds}}))}
                />
            ))}
       </div>
    );
};

export default DataServiceList;