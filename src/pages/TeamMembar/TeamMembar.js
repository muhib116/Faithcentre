import React from "react";
import { Helmet } from "react-helmet";
import Alert from "../../component/Alert/Alert";
import ContentPreLoader from "../../component/ContentPreLoader/ContentPreLoader";
import SinglePageHeader from "../../component/global/singlePageHeader/singlePageHeader";
import LoadImage from "../../component/LoadImage/LoadImage";
import api from '../../lib/apiConfig';
import classes from "./TeamMembar.module.css";

let navigationArray = ["Home","","Our Team"];

export default class TeamMembar extends React.Component 
{
    state = {
        loading: true,
        responseStatus: true,
        result: null,
        teacher_name: '',
        teacher_detail: ''
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("our-team"));
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

    handleImageChange = (index)=>{
        let data = this.state.result[index];
        this.setState({
            teacher_name: data.name,
            teacher_detail: data.detail
        });
    }
    
    componentDidMount(){
        this.fetchItems();
        window.scrollTo(0, 0);
    }
     
    render(){
        const {loading, responseStatus, result, teacher_name, teacher_detail} = this.state;

        return(
            <>
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
                        <title>Meet With Our Team</title>
                    </Helmet>
                    
                    <SinglePageHeader title="Team Membar" navigationArray={navigationArray} />
        
                    <section className={classes.teamMembar_section_start}>
                        <div className="container">
                            <div className="section_header">
                                <h2 className="section_title">Our Team</h2>
                                <p>Nice to Meet You</p>
                            </div>
                        

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
                                
                                <div className={classes.card_container}>
                                    
                                    {result.map((items, index)=>(
                                        <div className={classes.card} key={index+'key'}>
                                            <div className={classes.img}>
                                                <LoadImage
                                                    alt={items.name}
                                                    src={[
                                                        items.img_path+'/m/'+items.image_name,
                                                        items.img_path+'/l/'+items.image_name
                                                    ]}
                                                />
                                            </div>
                
                                            <div className={classes.card_footer}>
                                                <div className={classes.card_text}>
                                                    <h5 
                                                        className={classes.name}
                                                        data-modal={`.${classes.team_modal}`}
                                                        onClick={()=>this.handleImageChange(index)}
                                                    >
                                                        {items.name}
                                                    </h5>
                                                    <h6 className={classes.designation}>{items.designation}</h6>
                                                </div>
                                                <div className={classes.social_box}>
                                                    {
                                                        Object.values(JSON.parse(items.social_info)).map((info, index) => 
                                                            <a href={info.link} style={{"--i":index}} key={Math.random()} aria-label={info.link} target="_blank" rel="noreferrer">
                                                                <i className={[classes.icon, info.icon].join(' ')}></i>
                                                            </a>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            : '' }
                        </div>
                    </section>
                </main>

                {(!loading) ? 
                    <div className={["modal_wraper xl", classes.team_modal].join(' ')}>
                        <div className="modal_container">
                            <div className="modal_header">
                                <h5>{teacher_name}</h5>
                                <button className="close">
                                    <i className="ion-close-round"></i>
                                </button>
                            </div>
                            <div className="modal_body">{teacher_detail}</div>
                            <div className="modal_footer"></div>
                        </div>
                    </div>
                : ''}
            </>
        );
    }
}