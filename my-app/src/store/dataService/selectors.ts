import { useSelector } from "react-redux";
import { RootState } from "../types";
import DataService from "../../models/dataService";
import { memoize } from 'proxy-memoize';

export const useDataService = () => useSelector((state: RootState) => 
    (state.data.ds)
)

export const useLoading = () => useSelector((state: RootState) => (state.data.loading))
