import { useParams } from 'react-router-dom';
import { SetPageTitleLink } from '../../models/common';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { getReqByID, removeFromDraft, useLoading, useReqWithDSByID, useDraftID } from '../../store/encryptDecryptRequestList';
import { Loader } from '../../components/Loader/Loader';
import { Container } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import DataServiceCard from '../../components/DataServiceCard/DataServiceCard';
import RequestCard from '../../components/RequestCard/RequestCard';
import { useUser } from '../../store/user';
import DataService from '../../models/dataService';
import { Status } from '../../models/encryptDecryptRequest';

interface Props {
    setPage: SetPageTitleLink
}

const convertStatusToView = (st: Status) => {
    switch (st) {
        case 'draft':
            return 'Черновик'
        case "deleted":
            return "Удалена";
        case "formed":
            return "Сформирована";
        case "finished":
            return "Завершена";
        case "rejected":
            return "Отклонена";
        default:
            return undefined
    }
}

const RequestPage = ({ setPage }: Props) => {
    const { id } = useParams<{ id: string }>();
    const requestID = parseInt(id!)
    const user = useUser()

    useEffect(() => {
        setPage(`/requests/${id}`, `Заявка ${id}`)
    }, [])

    const dispatch = useAppDispatch()

    const { request, dsList } = useReqWithDSByID(requestID)
    // const draftID = useDraftID()

    useEffect(() => {
        dispatch(getReqByID(requestID))
    }, [requestID])

    const handleRemoveFromDraft = (id: number) => () => dispatch(removeFromDraft(id))
    const childButtonDS = (isDraft: boolean, id: number) =>
        (isDraft ? <Button text={'Удалить из заявки'} onClick={handleRemoveFromDraft(id)} /> : undefined)

    const loading = useLoading()

    if (loading || !request) {
        return <Loader />
    }

    const showRes = (ds: DataService) => ds.active && ((user?.role === 'user' && request.status === 'finished') || 
        (user?.role === 'moderator' && (request.status === 'finished' || request.status === 'deleted' || request.status === 'formed')))

    if (request.status === 'deleted') {
        return (
            <h2>
                Заявка удалена
            </h2>
        )
    }

    return (
        <>
            <RequestCard request={request} />
            <Container style={{ marginLeft: '0', marginRight: '0' }} className='cards'>
                {
                    dsList.filter((ds) => (ds.active)).map((ds) => (
                        <>
                            <DataServiceCard
                                cardStyle={{width: '100%', height: '30rem'}}
                                ds={ds}
                                // imgStyle={{ width: '30%', height: '30%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                childButton={childButtonDS(request.status === "draft", ds.id)}
                            >
                                {showRes(ds) ? 
                                <>
                                    <div> </div>
                                    {ds.success && <div style={{fontWeight: 800 }}>Результат:</div>}
                                    <div>{ds.result}</div>
                                    <div style={{fontWeight: 800 }}>Успех: {ds.success ? 'Да' : 'Нет'}</div>
                                </> : undefined
                                }
                            </DataServiceCard>
                        </>
                    ))
                }
            </Container>
        </>
    );
};

export default RequestPage;
