import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import '../App.css';
import SlideShow from './Carousel';
import Login from './LoginFormCmp';
import Signup from './signupFormCmp';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LoadingOverlay } from './LoadingCmp';
import '../css/header.css';
import { url } from '../shared_data/Url';
import { capitalize } from '../js/plugins';
import SearchProducts from './SearchProducts';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../Redux/Actions';
import { getRandomColor, createImageFromInitials} from '../js/ProfileImgGenerator';

function Header (){

	const state = useSelector(state => state);
	const auth = state.auth;
	const products = state.products.products;

	const dispatch = useDispatch();

	const [isNavOpen, setisNavOpen] = useState(false);
	const [isSignupOpen, setisSignupOpen] = useState(false);
	const [isSigninOpen, setisSigninOpen] = useState(false);

	const handleLogoutUser = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						<h3>Are you sure?</h3>
						<p>You want to logout?</p>
						<button onClick={onClose}>No, Cancel</button>
						<button
							onClick={() => {
								dispatch(handleLogout());
								onClose();
							}}
						>
							Yes, Logout!
						</button>
					</div>
				);
			}
		});
	};

	return (
		<React.Fragment>
			{
				auth.isLoading ?
					<LoadingOverlay />
				:
					null
			}

			<Navbar id="navArea" light expand="md">
				{/* $$$$$ ###MOBILE MODE### WHEN USER IS AUTHENTICATED SHOW A HIS AVATAR $$$$$*/}
				<Nav id="avatar-user" className="login-btn-nav d-block d-md-none" navbar>
					{
						auth.isAuthenticated ?
						<div className="nav-item avatar-mobile dropdown">
							<button data-toggle="dropdown" className="border-0 nav-link" style={{ color: "white", backgroundColor:"transparent"}}>
								<img 
									src={auth.user.avatar !== undefined && auth.user.avatar.includes('http') ? auth.user.avatar
										: auth.user.avatar !== undefined ? url + auth.user.avatar
										: createImageFromInitials(500, `${auth.user.firstname} ${auth.user.lastname}`, getRandomColor())
									}
									className="rounded-circle avatar" width="50px" height="50px" alt="Avatar" 
								/>
								<div>{capitalize(auth.user.username.split('-')[0])}</div>
							</button>
							<div className="dropdown-menu">
								<h6 className="dropdown-item"> {capitalize(auth.user.firstname) + " " + capitalize(auth.user.lastname)}  </h6>
								<Link to="/profile" className="dropdown-item"><i className="fa fa-user-o"></i> Profile</Link>
								<div className="dropdown-divider"></div>
								<button onClick={handleLogoutUser} className="dropdown-item">
									{
										auth.isLoading ?
											<span className="fa fa-spinner fa-pulse fa-fw mr-1"></span>
											:
											<i className="fa fa-power-off mr-1"></i>
									}
									Logout
								</button>
							</div>
						</div>
					:
						null
					}
				</Nav>
				<NavbarBrand className="logo" href="/"><img src="/assets/images/logo.png" alt="Marketplace logo" /></NavbarBrand>

				<NavbarToggler onClick={() => setisNavOpen(!isNavOpen)} className="bg-primary" />
				
				<Collapse isOpen={isNavOpen} navbar>
					<Nav className="mx-auto" navbar>
						<NavItem className="btn-outline-success rounded" onClick={() => setisNavOpen(!isNavOpen)} >
							<Link to="/home" className="nav-link font-weight-bold"><span className="fa fa-home"></span> Home</Link>
						</NavItem>
						<NavItem className="btn-outline-success rounded" onClick={() => setisNavOpen(!isNavOpen)}>
							<Link to={auth.isAuthenticated ? "/wishlist" : "/"} 
								className={auth.isAuthenticated ? "nav-link font-weight-bold" : "nav-link font-weight-bold"}
								onClick={auth.isAuthenticated ? null : () => setisSigninOpen(!isSigninOpen)} >
								<span className="fa fa-bookmark"></span> Wish List
							</Link>
						</NavItem>
						<NavItem className="d-none d-lg-block">
							<SearchProducts products={products} />
						</NavItem>
					</Nav>
					<Nav id="avatar-user" className="login-btn-nav" navbar>
						{
							!auth.isAuthenticated ?
								<>
									<NavItem className="mr-2 order-12 order-md-1" onClick={() => setisNavOpen(!isNavOpen)}>
										<Button className="d-none d-md-block" id="login-btn" outline color="light" onClick={() => setisSignupOpen(!isSignupOpen)}>
											<span className="fa fa-chevron-up fa-lg"> Signup </span>
										</Button>
										<span onClick={() => setisSignupOpen(!isSignupOpen)} className="nav-link d-block d-md-none ml-0 py-1"><span className="fa fa-chevron-up fa-lg"></span> SignUp</span>
									</NavItem>
									<NavItem className="order-1 order-md-12" onClick={() => setisNavOpen(!isNavOpen)}>
										<Button className="d-none d-md-block" id="login-btn" outline color="light" onClick={() => setisSigninOpen(!isSigninOpen)}>
											{
												auth.isLoading ?
													<span className="fa fa-spinner fa-pulse fa-fw"></span>
													:
													<span className="fa fa-sign-in fa-lg"> SignIn </span>
											}
										</Button>
										<span onClick={() => setisSigninOpen(!isSigninOpen) } className="nav-link d-block d-md-none ml-0"><span className="fa fa-sign-in fa-lg"></span> SignIn</span>
									</NavItem>
								</>
							:
								
								<div className="nav-item dropdown d-none d-md-block">
							{/* $$$$$ ###DESKTOP MODE### WHEN USER IS AUTHENTICATED SHOW A HIS AVATAR $$$$$*/}
									<button data-toggle="dropdown" className="border-0 nav-link" style={{ color: "white", backgroundColor:"transparent"}}>
										<img
											src={auth.user.avatar !== undefined && auth.user.avatar.includes('http') ? auth.user.avatar
												: auth.user.avatar !== undefined ? url + auth.user.avatar
												: createImageFromInitials(500, `${auth.user.firstname} ${auth.user.lastname}`, getRandomColor())
											} 
											className="rounded-circle avatar" width="50px" height="50px" alt="Avatar"
										/>
											{" "} {capitalize(auth.user.username.split('-')[0])}
									</button>
									<div className="dropdown-menu ml-n5">
										<h6 className="dropdown-item"> {capitalize(auth.user.firstname) + " " + capitalize(auth.user.lastname)}  </h6>
										<Link to="/profile" className="dropdown-item"><i className="fa fa-user-o"></i> Profile</Link>
										<div className="dropdown-divider"></div>
										<button onClick={handleLogoutUser} className="dropdown-item">
											{
												auth.isLoading ?
													<span className="fa fa-spinner fa-pulse fa-fw mr-1"></span>
												:
													<i className="fa fa-power-off mr-1"></i>
											}
											Logout
										</button>
									</div>
								</div>
						}
					</Nav>
				</Collapse>
			</Navbar>
			<div className="container-fluid pl-0 pr-0" style={{ paddingTop: "0px" }}>
				<NavItem className="mx-auto px-1 my-auto d-block d-lg-none" style={{position:"relative", top:"96px", zIndex:"1"}}>
					<SearchProducts products={products} />
				</NavItem>
				{
					window.location.pathname !== "/profile" ?
					
					<video style={{marginTop:"-106px"}} width="100%" controls={false} autoPlay loading="lazy" muted loop>
					<source src="assets/videos/vid01.mp4" type="video/mp4"></source>
					Sorry, your browser doesn't support videos.
				  </video>
					
					:
					null
				}
			</div>
			
			<Login isSignInOpen={isSigninOpen} toggleSignIn={() => setisSigninOpen(!isSigninOpen)} toggleSignUp={() => setisSignupOpen(!isSignupOpen)} />
			<Signup isSignupOpen={isSignupOpen} toggleSignUp={() => setisSignupOpen(!isSignupOpen)} />
		</React.Fragment>
	)
}

export default Header;