import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Image } from 'react-bootstrap';
import { Loader } from '../../components/Loader/Loader.tsx'
import { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch } from "../../store/index.ts";
import { dataServiceActions, useDataService, useLoading, getDsByID, updateDS, updateCoverDS } from '../../store/dataService/index.ts'
import { SetPageTitleLink } from '../../models/common.ts';
import Button from '../../components/Button/Button.tsx';


interface Props {
    setPage: SetPageTitleLink
    servicesPageLink: string
}

const img = new URL('/binary.png', import.meta.url).href

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = img;
}

const DataServiceModeratorPage = ({ setPage, servicesPageLink }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { id } = useParams()
    // handle not convertable id
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(dataServiceActions.setLoading())
        dispatch(getDsByID(id == undefined ? 0 : +id))
    }, [id])

    const ds = useDataService()
    const loading = useLoading()

    useEffect(() => {
        if (!loading) {
            setPage(location.pathname, ds?.name ?? location.state.title)
        }
    }, [loading, ds])

    const [encode, setEncode] = useState<boolean>(ds?.encode ?? false)
    const [name, setName] = useState<string>(ds?.name ?? '')
    const [blob, setBlob] = useState<string>(ds?.blob ?? '')
    const [cover, setCover] = useState<File | null>(null)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)

    useEffect(() => {
        if (ds) {
            setEncode(ds.encode)
            setName(ds.name)
            setBlob(ds.blob)
        }
    }, [ds])


    const onSaveClick = async () => {
        if (!ds) { return }

        dispatch(updateDS({ ...ds, encode, name, blob }))
        if (cover) {
            dispatch(updateCoverDS({ id: ds.id, cover }))
        }
        navigate(servicesPageLink)
    }

    const onCancelClick = () => {
        setEncode(ds?.encode ?? false)
        setName(ds?.name ?? '')
        setBlob(ds?.blob ?? '')
        setCover(null)
        navigate(servicesPageLink)
    }

    const handleSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setCover(event.target.files[0])
            showCoverPreview(event.target.files[0])
        }
    }

    const showCoverPreview = (cover: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setCoverPreview(reader.result as string)
        }
        reader.readAsDataURL(cover)
    }

    console.log(cover)
    if (loading) {
        return <Loader />
    }

    return (
        <Container style={{marginBottom: '10%'}}>
            <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Название</Form.Label>
                    <Form.Control as="textarea" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Данные</Form.Label>
                    <Form.Control as="textarea" rows={3} value={blob} onChange={(e) => setBlob(e.target.value)} />
                </Form.Group>
                <Form.Check
                    type='checkbox'
                    id='default-checkbox'
                    label='Расшифрование'
                    checked={!encode}
                    onChange={() => setEncode(!encode)}
                />
                <Form.Check
                    type='checkbox'
                    id='default-checkbox'
                    label='Шифрование'
                    checked={encode}
                    onChange={() => setEncode(!encode)}
                />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Изображение для данных</Form.Label>
                    <Form.Control type="file"
                        onChange={handleSelectedFile} />
                </Form.Group>

                {coverPreview && <Image src={coverPreview} alt='' style={{ width: '40%', height: '40%' }} onError={handlerImgError} />}
                {!coverPreview && ds && <Image src={ds.image} alt='' style={{ width: '40%', height: '40%' }} onError={handlerImgError} />}
                <Button onClick={onSaveClick} text={'Сохранить'} />
                <Button onClick={onCancelClick} text={'Отменить'} />
            </Form>
        </Container>
    );
};

export default DataServiceModeratorPage;
