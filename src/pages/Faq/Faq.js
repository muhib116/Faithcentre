import React from "react";
import { Helmet } from "react-helmet";
import Accordion from "../../component/Accordion/Accordion";
import Alert from "../../component/Alert/Alert";
import ContentPreLoader from "../../component/ContentPreLoader/ContentPreLoader";
import SinglePageHeader from "../../component/global/singlePageHeader/singlePageHeader";
import api from '../../lib/apiConfig';
import classes from "./Faq.module.css";

let navigationArray = ["Home","","FAQ"];

export default class Faq extends React.Component {
    state = {
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("faq"));
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
    
    componentDidMount(){
        this.fetchItems();
        window.scrollTo(0, 0);
    }
     
    render(){
        const {loading, responseStatus, result} = this.state;
        return(
            <main>
                <Helmet>
                    <meta
                        name="keywords"
                        content="Meta Keywords"
                    />
                    <meta
                        name="description"
                        content="Details Of Fath Center"
                    />
                    <title>FAQ Page</title>
                </Helmet>
                
                <SinglePageHeader title="FAQ" navigationArray={navigationArray} />

                <section className={classes.faq_section_start}>
                    <div className="container">
                        <div className="section_header">
                            <h2 className="section_title">FAQ</h2>
                            <p>Frequently Asked Question(s)</p>
                        </div>
                        
                        {(responseStatus!==true) ? 
                            <Alert type="warning">
                                No Result Found
                            </Alert>
                        : ''}


                        {(responseStatus === true) ? 
                            (loading) ? 
                            <ContentPreLoader /> :
                            <Accordion objectArray={result} />
                        : ''}
                    </div>
                </section>
            </main>
        );
    }
}