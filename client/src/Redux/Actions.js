import * as actionType from './ActionsTypes';
import { url } from '../shared_data/Url';
// eslint-disable-next-line
import { toast, Slide, Zoom, Flip, Bounce } from "react-toastify";

/////////////////////////////////{ FETCH COMMENTS }/////////////////////////////////
export const fetchComments = () => (dispatch) =>{

    dispatch(commentsLoading(true));

    fetch(`${url}comments`)
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Comments: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const addComments = (comments) =>({
    type: actionType.ADD_COMMENTS,
    payload: comments
});
export const commentsLoading = () =>({
    type: actionType.COMMENTS_LOADING
});
export const commentsFailed = (errMsg) =>({
    type: actionType.COMMENTS_FAILED,
    payload: errMsg
});
export const postNewComment = (comment) => ({
    type: actionType.POST_COMMENT,
    payload: comment
});

/////////////////////////////////{ POST COMMENT }/////////////////////////////////
export const postComment = (productId, comment) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    const newComment = {
        product_id: productId,
        comment: comment
    };
    
    fetch(`${url}comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error post Comment: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then((comment) => dispatch(postNewComment(comment)))
    .catch(error => {alert('Your comment couldn\'t be posted\n' + error.message)});
};

/////////////////////////////////{ UPDATE COMMENTS }/////////////////////////////////
export const updateComment = (commentId, data) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res =>{
        if(res.ok){
            return res;
        }else{
            var error = new Error("Comment could not be updated:\n " + res.status + ' ' + res.statusText);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error update Comment: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(res => res.json())
    .then(() => dispatch(fetchComments()))
    .catch(error => dispatch(commentsFailed(error.message)));
};

/////////////////////////////////{ DELETE COMMENT }/////////////////////////////////
export const deleteComment = (commentId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}comments/${commentId}`, {
        method: 'DELETE',
        // body: {},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error delete Comment: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(() => dispatch(fetchComments()))
    .catch(error => {alert('Your comment couldn\'t be deleted\n' + error.message)});
};





/////////////////////////////////{ FETCH PRODUCTS }/////////////////////////////////
export const fetchProducts = () => (dispatch) =>{
    dispatch(productsLoading(true));

fetch(url + 'products/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    credentials: 'same-origin'
})
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Products: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(product => dispatch(getProducts(product)))
    .catch(error => dispatch(productsFailed(error.message)));
};

export const getProducts = (product) =>({
    type: actionType.GET_PRODUCTS,
    payload: product
});

export const postProduct = (newProduct) =>({
    type: actionType.POST_PRODUCT,
    payload: newProduct
});

export const productsLoading = () => ({
    type: actionType.PRODUCTS_LOADING
});

export const productsFailed = (errMsg) => ({
    type: actionType.PRODUCTS_FAILED,
    payload: errMsg
});

/////////////////////////////////{ FETCH PLACES }/////////////////////////////////
export const fetchPlaces = () => (dispatch) =>{
    dispatch(placesLoading(true));

fetch(url + 'adminplaces/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    credentials: 'same-origin'
})
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Places: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(place => dispatch(getPlaces(place)))
    .catch(error => dispatch(placesFailed(error.message)));
};

export const getPlaces = (product) =>({
    type: actionType.GET_PLACES,
    payload: product
});

export const placesLoading = () => ({
    type: actionType.PLACES_LOADING
});

export const placesFailed = (errMsg) => ({
    type: actionType.PLACES_FAILED,
    payload: errMsg
});

/////////////////////////////////{ POST NEW PRODUCT }/////////////////////////////////
export const postNewProduct = (product, prodImgs, resetForm) => (dispatch) =>{

    product.images = product.images.map(item => `products/${item.name}`);

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'products/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            dispatch(postProduct(res.product));
            dispatch(uploadImgs(prodImgs, "uploadprodimgs"));
            resetForm();
            toast.success(res.statusMsg);
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error post Product: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};

