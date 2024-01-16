import { useSelector } from "react-redux";
import { RootState } from "../types";
import DataService from "../../models/dataService";
import { memoize } from 'proxy-memoize';

export const useDataServices = ():DataService[] => useSelector(memoize(({dataList: {entities}}: RootState) => 
    (Object.entries(entities).map(([_, ds]) => ds)))
)

export const useDataServiceByID = (id: number) => useSelector((state: RootState) => state.dataList.entities[id])

export const useLoading = () => useSelector((state: RootState) => (state.dataList.loading))
