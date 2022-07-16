import { Link } from "react-router-dom";
import '../css/footer.css';

function Footer() {
    return(
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p className="about">
                <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
                ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
                </p>
                <div className="icons">
                <a href="facebook.com"><i className="fa fa-facebook"></i></a>
                <a href="twitter.com"><i className="fa fa-twitter"></i></a>
                <a href="linkedin.com"><i className="fa fa-linkedin"></i></a>
                <a href="google.com"><i className="fa fa-google-plus"></i></a>
                <a href="facebook.com/instagram"><i className="fa fa-instagram"></i></a>
                </div>
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                <i className="fa fa-map-marker"></i>
                <p><span> Street name and number</span> City, Country</p>
                </div>
                <div>
                <i className="fa fa-phone"></i>
                <p> (+00) 0000 000 000</p>
                </div>
                <div>
                <i className="fa fa-envelope"></i>
                <p><a href="/home"> office@company.com</a></p>
                </div>
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <h2><span> <img src="/assets/images/logo.png" width="170px" alt="Logo" /> </span></h2>
                <p className="menu">
                <Link to="/home"> Home</Link> |
                <Link to="/about"> About</Link> |
                <Link to="/menu"> Menu</Link> |
                <Link to="/contact"> Contact</Link>
                </p>
                <p className="name"> The Way Shop &copy; 2021 </p>
            </div>
        </footer>
    )
}

export default Footer