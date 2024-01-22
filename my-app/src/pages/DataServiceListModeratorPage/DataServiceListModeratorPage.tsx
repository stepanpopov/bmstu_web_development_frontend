import { Container, Row, Image, Table } from 'react-bootstrap';
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useEffect, useState } from 'react';
import { SetPage } from "../../models/common.ts";
import { ToastContainer, toast } from "react-toastify";
import { dataServiceListActions, deleteDS, filterDataListByName, useDataServices, useError, useSuccessAddToDraft } from "../../store/dataServiceList";
import { useAppDispatch } from "../../store";
import MyButton from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user/selectors.ts";
import Button from '../../components/Button/Button.tsx';

interface Props {
    setPage: SetPage
    moderatorNewDSPageLink: string
}

const img = new URL('/binary.png', import.meta.url).href

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = img;
}

const DataServiceListPage = ({ setPage, moderatorNewDSPageLink }: Props) => {
    useEffect(() => {
        setPage()
    }, [])

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useAppDispatch()
    const error = useError()
    const successAddToDraft = useSuccessAddToDraft()
    const navigate = useNavigate()
    const user = useUser()
    const dataServices = useDataServices()

    useEffect(() => {

        if (error) {
            toast.warn(error)
            dispatch(dataServiceListActions.resetError())
        }
    }, [error])

    useEffect(() => {
        dispatch(filterDataListByName(searchValue))
    }, [searchValue, dispatch])

    useEffect(() => {
        if (successAddToDraft) {
            toast.success('Added to draft')
            dispatch(dataServiceListActions.resetSuccess())
        }
    }, [successAddToDraft])

    const handleRemove = (id: number) => () => dispatch(deleteDS(id))

    return (
        <Container>
            <Container>
                <ToastContainer position="top-center" newestOnTop={false} />
                <Row className="justify-content-md-center">
                    <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                    {user?.role === 'moderator' &&
                        <MyButton text='Добавить новую услугу' onClick={() => (navigate(moderatorNewDSPageLink))} />
                    }
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Данные</th>
                            <th>Шифрование/расшифрование</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataServices.map((ds) => (
                            <tr key={ds.id}>
                                <td><Image src={ds.image} alt='' style={{ width: '40%', height: '40%' }} onError={handlerImgError} /> </td>
                                <td>{ds.name}</td>
                                <td>{ds.blob}</td>
                                <td>{ds.encode ? 'Данные зашифрованы' : 'Данные в исходном виде'}</td>
                                <td>
                                    <>
                                        <Button text={'Редактировать'} onClick={() => (navigate(`/service/${ds.id}/update`, { state: { title: ds.name } }))} />
                                        <Button text={'Удалить'} onClick={handleRemove(ds.id)} />
                                    </>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table >
            </Container>
        </Container>
    );
};

export default DataServiceListPage;
