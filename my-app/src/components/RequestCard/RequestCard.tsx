import './RequestCard.css'
import Request from "../../models/encryptDecryptRequest";
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import {useEffect, useState} from "react";
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";

import {useAppDispatch} from "../../store";
import { enqDeqReqListActions, useLoading, useError, useReqsDSListByID, getReqByID, formDraft, removeFromDraft, useReqWithDSByID } from '../../store/encryptDecryptRequestList'
import DataService from '../../models/dataService';
import { Loader } from '../Loader/Loader.tsx';
import { toast } from 'react-toastify';

export interface Props {
    requestID: number
}

const RequestCard = ({ requestID }: Props) => {
    const dispatch = useAppDispatch()

    console.log('req id in card: ', requestID)
    
    useEffect(() => {
        dispatch(getReqByID(requestID))
    }, [requestID])

    const {request, dsList} = useReqWithDSByID(requestID)

    const handleForm = () => dispatch(formDraft(requestID))
    const handleRemoveFromDraft = (id: number) => () => dispatch(removeFromDraft(id))

    const loading = useLoading()

    if (loading || !request) {
        return <Loader/>
    }

    return (
        <Card className="request_card">
            <Card.Header style={{ fontWeight: 'bold', fontSize: '130%' }}>{request.id}</Card.Header>
            <Card.Body>
                <Card.Title>{request.status}</Card.Title>
                <Card.Text>Дата создания заявки: {new Date(request.creationDate).toString() }</Card.Text>
                {request.creator && <Card.Text>Создатель: {request.creator }</Card.Text> }
                {request.formDate && <Card.Text>Дата формированвия заявки: {new Date(request.formDate).toString() }</Card.Text> }
                {request.finishDate && <Card.Text>Дата завершения заявки: { new Date(request.finishDate).toString() }</Card.Text> }
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
                            <DataServiceCard ds={ds} imgStyle={{width: '30%', height: '30%', marginLeft: 'auto', marginRight: 'auto', display: 'block'}}/> 
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
