import React, { useState } from 'react';
import { Loading } from './LoadingCmp';
import { url } from "../shared_data/Url";
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PostProducts from './PostProducs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct, deleteImages } from '../Redux/Actions';

export default function MyProducts(props) {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const products = state.products;
    const filtredProducts = state.products.products.filter(item => item.user === state.auth.user._id);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // The target plate that will be edited
    const [targetProduct, settargetProduct] = useState(null);

// $$$$$$$$$$$$$$$$$$$$ BEGIN HANDLE DELETE PRODUCT $$$$$$$$$$$$$$$$$$$$
    const HandleDeleteProduct = (productId, images) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Are you sure?</h3>
                        <p className="text-danger">You want to delete this product?</p>
                        <button onClick={onClose}>No, Cancel</button>
                        <button className="text-danger"
                            onClick={() => {
                                dispatch(deleteProduct(productId));
                                dispatch(deleteImages(images));
                                onClose();
                            }}
                        >
                            Yes, Delete!
                        </button>
                    </div>
                );
            }
        });
    };
// $$$$$$$$$$$$$$$$$$$$ END HANDLE DELETE PRODUCT $$$$$$$$$$$$$$$$$$$$

// $$$$$$$$$$$$$$$$$$$$ BEGIN HANDLE PUBLISH/UNPUBLISH PRODUCT $$$$$$$$$$$$$$$$$$$$
    const publishUnpublishProduct = (productId, publishedOrNot) =>{
        const body = {published: publishedOrNot}
        dispatch(updateProduct(productId, body));
        // console.log(productId);
        // console.log(publishedOrNot);
    };
// $$$$$$$$$$$$$$$$$$$$ BEGIN HANDLE PUBLISH/UNPUBLISH PRODUCT $$$$$$$$$$$$$$$$$$$$

    var renderMyProducts = () => {
        if (products.loading) {
            return <Loading />
        } else
            if (products.errMsg !== null) {
                return (
                    <h3 className="text-danger text-center"> {products.errMsg} </h3>
                )
            } else
                if (filtredProducts.length === 0) {
                    return (
                        <div>
                            <h6 className="text-info text-center p-2"> Your Products Box is Empty! Thank You To Post Your First Product Now By Clicking On "Post new product" Tab.</h6>
                            <div className="p-3 text-center"><img className="img-fluid" src="/assets/images/empty.gif" alt="empty" /></div>
                        </div>
                    )
                } else
                    return (
                        filtredProducts.map((item) => {
                            return (
                                <div key={item._id}>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-12 col-md-2 border-right d-flex justify-content-center">
                                            <img className="rounded responsive-image" src={url + item.images[0]} width="100%" height="100px" alt={item.name} />
                                        </div>
                                        <div className="col-12 col-md-4 border-right d-flex justify-content-center">
                                            <p className="text-uppercase">{item.name}</p>
                                        </div>
                                        <div id="publish-unpublish" className="col-12 col-md-3 d-flex justify-content-center align-itmes-center">
                                            <label className="switch">
                                                <input onChange={() => publishUnpublishProduct(item._id, !item.published)} defaultChecked={item.published} type="checkbox" className="switch-input" />
                                                <span className="switch-label" data-on="Published" data-off="Unpublished"></span>
                                                <span className="switch-handle"></span>
                                            </label>
                                        </div>
                                        <div className="col-12 col-md-3 d-flex justify-content-center">
                                            <div className="row">
                                                <button onClick={() => { settargetProduct(item); toggle() }} className="col-4 border-right fa fa-pencil btn btn-warning"></button>
                                                <button onClick={() => HandleDeleteProduct(item._id, item.images)} className="col-4 border-right fa fa-trash btn btn-danger"></button>
                                                <Link to={`/products/${item._id}`} className="col-4 fa fa-eye btn btn-success"></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    );
    };

    return (
        <div className="container">
            <div className="row bg-dark py-3 mb-3 d-none d-md-flex">
                <div className="col-3 border-right">
                    <h6 className="text-center text-light">Product image</h6>
                </div>
                <div className="col-3 border-right">
                    <h6 className="text-center text-light">Product name</h6>
                </div>
                <div className="col-3 border-right">
                    <h6 className="text-center text-light">Status</h6>
                </div>
                <div className="col-3">
                    <h6 className="text-center text-light">Edit/Delete/View</h6>
                </div>
            </div>
            {renderMyProducts()}

            {/* Update form modal */}
            <div style={{ zIndex: "9888" }}>
                <Modal id="update-plate-model" backdrop={true} isOpen={modal} modalTransition={{ timeout: 600 }} backdropTransition={{ timeout: 200 }} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <span>
                            Updating <span className="text-warning">{targetProduct ? targetProduct.name : null}</span>
                        </span>
                    </ModalHeader>
                    <ModalBody className="py-3">
                        <PostProducts targetProduct={targetProduct} updateProduct={props.updateProduct} />
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}
