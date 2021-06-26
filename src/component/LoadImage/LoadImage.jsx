import React from 'react';
import preloader from '../../preloader.webp';
import ContentPreLoader from '../ContentPreLoader/ContentPreLoader';

export default class LoadImage extends React.Component
{
    state = {src: preloader || false};
    
    imgRef   = React.createRef();
    myImgDom = null;

    observer = new IntersectionObserver((entries)=>
    {
        if(entries[0].isIntersecting){ // if visible in screen
            this.processImage();
        }
    });


    processImage = ()=>
    {
        const images = this.props.src;
        if(Array.isArray(images))
        {
            images.forEach((img, imgIndex)=>{
                let myImg = new Image();
                myImg.src = img;
                
                if(imgIndex===0)
                {
                    this.setState({
                        src: img
                    });
                }else
                {
                    myImg.addEventListener('load', ()=>{
                        this.setState({
                            src: img
                        });
                    });
                }
            })

        }else{
            this.setState({
                src: images
            })
        }

        /* after image first time loading stope ovserving
        other wise, this image would load again */
        this.observer.unobserve(this.myImgDom);
        
    }


    componentDidMount()
    {
        /* you need to get the element after mout into dom */
        this.myImgDom = this.imgRef.current;

        /* now observe the images */
        this.observer.observe(this.myImgDom);
    }

    render()
    {
        const {src} = this.state;
        const {alt, className} = this.props;
        return(
            (src === false) ?
            <ContentPreLoader 
                style={ {backgroundColor: '#0001'} }
            /> :
            <img src={src} alt={alt} ref={this.imgRef} loading="lazy" className={className} />
        );
    }
}