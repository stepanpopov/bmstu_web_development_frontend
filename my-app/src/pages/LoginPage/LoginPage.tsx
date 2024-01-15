import { useNavigate } from 'react-router-dom';
import { SetPage } from '../../models/common.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Toast } from 'react-bootstrap';

import { login as loginThunk, useError, useLoading, useUser } from '../../store/user'

interface LoginPageProps {
    setPage: SetPage
}

const LoginPage = ({ setPage }: LoginPageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [showToast, setShowToast] = useState(false)
    const toggleShowToast = () => setShowToast(!showToast);

    const error = useError()
    const loading = useLoading()
    const user = useUser()

    const handleSubmit = () => {
       dispatch(loginThunk({login, password}))
    };

    useEffect(() => {
        if (!error) {
            setShowToast(true)
        }
    }, [error] )

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <Container>
                <Toast show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <strong className="me-auto">Ошибка</strong>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <div className="bg-dark p-4 rounded">
                            <h2 className="text-center mb-4">Авторизация</h2>
                            <Form.Label className="font-weight-bold text-left">Логин</Form.Label>
                            <Form.Control
                                onChange={(e) => setLogin(e.target.value)}
                                type="login"
                                placeholder="Введите логин"
                                required
                            />

                            <Form.Label className="mt-3">Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className="w-100 mt-4" onClick={handleSubmit}
                                    style={{borderRadius: '10px'}}>
                                Войти
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
