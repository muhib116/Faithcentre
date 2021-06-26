import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../../component/Alert/Alert';
import ContentPreLoader from '../../component/ContentPreLoader/ContentPreLoader';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import api from '../../lib/apiConfig';
import classes from './Gallery.module.css';

let navigationArray = ["Home","","Gallery"];

export default class Gallery extends React.Component 
{
    state = {
        imageIndex: 0,
        modalImage: '',
        modalCaption: '',
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("gallery"));
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
    
    handleImageChange = (index)=>{
        if(index>=0 && index < (this.state.result.length))
        {
            let currentItems = this.state.result[index];
            this.setState({
                imageIndex: index,
                modalImage: `${currentItems.img_path}/xl/${currentItems.image_name}`,
                modalCaption: currentItems.caption
            });
        }
    }
        
    render(){
        const {imageIndex, modalImage, modalCaption, loading, responseStatus, result} = this.state;
                
        return(
            <>
                <Helmet>
                    <meta
                        name="keywords"
                        content="Meta Keywords"
                    />
                    <meta
                        name="description"
                        content="Details Of Fath Center"
                    />
                    <title>Media-Images</title>
                </Helmet>
                
                <main>
                    <SinglePageHeader title="Our Gallery" navigationArray={navigationArray} />
            
                    <section className={classes.gallery_section}>
                        <div className="container">
                            <div className="section_header">
                                <h2 className="section_title">Our Gallery</h2>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout.
                                </p>
                            </div>
                        
                            {(responseStatus!==true) ? 
                                <Alert type="warning">
                                    No Result Found
                                </Alert>
                            : ''}

                            {(responseStatus === true) ?
                                <div className={classes.gallery_wraper}>
                                    {(loading) ? 
                                        <ContentPreLoader /> :
                                        result.map((items, index)=>(

                                            <div className={(imageIndex === index) ? [classes.content, classes.active].join(' ') : classes.content } key={index+'key'}>
                                                <div className={classes.overlay}>
                                                    <span
                                                        className={[classes.icons, classes.lightbox_img, "click_ripple_shine"].join(' ')}
                                                        data-modal={`.${classes.gallery_modal}`}
                                                        onClick={()=>this.handleImageChange(index)}
                                                    >
                                                        <i className="ion-android-add"></i>
                                                    </span>
                                                    <p className={classes.image_caption} title={items.caption}>{items.caption}</p>
                                                </div>

                                                <img
                                                    alt={items.caption}
                                                    src={items.img_path+'/m/'+items.image_name}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            : ''}
                        </div>
                    </section>
                </main>
                
                {(!loading) ? 
                    <div className={["modal_wraper xl", classes.gallery_modal].join(' ')}>
                        <div className="modal_container">
                            <div className="modal_header">
                                Our Gallery Image
                                <button className="close">
                                    <i className="ion-close-round"></i>
                                </button>
                            </div>
                            <div className="modal_body">
                                <div className={classes.img}>
                                <img
                                    src={modalImage}
                                    alt={modalCaption}
                                />
                                </div>
        
                                <div className={classes.left_right}>
                                    <button onClick={()=>this.handleImageChange(imageIndex-1)} className={classes.click_ripple_shine}><i className="ion-ios-arrow-back"></i></button>
                                    <button onClick={()=>this.handleImageChange(imageIndex+1)} className={classes.click_ripple_shine}><i className="ion-ios-arrow-forward"></i></button>
                                </div>
                            </div>
                            <div className={["modal_footer", classes.caption].join(' ')}>{result[imageIndex]["caption"]}</div>
                        </div>
                    </div>
                : ''}
            </>
        );
    }
}