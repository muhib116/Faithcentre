/**
 * let navigationArray = ["Home","",Privacy & Policy"];
 * <SinglePageHeader navigationArray={navigationArray} />
 */

import React from "react";
import headerSinglePageHeaderBg from '../../../my_resource/img/single_pag_heade_bg.webp';
import classes from './singlePageHeader.module.css';

export default class SinglePageHeader extends React.Component{
    render(){
        const {title,navigationArray=[]} = this.props;
        return (
            <div
                className={classes.single_page_header}
                style={{backgroundImage: `url('${headerSinglePageHeaderBg}')`}}
            >
                <h1 className={classes.page_name}>{title}</h1>
                <div className={classes.navigation}>
                    {navigationArray.map((items, index)=>(
                        ((index+1)%2!==0) ?
                            <span key={Math.random()}>{items}</span> :
                                <span className={classes.icon} key={Math.random()}>
                                    <i className="ion-record"></i>
                                </span>
                    ))}
                </div>
            </div>
        );
    }
}