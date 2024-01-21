import DataServiceList from "../../components/DataServiceList/DataServiceList.tsx";
import { Container, Row } from 'react-bootstrap';
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useEffect, useState } from 'react';
import { SetPage } from "../../models/common.ts";
import { ToastContainer, toast } from "react-toastify";
import { dataServiceListActions, useError, useSuccessAddToDraft } from "../../store/dataServiceList";
import { useAppDispatch } from "../../store";
import MyButton from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user/selectors.ts";

interface Props {
    setPage: SetPage
    moderatorNewDSPageLink: string
}

const DataServiceListPage = ({ setPage, moderatorNewDSPageLink }: Props) => {
    useEffect(() => {
        setPage()
    }, [])

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useAppDispatch()
    const error = useError()
    const successAddToDraft = useSuccessAddToDraft()
    const navigate = useNavigate()
    const user = useUser()

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
                <Row className="justify-content-md-center">
                    <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                    {user?.role === 'moderator' &&
                        <MyButton text='Добавить новую услугу' onClick={() => (navigate(moderatorNewDSPageLink))} />
                    }
                </Row>
                <DataServiceList searchValue={searchValue} />
            </Container>
        </Container>
    );
};

export default DataServiceListPage;
