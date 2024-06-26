import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Product deleted!');
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h3 className="py-5 text-center fw-bold">Loading...</h3>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imgUrl}
                          alt="Product Img"
                          style={{ width: '50px' }}
                        />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>N{item.price}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
