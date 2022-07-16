import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import $ from 'jquery';
export default function WelcomeBack() {

    const user = useSelector(state => state.auth);

	// Hide welcome back user Alert message after 5 seconds
	useEffect(() => {
		$(document).ready(function () {
			$("#success-alert").hide();
			$("#success-alert").fadeTo(5000, 500).slideUp(500, function () {
				$("#success-alert").slideUp(500);
			});
		});
	}, [user.isAuthenticated])
	/* eslint-disable */

    if(user.isAuthenticated)
        return(
            <div style={{zIndex:"9999"}} id="success-alert" className="alert alert-success text-center mb-0">
                <strong>Success!</strong> Welcome back <b className="text-capitalize">{user.user.firstname + " " + user.user.lastname}</b>
            </div>
        )
	else return null
}
