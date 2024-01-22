import './RequestCard.css'
import { Card, Form } from 'react-bootstrap';

import { useAppDispatch } from "../../store";
import { formDraft } from '../../store/encryptDecryptRequestList'
import Button from '../Button/Button.tsx';
import Request, { Status, getEncodingFromString } from '../../models/encryptDecryptRequest.ts';
import { EncodingTypes, Encoding } from '../../models/encryptDecryptRequest.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestsPage } from '../../consts.tsx';

export interface Props {
    request: Request
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

const RequestCard = ({ request }: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [encoding, setEncoding] = useState<Encoding>('Hamming')

    const handleForm = () => {
        dispatch(formDraft({id: request.id, encodingType: encoding}))
        navigate(requestsPage.link)
    }

    return (
        <Card className="request_card">
            <Card.Header style={{ fontWeight: 'bold', fontSize: '130%' }}>{request.id}</Card.Header>
            <Card.Body>
                <Card.Title>{convertStatusToView(request.status)}</Card.Title>
                <Card.Text>Дата создания заявки: {convertNumDateToView(request.creationDate)}</Card.Text>
                {request.creator && <Card.Text>Создатель: {request.creator}</Card.Text>}
                {request.formDate && <Card.Text>Дата формирования заявки: {convertNumDateToView(request.formDate)}</Card.Text>}
                {request.finishDate && <Card.Text>Дата завершения заявки: {convertNumDateToView(request.finishDate)}</Card.Text>}
                {request.status === "draft" &&
                    <>
                        <Form.Select value={encoding} onChange={(e) => setEncoding(getEncodingFromString(e.target.value))} aria-label="Default select example">
                            {EncodingTypes.map((encType) => (
                                <option>{encType}</option>
                            ))}
                        </Form.Select>
                        <Button
                            text={'Cформировать'}
                            onClick={handleForm} />
                    </>
                }
            </Card.Body>
        </Card>
    );
};

export default RequestCard;
