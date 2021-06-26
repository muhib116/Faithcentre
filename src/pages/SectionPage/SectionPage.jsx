import React from 'react';
import { Helmet } from 'react-helmet';
import Accordion from '../../component/Accordion/Accordion';
import Alert from '../../component/Alert/Alert';
import ContentPreLoader from '../../component/ContentPreLoader/ContentPreLoader';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import LoadImage from '../../component/LoadImage/LoadImage';
import api from '../../lib/apiConfig';
import classes from './SectionPage.module.css';

export default class SectionPage extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url(`get_section_data/${this.props.match.params.name}`));
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
        return(
            <>
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
                                    content={result[0].strip_short_detail}
                                />
                                <title>{ result[0].title }</title>
                            </Helmet>
                            
                            <SinglePageHeader title={result[0].title} navigationArray={["Home","", result[0].title]} />
                        </>
                    : ''
                : ''}
            
                <section className={classes.section_page}>
                    {(responseStatus!==true) ? 
                        <Alert type="warning">
                            No Result Found
                        </Alert>
                    : ''}
                    
                    {(responseStatus === true) ? 
                        (loading) ? 
                        <ContentPreLoader /> :
                        <>
                            {result.map(item=>(
                                <div className="container" key={Math.random()}>
                                    <div className={classes.left}>
                                        
                                        <h2 className="section_title">{item.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html:item.detail }}></div>
                                        
                                        {(item.note==='') ? (
                                            <>
                                                <br />
                                                <Alert type="danger" close="false" width="100%">
                                                    <div dangerouslySetInnerHTML={{ __html:item.note }}></div>
                                                </Alert>
                                            </>
                                        ) : ''}

                                        {(item.meta_data.length) ? 
                                            <Accordion objectArray={item.meta_data}/>
                                        : ''}


                                    </div>

                                    <div className={classes.right}>
                                        <LoadImage 
                                        src={[item.img_path+'/m/'+item.image_name, item.img_path+'/l/'+item.image_name, item.img_path+'/xl/'+item.image_name]} 
                                        alt="Why Choose Us" 
                                        />
                                        <div className={classes.img_caption} dangerouslySetInnerHTML={{ __html:item.note }}></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    : ''}
                </section>
            </>
        );
    }
}
      