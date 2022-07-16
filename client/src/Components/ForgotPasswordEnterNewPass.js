import React, { useState } from 'react'
import '../css/ForgotPasswordEnterEmail.css';
import { useForm } from "react-hook-form";
import { resetPassword } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
import { validatePassword } from '../js/plugins';
import { useLocation } from 'react-router-dom';

export default function ForgotPasswordEnterNewPass() {
    const location = useLocation().pathname.split('/');
    const [newPassword, setNewPassword] = useState({ pwd_1: "", pwd_2: "" });
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
    const onSubmit = (data) => {
        dispatch(resetPassword(location[4], location[5], data));
    }
    return (

        <div className="subscribe container my-5">
            <h2 className="subscribe__title">Reset password</h2>
            <p className="subscribe__copy">Enter a new strong password</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input name="newPassword" type="password" placeholder="New password" className={errors.password ? "form-control is-invalid" : " form-control"}
                        {...register("newPassword",
                            {
                                required: "Required field",
                                validate: validatePassword
                            })
                        }
                        onChange={(e) => setNewPassword({ ...newPassword, pwd_1: e.target.value })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={(e) => setNewPassword({ ...newPassword, pwd_2: e.target.value })} type="password" className="form-control" placeholder="Confirm Password" />
                    {newPassword.pwd_2 && newPassword.pwd_1 !== newPassword.pwd_2 ?
                        <div className="text-danger"><small>Password do not match</small></div>
                        :
                        null
                    }
                </div>
                <button type="submit" className="btn btn-success btn-block"><i className="fa fa-paper-plane"></i> Submit </button>
            </form>
            <div className="notice">
                <span className="notice__copy text-warning">Please note: enter a strong password</span>
            </div>
        </div>
    )
}