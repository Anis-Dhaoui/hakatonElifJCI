import React from 'react';
import { Loading } from './LoadingCmp';
import '../css/productDetail.css';
import CommentCmp from './CommentCmp';
import formatDate from '../js/plugins';
import { url } from '../shared_data/Url';
import AddToWishlist from './addToWishlistButton';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function ProductDetail() {

    const productId = useParams();
    const state = useSelector(state => state);
    const product = state.products.products.filter(item => item._id === productId.productId)[0];
    const user = state.auth;

    if(state.products.loading){
        return <Loading />
    }else 
    if(state.products.errMsg !== null){
        return(
            <h3 className="text-danger text-center"> {state.errMsg} </h3>
        )
    }else
    {document.title = product.name}
    return (            
        <div className="container" id="product-detail">
            <div className="row">
                <div className="card ">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                
                                <div className="preview-pic tab-content">
                                    {
                                        product.images.map((item, index) =>
                                            <div key={"preview-pic-"+index} className={index === 0 ? "tab-pane active" : "tab-pane"} id={"pic-"+index}>
                                                <img src={url + item} alt={product.name} />
                                            </div>
                                        )
                                    }
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    {
                                        product.images.map((item, index) =>
                                        /* eslint-disable */
                                            <li key={"thumbnail-"+index} className={index === 0 ? "active" : null}>
                                                <a data-target={"#pic-"+index} data-toggle="tab">
                                                    <img src={url + item} alt={product.name} />
                                                </a>
                                            </li>
                                        /* eslint-disable */
                                        )
                                    }
                                </ul>
                                
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title text-uppercase">{product.name}</h3>
                                <h6 className="text-muted">Posted at: {formatDate(product.createdAt, '-')}</h6>
                                <p className="product-description">{product.description}</p>
                                <h4 className="price">price: <span>$ {product.price}</span></h4>

                                <div className="action">
                                    <a href="tel:+900300400" className="call-seller btn btn-default mr-3" data-toggle="tooltip" data-placement="top" title="User Phone number will be here" type="button"><i className="fa fa-phone" aria-hidden="true"></i> Call Seller</a>
                                    <i style={{position:"absolute", bottom:"7px"}}>
                                        <AddToWishlist  isAuthenticated={user.isAuthenticated} productId={product._id} />
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommentCmp productId={product._id} authCheck={user} />
        </div>
    )
}
export default ProductDetail;