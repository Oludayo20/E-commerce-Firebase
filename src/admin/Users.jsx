import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Users = () => {
  const { data: usersData, loading } = useGetData('users');

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    toast.success('User deleted!');
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <p className="py-5 text-center fw-bold">Loading...</p>
                ) : (
                  usersData.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img
                          src={user.photoURL}
                          alt="Product Img"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteUser(user.uid);
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

export default Users;
