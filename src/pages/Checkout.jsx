import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import '../styles/checkout.css';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing_form">
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="phone number" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="street address" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="city" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="postal code" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>$120</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free Shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h6></h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <button className="auth_btn w-100">Place an Order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
