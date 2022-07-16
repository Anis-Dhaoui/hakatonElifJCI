import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {deleteWishlist, postWishlist} from '../Redux/Actions';
import '../css/addToWishlistButton.css';
import ReactTooltip from 'react-tooltip';

function AddToWishlist(props) {
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const isFound = wishlist && wishlist.some(item => item._id === props.productId);
    // console.log(wishlist);
    const dispatch = useDispatch();
    
    return (
        props.isAuthenticated ?
            isFound ? 
                <span onClick={() => dispatch(deleteWishlist(props.productId))} className="like fa fa-3x fa-heart"></span>
            :
                <span  onClick={() => dispatch(postWishlist(props.productId))} className="like fa fa-3x fa-heart-o"></span>
        :
        <>
            <span 
                className="like fa fa-3x fa-heart-o disabled"
                data-for="infoForUsers"
                data-tip="Please login to use this feature">                
            </span>
            <ReactTooltip
                id="infoForUsers"
                // className="extraClass"
                delayHide={700}
                effect="solid"
                type="info"
            />
        </>
    )
}
export default AddToWishlist;