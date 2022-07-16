import React from 'react'
import { Loading } from './LoadingCmp';
import { url } from '../shared_data/Url';
import '../css/wishlist.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlist } from '../Redux/Actions';
import slugify from 'react-slugify';

export default function Wishlist(props) {
	const wishlist = useSelector(state => state.wishlist);
	const dispatch = useDispatch();

	if (wishlist.loading) {
		return <Loading />
	} else
		if (wishlist.errMsg) {
			return <h5 className="text-danger">{wishlist.errMsg}</h5>
		}
	const renderFovorites = wishlist.wishlist && wishlist.wishlist.length > 0 ?
		wishlist.wishlist.map((item, index) => {
			return (
				<div id="wish-list-items" className={index % 2 === 0 ? "row bgLightGray mb-2 p-2" : "row bgLight mb-2 p-2"} key={item._id}>
					<div className="d-flex align-items-center justify-content-center col-12 col-md-2">
						<img className="rounded" src={url + item.images[0]} width="100%" height="110px" alt={item.name} />
						<Link to={`/products/${item._id}/${slugify(item.name)}`} >
							<div id="wishlist-view-product" className="card-img-overlay d-flex justify-content-center align-items-center">
								<i className="fa fa-eye fa-4x" aria-hidden="true"></i>
							</div>
						</Link>
					</div>
					<div className="d-flex align-items-center col-12 col-md-3 mt-3 mt-md-0">
						<h4 className="mx-auto mx-md-0 text-uppercase">{item.name}</h4>
					</div>
					<div className="d-flex align-items-center col-12 col-md-6">
						<div className="limi-text-wishlist-description">
							{item.description}
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-center col-12 col-md-1 mt-3 mt-md-0">
						<button onClick={() => dispatch(deleteWishlist(item._id))} className="fa fa-trash fa-lg mb-1 text-danger" style={{border:"unset", backgroundColor:"unset"}} />
					</div>
				</div>
			)
		})
	:
		<h5 className="text-info text-center my-5">Your wish list is empty</h5>

	return (
		<div className="container mt-5">
			{renderFovorites}
		</div>
	)
};