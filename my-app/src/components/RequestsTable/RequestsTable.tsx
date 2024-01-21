import React from 'react';
import { Table } from 'react-bootstrap';
import Request from "../../models/encryptDecryptRequest";
import Button from '../Button/Button.tsx';

import './RequestsTable.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks.ts';
import { updateModeratorReq } from '../../store/encryptDecryptRequestList/thunks.ts';

interface Props {
    requests: Request[]
    isModerator?: boolean
}

const convertNumDateToView = (date: number | undefined) => {
    return date ? new Date(date).toString() : '';
}

const RequestsTable = ({ requests, isModerator }: Props) => {
    const navigate = useNavigate()
    const handleKnowMoreButtonClick = (id: number) => () => (navigate(`/requests/${id}`));

    const dispatch = useAppDispatch()
    const onFinishClick = (id: number) => () => (dispatch(updateModeratorReq({ id, action: 'finish' })))
    const onRejectClick = (id: number) => () => (dispatch(updateModeratorReq({ id, action: 'reject' })))

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Номер заявки</th>
                    {isModerator && <th>Пользователь</th>}
                    <th>Статус</th>
                    <th>Время создания</th>
                    <th>Время формирования</th>
                    <th>Время завершения</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {requests.map((req) => (
                    <tr key={req.id}>
                        <td>{req.id}</td>
                        {isModerator && <td>{req.creator}</td>}
                        <td>{req.status}</td>
                        <td>{convertNumDateToView(req.creationDate)}</td>
                        <td>{convertNumDateToView(req.formDate)}</td>
                        <td>{convertNumDateToView(req.finishDate)}</td>
                        <td><Button text='Подробнее' onClick={handleKnowMoreButtonClick(req.id)} /> </td>
                        {isModerator && req.status === 'formed' &&
                            <>
                                <td><Button text='Подтвердить' onClick={onFinishClick(req.id)} /> </td>
                                <td><Button text='Отменить' onClick={onRejectClick(req.id)} /> </td>
                            </>
                        }
                    </tr>
                ))}
            </tbody>
        </Table >
    );
}

export default RequestsTable;
