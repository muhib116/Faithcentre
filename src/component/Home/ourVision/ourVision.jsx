import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/apiConfig';
import Accordion from '../../Accordion/Accordion';
import Alert from '../../Alert/Alert';
import ContentPreLoader from '../../ContentPreLoader/ContentPreLoader';
import LoadImage from '../../LoadImage/LoadImage';
import classes from './ourVision.module.css';

export default class ourVision extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("get_section_data/our-vision"));
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
    }
     
    render(){
        const {loading, responseStatus, result} = this.state;
        
        return(
            <section className={classes.our_vision_section}>
                {(responseStatus!==true) ? 
                    <div className="container">
                      <Alert type="warning">
                          No Result Found
                      </Alert>
                    </div>
                : ''}
                  
                {(responseStatus === true) ? 
                    (loading) ? 
                    <ContentPreLoader /> :
                    <>
                      {result.map(item=>(
                        <div className="container" key={Math.random()}>
                          <div className={classes.left}>
                            
                            <h2 className="section_title">{item.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html:item.short_detail }}></div>
                            
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


                            <Link to={`section/${item.slug}`} className={["btn danger ", classes.our_vision_read_more].join(' ')}>
                                <i className="ion-plus-circled"></i>
                                Read More
                            </Link>


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
        );
    }
}
      