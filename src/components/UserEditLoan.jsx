import React, { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createLoan, editLoan, getLoan, reset } from '../features/loan/loanSlice';

const UserEditLoan = () => {
    const [loanForm, setLoanForm] = useState({
        propertyAddress: '',
        propertySize: '',
        propertyCost: '',
        propertyRegistrationCost: '',
        monthlyFamilyIncome: '',
        otherIncome: '',
        loanAmount: '',
        loanDuration: '',
    });
    const { email, role } = useSelector(state => state.auth);
    const { isSuccess, isLoading, isError, message } = useSelector(state => state.loan);
    const nav=useNavigate();
    const params=useParams();
    const dispatch=useDispatch();

    useEffect(() => {
        if (!email || role !== "User") {
            nav('/login');
        }
        if (isError) {
            toast.error(message);
        }

    }, [email, role,isError]);
    useEffect(() => {
        if (isSuccess && message) {
            toast.success(message);
            nav('/UserDashboard');
        }
        return(()=>{
            dispatch(reset());
        })
    },[isSuccess,message])

    useEffect(()=>{
       dispatch(getLoan(params.id)).then((action)=>{
        
       if( action.payload?.state != 0) {
        nav('/UserDashboard');
       }
        setLoanForm(action.payload);
       })
    },[params.id])

    const handleChange = (e) => setLoanForm({ ...loanForm, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        var finalRes={...loanForm,
            propertyAddress:loanForm.propertyAddress,
            propertySize: Number(loanForm.propertySize),
            propertyCost: Number(loanForm.propertyCost),
            propertyRegistrationCost: Number(loanForm.propertyRegistrationCost),
            monthlyFamilyIncome: Number(loanForm.monthlyFamilyIncome),
            otherIncome: Number(loanForm.otherIncome),
            loanAmount: Number(loanForm.loanAmount),
            loanDuration: Number(loanForm.loanDuration),
        }
       dispatch(editLoan(finalRes));
    };
    if(isLoading){
        return <Loader/>
    }

    return(
    <Container fluid className='p-0'>
         <Row className="flex-nowrap m-0 p-0">
            <UserSidebar />
            <Col className="py-3 m-auto col overflow-scroll" sm={12} md={5}>
                <h3 className='text-center'>Update Loan</h3>
                <Form onSubmit={handleSubmit} className="border rounded-2 p-3  py-4 shadow">
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertyAddress">
                        <Form.Label>Property Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="propertyAddress"
                            placeholder="Enter Property Address"
                            value={loanForm.propertyAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertySize">
                        <Form.Label>Property Size</Form.Label>
                        <Form.Control
                            type="number"
                            name="propertySize"
                            placeholder="Enter Property Size"
                            value={loanForm.propertySize}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertyCost">
                        <Form.Label>Property Cost</Form.Label>
                        <Form.Control
                            type="number"
                            name="propertyCost"
                            placeholder="Enter Property Cost"
                            value={loanForm.propertyCost}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertyRegistrationCost">
                        <Form.Label>Property Registration Cost</Form.Label>
                        <Form.Control
                            type="number"
                            name="propertyRegistrationCost"
                            placeholder="Enter Property Registration Cost"
                            value={loanForm.propertyRegistrationCost}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicMonthlyFamilyIncome">
                        <Form.Label>Monthly Family Income</Form.Label>
                        <Form.Control
                            type="number"
                            name="monthlyFamilyIncome"
                            placeholder="Enter Monthly Family Income"
                            value={loanForm.monthlyFamilyIncome}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicOtherIncome">
                        <Form.Label>Other Income</Form.Label>
                        <Form.Control
                            type="number"
                            name="otherIncome"
                            placeholder="Enter Other Income"
                            value={loanForm.otherIncome}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicLoanAmount">
                        <Form.Label>Loan Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="loanAmount"
                            placeholder="Enter Loan Amount"
                            value={loanForm.loanAmount}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicLoanDuration">
                        <Form.Label>Loan Duration</Form.Label>
                        <Form.Control
                            type="number"
                            name="loanDuration"
                            placeholder="Enter Loan Duration (mos.)"
                            value={loanForm.loanDuration}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Update Loan
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    );
}

export default UserEditLoan
