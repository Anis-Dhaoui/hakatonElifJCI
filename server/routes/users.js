var express = require('express');
var User = require('../models/userSchema');
var userRouter = express.Router();
var passport = require('passport');
var auth = require('../auth');
const cors = require('./cors');
var sendEmail = require('../utils/email');

userRouter.options('*', cors.corsWithOpts, (req, res) => res.status = 200)
/* GET users listing. */
userRouter.get('/', cors.corsWithOpts, function (req, res, next) {
	res.send('respond with a resource');
});


userRouter.post('/signup', cors.corsWithOpts, (req, res, next) => {

	User.findOne({ email: req.body.email }, (err, user) => {
		if (user) {
			res.statusCode = 409;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: false, statusMsg: "Email already exists" });
		} else {
			const confirCode = auth.getToken({email: req.body.email });
				User.register(new User({
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					username: req.body.username,
					phone: req.body.phone,
					avatar: req.body.avatar,
					confirmationCode: confirCode
				}), 
				req.body.password, (err, user) => {
					if (err.name === "UserExistsError") {
						res.statusCode = 409;
						res.setHeader('Content-Type', 'application/json');
						res.json({ success: false, statusMsg: "Username is already taken" });
					} else {

						passport.authenticate('local')
						(req, res, () => {
							const message = 
							`<div>
								<h1>Email Confirmation</h1>
								<h2>Hello ${req.body.firstname}</h2>
								<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
								<a href=${process.env.BASE_URL}/users/verify/${req.user._doc._id}/${confirCode}> Click here</a>
							</div>`
							sendEmail(req.body.email, "The Way Shop | Confirm Email", message)

							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json({ success: true, userId: req.user._doc._id, statusMsg: `An email was sent to ${req.user._doc.email} !\n Please check your email to confirm your account `});
						})
					}
				}
			)
		}
	})
});


// if verify email not sent...
userRouter.get('/resendlink/:userId', cors.corsWithOpts, (req, res, next) => {

	User.findOne({ _id: req.params.userId }, function (err, user) {
        if (!user){
            return res.status(404).json({success: false, statusMsg:'Please register again'});
        }
        else if (user.isVerified){
            return res.status(200).json({success: false, statusMsg: 'This account has been already verified. Please log in.'});
        } 
        else{
			const confirCode = auth.getToken({email: user.email });
			user.confirmationCode = confirCode;
			user.save(err =>{
				if (err){
					res.status(500).send({success: false, statusMsg: err });
			}})
			const message = 
			`<div>
				<h1>Email Confirmation</h1>
				<h2>Hello ${user.firstname}</h2>
				<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
				<a href=${process.env.BASE_URL}/users/verify/${user._id}/${confirCode}> Click here</a>
			</div>`
			sendEmail(user.email, "The Way Shop | Confirm Email", message)

			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: true, statusMsg: "Confirmation email resent successfully to " + user.email });
        }
    });
});


userRouter.get('/verify/:userId/:confirCode', cors.corsWithOpts, (req, res, next) => {

	User.findOne({ _id: req.params.userId, confirmationCode: req.params.confirCode })
	.then((user) =>{
		if (user){
			user.isVerified = true;
			user.save(err =>{
				if (err){
					res.status(500).send({success: false, statusMsg: err });
				}else{
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({ success: true, statusMsg: "Account verified successfully,\n You can sign in now" });
					console.log("Account verified successfully");
				}
			})
			User.updateOne(
				{ _id: req.params.userId },
				{ $unset: { confirmationCode: ""} }
			).exec();
		}else{
			res.statusCode = 403;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: false, statusMsg: "Invalid confirmation link" });
			console.log("invalid link");
		}
	})
	.catch(() => next(new Error("Something went wrong")));
});











// Forget password
userRouter.post('/forgotpassword/sendlink', cors.corsWithOpts, (req, res, next) =>{
	User.findOne({email: req.body.email}, (err, user) =>{
		if(!user){
			return res.status(404).json({success: false, statusMsg:'Email not found'});
		}
		else if (!user.isVerified){
            return res.status(403).json({success: false, statusMsg: 'This account is not verified yet! Please verify your email first.'});
        }
		else{
			const confirResetPasswordCode = auth.getToken({email: user.email });
			user.confirResetPasswordCode = confirResetPasswordCode;
			user.save(err =>{
				if (err){
					res.status(500).send({success: false, statusMsg: err });
			}})
			const message = 
			`<div>
				<h1>Email Reset Password</h1>
				<h2>Hello ${user.firstname}</h2>
				<p>You or someone else requested to reset your password, if it was you, please click the link below to reset your password, othwise ignore this email</p>
				<a href= ${process.env.BASE_URL}/users/forgotpassword/resetpassword/${user._id}/${confirResetPasswordCode}> Click here</a>
			</div>`
			sendEmail(user.email, "The Way Shop | Reset Password", message)

			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: true, statusMsg: "Reset password link sent successfully to " + user.email });
        }
	})
})