/////////////////////////////////{ UPDATE PRODUCT }/////////////////////////////////
export const updateProduct = (productId, data) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'products/' + productId, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            dispatch(fetchProducts());
            toast.success(res.statusMsg);
        }else{
            var error = new Error("Product could not be updated");
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};

/////////////////////////////////{ DELETE PRODUCT }/////////////////////////////////
export const deleteProduct = (productId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'products/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            dispatch(fetchProducts());
            toast.success(res.statusMsg);
        }else{
            var error = new Error("Product could not be deleted");
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};





/////////////////////////////////{ FETCH WISH LIST }/////////////////////////////////
export const fetchWishList = () => (dispatch) =>{
    dispatch(wishListLoading());

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'mywishlist', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error fetch WishList: ' + res.status + ' ' + res.statusText);
        throw error;
    })
    .then(res => res.json())
    .then(wishList => dispatch(addWishList(wishList)))
    .catch(error => dispatch(wishListFailed(error.message)));
};

export const addWishList = (wishList) =>({
    type: actionType.ADD_FAVORITE,
    payload: wishList
});

export const postWishList = (wishList) =>({
    type: actionType.POST_FAVORITE,
    payload: wishList
});

export const wishListLoading = () => ({
    type: actionType.FAVORITE_LOADING
});

export const wishListFailed = (errMsg) => ({
    type: actionType.FAVORITE_FAILED,
    payload: errMsg
});

