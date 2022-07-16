import * as actionType from './ActionsTypes';

/////////////////// Comments Reducer //////////////////////
export const CommentsRed = (state = {loading: true, errMsg: null, comments: []}, action) => {

    switch (action.type) {
        case actionType.ADD_COMMENTS:
            return {...state, loading: false, errMsg: null, comments: action.payload}
            
        case actionType.COMMENTS_LOADING:
            return {...state, loading: true, errMsg: null, comments: []};

        case actionType.COMMENTS_FAILED:
            return {...state, loading: false, errMsg: action.payload, comments: []}

        case actionType.POST_COMMENT:
            return {...state, comments: state.comments.concat(action.payload)};
            
        default:
            return state;
    }
};



/////////////////// Products Reducer //////////////////////
export const ProductsRed = (state = {loading: true, success: false, errMsg: null, products: []}, action) =>{
    
    switch (action.type){
        case actionType.GET_PRODUCTS:
            return {...state, loading: false, errMsg: null, products: action.payload}

        case actionType.POST_PRODUCT:
            return {...state, loading: false, errMsg: null, success: true,
                products: state.products.concat(action.payload)
            }
    
        case actionType.PRODUCTS_LOADING:
            return {...state, loading: true, errMsg: null, products: []}

        case actionType.PRODUCTS_FAILED:
            return {...state, loading: false, errMsg: action.payload, products: []}  

        default: return state;
    }
};

/////////////////// Products Reducer //////////////////////
export const ProductRed = (state = {loading: true, success: false, errMsg: null, products: []}, action) =>{
    
    switch (action.type){
        case actionType.GET_PRODUCTS:
            return {...state, loading: false, errMsg: null, products: action.payload}

        case actionType.POST_PRODUCT:
            return {...state, loading: false, errMsg: null, success: true,
                products: state.products.concat(action.payload)
            }
    
        case actionType.PRODUCTS_LOADING:
            return {...state, loading: true, errMsg: null, products: []}

        case actionType.PRODUCTS_FAILED:
            return {...state, loading: false, errMsg: action.payload, products: []}  

        default: return state;
    }
};

/////////////////// Places Reducer //////////////////////
export const PlacesRed = (state = {loading: true, success: false, errMsg: null, places: []}, action) =>{
    
    switch (action.type){
        case actionType.GET_PLACES:
            return {...state, loading: false, errMsg: null, places: action.payload}
    
        case actionType.PLACES_LOADING:
            return {...state, loading: true, errMsg: null, places: []}

        case actionType.PLACES_FAILED:
            return {...state, loading: false, errMsg: action.payload, places: []}  

        default: return state;
    }
};


/////////////////// WISH LIST Reducer //////////////////////
export const WishListRed = (state = {loading: true, errMsg: null, success: false, wishlist: []}, action) => {
    switch (action.type) {
        case actionType.ADD_FAVORITE:
        return {...state, loading: false, errMsg: null, wishlist: action.payload, success: false}

        case actionType.POST_FAVORITE:
            // return (console.log(state.wishlist));
            return {...state,
                loading: false, errMsg: null, success: true,
                wishlist: state.wishlist ? state.wishlist.concat(action.payload) : action.payload
            }

        case actionType.FAVORITE_LOADING:
            return {...state, loading: true, errMsg: null, wishlist: [], success: false}

        case actionType.FAVORITE_FAILED:
            return {...state, loading: false, errMsg: action.payload, wishlist: [], success: false}
            
        default:
            return state;
    }
};



/////////////////// Login Reducer //////////////////////
export const LoginRed = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    errMsg: null }, action) => {

        switch (action.type) {
            
            case actionType.REQ_LOGIN:
                return({
                    ...state,
                    isLoading: true,
                    isAuthenticated: false,
                    user: action.payload
                });

            case actionType.LOGIN_SUCCESS:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: true,
                    token: action.payload
                });

            case actionType.LOGIN_FAILED:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMsg: action.payload
                });

            case actionType.REQ_LOGOUT:
                return({
                    ...state,
                    isLoading: true,
                    isAuthenticated: true,
                });

            case actionType.LOGOUT_SUCCESS:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: false,
                    token: '',
                    user: null
                });
            
            case actionType.UPDATE_USER:
                return({
                    ...state, user: JSON.parse(localStorage.getItem('userInfo')) })

            default:
                return state;
        }
};
