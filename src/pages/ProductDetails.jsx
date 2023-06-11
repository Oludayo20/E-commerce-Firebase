import React, { useState } from 'react';
import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import '../styles/productDetails.css';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const [tab, setTab] = useState('des');

  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc
  } = product;

  return (
    <Helmet title={productName}>
      <CommonSection />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product_rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    ( <span>{avgRating}</span> ratings)
                  </p>
                </div>

                <span className="product_price">${price}</span>

                <p className="mt-3">{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.1 }} className="buy_btn">
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === 'desc' ? 'active_tab' : ''}`}
                  onClick={() => setTab('desc')}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === 'rev' ? 'active_tab' : ''}`}
                  onClick={() => setTab('rev')}
                >
                  Reviews({reviews.length})
                </h6>
              </div>

              {tab == 'desc' ? (
                <div className="tab_content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="tab_content mt-5">
                  <p>reviews</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
