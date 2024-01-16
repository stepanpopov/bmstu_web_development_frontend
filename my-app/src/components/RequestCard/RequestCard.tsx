import './RequestCard.css'
import Request from "../../models/encryptDecryptRequest";
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";

import {useAppDispatch} from "../../store";
import { enqDeqReqListActions, useLoading, useError, useReqsDSListByID, getReqByID, formDraft, removeFromDraft } from '../../store/encryptDecryptRequestList'
import DataService from '../../models/dataService';
import { Loader } from '../Loader/Loader.tsx';
import { toast } from 'react-toastify';

export interface Props {
    request: Request
}

const RequestCard = ({ request }: Props) => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getReqByID(request.id))
    }, [request])

    const dsList: DataService[] = useReqsDSListByID(request.id)

    const handleForm = () => dispatch(formDraft(request.id))
    const handleRemoveFromDraft = (id: number) => () => dispatch(removeFromDraft(id))

    const loading = useLoading()
    const error = useError()

    useEffect(() => {
        if (error) {
            toast.warn(error)
            dispatch(enqDeqReqListActions.resetError())
        }
    }, [error] )

    if (loading) {
        return <Loader/>
    }

    return (
        <Card className="request_card">
            <Card.Header>{request.id}</Card.Header>
            <Card.Body>
                <Card.Title>{request.status}</Card.Title>
                <Card.Text>Дата создания заявки: {request.creationDate.toDateString() }</Card.Text>
                {request.creator && <Card.Text>Создатель: {request.creator }</Card.Text> }
                {request.formDate && <Card.Text>Дата формированвия заявки: {request.creationDate.toDateString() }</Card.Text> }
                {request.finishDate && <Card.Text>Дата завершения заявки: {request.finishDate.toDateString() }</Card.Text> }
                {request.status === "draft" && <Button variant="primary" 
                        type="submit" 
                        className="w-100 mt-4" 
                        onClick={handleForm}
                        style={{borderRadius: '10px'}}>
                    Cформировать
                </Button>}
            </Card.Body>
            <ListGroup className="list-group-flush">
                {
                    dsList.map((ds) => (
                        <ListGroup.Item>
                            <DataServiceCard ds={ds}/> 
                            {request.status === "draft" && <Button variant="primary" 
                                type="submit" 
                                className="w-100 mt-4" 
                                onClick={handleRemoveFromDraft(ds.id)}
                                style={{borderRadius: '10px'}}>
                                Удалить из заявки
                            </Button>}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>

        </Card>
    );
};

export default RequestCard;
