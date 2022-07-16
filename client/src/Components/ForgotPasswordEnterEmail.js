import React from 'react';
import '../css/ForgotPasswordEnterEmail.css';
import { useForm } from "react-hook-form";
import { sendResetPasswordLink } from '../Redux/Actions';
import { useDispatch } from 'react-redux';

export default function ForgotPasswordEnterEmail() {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
    const onSubmit = (data) => {
        dispatch(sendResetPasswordLink(data));
        console.log(data);
    }

    return (
        <div className="subscribe container my-5">
            <h2 className="subscribe__title">Forgot your password?</h2>
            <p className="subscribe__copy">Enter your account email, we'll send you a link to reset your password</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <input name="email" type="text" placeholder="Enter your email address" className={errors.email ? "form__email is-invalid" : "form__email"}
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
                <button type='submit' className="form__button">Send</button>
                {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                )}
            </form>
            <div className="notice">
                <span className="notice__copy text-warning">Please note: if you have any previous reset password emails, the links will be disabled and no longer work after you click Send.</span>
            </div>
        </div>
    )
}
