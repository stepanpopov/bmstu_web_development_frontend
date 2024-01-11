import { useSelector } from "react-redux";
import { RootState } from "../types";
import DataService from "../../models/dataService";

export const useDataService = () => useSelector((state: RootState) => 
    (state.data.ds)
)

export const useLoading = () => useSelector((state: RootState) => (state.data.loading))
