import './RequestCard.css'
import { Card, Form } from 'react-bootstrap';

import { useAppDispatch } from "../../store";
import { formDraft } from '../../store/encryptDecryptRequestList'
import Button from '../Button/Button.tsx';
import Request, { getEncodingFromString } from '../../models/encryptDecryptRequest.ts';
import { EncodingTypes, Encoding } from '../../models/encryptDecryptRequest.ts';
import { useState } from 'react';

export interface Props {
    request: Request
}

const RequestCard = ({ request }: Props) => {
    const dispatch = useAppDispatch()
    const handleForm = () => dispatch(formDraft(request.id))

    const [encoding, setEncoding] = useState<Encoding>('Hamming')

    return (
        <Card className="request_card">
            <Card.Header style={{ fontWeight: 'bold', fontSize: '130%' }}>{request.id}</Card.Header>
            <Card.Body>
                <Card.Title>{request.status}</Card.Title>
                <Card.Text>Дата создания заявки: {new Date(request.creationDate).toString()}</Card.Text>
                {request.creator && <Card.Text>Создатель: {request.creator}</Card.Text>}
                {request.formDate && <Card.Text>Дата формированвия заявки: {new Date(request.formDate).toString()}</Card.Text>}
                {request.finishDate && <Card.Text>Дата завершения заявки: {new Date(request.finishDate).toString()}</Card.Text>}
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
