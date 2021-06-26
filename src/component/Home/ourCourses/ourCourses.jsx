import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/apiConfig';
import Alert from '../../Alert/Alert';
import ContentPreLoader from '../../ContentPreLoader/ContentPreLoader';
import LoadImage from '../../LoadImage/LoadImage';
import classes from './ourCourses.module.css';

export default class OurCourses extends React.Component
{
    state = {
        loading: true,
        responseStatus: true,
        result: null
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("get_cours_data"));
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
            <section className={classes.our_courses_section}>
                <div className="container">
                    <div className="section_header">
                        <h2 className="section_title">Our Courses</h2>
                        {/* <p></p> */}
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
                        
                        <div className={classes.course_wraper}>

                            {result.map((items, index)=>(
                                <div key={Math.random()}>
                                    <span className={classes.use_as_bg}>{((index+1)>9) ? `0${index+1}` : (index+1) }</span>
                                    
                                    <div className={classes.img}>
                                        <LoadImage
                                            src={[
                                                items.img_path+'/m/'+items.image_name,
                                                items.img_path+'/l/'+items.image_name,
                                            ]}
                                            alt={items.name}
                                        />
                                    </div>
    
                                    <div className={classes.content}>
                                        <h4 className={classes.title}>{items.name}</h4>
                                        <p className={classes.sort_description}>{items.detail}</p>
                                        
                                        <Link to={`cours/${items.slug}`}>
                                            Read More
                                            <svg id="Capa_1" viewBox="0 0 375.01 375.01">
                                                <g>
                                                    <path
                                                    d="M330.254,210.966c-56.916,1.224-110.16,25.704-167.076,28.764c-16.524,0.612-33.048-1.224-45.9-8.568    c23.256-4.283,45.288-12.239,61.812-27.54c17.749-15.911,19.584-45.287,8.568-66.095c-10.404-19.584-36.72-20.196-55.08-15.3    C89.125,132.63,59.75,184.65,84.229,221.369c-26.928,1.836-53.856,0-80.172,1.225c-5.508,0.611-5.508,8.567,0.612,8.567    c26.928,1.836,59.364,4.284,91.188,2.448c1.836,1.225,3.672,3.061,5.508,4.284c64.872,45.288,159.732-11.628,229.5-13.464    C338.821,223.817,338.821,210.354,330.254,210.966z M89.737,196.277c-6.732-25.091,15.3-46.511,35.496-56.916    c20.196-10.404,48.96-10.404,55.692,15.912c7.956,30.6-18.36,48.959-43.452,56.916c-11.628,3.672-22.644,6.12-34.272,7.344    C96.47,213.413,92.186,206.069,89.737,196.277z"
                                                    />
                                                    <path
                                                    d="M371.869,211.577c-8.567-5.508-16.523-11.016-24.479-16.523c-6.732-4.896-13.464-10.404-21.42-12.24    c-6.12-1.836-12.24,7.344-6.732,11.627c6.732,4.896,14.076,9.18,20.809,13.464c4.896,3.061,9.792,6.732,14.075,9.792    c-4.896,2.448-9.792,4.284-14.688,6.732c-3.672,1.836-7.956,3.672-11.628,5.508c-1.224,0.612-2.448,1.836-3.061,3.06    c-1.836,2.448-0.611,1.225,0,0.612c-2.447,1.836-2.447,7.956,1.837,7.344l0,0c1.224,0.612,2.447,0.612,4.283,0.612    c4.284-1.224,9.181-3.06,13.464-4.896c9.181-3.673,18.36-7.345,26.929-12.24C376.153,220.758,376.153,214.025,371.869,211.577z"
                                                    />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>    
                            ))}
                        
                        </div>
                    : ''}
                </div>
            </section>
        );
    };
}