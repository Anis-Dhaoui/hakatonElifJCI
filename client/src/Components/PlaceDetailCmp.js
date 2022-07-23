import React from 'react';
import { Loading } from './LoadingCmp';
import '../css/productDetail.css';
import CommentCmp from './CommentCmp';
import formatDate from '../js/plugins';
import { url } from '../shared_data/Url';
import AddToWishlist from './addToWishlistButton';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function PlaceDetail() {

    const placeId = useParams();
    const state = useSelector(state => state);
    const place = state.places.places.filter(item => item._id === placeId.placeId)[0];
    const user = state.auth;
    console.log(place);

    if(place === undefined){
        return <Loading />
    }else 
    if(state.products.errMsg !== null){
        return(
            <h3 className="text-danger text-center"> {state.errMsg} </h3>
        )
    }else
    {document.title = place.name}
    return (            
        <div className="container" id="product-detail">
            <div className="row">
                <div className="card ">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                
                                <div className="preview-pic tab-content">
                                    {
                                        place.images.map((item, index) =>
                                            <div key={"preview-pic-"+index} className={index === 0 ? "tab-pane active" : "tab-pane"} id={"pic-"+index}>
                                                <img src={url + item} alt={place.name} />
                                            </div>
                                        )
                                    }
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    {
                                        place.images.map((item, index) =>
                                        /* eslint-disable */
                                            <li key={"thumbnail-"+index} className={index === 0 ? "active" : null}>
                                                <a data-target={"#pic-"+index} data-toggle="tab">
                                                    <img src={url + item} alt={place.name} />
                                                </a>
                                            </li>
                                        /* eslint-disable */
                                        )
                                    }
                                </ul>
                                
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title text-uppercase">{place.name}</h3>
                                {/* <h6 className="text-muted">Posted at: {formatDate(place.createdAt, '-')}</h6> */}
                                <p className="product-description">{place.description}</p>
                                <h4 className="price">jours: <span>{place.price}</span></h4>

                                <div className="action">
                                    <i style={{position:"absolute", bottom:"7px"}}>
                                        <AddToWishlist  isAuthenticated={user.isAuthenticated} productId={place._id} />
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommentCmp productId={place._id} authCheck={user} />
        </div>
    )
}
export default PlaceDetail;