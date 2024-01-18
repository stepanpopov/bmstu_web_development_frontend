import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useDataService = () => useSelector((state: RootState) =>
    (state.data.ds)
)

export const useLoading = () => useSelector((state: RootState) => (state.data.loading))
