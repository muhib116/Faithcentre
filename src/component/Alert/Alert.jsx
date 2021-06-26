/**
 * Example Code To Load Alert:
 * ------------------------------------
 * <Alert title="Alert !" type="warning" close="false">
        No Result Found
    </Alert>
 * 
 */


import React from 'react';
import classes from './Alert.module.css';

export default class Alert extends React.Component
{
    state = {
        icon: '',
        alertClass: '',
        alertCloseStatus: false
    };

    getIcon = (type)=>{
        switch(type){
            default:
                this.setState({
                    icon: 'ion-power',
                    alertClass: [classes.alert, classes.alert].join(' ')
                });
                break;

            case 'success':
                this.setState({
                    icon: 'ion-android-checkmark-circle',
                    alertClass: [classes.alert, classes.alert_success].join(' ')
                });
                break;

            case 'warning':
                this.setState({
                    icon: 'ion-alert-circled',
                    alertClass: [classes.alert, classes.alert_warning].join(' ')
                });
                break;

            case 'danger':
                this.setState({
                    icon: 'ion-android-close',
                    alertClass: [classes.alert, classes.alert_danger].join(' ')
                });
                break;

            case 'primary':
                this.setState({
                    icon: 'ion-information-circled',
                    alertClass: [classes.alert, classes.alert_primary].join(' ')
                });
                break;
        }
    }

    closeAlert = (e)=>{
        let target = e.target;
        this.setState({
            alertCloseStatus: true
        });
        this.detectClosingAnimation(target.parentElement);
    }
    detectClosingAnimation = (alertDiv)=>
    {
        alertDiv.addEventListener('transitionend', (event)=>{
            if(event.propertyName === 'transform')
            {
                alertDiv.remove();
            }
        });
    }

    componentDidMount(){
        this.getIcon(this.props.type);
    }

    render(){
        const {title=false, children, close=true, width="auto"} = this.props;
        const {alertClass, icon:alertIcon, alertCloseStatus} = this.state;
        return(
            <div className={alertCloseStatus ? [alertClass, classes.close].join(' ') : alertClass} style={{maxWidth: width}}>
                <span className={classes.icon}>
                    <i className={alertIcon}></i>
                </span>

                <div className={classes.text}>
                    { (title) ? <strong>{title}</strong> : '' }
                    <p>{children}</p>
                </div>

                {(close === true) ? (
                    <button type="button" className={classes.close} onClick={this.closeAlert}>
                        <i className="ion-android-close"></i>
                    </button>
                ) : ''}
            </div>
        );
    }
}