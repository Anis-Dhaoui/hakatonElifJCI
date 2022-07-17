import React from 'react';
import Testimonial from './Testimonials';
import { Loading } from './LoadingCmp.js';
import MostRecentProd from './MostRecentProd.js';
import RenderProducts from './RenderProducts.js';
import RenderPlaces from './RenderPlaces';
import { useSelector } from 'react-redux';

function Home(props) {
    const state = useSelector(state => state);
    const products = state.products;
    const places = state.places.places;
    const auth = state.auth;

    return (
        <div className="container-fluid px-4">
            <div className="row mt-5">
                <div className="col">
                    {
                        products.loading ? <Loading />
                            : products.errMsg ? <h5 className="text-danger">{products.errMsg}</h5>

                                : <MostRecentProd
                                    products={products} />
                    }
                </div>
            </div>
            <hr />
            <br />
            <div className="row">
                {
                    products.loading ? <Loading />
                        : products.errMsg ? <h5 className="text-danger">{products.errMsg}</h5>

                            :
                            <>   
                            <h3 className="text-info mx-auto">Emplacement Historique</h3>
                                <RenderPlaces places={places.filter(item => !item.category)}
                                    authCheck={auth.isAuthenticated}
                                    productsPerPage={6}
                                />

                                <h3 className="text-info mx-auto mt-5 mb-n4">Bon Plan</h3>
                                <RenderPlaces places={places.filter(item => item.category)}
                                    authCheck={auth.isAuthenticated}
                                    productsPerPage={6}
                                />
                            </>
                }
            </div>
            <hr />
            <br />
            <div className="row">
                <div className="col">
                    <h3 className="text-info text-center">Découvrez ce que les visiteurs pensent de Siliana</h3>
                    <Testimonial />
                </div>
            </div>
        </div>
    )
}

export default Home;