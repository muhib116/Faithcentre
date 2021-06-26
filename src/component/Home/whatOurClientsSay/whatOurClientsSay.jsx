import React from 'react';
import api from '../../../lib/apiConfig';
import Alert from '../../Alert/Alert';
import ContentPreLoader from '../../ContentPreLoader/ContentPreLoader';
import LoadImage from '../../LoadImage/LoadImage';
import classes from './whatOurClientsSay.module.css';

export default class WhatOurClientsSay extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("get_customer_feedback_data"));
        const items  = await data.json();
        let   status = false;

        if(items.length)
        {
            status = true;
        }
        
        this.setState({
            responseStatus: status,
            result: items,
            loading: false
        })

    }

    carouselContainerRef = React.createRef();
    handleScroll(direction){
        console.log(direction);
        this.carouselContainerRef.current.scrollBy((50*direction),0);
    }
    
    componentDidMount(){
        this.fetchItems();
    }
     
    render(){
        const {loading, responseStatus, result} = this.state;
                
        return(
            <section className={classes.our_client_section}>
                <div className="container">
                    <div className="section_header">
                        <h2 className="section_title">What Our Clients Say</h2>
                        <p>Read what our clients say about our Services.</p>
                    </div>

                    
                    {(responseStatus!==true) ? 
                        <div className="container">
                            <Alert type="warning">
                                No Result Found
                            </Alert>
                        </div>
                    : ''}

                    <div className={classes.left_right_navigator}>
                        <button onClick={()=>{this.handleScroll(-1)}}><i class="ion-ios-arrow-back"></i></button>
                        <button onClick={()=>{this.handleScroll(+1)}}><i class="ion-ios-arrow-forward"></i></button>
                    </div>
                    
                    <div className={classes.content_wraper} ref={this.carouselContainerRef}>
                        {(loading) ? 
                            <ContentPreLoader /> :
                            <>
                                { result.map(items => (
                                    <div className={classes.content} key={Math.random()}>
                                        <div className={classes.client_say}>
                                            <span className={classes.decoration}><i className="ion-quote"></i></span>
                                            <p>{items.details}</p>
                                        </div>

                                        <LoadImage
                                            src={[
                                                items.img_path+'/s/'+items.path,
                                                items.img_path+'/m/'+items.path,
                                                items.img_path+'/l/'+items.path
                                            ]}
                                            alt={items.name}
                                            className={classes.client_img}
                                        />

                                        <h4 className={classes.client_name}>{items.name}</h4>
                                        <span className={classes.country}>From {items.country}</span>
                                    </div>
                                )) }
                            </>
                        }
                    </div>
                </div>
            </section>
        );
    }
}