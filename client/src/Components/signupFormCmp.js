import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import { useForm } from "react-hook-form";
import '../css/signUpForm.css';
import { handleSignup } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
import { validatePassword } from '../js/plugins';
import SocialAuth from './Social_Auth';

function Signup(props) {

   const dispatch = useDispatch();

   const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
   const onSubmit = (data) => {
      dispatch(handleSignup(data, props.toggleSignUp));
   }

   return (
      <Modal id='signup-form' style={{ backgroundColor: "white" }} isOpen={props.isSignupOpen} toggle={props.toggleSignUp} contentClassName="login-modal p-3">
         <ModalHeader toggle={props.toggleSignUp} className="text-primary">Sign Up</ModalHeader>
            <SocialAuth closeForm={props.toggleSignUp} />
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
               <label htmlFor="firstname">First name</label>
               <input name="firstname" type="text" placeholder="First name" className={errors.firstname ? "form-control is-invalid" : " form-control is-valid"}
                  {...register("firstname",
                     {
                        required: "Required field",
                        minLength: {
                           value: 3,
                           message: "First name should have at least 3 caracters"
                        },
                        maxLength: {
                           value: 10,
                           message: "First name should have at most 10 caracters"
                        }
                     })
                  }
               />
               {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname.message}</div>
               )}
            </div>

            <div className="form-group">
               <label htmlFor="lastname">Last name</label>
               <input name="lastname" type="text" placeholder="Last name" className={errors.lastname ? "form-control is-invalid" : " form-control is-valid"}
                  {...register("lastname",
                     {
                        required: "Required field",
                        minLength: {
                           value: 3,
                           message: "Last name should have at least 3 caracters"
                        },
                        maxLength: {
                           value: 10,
                           message: "Last name should have at most 10 caracters"
                        }
                     })
                  }
               />
               {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname.message}</div>
               )}
            </div>

            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input name="email" type="text" placeholder="Email" className={errors.email ? "form-control is-invalid" : " form-control is-valid"}
                  {...register("email",
                     {
                        required: "Required field",
                        pattern: {
                           value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                           message: 'Email is not valid.'
                        }
                     })
                  }
               />
               {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
               )}
            </div>

            <div className="form-group">
               <label htmlFor="phone">Phone number</label>
               <input name="phone" type="text" size="20" minLength="8" maxLength="14" placeholder="Phone number" className={errors.phone ? "form-control is-invalid" : " form-control is-valid"}
                  onKeyPress={(e) => !/[0-9]/.test(e.key) ? e.preventDefault() : null}
                  {...register("phone",
                     {
                        required: "Required field",
                        minLength: {
                           value: 8,
                           message: "Phone number should have at least 8 digits"
                        },
                        maxLength: {
                           value: 14,
                           message: "Phone number should have at most 14 digits"
                        }
                     })
                  }
               />
               {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
               )}
            </div>

            <div className="form-group">
               <label htmlFor="username">Username</label>
               <input name="username" type="text" placeholder="Username" className={errors.username ? "form-control is-invalid" : " form-control is-valid"}
                  {...register("username",
                     {
                        required: "Required field",
                        minLength: {
                           value: 3,
                           message: "Username should have at least 3 caracters"
                        },
                        maxLength: {
                           value: 10,
                           message: "Username should have at most 10 caracters"
                        }
                     })
                  }
               />
               {errors.username && (
                  <div className="invalid-feedback">{errors.username.message}</div>
               )}
            </div>

            <div className="form-group">
               <label htmlFor="password">Password</label>
               <input name="password" type="password" placeholder="Password" className={errors.password ? "form-control is-invalid" : " form-control is-valid"}
                  {...register("password",
                     {
                        required: "Required field",
                        validate: validatePassword
                     })
                  }
               />
               {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
               )}
            </div>

            <div className="form-group">
               {
                  errors.firstname || errors.lastname || errors.email || errors.username || errors.password ?
                     <button type="submit" className="btn btn-danger btn-block"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Error </button>
                     :
                     <button type="submit" className="btn btn-success btn-block"><i className="fa fa-user-plus"></i> Sign up </button>
               }
            </div>

         </form>
      </Modal>
   );
}

export default Signup;