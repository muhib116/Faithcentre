import React from 'react';
import { Link } from 'react-router-dom';
import classes from './bannerBottom.module.css';

export default class BannerBottom extends React.Component{
    render(){
        return(
            <section className={classes.banner_bottom}>
                <div className="container">
                    <Link to="/contact" className={classes.content}>
                        <span className={classes.icon}>
                            <i className="ion-chatboxes"></i>
                        </span>
                        <span className={classes.text}>
                            <strong>Support</strong>
                            <span>Dedicated support</span>
                        </span>
                    </Link>
                    <Link to="/team" className={classes.content}>
                        <span className={classes.icon}>
                            <i className="ion-university"></i>
                        </span>
                        <span className={classes.text}>
                            <strong>Qualified Teacher</strong>
                            <span>Meet With Our Qualified Teacher</span>
                        </span>
                    </Link>
                    <Link to="/faq" className={classes.content}>
                        <span className={classes.icon}>
                            <i className="ion-ios-bookmarks"></i>
                        </span>
                        <span className={classes.text}>
                            <strong>Your Questions</strong>
                            <span>Feel Free to check your questions and Our Answers</span>
                        </span>
                    </Link>
                </div>
            </section>
        );
    };
}