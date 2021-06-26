/****/
/*
    To call this Component you sould pass a array of Object as a props
    Ex Code: 
    ObjArray = [{
        title: "title goes here",
        value: "Detail goes here"
    }];

    <Accordion objectArray={ObjArray}/>
/*
/****/

import React from 'react';
import classes from './Accordion.module.css';

export default class Accordion extends React.Component {
    state = {
        selected : null
    };

    handleAccordion(e, index)
    {
        // e.target.nextElementSibling.classList.toggle('active');
        if(index !== this.state.selected)
        {
            this.setState({
                selected: index
            });
        }else{
            this.setState({
                selected: null
            });
        }
    }

    render(){
        const {objectArray = []} = this.props; 
        const {selected} = this.state;

        return (
            <div className={classes.accodion_container}>
                { objectArray.map((items, index)=>(
                    <div className={(selected === index) ? [classes.accordion_item, classes.active].join(' ') : classes.accordion_item} key={index+'text'}>
                        <button className={classes.accordion_btn} onClick={(e)=>this.handleAccordion(e,index)}>
                            <div className={classes.left}>
                                <span className={classes.icon}>
                                    <i className="ion-ios-photos-outline"></i>
                                </span>
                                <span className={classes.text}>{items.title}</span>
                            </div>
                            <span className={classes.icon_right}>
                                <i className="ion-ios-arrow-forward"></i>
                            </span>
                        </button>
                        
                        <div className={ (selected === index) ? [classes.content, classes.active].join(' ') : classes.content}>
                            <div className={classes.item}>
                                <div dangerouslySetInnerHTML={{ __html:items.value }}></div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        );
    }
}