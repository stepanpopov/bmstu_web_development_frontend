import DataServiceList from "../../components/DataServiceList/DataServiceList.tsx";
import { Container, Row, Button, Image, Col } from 'react-bootstrap';
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useEffect, useState } from 'react';
import { SetPage } from "../../models/common.ts";
import { ToastContainer, toast } from "react-toastify";
import { dataServiceListActions, filterDataListByName, useError, useSuccessAddToDraft } from "../../store/dataServiceList";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useDraftID } from "../../store/encryptDecryptRequestList/selectors.ts";
import { useUser } from "../../store/user/selectors.ts";

import {fetchDataListByName} from "../../api/dataService"

interface Props {
    setPage: SetPage
    requestsPageLink: string
}

const draftImg = new URL('/draft.png', import.meta.url).href

const DataServiceListPage = ({ setPage, requestsPageLink }: Props) => {
    const [draftID, setDraftID] = useState<number | null >(null);

    const fetchDraftId = async () => {
        const {draftId} = await fetchDataListByName(searchValue);
        setDraftID(draftId)
    }

    useEffect(() => {
        setPage()
        fetchDraftId()
    }, [])

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useAppDispatch()
    const error = useError()
    const successAddToDraft = useSuccessAddToDraft()

    const user = useUser()

    const onDraftClick = () => (navigate(`${requestsPageLink}/${draftID}`))

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
            fetchDraftId()
        }
    }, [successAddToDraft])

    return (
        <Container>
            {/* <Container> */}
            <ToastContainer position="top-center" newestOnTop={false} />
            <Row style={{ display: "flex", margin: "1% 0% 1% 0%", justifyContent: "start" }}>
                <Col lg={10}>
                    <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                </Col>
                <Col lg={2}>
                    <Button variant="outline-secondary" onClick={onDraftClick} disabled={(draftID === null) || !user} >
                        {/* <Image src={draftImg} style={{ maxWidth: '10%', maxHeight: '10%' }} /> */}
                        Корзина
                    </Button>
                </Col>
            </Row>
            <DataServiceList searchValue={searchValue} />
            {/* </Container> */}
        </Container>
    );
};

export default DataServiceListPage;