userRouter.post('/forgotpassword/resetpassword/:userId/:confirResetPasswordCode', cors.corsWithOpts, (req, res, next) => {

	User.findOne({ _id: req.params.userId, confirResetPasswordCode: req.params.confirResetPasswordCode })
	.then((user) =>{
		if (user){
			user.setPassword(req.body.newPassword, (err) =>{
				if(err){
					res.status(500).send({success: false, statusMsg: err });
				}else{
					user.save(err =>{
						if (err){
							res.status(500).send({success: false, statusMsg: err });
						}else{
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json({ success: true, statusMsg: "Your password changed successfully" });
						}
					})
				}
			});
			User.updateOne(
				{ _id: req.params.userId },
				{ $unset: { confirResetPasswordCode: ""} }
			).exec();
		}else{
			res.statusCode = 403;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: false, statusMsg: "Invalid reset password link" });
			console.log("invalid link");
		}
	})
	.catch(() => next(new Error("Something went wrong")));
});










userRouter.post('/login', cors.corsWithOpts, (req, res, next) => {

	User.findOne({ username: req.body.username }, (err, user) => {

		if (!user) {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'application/json');
			res.send({ success: false, statusMsg: "User not found" });
		}else if(!user.isVerified){
			res.statusCode = 403;
			res.setHeader('Content-Type', 'application/json');
			res.send({ success: false, statusMsg: "Pending Account. Please Verify Your Email!" });
		}else {
			passport.authenticate('local', (err, user, info) => {
				if (err) {
					return next(err);
				}
				req.logIn(user, (err) => {
					if (err) {
						res.statusCode = 401;
						res.setHeader('Content-Type', 'application/json');
						res.json({ success: false, statusMsg: "Password is incorrect" });
					} else {
						var token = auth.getToken({ _id: req.user._id });
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json({
							success: true,
							statusMsg: "Login success",
							token: token,
							userInfo: {
								_id: req.user._id,
								firstname: req.user.firstname,
								lastname: req.user.lastname,
								email: req.user.email,
								phone: req.user.phone,
								avatar: req.user.avatar,
								username: req.user.username
							}
						});
					}
				});
			})(req, res, next);
		}
	})

});










userRouter.get('/facebook/token', cors.corsWithOpts, (passport.authenticate('facebook-token')), (req, res) =>{
    if (req.user){
		var token = auth.getToken({ _id: req.user._id });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({
			success: true,
			statusMsg: "Login with Facebook success",
			token: token,
			userInfo: {
				_id: req.user._id,
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				email: req.user.email,
				phone: req.user.phone,
				avatar: req.user.avatar,
				username: req.user.username
			}
		});
    }else {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.json({ success: false, statusMsg: 'Something went wrong! Please try again.' });
	}
});

userRouter.get('/google/token', cors.corsWithOpts, (passport.authenticate('google-token')), (req, res) =>{
    if (req.user){
		var token = auth.getToken({ _id: req.user._id });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({
			success: true,
			statusMsg: "Login with Google success",
			token: token,
			userInfo: {
				_id: req.user._id,
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				email: req.user.email,
				phone: req.user.phone,
				avatar: req.user.avatar,
				username: req.user.username
			}
		});
    }else {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.json({ success: false, statusMsg: 'Something went wrong! Please try again.' });
	}
});


userRouter.delete('/logout', cors.corsWithOpts, (req, res, next) => {
	// console.log(req.session);
	if (req.session) {
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');

	} else {
		var err = new Error("You are not logged in");
		next(err);
	}
})



// UPDATE USER PROFILE
userRouter.put('/:userId', auth.verifyUser, cors.corsWithOpts, (req, res, next) => {

	User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }, (err, u) => {

		if (Object.keys(req.body).length > 0) {
			if (req.body.newpassword && req.body.currentpwd) {
				u.changePassword(req.body.currentpwd, req.body.newpassword, function (err) {
					if (err) {
						if (err.name === 'IncorrectPasswordError') {
							res.statusCode = 401;
							res.setHeader('Content-Type', 'application/json');
							res.json({ success: false, statusMsg: 'Current password is incorrect' });
						} else {
							res.statusCode = 500;
							res.setHeader('Content-Type', 'application/json');
							res.json({ success: false, statusMsg: 'Something went wrong! Please try again later.' });
						}
					} else {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json({ success: true, statusMsg: 'Your password changed successfully', user: u });
					}
				})
			} else {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json({ success: true, statusMsg: "User updated successfully", user: u });
			}
		} else {
			res.statusCode = 304;
			res.setHeader('Content-Type', 'application/json');
			res.json({ success: false, statusMsg: "Not modified" });
		}
	}),
		err => next(err)
			.catch(err => next(err))
});

module.exports = userRouter;