import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';
import api from '../../../lib/apiConfig';
import Alert from '../../Alert/Alert';
import LoadImage from '../../LoadImage/LoadImage';
import classes from './Header.module.css';

export default class Header extends React.Component{
    state = {
        toggleStatus: false,
        address: '',
        phone: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        headerLogo: '',
        siteName: '',
        favicon: '',
        themeColor: '',
        loading: true
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("site_info"));
        const items  = await data.json();

        this.setState({
            address: items.address,
            phone: items.phone,
            facebook: items.facebook,
            twitter: items.twitter,
            instagram: items.instagram,
            youtube: items.youtube,
            headerLogo: items.header_logo,
            siteName: items.site_name,
            favicon: items.favicon,
            themeColor: items.theme_color,
            loading: false
        })
    }
    
    handleNavigation(status){
        this.setState({
            toggleStatus: status
        });
    }
    
    componentDidMount(){
        this.fetchItems();
    }
    
    render()
    {
        const {toggleStatus, address, phone, facebook, twitter, instagram, youtube, headerLogo, siteName, favicon, themeColor, loading} = this.state;
        return (
            <>
                <Helmet>
                    <link rel="icon" href={api.baseUrl(favicon)} />
                    <link rel="apple-touch-icon" href={api.baseUrl(favicon)} />
                    <meta name="theme-color" content={themeColor} />
                </Helmet>
                <Alert title="Warning!" type="warning">
                    This site is under construction
                </Alert>
                <header className={classes.top_header}>
                    
                    <nav className={classes.top_bar}>
                        <div className="container">
                            <div className={classes.left}>
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
                            <div className={classes.top_address}>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={["http://maps.google.com/?saddr=Current+Location&daddr=", address].join()}
                                >
                                    <i className="ion-ios-location"></i>
                                    {address}
                                </a>
                                <a href={['tel:', phone].join()} className={classes.phone}>
                                    <i className="ion-ios-telephone"></i>
                                    {phone}
                                </a>
                            </div>
                        </div>
                    </nav>
                    

                    <nav className={classes.top_navigation}>
                        <div className="container">
                            <button className={(toggleStatus===false) ? classes.top_navigation_toggle : [classes.top_navigation_toggle, classes.active].join(' ')} onClick={()=>this.handleNavigation(true)} aria-label="Toggle Button">
                                <span></span>
                            </button>

                            <Link to="/" className={classes.logo} title={siteName} aria-label={siteName}>
                                {(!loading) ? 
                                    <LoadImage 
                                        src={[api.baseUrl(headerLogo)]}
                                        alt={siteName}
                                    />
                                : '' }
                            </Link>

                            <div className={(toggleStatus===false) ? classes.navigation : [classes.navigation, classes.active].join(' ')}>
                                <button className={(toggleStatus===false) ? classes.top_navigation_toggle : [classes.top_navigation_toggle, classes.active].join(' ')} onClick={()=>this.handleNavigation(false)} aria-label="Toggle Button">
                                    <span></span>
                                </button>

                                <NavLink activeClassName={classes.active} to="/" onClick={()=>this.handleNavigation(false)}>Home</NavLink>
                                <NavLink activeClassName={classes.active} to="/faq" onClick={()=>this.handleNavigation(false)}>FAQ</NavLink>
                                <NavLink activeClassName={classes.active} to="/contact" onClick={()=>this.handleNavigation(false)}>Contact</NavLink>
                                <NavLink activeClassName={classes.active} to="/team" onClick={()=>this.handleNavigation(false)}>Our Team</NavLink>

                                <div className={classes.dropdown_container}>
                                    <a href="#media">
                                        Media
                                        <i className="icon ion-ios-arrow-down"></i>
                                    </a>
                                    <div className={classes.dropdown}>
                                        <NavLink activeClassName={classes.active} to="/photo-gallery" onClick={()=>this.handleNavigation(false)}>Image Gallery</NavLink>
                                        <NavLink activeClassName={classes.active} to="/video-gallery" onClick={()=>this.handleNavigation(false)}>Video Gallery</NavLink>
                                    </div>
                                </div>
                                <Link to="applay" className={classes.apply_btn} onClick={()=>this.handleNavigation(false)}>
                                    <i className="ion-clipboard"></i>
                                    Apply Now
                                </Link>
                            </div>
                            <Link to="applay" className={["btn primary", classes.applay].join(' ')} onClick={()=>this.handleNavigation(false)}>
                                <i className="ion-clipboard"></i>
                                Apply Now
                            </Link>
                        </div>
                    </nav>
                </header>
            </>
        );
    }
}