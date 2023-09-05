import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editCollateral, getCollateral, getCollaterals, reset, resetState } from '../features/collateral/collateralSlice';
import UserSidebar from './UserSidebar';
import { CollateralType } from '../utils/CollateralTypes';
import Loader from './Loader';
import { toast } from 'react-toastify';

const EditUserCollateral = () => {
    const { role, email } = useSelector(state => state.auth);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { isSuccess, isLoading, isError, message } = useSelector(state => state.collateral);
    const [collateralForm, setCollateralForm] = useState({
        ownShare: 0,
        collateralType: '',
        collateralValue: ''
    });

    useEffect(() => {
        if (!email || role !== "User") {
            nav("/login")
        }
        if (isError) {
            toast.error(message);
        }
    }, [role, email]);

    useEffect(() => {
        dispatch(getCollaterals()).then((action) => {
            var collateral = action.payload.filter(col => col.id === params.id)[0];
            setCollateralForm(collateral);
        })
    }, [dispatch, params.id,]);


    const handleChange = (e) => setCollateralForm({ ...collateralForm, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        var finalRes = {
            ...collateralForm,
            ownShare: Number(collateralForm.ownShare),
            collateralType: Number(collateralForm.collateralType),
            collateralValue: Number(collateralForm.collateralValue)
        };
        console.log(finalRes);
        dispatch(resetState());
        dispatch(editCollateral(finalRes)).then((res) => {
            toast.success("Collateral Updated successfully");
            nav('/UserDashboard/collaterals');
        });
    }


    return (
        <Container fluid className='p-0'>
              <Row className="flex-nowrap m-0 p-0">
                <UserSidebar />
                {isLoading ? <Loader /> :
                    <Col className="col py-3 pt-5">
                        <h3 className='text-center'>Edit Collateral</h3>
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
                                            disabled={true}
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
                                        Update Collateral
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

export default EditUserCollateral
