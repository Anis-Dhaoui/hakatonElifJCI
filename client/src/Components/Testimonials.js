import React from 'react';
import '../css/testimonials.css';

export default function Testimonial(props) {
    const feedback =[
        {
            "id": "01",
            "feedback": "Nous avons passé un moment fantastique à parcourir Siliana en long et en large. Malgré Covid, c'était comme si nous faisions des choses normales pour la première fois depuis longtemps! Des paysages incroyables, des villes et des ruines anciennes, des hôtels et de la nourriture fabuleux et si bon marché - nous ne pouvons pas croire que l'Albanie ne soit pas sur le radar de plus de gens.",
            "name": "Anis Dhaoui"
        },
        {
            "id": "02",
            "feedback": "7 jours de voyage autour de Siliana avec un petit groupe. des tortues, des forts, de beaux whaddi, des boutres, des déserts, des souks, des villages abandonnés, une mosquée à couper le souffle, des croisières au coucher du soleil. Je pourrais continuer - juste un pays brillant si vous avez envie d'aventure.",
            "name": "Marwen Zakraoui"
        },
        {
            "id": "03",
            "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "name": "Ahmed Thambri"
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