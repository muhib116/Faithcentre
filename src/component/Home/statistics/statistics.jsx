import React from 'react';
import statistics_bg from '../../../my_resource/img/statistics_bg.webp';
import classes from './statistics.module.css';

let statisticsData = [
    {
        title: "HAPPY STUDENTS",
        number: 2450
    },{
        title: "APPROVED COURSES",
        number: 245
    },{
        title: "CERTIFIED TEACHERS",
        number: 155
    },{
        title: "GRADUATE STUDENTS",
        number: 175
    }
];

export default class Statistics extends React.Component{    
        
    initCounter(element){
        let counters = document.querySelectorAll(element);
        if(counters)
        {
            counters.forEach((counter, index)=>
            {
                let number = statisticsData[index]["number"];
                this.start_count(counter, number);
            });
        }
    }


    start_count(element, upperLimit){
        let step         = 50,
            speed        = 60,
            stepValue    =  Math.ceil(upperLimit/step),
            currentValue = 0;
        
        let interval_id = setInterval(function()
        {
            if((currentValue+stepValue) <= upperLimit)
            {
                currentValue += stepValue;
            }else{
                currentValue = upperLimit;
                clearInterval(interval_id);
            }
            element.innerText = currentValue;
        }, speed);
    }

    componentDidMount(){
        this.initCounter(`.${classes.count}`);
    }
    
    render(){
        return(
            <section
                className={classes.statistics_section}
                style={{backgroundImage: `url(${statistics_bg})`}}
            >
                <div className="container">
                    {statisticsData.map((items, index)=>(
                        <div className={classes.content} key={index+'my_key'}>
                            <span className={[classes.count, "counter"].join(' ')} data-limit="{items.number}">0</span>
                            <span className={classes.text}>{items.title}</span>
                        </div>
                    ))}
                </div>
            </section>
        );
    };
}