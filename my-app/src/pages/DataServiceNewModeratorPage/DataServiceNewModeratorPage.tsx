import { Container, Form, Image } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch } from "../../store/index.ts";
import { createDS } from '../../store/dataService/index.ts'
import { SetPage } from '../../models/common.ts';
import Button from '../../components/Button/Button.tsx';
import { createDSWithCover } from '../../store/dataService/thunks.ts';
import { useNavigate } from 'react-router-dom';


interface Props {
    setPage: SetPage,
    servicesPageLink: string
}

const img = new URL('/binary.png', import.meta.url).href

const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = img;
}

const DataServiceNewModeratorPage = ({ setPage, servicesPageLink }: Props) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    // const ds = useDataService()
    // const loading = useLoading()

    useEffect(() => {
        setPage()
    }, [])


    const [encode, setEncode] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [blob, setBlob] = useState<string>("")
    const [cover, setCover] = useState<File | null>(null)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)

    const onSaveClick = () => {
        if (cover) {
            dispatch(createDSWithCover({ encode, name, blob, cover }))
        } else {
            dispatch(createDS({ encode, name, blob }))
        }
        navigate(servicesPageLink)
    }

    const onCancelClick = () => {
        setEncode(false)
        setName("")
        setBlob("")
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

                <Button onClick={onSaveClick} text={'Сохранить'} />
                <Button onClick={onCancelClick} text={'Отменить'} />
            </Form>

        </Container>
    );
};

export default DataServiceNewModeratorPage;
