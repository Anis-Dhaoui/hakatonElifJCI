import React from 'react';
import '../css/testimonials.css';

export default function Testimonial(props) {
    const feedback =[
        {
            "id": "01",
            "feedback": "I found my car on TheWayShop for a good deal. I am satisfied with the service",
            "name": "Sandra Louie"
        },
        {
            "id": "02",
            "feedback": "As a professional, I can sell quickly and easily on TheWayShop",
            "name": "Brian Thomas"
        },
        {
            "id": "03",
            "feedback": "Now I can earn my pocket money thanks to TheWayShop!",
            "name": "Angela Turatig"
        },
        {
            "id": "04",
            "feedback": "Lorem ipsum lorem ipsum lorem ipsum",
            "name": "Sandra Donalla"
        }
    ]

    const ShowFeedback = feedback.filter((item, index) => index <= 2)
        .map(item =>{
            return(
                <div className={item.id === "01" ? "carousel-item active" : "carousel-item"} key={item.id}>
                    <blockquote>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-8 col-sm-offset-2">
                                <p> {item.feedback} </p>
                                <small> 
                                    {item.name}
                                </small>
                            </div>
                        </div>
                    </blockquote>
                </div>
            )
        })

    return (
        <div className="col-md-12 " data-wow-delay="0.2s">
            <div id="quote-carousel" className="carousel slide" data-ride="carousel" data-interval="2000">
                {/* <!-- Bottom Carousel Indicators --> */}
                <ol className="carousel-indicators">
                    <img data-target="#quote-carousel" data-slide-to="0" className="active" 
                        src="/assets/testimonials-images/1.jpg" alt="2" />
                    <img data-target="#quote-carousel" data-slide-to="1" 
                        src="/assets/testimonials-images/2.jpg" alt="3" />
                    <img data-target="#quote-carousel" data-slide-to="2" 
                        src="/assets/testimonials-images/3.jpg" alt="4" />
                </ol>

                {/* <!-- Carousel Slides / Quotes --> */}
                <div className="carousel-inner">
                    {ShowFeedback}
                </div>
                <a className="carousel-control-prev xxx" href="#quote-carousel" role="button" data-slide="prev">
                    <i className="fa fa-chevron-left xxx"></i>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next xxx" href="#quote-carousel" role="button" data-slide="next">
                <i className="fa fa-chevron-right xxx"></i>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
}