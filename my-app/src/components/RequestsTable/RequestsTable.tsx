import React from 'react';
import { Table } from 'react-bootstrap';
import Request from "../../models/encryptDecryptRequest";
import Button from '../Button/Button.tsx';

import './RequestsTable.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    requests: Request[]
}

const convertNumDateToView = (date: number | undefined) => {
    return date ? new Date(date).toString() : '';
}

const RequestsTable = ({ requests }: Props) => {
    const navigate = useNavigate()
    const handleKnowMoreButtonClick = (id: number) => () => (navigate(`/requests/${id}`));

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
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
                        <td>{req.status}</td>
                        <td>{convertNumDateToView(req.creationDate)}</td>
                        <td>{convertNumDateToView(req.formDate)}</td>
                        <td>{convertNumDateToView(req.finishDate)}</td>
                        <td><Button text='Подробнее' onClick={handleKnowMoreButtonClick(req.id)} /> </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RequestsTable;
