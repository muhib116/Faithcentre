/****/
/*
    To call this Component you sould pass a array of string as a props.
    Then Copy First Element and Push As Last Element Of Array
    Ex Code: 
    --------------------------------
        let MyTextArray = [
            "Hifdhul Quran Course",
            "Alim Course",
            "Qira'at Course",
            "Quran Reading",
            "Arabic Language"
        ];
        MyTextArray.push(MyTextArray[0]);

    <TextSliding title="Your Title" textArray={MyTextArray}/>
/*
/****/



import React from "react";
import classes from './TextSliding.module.css';

export default class TextSliding extends React.Component{
    state = {
        textSlidingAmount : 0,
        textSlidingIteration: 0,
        slidingStep: 0,
        textArray: ['Loading...'],
        distance: 1,
        slidingSpeed: 2000
    };

    
    innerTextRef = React.createRef();
    componentDidMount()
    {
        // add first element as last element for sliding
        let newTextArray = this.props.textArray;
        newTextArray.push(newTextArray[0]);

        this.setState({
            distance: this.innerTextRef.current.firstElementChild.offsetHeight,
            slidingStep: this.props.textArray.length,
            textArray: newTextArray
        });

        this.handleTextSliding();
    }
    
    
    componentWillUnmount(){
        clearInterval(this.intervalID);//stop text sliding
    }
    

    /* text sliding part start */
        handleTextSliding = () => 
        {
            this.intervalID = setInterval(() => 
            {                
                if(this.state.textSlidingIteration<this.state.slidingStep)
                {
                    this.setState({
                        textSlidingAmount: this.state.distance * this.state.textSlidingIteration,
                        textSlidingIteration: this.state.textSlidingIteration + 1
                    });
                }else{
                    this.setState({
                        textSlidingAmount: 0,
                        textSlidingIteration: 0
                    });
                }
            }, this.state.slidingSpeed);
        }
    /* text sliding part end */

    render()
    {
        // console.log(this.state);
        // console.log(this.props);
        const {textSlidingAmount, textSlidingIteration, slidingStep, textArray} = this.state;
        const {title} = this.props;
        
        // console.log(textSlidingIteration, slidingStep, (textSlidingIteration === slidingStep));
        return (
            <div className={classes.text_sliding_wraper}>
            <span className={classes.pre_text}>{title} </span>
            <div className={classes.text_wraper}>
              <div ref={this.innerTextRef} className={classes.innerText} style={ 
                (textSlidingIteration === slidingStep) ? 
                  {transition: "0s", transform: `translateY(0px)`} : 
                  {transition: "0.5s ease-in-out", transform: `translateY(-${textSlidingAmount}px)`}
                }>
                {textArray.map((cours, index)=>(
                  <span key={index+'key'}>{cours}</span>
                ))}
              </div>
            </div>
          </div>
        );
    }   
}