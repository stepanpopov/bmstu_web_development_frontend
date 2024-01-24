import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Request, { Status } from "../../models/encryptDecryptRequest";
import Button from '../Button/Button.tsx';

import './RequestsTable.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks.ts';
import { updateModeratorReq } from '../../store/encryptDecryptRequestList/thunks.ts';

interface Props {
    requests: Request[]
    isModerator?: boolean
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

const convertNumDateToView = (date: number | undefined) => {
    return date ? new Date(date).toLocaleString() : '';
}

const RequestsTable = ({ requests, isModerator }: Props) => {
    const navigate = useNavigate()
    const handleKnowMoreButtonClick = (id: number) => () => (navigate(`/requests/${id}`));

    const dispatch = useAppDispatch()
    const onFinishClick = (id: number) => () => (dispatch(updateModeratorReq({ id, action: 'finish' })))
    const onRejectClick = (id: number) => () => (dispatch(updateModeratorReq({ id, action: 'reject' })))

    return (
        <Table striped bordered hover style={{marginBottom: '3%', marginTop: '3%'}}>
            <thead>
                <tr>
                    <th>Номер заявки</th>
                    {isModerator && <th>Пользователь</th>}
                    <th>Статус</th>
                    <th>Время создания</th>
                    <th>Время формирования</th>
                    <th>Время завершения</th>
                    <th>Код исправления ошибок</th>
                    <th>Посчитанные результаты</th>
                    <th></th>
                    {isModerator && <th style={{width: '100%'}} ></th>}
                </tr>
            </thead>
            <tbody>
                {requests.map((req) => (
                    <tr key={req.id}>
                        <td>{req.id}</td>
                        {isModerator && <td>{req.creator}</td>}
                        <td>{convertStatusToView(req.status)}</td>
                        <td>{convertNumDateToView(req.creationDate)}</td>
                        <td>{convertNumDateToView(req.formDate)}</td>
                        <td>{convertNumDateToView(req.finishDate)}</td>
                        <td>{req.encoding}</td>
                        <td>{req.resultCounter}</td>
                        <td className='text-center'><Button text='Подробнее' onClick={handleKnowMoreButtonClick(req.id)} /> </td>
                        {isModerator && req.status === 'formed' &&
                            <Container>
                                <Button variant='success' text='Подтвердить' onClick={onFinishClick(req.id)} /> 
                                <Button variant='outline-dark' text='Отменить' onClick={onRejectClick(req.id)} />
                            </Container>
                        }
                    </tr>
                ))}
            </tbody>
        </Table >
    );
}

export default RequestsTable;
