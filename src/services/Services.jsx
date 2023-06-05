import React from 'react';
import './services.css';
import { motion } from 'framer-motion';
import { Col, Container } from 'reactstrap';

const Services = () => {
  return (
    <section className="services">
      <Container>
        <Col lg="3" md="4">
          <div className="service_item">
            <span>
              <i className="ri-truck-line"></i>
            </span>
            <div>
              <h3>Free Shipping</h3>
              <p>Lorem ispjsnd djfej jfwe wef kms.</p>
            </div>
          </div>
        </Col>
      </Container>
    </section>
  );
};

export default Services;
