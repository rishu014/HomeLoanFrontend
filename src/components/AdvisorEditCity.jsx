import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdvisorSidebar from './AdvisorSidebar';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { createState, getStates, reset } from '../features/state/stateSlice';
import { getCountries } from '../features/country/countrySlice';
import { createCity, reset as cityReset, getCity, updateCity } from '../features/city/citySlice';

const AdvisorEditCity = () => {
  const { email, role } = useSelector(state => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, isError, message, isSuccess, states } = useSelector(state => state.state);

  const [cityForm, setCityForm] = useState({
    cityName: "",
    cityCode: ""
  });


  useEffect(() => {
    console.log(role, email);
    if (!email || role !== "Advisor") {
      nav('/login');
    }
  }, [email, role]);

  useEffect(() => {
    dispatch(getCity(params.id)).then((action) => {
      console.log(action.payload)
      setCityForm(action.payload)
    });
    return (() => {
      dispatch(reset());
    })
  }, [params.id]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message])

  const handleChange = (e) => setCityForm({ ...cityForm, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cityForm);

    dispatch(updateCity(cityForm)).then(() => {
      dispatch(reset())
      dispatch(cityReset());
      toast.success("Updated Successfully");
      nav("/AdvisorDashboard/City")
    });
  }

  return (
    <Container fluid className='p-0'>
       <Row className="flex-nowrap m-0 p-0">
        <AdvisorSidebar />
        <Col className="col py-3">

          {
            isLoading
              ? <Loader />
              :
              <Row>
                <Col md={6} className='m-auto p-3'>
                  <h3 className='text-center pb-2'> Edit City</h3>
                  <Form onSubmit={handleSubmit} className="border rounded-2 p-3  py-4 shadow">
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertyStateName">
                      <Form.Label>City Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="cityName"
                        placeholder="Enter City Name"
                        value={cityForm?.cityName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 py-2" controlId="formBasicPropertyStateCode">
                      <Form.Label>City Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="cityCode"
                        placeholder="Enter City Code"
                        value={cityForm?.cityCode}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      Create City
                    </Button>
                  </Form>
                </Col>
              </Row>

          }
        </Col>
      </Row>
    </Container>
  )
}

export default AdvisorEditCity;
