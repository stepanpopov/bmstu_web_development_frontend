import { useSelector } from "react-redux";
import { RootState } from "../types";
import DataService from "../../models/dataService";

export const useDataServices = ():DataService[] => useSelector((state: RootState) => 
    (Object.entries(state.dataServiceReducer.entities).map(([_, ds]) => ds))
)

export const useDataServiceByID = (id: number) => useSelector((state: RootState) => state.dataServiceReducer.entities[id])
