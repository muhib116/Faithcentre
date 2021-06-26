import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../../component/Alert/Alert';
import ContentPreLoader from '../../component/ContentPreLoader/ContentPreLoader';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import api from '../../lib/apiConfig';
import classes from './Videos.module.css';


let navigationArray = ["Home","","Videos"];

export default class Videos extends React.Component {

    state = {
        videoIndex: 0,
        loading: true,
        responseStatus: true,
        result: []
    };

    fetchItems = async () => {
        const data   = await fetch(api.url("video"));
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
            this.setState({
                videoIndex: index
            });
        }
    }
 


    render(){
        const {videoIndex, loading, responseStatus, result=[]} = this.state;
        
        // return null;
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
                    <title>Our-Videos</title>
                </Helmet> 

                <main>
                    <SinglePageHeader title="Our Videos" navigationArray={navigationArray} />
            
                    <section className={classes.videos_section}>
                        <div className="container">
                            <div className="section_header">
                                <h2 className="section_title">Our Videos</h2>
                                <p>Please Feel Free To Check Our videos</p>
                            </div>

                            

                            {(responseStatus !== true) ? 
                                <Alert type="warning">No Result Found !</Alert> 
                            : '' }

                            {(responseStatus === true) ? (
                                
                                (loading) ? 
                                    <ContentPreLoader /> 
                                    : (
                                        <div className={classes.videos_wraper}>
                                            {result.map((items, index)=>(
                                                <div className={(videoIndex === index) ? [classes.content, classes.active].join(' ') : classes.content } key={index+'key'}>
                                                    <div className={classes.overlay}>
                                                        <span
                                                            className={[classes.icons, classes.lightbox_img, "click_ripple_shine"].join(' ')}
                                                            data-modal={`.${classes.videos_modal}`}
                                                            onClick={()=>this.handleImageChange(index)}
                                                        >
                                                            <i className="ion-android-add"></i>
                                                        </span>
                                                        <p className={classes.video_caption} title={items.caption}>{items.caption}</p>
                                                    </div>
                                                    <img loading="lazy"  src={["https://i.ytimg.com/vi/", items.video_code, "/hq720.jpg"].join('')} alt={items.caption} />
                                                </div>
                                            ))}
                                        </div>
                                )
                            ) : ""}
                        </div>
                    </section>
                
                </main>
    
                {(responseStatus === true && !loading) ? (
                    <div className={["modal_wraper xl", classes.videos_modal].join(' ')}>
                        <div className="modal_container">
                            <div className="modal_header">
                                Our Video Image
                                <button className="close">
                                    <i className="ion-close-round"></i>
                                </button>
                            </div>
                            
                            <div className="modal_body">
                                <div  className={classes.videoIframe}>
                                    <iframe src={["https://www.youtube.com/embed/", result[videoIndex]["video_code"]].join('')} title={result[videoIndex]["caption"]} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  loading="lazy"></iframe>
                                </div>
        
                                <div className={classes.left_right}>
                                    <button onClick={()=>this.handleImageChange(videoIndex-1)} className={classes.click_ripple_shine}><i className="ion-ios-arrow-back"></i></button>
                                    <button onClick={()=>this.handleImageChange(videoIndex+1)} className={classes.click_ripple_shine}><i className="ion-ios-arrow-forward"></i></button>
                                </div>
                            </div>
                            <div className={["modal_footer", classes.caption].join(' ')}>{result[videoIndex]["caption"]}</div>
                        </div>
                    </div>
                ) : ''}
            </>
        );
    }
}