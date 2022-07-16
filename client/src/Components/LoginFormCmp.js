import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader } from 'reactstrap';
import '../css/loginForm.css';
import { handleLogin } from '../Redux/Actions';
import SocialAuth from './Social_Auth';

export default function Login (props){

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLoginUser = (event)=> {
        event.preventDefault();
        const resetForm = () =>{
            props.toggleSignIn();
            event.target.reset();
        }
        // alert("Username: " + event.target[0].value + " Password: " + event.target[1].value + " Remember: " + event.target[2].checked);
        dispatch(handleLogin({username: event.target[0].value, password: event.target[1].value}, resetForm));
    };

    useEffect(() => {
        if(auth.errMsg !== null){
            props.toggleSignIn();
        }
    /* eslint-disable */
    }, [auth.errMsg]);

    return (
        <Modal isOpen={props.isSignInOpen} toggle={props.toggleSignIn} contentClassName="login-modal">
            <div className="login-card">
                <div className="card-header">
                    <ModalHeader toggle={props.toggleSignIn} className="text-primary mt-2">Sign In</ModalHeader>
                    <SocialAuth closeForm={props.toggleSignIn} />
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => handleLoginUser(e)}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="username" required autoFocus />
                        </div>
                        {/* {
                            auth.errMsg === "User not found" ?

                                <div style={{fontSize:"12px", padding: "10px", marginTop: "-10px"}} className="alert-danger alert">{auth.errMsg}</div>
                            :
                                null
                        } */}
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="password" required />
                        </div>
                        {/* {
                            auth.errMsg === "Password is incorrect" ?

                                <div style={{fontSize:"12px", padding: "10px", marginTop: "-10px"}} className="alert-danger alert">{auth.errMsg}</div>
                            :
                                null
                        } */}
                        <div className="row align-items-center remember">
                            <input type="checkbox" />Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        <p className='mr-1'>Don't have an account? </p><span onClick={() => {props.toggleSignUp(); props.toggleSignIn()}}>Sign Up</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to="/forgotpassword">Forgot your password?</Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
}