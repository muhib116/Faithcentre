import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/apiConfig';
import bg_pattern from '../../../my_resource/img/bg_pattern.webp';
import bookImg from '../../../my_resource/img/books.webp';
import penImg from '../../../my_resource/img/pen.webp';
import TextSliding from '../../TextSliding/TextSliding';
import classes from './banner.module.css';

export default class Banner extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: ['loading...']
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("get_cours_data"));
        const items  = await data.json();
        let   status = false;
        let newItems = '';
        
        if(items.length)
        {
            status = true;
            newItems = items.map(item=>item.name);
        }
        
        this.setState({
            responseStatus: status,
            result: newItems,
            loading: false
        })
    }

    
    componentDidMount(){
        this.fetchItems();
    }
     
    render(){
        const {loading, responseStatus, result} = this.state;
        // console.log("banner rendering");

        return(
            <section
                className={classes.banner_wraper}
                style={{backgroundImage: `url(${bg_pattern})`}}
            >
                 <img loading="lazy"  src={penImg} alt="Pen" className={classes.pen_animation} />
                 <img loading="lazy"  src={bookImg} alt="Books" className={classes.books_animation} />

                <div className={classes.header_text}>
                    <h1 className={classes.header_title}>Welcome To The Faithcentre</h1>
                    
                    {(!loading) ?
                        <TextSliding title="Our Courses" textArray={(responseStatus) ? result : ['Not Data Found']} /> 
                    : '' }
                    
                    <div className={classes.header_button}>
                        <Link to="applay" className="btn primary ">Applay Now</Link>
                        <Link to="application-rule" className="btn danger ">Learn More</Link>
                    </div>
                </div>
            </section>
        );
    };
}