/////////////////////////////////{ POST WISH LIST }/////////////////////////////////
export const postWishlist = (productId) => (dispatch) =>{
    const accessToken = "Bearer " + localStorage.getItem('token');
    
    fetch(url + 'mywishlist/' + productId, {
        method: 'POST',
        body: JSON.stringify({"_id": productId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            dispatch(postWishList(res.wishlist));
            toast.success(res.statusMsg);
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
    var disconnected = new Error('Error post WishList: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .catch(error => toast.error(error.message));
};

/////////////////////////////////{ DELETE WISH LIST }/////////////////////////////////
export const deleteWishlist = (productId) => (dispatch) =>{
    const accessToken = "Bearer " + localStorage.getItem('token');
    
    fetch(url + 'mywishlist/' + productId, {
        method: 'DELETE',
        // body: JSON.stringify({"_id": productId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            dispatch(addWishList(res.wishlist));
            toast.warning(res.statusMsg)
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
    var disconnected = new Error('Error deleteWishlist: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .catch(error => toast.error(error.message));
};





/////////////////////////////////{ UPLOAD IMAGE }/////////////////////////////////
export const uploadImgs = (images, endpoint) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + endpoint, {
        method: 'POST',
        body: images,
        headers: {
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error(res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error post image: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .catch(error => toast.error(error.message));
};

/////////////////////////////////{ DELETE IMAGE }/////////////////////////////////
export const deleteImages = (images) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'uploadprodimgs/delete', {
        method: 'DELETE',
        body: JSON.stringify(images),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else{
            var error = new Error('Error: ' + res.status + ' ' + res.statusText);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error delete image: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => console.log(error.message));
};





/////////////////////////////////{ HANDLE LOGIN }/////////////////////////////////
export const handleLogin = (creds, resetForm) => (dispatch) =>{

    fetch(url + 'users/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
            dispatch(loginReq(res));
            resetForm();
            dispatch(fetchWishList());
            

            // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
            setTimeout(() => {
                dispatch(loginRes(res));
            }, 3000);
            
        }
        else {
            var error = new Error(res.statusMsg);
            error.res = res;
            throw error;
        }
    })
    .catch(error => toast.error(error.message))
};

export const loginReq = (res) =>({
    type: actionType.REQ_LOGIN,
    payload: res.userInfo
});

export const loginRes = (res) =>({
    type: actionType.LOGIN_SUCCESS,
    payload: res.token
});

export const loginFailed = (errMsg) =>({
    type: actionType.LOGIN_FAILED,
    payload: errMsg
});

/////////////////////////////////{ HANDLE LOGIN WITH FACEBOOK OAUTH-2 }/////////////////////////////////
export const loginWithFb = (accessToken) => (dispatch) =>{

    fetch(`${url}users/facebook/token`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
            dispatch(loginReq(res));
            dispatch(fetchWishList());
            

            // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
            setTimeout(() => {
                dispatch(loginRes(res));
            }, 3000);
            
        }
        else {
            var error = new Error(res.statusMsg);
            throw error;
        }
    })
    .catch(error => console.log(error.message))
};


/////////////////////////////////{ HANDLE LOGIN WITH GOOGLE OAUTH-2 }/////////////////////////////////
export const loginWithGoogle = (accessToken) => (dispatch) =>{

    fetch(`${url}users/google/token`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access_token': accessToken
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
            dispatch(loginReq(res));
            dispatch(fetchWishList());
            

            // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
            setTimeout(() => {
                dispatch(loginRes(res));
            }, 3000);
            
        }
        else {
            var error = new Error(res.statusMsg);
            throw error;
        }
    })
    .catch(error => console.log(error.message))
};

/////////////////////////////////{ HANDLE LOGOUT }/////////////////////////////////
export const handleLogout = () => (dispatch) =>{
    dispatch(logoutReq());
    
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // dispatch(favoriteFailed("Error 401: Unauthorized"));
    
    // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
    setTimeout(() => {
        dispatch(logoutRes());
    }, 3000);
    window.location.replace(window.location.origin);
}

export const logoutReq = () =>({
    type: actionType.REQ_LOGOUT
});

export const logoutRes = () =>({
    type: actionType.LOGOUT_SUCCESS
})


/////////////////////////////////{ SIGNUP }/////////////////////////////////
export const handleSignup = (newUser, toggleSignUp) => (dispatch) =>{

    fetch(url + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            const toastMsg = <div>
                    <h6>{res.statusMsg}</h6>
                    <u onClick={() => resendConfirmationLink(res.userId)} className='d-flex justify-content-end'>Resend email</u>
                </div>
            toast.success(toastMsg,{
                position: "top-center",
                transition: Zoom,
                autoClose: false
            });
            toggleSignUp(); //Disapear Signup form when registration success
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message)); 
};

/////////////////////////////////{ RESEND CONFIRMATION LINK TO EMAIL }/////////////////////////////////
export const resendConfirmationLink = (userId) =>{
    fetch(`${url}users/resendlink/${userId}`)
    .then(res => res.json())
    .then(res => {
        if(res.success){
            toast.success(res.statusMsg, {autoClose: 5000});
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};

/////////////////////////////////{ VERIFY USER EMAIL }/////////////////////////////////
export const verifyUser = (path) =>{
    fetch(`${url}users/${path}`)
    .then(res => res.json())
    .then(res => {
        if(res.success){
            toast.success(res.statusMsg,{
                position: "top-center",
                transition: Flip
            });
            setTimeout(() => {
                window.location.replace(window.location.origin);
            }, 2200);
            
        }else{
            setTimeout(() => {
                window.location.replace(window.location.origin);
            }, 2200);
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};


/////////////////////////////////{ SEND RESET PASSWORD LINK TO THE GIVEN EMAIL }/////////////////////////////////
export const sendResetPasswordLink = (email) => (dispatch) =>{

    fetch(url + 'users/forgotpassword/sendlink', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            toast.success(res.statusMsg)
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message)); 
};


/////////////////////////////////{ RESET PASSWORD }/////////////////////////////////
export const resetPassword = (userId, token, newPassword) => (dispatch) =>{

    fetch(`${url}users/forgotpassword/resetpassword/${userId}/${token}`, {
        method: 'POST',
        body: JSON.stringify(newPassword),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            toast.success(res.statusMsg)
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message)); 
};



/////////////////////////////////{ UPDATE USER }/////////////////////////////////
export const updateUserAction = () =>({
    type: actionType.UPDATE_USER
});

export const updateUser = (userId, data) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            localStorage.setItem('userInfo', JSON.stringify(res.user));
            dispatch(updateUserAction())
            toast.success(res.statusMsg);
        }else{
            var error = new Error(res.statusMsg);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error update User: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .catch(error => toast.error(error.message));
};