import { useSelector } from "react-redux";
import { RootState } from "../types";
import DataService from "../../models/dataService";

export const useDataService = () => useSelector((state: RootState) => 
    (state.data.ds)
)

export const useLoading = () => useSelector((state: RootState) => (state.data.loading))

export const useDataServices = ():DataService[] => useSelector((state: RootState) => 
    (Object.entries(state.dataList.entities).map(([_, ds]) => ds))
)

export const useDataServiceByID = (id: number) => useSelector((state: RootState) => state.dataList.entities[id])
