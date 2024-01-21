import DataServiceList from "../../components/DataServiceList/DataServiceList.tsx";
import { Container } from 'react-bootstrap';
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useEffect, useState } from 'react';
import { SetPage } from "../../models/common.ts";
import { ToastContainer, toast } from "react-toastify";
import { dataServiceListActions, useError, useSuccessAddToDraft } from "../../store/dataServiceList";
import { useAppDispatch } from "../../store";

interface Props {
    setPage: SetPage
}

const DataServiceListPage = ({ setPage }: Props) => {
    useEffect(() => {
        setPage()
    }, [])

    const [searchValue, setSearchValue] = useState('')


    const dispatch = useAppDispatch()
    const error = useError()
    const successAddToDraft = useSuccessAddToDraft()

    useEffect(() => {

        if (error) {
            toast.warn(error)
            dispatch(dataServiceListActions.resetError())
        }
    }, [error])

    useEffect(() => {
        if (successAddToDraft) {
            toast.success('Added to draft')
            dispatch(dataServiceListActions.resetSuccess())
        }
    }, [successAddToDraft])

    return (
        <Container>
            <Container>
                <ToastContainer position="top-center" newestOnTop={false} />
                <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                <DataServiceList searchValue={searchValue} />
            </Container>
        </Container>
    );
};

export default DataServiceListPage;
