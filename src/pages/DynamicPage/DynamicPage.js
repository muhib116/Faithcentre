import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../../component/Alert/Alert';
import ContentPreLoader from '../../component/ContentPreLoader/ContentPreLoader';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import api from '../../lib/apiConfig';
import classes from './DynamicPage.module.css';

export default class DynamicPage extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null,
        pageName: this.props.match.params.pageName
    }
    

    fetchItems = async () => {
        const data   = await fetch(api.url(`page/${this.state.pageName}`));
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
        window.scrollTo(0,0);
    }
    
    render(){
        const {loading, responseStatus, result} = this.state;

        return (
            <main>
                {(!loading) ? 
                    (responseStatus === true) ? 
                        <>
                            <Helmet>
                                <meta
                                    name="keywords"
                                    content={ result[0].slug }
                                />
                                <meta
                                    name="description"
                                    content={ result[0].meta_description }
                                />
                                <title>{ result[0].name }</title>
                            </Helmet>
                            
                            <SinglePageHeader title={result[0].name} navigationArray={["Home","", result[0].name]} />
                        </>
                    : ''
                : ''}

               
                <section className={classes.dynamic_page_start}>
                    {(responseStatus!==true) ? 
                        <Alert type="warning">
                            No Result Found
                        </Alert>
                    : ''}
                    
                    {(responseStatus === true) ?
                        (loading) ? 
                            <ContentPreLoader style={{width: "100%", height: "50vh"}} /> :
                            <div className="container">
                                <h2 className="section_title">{result[0].name}</h2>

                                <div 
                                    className={classes.content} 
                                    dangerouslySetInnerHTML={{ __html:result[0].page }}></div>
                            </div>
                    : ''}
                </section>
            </main>
        );
    }
}