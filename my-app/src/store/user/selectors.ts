import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useUser = () => useSelector((state: RootState) => 
    (state.user.user)
)

export const useError = () => useSelector((state: RootState) => (state.user.error))

export const useLoading = () => useSelector((state: RootState) => (state.user.loading))
