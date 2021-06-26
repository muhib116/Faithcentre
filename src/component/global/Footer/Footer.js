import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/apiConfig';
import footer_bg from '../../../my_resource/img/footer_bg.png';
import LoadImage from '../../LoadImage/LoadImage';
import classes from './Footer.module.css';
export default class Footer extends React.Component
{
    state = {
        address: '',
        phone: '',
        email: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        footer_logo: '',
        siteName: '',
        footerText: '',
        loading: true
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("site_info"));
        const items  = await data.json();

        this.setState({
            footerText: items.footer_text,
            phone: items.phone,
            email: items.email,
            facebook: items.facebook,
            twitter: items.twitter,
            instagram: items.instagram,
            youtube: items.youtube,
            footerLogo: items.footer_logo,
            siteName: items.site_name,
            address: items.address,
            loading: false
        })
    }
    
    componentDidMount(){
        this.fetchItems();
    }

    render(){
        const {address, phone, email, facebook, twitter, instagram, youtube, footerLogo, siteName, footerText, loading} = this.state;
        
        return (
            <footer>
                <div
                    className={classes.footer_one}
                    style={{ backgroundImage: `url(${footer_bg})` }}
                >
                    <div className="container">
                        <div>
                            <Link to="/" className={classes.logo} alt={siteName} title={siteName} aria-label={siteName}>
                                {(!loading) ? 
                                    <LoadImage 
                                        src={[api.baseUrl(footerLogo)]}
                                        alt={siteName}
                                    />
                                : '' }
                            </Link>

                            <p className={classes.footer_text}>{footerText}</p>
                            
                            <div className={classes.social_icons}>
                                <a href={facebook} aria-label="Facebook" title="Facebook" target="_blank" rel="noreferrer">
                                    <i className="ion-social-facebook"></i>
                                </a>
                                <a href={twitter} aria-label="Twitter" title="Twitter" target="_blank" rel="noreferrer">
                                    <i className="ion-social-twitter"></i>
                                </a>
                                <a href={instagram} aria-label="Instagram" title="Instagram" target="_blank" rel="noreferrer">
                                    <i className="ion-social-instagram"></i>
                                </a>
                                <a href={youtube} aria-label="youtube" title="youtube" target="_blank" rel="noreferrer">
                                    <i className="ion-social-youtube"></i>
                                </a>
                                
                            </div>
                            
                        </div>
                        
                        <div>
                            <h3 className={classes.title}>Importent Links</h3>
                            <div className={classes.links}>
                                <a href="/section/about-us">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    About Company
                                </a>

                                <Link to="/cours">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Our Courses
                                </Link>

                                <Link to="/contact">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Contact Us
                                </Link>

                                <a href="/section/our-mission">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Our Mission
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className={classes.title}>Additional Links</h3>
                            <div className={classes.links}>
                                <Link to="/faq">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    FAQ
                                </Link>
                                
                                <a href="/page/privacy-and-policy">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Privacy Policy
                                </a>

                                <a href="/page/terms-and-conditions">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Terms & Conditions
                                </a>

                                <Link to="/photo-gallery">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Gallery
                                </Link>
                                
                                <Link to="/video-gallery">
                                    <i className={[classes.icon, "ion-ios-play-outline"].join(' ')}></i>
                                    Videos
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className={classes.title}>Contact Info</h3>
                            <div className={[classes.info, classes.phone].join(' ')}>
                                <span className={classes.icon}>
                                    <i className="ion-ios-telephone"></i>
                                </span>
                                <span className={classes.text}>
                                    <a href={["tel:", phone].join()} className={classes.phone}>
                                        {phone}
                                    </a>
                                </span>
                            </div>

                            <div className={[classes.info, classes.email].join(' ')}>
                                <span className={classes.icon}>
                                    <i className="ion-ios-email"></i>
                                </span>
                                <span className={classes.text}>
                                    <a href={["mail:", email].join()} className={classes.email}>
                                        {email}
                                    </a>
                                </span>
                            </div>

                            <h4 className={classes.title}>Our Address</h4>
                            <div className={[classes.info, classes.address].join(' ')}>
                                <span className={classes.icon}>
                                    <i className="ion-ios-location"></i>
                                </span>
                                <span className={classes.text}>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={["http://maps.google.com/?saddr=Current+Location&daddr=", address].join()}
                                    >
                                        {address}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.footer_two}>
                    <div className="container">
                        <div className={classes.left}>
                            <a href="/page/terms-and-conditions">Terms and Conditions</a>
                            <a href="/page/privacy-and-policy">Privacy and Policy</a>
                        </div>
                        <div className={classes.right}>
                            Copyright &copy;. All Rights Reserved
                            &nbsp;&nbsp;
                            <a href="http://softcoder360.com" target="_blank" rel="noreferrer">More...</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}