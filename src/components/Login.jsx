import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Loader from './Loader'

const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const { role, isLoading, isError, message, isSuccess } = useSelector(state => state.auth);


    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(message);
        }
        if (role) {
            role === "Advisor" && nav('/AdvisorDashboard');
            role === "User" && nav("/UserDashboard");
        }
        dispatch(reset());
    }, [isSuccess, isError, message])




    const handleChange = e => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm);
        dispatch(login(loginForm))
    }

    if (isLoading) {
        return <Loader/>
    }
    return (
        <Container fluid>
            <Row>
                <Col md={12} lg={6}>
                    <img src={"https://img.freepik.com/free-vector/finance-services-financial-transaction-e-commerce-e-payment_335657-3134.jpg?w=2000&t=st=1685374340~exp=1685374940~hmac=13c96d6a3d7d6c56700b2a0a0d1c0f3cd21321d80dd9a6d3082d49be1fd3832b"}
                        alt="bank"
                        className="w-100 p-1 p-md-4 mh-100"
                    />
                </Col>
                <Col md={12} lg={6} className="mh-100 d-flex align-items-center justify-content-center">
                    <Card className='w-75 shadow mt-5 m-auto'>
                        <Card.Body className='mx-5'>
                            <Form onSubmit={handleSubmit} className='p-3 py-5'>
                                <div className='text-center'>
                                    <i className='fa fa-duotone py-2 fa-classic fs-1 fa-user' />
                                </div>
                                <h2 className='text-center py-2'>SingIn</h2>
                                <Form.Group controlId="formBasicEmail" className='p-2 py-3'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        vale={loginForm.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className='p-2 py-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <div className='py-3'>
                                <Button variant="dark" type="submit" className="my-2 mx-2 px-3">
                                    SignIn
                                </Button>
                                </div>
                                <div className='p-2 text-center'>
                                    Doesn't have an account? <Link to="/signup">Signup</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
