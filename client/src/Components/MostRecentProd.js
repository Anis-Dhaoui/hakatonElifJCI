import React, { useEffect } from 'react';
import $ from 'jquery';
import '../css/mostRecentProd.css';
import formatDate from '../js/plugins';
import { url } from '../shared_data/Url';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';

export default function MostRecentProd (props){

    const sortedProducts = props.products.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const products = sortedProducts.filter(item => item.published);

    // Some jquery to set time between slide show and to show 3 cards together while sliding
    useEffect(() => {
        window.$('#recentProductsSlideShow').carousel({
        interval: 5000
        })
    
        $('#recentProductsSlideShow.carousel .carousel-item').each(function(){
            var minPerSlide = 3;
            var next = $(this).next();
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<minPerSlide;i++) {
                next=next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                
                next.children(':first-child').clone().appendTo($(this));
            }
        });
    }, [sortedProducts]);

    //Render carousel Items that contains products
    const renderMostRecentProducts = products.slice(0, 9).map((product, index) =>{
        return(
            <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={product._id}>
                <div className="col-md-4 mb-3">
                    <div className="card" style={{height:"400px", minHeight:"400px"}}>
                        <div>
                            <Link to={`/products/${product._id}/${slugify(product.name)}`} >
                                <img className="img-fluid" style={{height:"300px", maxHeight:"300px"}} width="100%" alt={product.name} src={url + product.images[0]} />
                            </Link>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase">{product.name}</h5>
                            <div className="row">
                                <p style={{fontSize:"14px"}} className="col-6 card-text text-muted">{formatDate(product.createdAt, '-')}</p>
                                <p className="col card-text text-right lead">{"jours" + product.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });


    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3 className="text-info ml-3 most-recent-text">Les plus récents postes</h3>
                </div>
                <div className="col-6 text-right ml-n3">
                    <a className="btn btn-primary mb-3 mr-1" href="#recentProductsSlideShow" role="button" data-slide="prev">
                        <i className="fa fa-arrow-left"></i>
                    </a>
                    <a className="btn btn-primary mb-3 " href="#recentProductsSlideShow" role="button" data-slide="next">
                        <i className="fa fa-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div id="recentProductsSlideShow" className="carousel slide w-100" data-ride="carousel">

                        <div className="carousel-inner w-100">
                            {renderMostRecentProducts}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};