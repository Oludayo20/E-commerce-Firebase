import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { storage, db } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../utils/Spinner';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDec, setEnterShortDec] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const docRef = collection(db, 'products');
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      // console.log(uploadTask);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            setLoading(false);
            reject(error);
            toast.error('Error uploading image');
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const productData = {
                productName: enterTitle,
                shortDec: enterShortDec,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
                imgUrl: downloadURL
              };
              await addDoc(docRef, productData);
              setLoading(false);
              toast.success('Product added successfully!');
              navigate('/dashboard/all-products');
              resolve();
            } catch (error) {
              setLoading(false);
              console.log(error);
              toast.error('Error retrieving download URL');
              reject(error);
            }
          }
        );
      });

      // uploadTask.on(
      //   (error) => {
      //     setLoading(false);
      //     console.log(error);
      //     toast.error('Error uploading image');
      //   },
      //   async () => {
      //     await getDownloadURL(uploadTask.snapshot.ref)
      //       .then(async (downloadURL) => {
      //         const productData = {
      //           productName: enterTitle,
      //           shortDec: enterShortDec,
      //           description: enterDescription,
      //           category: enterCategory,
      //           price: enterPrice,
      //           imgUrl: downloadURL
      //         };
      //         await addDoc(docRef, productData);
      //         setLoading(false);
      //         toast.success('Product added successfully!');
      //         navigate('/dashboard/all-products');
      //       })
      //       .catch((error) => {
      //         setLoading(false);
      //         console.log(error);
      //         toast.error('Error retrieving download URL');
      //       });
      //   }
      // );
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Product not added!');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <Col lg="12" className="text-center">
                <Spinner />
              </Col>
            ) : (
              <>
                <h4 className="mb-4">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="Lorem....."
                      value={enterShortDec}
                      onChange={(e) => setEnterShortDec(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description"
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form_group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form_group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option>Select Category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div className="">
                    <FormGroup className="form_group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button type="submit" className="buy_btn">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
