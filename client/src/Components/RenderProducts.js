import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../css/renderProducts.css';
import formatDate from '../js/plugins';
import {url} from '../shared_data/Url';
import AddToWishlist from './addToWishlistButton';
import slugify from 'react-slugify';

export default function RenderProducts(props) {

    // Sort products array by most recent recent date
    const sortedProducts = props.products.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const products = sortedProducts.filter(item => item.published);
    const isAuthenticated = props.authCheck;
    const productsPerPage = props.productsPerPage;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        // Fetch items from another resources.
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
        // eslint-disable-next-line
    }, [itemOffset, productsPerPage, sortedProducts]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = event.selected * productsPerPage % products.length;
      setItemOffset(newOffset);
    };

    // $$$$$$$$$$$$$$$$$$$ RENDER PRODUCTS CARDS $$$$$$$$$$$$$$$$$$$ //
    const buildProductCard = currentItems && currentItems.map((product) =>{
        return(
            <div className="product-container col-12 col-sm-6 col-lg-4" key={product._id}>
                <div className="product-imgs-content">
                    <div id={'product-'+product._id} className="carousel slide carousel-fade">
                        <ol className="carousel-indicators">
                            {
                                product.images.slice(0, 4).map((item, index) =>{
                                    return(
                                        <li key={product._id + index} data-target={'#product-'+product._id} data-slide-to={index} className={index === 0 ? "active" : null}></li>
                                    )
                                })
                            }
                        </ol>
                        <Link to={`/products/${product._id}/${slugify(product.name)}`} >
                            <div className="carousel-inner">
                                {
                                    product.images.slice(0, 4).map((item, index) =>{
                                        return(
                                            <React.Fragment key={item}>
                                                {
                                                    index === 0 ? 
                                                        <div className="carousel-item active"> 
                                                            <div className="card-img-overlay text-center">
                                                                <i className="text-light">{formatDate(product.createdAt, '-')}</i>
                                                            </div>
                                                            <img src={url + item} alt={product.title} />
                                                        </div>
                                                    :
                                                        <div className="carousel-item">
                                                            <img src={url + item} alt={product.title} />
                                                        </div>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </Link>
                    </div> 
                </div>

                <div className="title-price-like_content mb-5">
                    <div className="row">
                        <div className="col-12 wishlist-button d-flex justify-content-end">
                            <AddToWishlist productId={product._id} isAuthenticated={isAuthenticated} />
                        </div>
                    </div>

                    <div className="row title-price">
                        <div className="col-12">
                            <span className="text-uppercase">{product.name}</span>
                            <span className="float-right lead">{"$" + product.price}</span>
                        </div>
                    </div>
                </div>

                <div className="call-seller-btn">
                    <div className="col-12 d-flex justify-content-center">
                        <a href="tel:+900300400" className="btn btn-outline-success btn-lg" data-toggle="tooltip" data-placement="top" title="User Phone number will be here"><i className="fa fa-phone" aria-hidden="true"></i>Call Seller</a>
                    </div>
                </div>
            </div>
        )
    }
    )
    // $$$$$$$$$$$$$$$$$$$ END RENDER PRODUCTS CARDS $$$$$$$$$$$$$$$$$$$ //

    return (
        <div className="container-fluid render-prod mt-5">
            <div className="row">
                {buildProductCard}
            </div>
            <div className="">
                <div className="col-12 d-flex justify-content-center">
                <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                previousLabel={"<"}
                nextLabel={">"}
                disabledClassName={"disabledBtn"}
                breakLabel={""}
                breakClassName={"break-me"}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                renderOnZeroPageCount={null}
            />
                </div>
            </div>
        </div>
    )
}
