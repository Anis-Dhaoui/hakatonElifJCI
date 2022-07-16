import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { url } from '../shared_data/Url';
import { useForm } from "react-hook-form";
import { validatePassword } from '../js/plugins';
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadImgs, deleteImages } from '../Redux/Actions';
import { getRandomColor, createImageFromInitials} from '../js/ProfileImgGenerator';

export default function ProfileSetting(props) {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // var user = props.auth;
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
    const [newPassword, setNewPassword] = useState({ pwd_1: "", pwd_2: "" });
    const [changePassword, setChangePassword] = useState(false)

    const onSubmit = (data) => {
        if (newPassword.pwd_1 === newPassword.pwd_2) {
            const body = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== "" && key !== "avatar"));
            if (data.avatar.length > 0) {
                var blob = data.avatar[0];
                var newFile = new File([blob], `${uuid()}.${blob.type.split('/')[1]}`, { type: blob.type });
                body.avatar = "avatars/" + newFile.name;

                let formData = new FormData();
                formData.append("avatar", newFile);
                dispatch(uploadImgs(formData, "uploadavatar"));
                dispatch(deleteImages([user.avatar]));
            }
            if (Object.keys(body).length > 0) {
                dispatch(updateUser(user._id, body));
                // alert("Your information updated successfully!\nplease sign in again to see the changes");
            } else {
                alert("Fields are empty");
            }
        } else {
            alert("Password do not match")
        }
    }

    //Handling image preview
    useEffect(() => {
        $(document).ready(function () {

            var readURL = function (input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.profile-pic').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $(".file-upload").on('change', function () {
                readURL(this);
            });

            $(".upload-button").on('click', function () {
                $(".file-upload").click();
            });
        });
    })

    return (
        <div id="profile-setting" className="container rounded mb-5">
            <div className="row">
                <div className="col border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mx-auto mx-md-1 text-capitalize">{user.firstname + " " + user.lastname}</h4>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="avatar-wrapper">
                                <img src={user.avatar !== undefined ? url + user.avatar
												  : createImageFromInitials(500, `${user.firstname} ${user.lastname}`, getRandomColor())}
                                    className="profile-pic" alt="avatar" />
                                <div className="upload-button">
                                    <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                </div>
                                <input style={{ display: "none" }} name="avatar" className="file-upload" type="file" accept="image/*"
                                    {...register("avatar")}
                                />
                            </div>
                            <div>
                                <input placeholder={user.username} style={{ width: "170px" }} name="username" type="text" className="form-control mx-auto mt-n4"
                                    {...register("username",
                                        {
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
                                    <div className="text-danger text-center"><small>{errors.username.message}</small></div>
                                )}
                            </div>

                            <div className="form-row mt-5 mb-3">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="labels">First name</label>
                                        <input placeholder={user.firstname} name="firstname" type="text" className="form-control"
                                            {...register("firstname",
                                                {
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
                                            <div className="text-danger"><small>{errors.firstname.message}</small></div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="labels">Last name</label>
                                        <input placeholder={user.lastname} name="lastname" type="text" className="form-control"
                                            {...register("lastname",
                                                {
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
                                            <div className="text-danger"><small>{errors.lastname.message}</small></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="labels">Phone Number</label>
                                        <input placeholder={user.phone} name="phone" type="text" className="form-control"
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) ? e.preventDefault() : null}
                                            {...register("phone",
                                                {
                                                    minLength: {
                                                        value: 8,
                                                        message: "Phone should have at least 8 caracters"
                                                    },
                                                    maxLength: {
                                                        value: 14,
                                                        message: "Phone should have at most 14 caracters"
                                                    }
                                                })
                                            }
                                        />
                                        {errors.phone && (
                                            <div className="text-danger"><small></small></div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="labels">Email</label>
                                        <input placeholder={user.email} name="email" type="text" className="form-control"
                                            {...register("email",
                                                {
                                                    pattern: {
                                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                        message: 'Email is not valid.'
                                                    }
                                                })
                                            }
                                        />
                                        {errors.email && (
                                            <div className="text-danger"><small>{errors.email.message}</small></div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <span className="nav-link" onClick={() => setChangePassword(!changePassword)}><ins>Change password</ins></span>
                            {
                                changePassword ?
                                    <div className="form-row mt-3">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="labels">Current password</label>
                                                <input type="password" {...register("currentpwd")} name="currentpwd" className="form-control" placeholder="type current password" required />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="labels">New password</label>
                                                <input type="password" name="newpassword" className="form-control" placeholder="type new password"
                                                    {...register("newpassword",
                                                        {
                                                            validate: validatePassword
                                                        })
                                                    }
                                                    onChange={(e) => setNewPassword({ ...newPassword, pwd_1: e.target.value })}
                                                />
                                                {errors.newpassword && (
                                                    <div className="text-danger"><small>{errors.newpassword.message}</small></div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="labels">Retype new password</label>
                                                <input onChange={(e) => setNewPassword({ ...newPassword, pwd_2: e.target.value })} type="password" className="form-control" placeholder="retype new password" />
                                                {newPassword.pwd_2 && newPassword.pwd_1 !== newPassword.pwd_2 ?
                                                    <div className="text-danger"><small>Password do not match</small></div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Changes</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}