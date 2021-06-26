import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../../component/Alert/Alert';
import ContentPreLoader from '../../component/ContentPreLoader/ContentPreLoader';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import LoadImage from "../../component/LoadImage/LoadImage";
import api from '../../lib/apiConfig';
import classes from './Cours.module.css';

export default class Cours extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null,
        name: this.props.match.params.name
    }
    

    fetchItems = async () => {
        const data   = await fetch(api.url(`cours/${this.state.name}`));
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
                                <div className={classes.img}>
                                    <LoadImage
                                        alt={result[0].name}
                                        src={[
                                            result[0].img_path+'/m/'+result[0].image_name,
                                            result[0].img_path+'/l/'+result[0].image_name,
                                            result[0].img_path+'/xl/'+result[0].image_name
                                        ]}
                                    />
                                </div>
                                <h2 className="section_title">{result[0].name}</h2>

                                <div 
                                    className={classes.content} 
                                    dangerouslySetInnerHTML={{ __html:result[0].detail }}></div>
                            </div>
                    : ''}
                </section>
            </main>
        );
    }
}