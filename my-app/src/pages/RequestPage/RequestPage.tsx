import { useParams } from 'react-router-dom';
import { SetPageTitleLink } from '../../models/common';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { getReqByID, removeFromDraft, useLoading, useReqWithDSByID } from '../../store/encryptDecryptRequestList';
import { Loader } from '../../components/Loader/Loader';
import { Container } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import DataServiceCard from '../../components/DataServiceCard/DataServiceCard';
import RequestCard from '../../components/RequestCard/RequestCard';

interface Props {
    setPage: SetPageTitleLink
}

const RequestPage = ({ setPage }: Props) => {
    const { id } = useParams<{ id: string }>();
    const requestID = parseInt(id!)

    useEffect(() => {
        setPage(`/requests/${id}`, `Заявка ${id}`)
    }, [])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getReqByID(requestID))
    }, [requestID])

    const { request, dsList } = useReqWithDSByID(requestID)

    const handleRemoveFromDraft = (id: number) => () => dispatch(removeFromDraft(id))
    const childButtonDS = (isDraft: boolean, id: number) =>
        (isDraft ? <Button text={'Удалить из заявки'} onClick={handleRemoveFromDraft(id)} /> : undefined)

    const loading = useLoading()

    if (loading || !request) {
        return <Loader />
    }

    return (
        <>
            <RequestCard request={request} />
            <Container className={'cards'}>
                {
                    dsList.filter((ds) => (ds.active)).map((ds) => (
                        <>
                            <DataServiceCard
                                ds={ds}
                                imgStyle={{ width: '30%', height: '30%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                childButton={childButtonDS(request.status === "draft", ds.id)}
                            />
                        </>
                    ))
                }
            </Container>
        </>
    );
};

export default RequestPage;
