import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import UserSidebar from './UserSidebar'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "./Loader";
import { CollateralType } from '../utils/CollateralTypes';
import { createCollateral, deleteCollateral, getCollaterals, reset } from '../features/collateral/collateralSlice';

const AddUserCollateral = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { email, role } = useSelector(state => state.auth);
    const { isSuccess, isLoading, isError, message } = useSelector(state => state.collateral);
    const [collateralForm, setCollateralForm] = useState({
        ownShare: 0,
        collateralType: '',
        collateralValue: ''
    });

    useEffect(() => {
        if (!email || role !== "User") {
            nav('/login');
        }
        if (isError) {
            toast.error(message);
        }

    }, [email, role]);


    const handleChange = (e) => setCollateralForm({ ...collateralForm, [e.target.name]: e.target.value })
    const handleSubmit = (e) => {
        e.preventDefault();
        var finalRes = {
            ownShare: Number(collateralForm.ownShare),
            collateralType: Number(collateralForm.collateralType),
            collateralValue: Number(collateralForm.collateralValue)
        };
        dispatch(createCollateral(finalRes)).then((res) => {
            toast.success("Collateral added successfully");
            nav('/UserDashboard/collaterals');

        });
    }


    return (
        <Container fluid className='p-0'>
             <Row className="flex-nowrap m-0 p-0">
                <UserSidebar />
                {
                    isLoading ? <Loader /> :

                        <Col className="col py-3 pt-5">
                            <h3 className='text-center'>Add New Collateral</h3>
                            <Row className='pt-2'>
                                <Col md="5" className="m-auto border border-2 p-4 ">
                                    <Form onSubmit={handleSubmit} className=''>
                                        <Form.Group className="mb-3 py-2" controlId="formBasicCollateralValue">
                                            <Form.Label>Collateral Value</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="collateralValue"
                                                minLength={6}
                                                placeholder="Enter Collateral Value"
                                                value={collateralForm.collateralValue}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3 py-2" controlId="formBasicCollateralType">
                                            <Form.Label>Collateral Type</Form.Label>
                                            <Form.Select
                                                name="collateralType"
                                                value={collateralForm.collateralType}
                                                onChange={handleChange}
                                                required>
                                                <option value="" default>Select Collateral Type</option>
                                                {Object.keys(CollateralType).map(collateralType => (
                                                    <option value={collateralType} key={collateralType}> {CollateralType[collateralType]}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3 py-2" controlId="formBasicOwnShare">
                                            <Form.Label>Own Share - {collateralForm.ownShare}</Form.Label>
                                            <Form.Range
                                                type="range"
                                                name="ownShare"
                                                min={0}
                                                step={1}
                                                max={100}
                                                placeholder="Enter Own Share"
                                                onChange={handleChange}
                                                value={collateralForm.ownShare}
                                                required />
                                        </Form.Group>
                                        <Button variant="dark" type="submit">
                                            Add Collateral
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>

                        </Col>
                }
            </Row>
        </Container>
    )
}

export default AddUserCollateral
