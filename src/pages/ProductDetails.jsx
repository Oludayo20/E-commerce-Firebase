import React from 'react';
import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import '../styles/productDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    review,
    description,
    shortDesc
  } = product;

  return (
    <Helmet>
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
                <div className="product_rating">
                  <div className="">
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-start-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    ( <span>{avgRating}</span> ratings)
                  </p>
                </div>

                <span>${price}</span>

                <p>{shortDesc}</p>

                <button className="buy_btn">Add to Cart</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
