import './RequestCard.css'
import { Card } from 'react-bootstrap';

import { useAppDispatch } from "../../store";
import { formDraft } from '../../store/encryptDecryptRequestList'
import Button from '../Button/Button.tsx';
import Request from '../../models/encryptDecryptRequest.ts';

export interface Props {
    request: Request
}

const RequestCard = ({ request }: Props) => {
    const dispatch = useAppDispatch()
    const handleForm = () => dispatch(formDraft(request.id))

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
                    <Button
                        text={'Cформировать'}
                        onClick={handleForm} />}
            </Card.Body>
        </Card>
    );
};

export default RequestCard;
