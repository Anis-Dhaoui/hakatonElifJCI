import React, { useEffect } from 'react';
import Header from './HeaderCmp';
import Footer from './FooterCmp';
import Home from './HomeCmp';
import ProductDetail from './ProductDetailCmp';
import Wishlist from './WishlistCmp';
import UserProfile from './UserProfile';
import WelcomeBack from './welcomeBack';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, fetchProducts, fetchWishList, fetchPlaces } from '../Redux/Actions';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isTokenExpired } from '../js/plugins';
import { handleLogout, verifyUser } from '../Redux/Actions';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail';
import ForgotPasswordEnterNewPass from './ForgotPasswordEnterNewPass'
import PlaceDetail from './PlaceDetailCmp';

function Main(props) {

	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();
	
	/* eslint-disable */
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchPlaces());
		dispatch(fetchComments());
		token ? dispatch(fetchWishList()) : null;
		// props.handleLogin({"username": "med", "password": "pass"});
		if(token){
			if(isTokenExpired(token)){
				dispatch(handleLogout());
			}
		}

		if(window.location.pathname.includes('/users/verify/')){
			const path = window.location.pathname.split('/users/');
			return verifyUser(path[1]);
		}
	}, []);

	useEffect(() =>{
		document.title = `TheWayShop | ${document.location.pathname.split('/')[1]}`
	},[document.title]);

	return (
		<>
			<WelcomeBack />
			<ToastContainer autoClose={5000} theme="colored" />

			<Header />

			<div className="pt-1">
				<TransitionGroup>
					<CSSTransition key={props.location.key} timeout={300} classNames="page">
						<Switch>
							<Route exact path="/home" component={() => <Home /> } />
							<Route exact path="/products/:productId/:productName?" component={() => <ProductDetail /> } />
							<Route exact path="/places/:placeId/:placeName?" component={() => <PlaceDetail /> } />
							<Route path="/wishlist" component={() => token ? <Wishlist /> : <Redirect to="/home" />} />
							<Route path="/profile"  component={() => token ? <UserProfile /> : <Redirect to="/home" />} />
							<Route exact path="/users/verify/:userId/:confirCode" />
							<Route exact path="/forgotpassword" component={() => <ForgotPasswordEnterEmail /> } />
							<Route exact path="/users/forgotpassword/resetpassword/:userId/:confirResetPasswordCode" component={() => <ForgotPasswordEnterNewPass /> } />
							
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</div>

			<Footer />
		</>
	);
}

export default withRouter(Main);