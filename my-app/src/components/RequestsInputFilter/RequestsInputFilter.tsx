import { Row, Form } from 'react-bootstrap';
import Button from '../Button/Button';
import { Status, StatusTypes, getStatusFromString } from '../../models/encryptDecryptRequest';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { enqDeqReqListActions, filterReqs, useReqFilter } from '../../store/encryptDecryptRequestList';

interface Props {
    onFindButtonClick: () => void
}

const getStatusView = (status: Status) => {
    switch (status) {
        case 'draft':
            return 'Черновик'
        case 'deleted':
            return 'Удален'
        case 'finished':
            return 'Завершен'
        case 'formed':
            return 'Сформирован'
        case 'rejected':
            return 'Отклонен'
    }
}

const getDateLayout = (date: Date) => {
    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return date.toISOString().split('T')[0]
}

const RequestsInputFilter = () => {
    const dispatch = useAppDispatch()

    const filters = useReqFilter()

    const [status, setStatus] = useState<Status | undefined>(filters.status)
    const [startDate, setStartDate] = useState<string | undefined>(filters.startDate)
    const [endDate, setEndDate] = useState<string | undefined>(filters.endDate)

    useEffect(() => {
        dispatch(enqDeqReqListActions.setFilter({ status, startDate, endDate }))
    }, [status, startDate, endDate])

    const onFindButtonClick = () => dispatch(filterReqs(filters))

    return (
        <Row style={{ display: "flex", width: "100%" }}>
            <Form.Select value={status} aria-label="Default select example" onChange={(e) => setStatus(getStatusFromString(e.target.value))}>
                <option>{'Любой'}</option>
                {StatusTypes.map((status) => (
                    <option key={status} value={status}>{getStatusView(status)}</option>
                ))}
            </ Form.Select >
            <Form.Group controlId="dob">
                <Form.Label>С какого дня</Form.Label>
                <Form.Control value={startDate} type="date" name="start" onChange={(e) => setStartDate(getDateLayout(new Date(e.target.value)))} />
            </Form.Group>
            <Form.Group controlId="dob">
                <Form.Label>По какой день</Form.Label>
                <Form.Control value={endDate} type="date" name="end" onChange={(e) => setEndDate(getDateLayout(new Date(e.target.value)))} />
            </Form.Group>
            <Button text={'Поиск'} onClick={onFindButtonClick} />
        </Row>
    );
};

export default RequestsInputFilter;
