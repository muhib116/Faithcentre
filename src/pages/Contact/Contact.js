import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../../component/Alert/Alert';
import SinglePageHeader from '../../component/global/singlePageHeader/singlePageHeader';
import LoadImage from '../../component/LoadImage/LoadImage';
import api from '../../lib/apiConfig';
import contactImg from '../../my_resource/img/contact.webp';
import classes from './Contact.module.css';

let navigationArray = ["Home","","Contact Us"];
export default class Contact extends React.Component {   
    state = {
        first_name_validate: true,
        last_name_validate: true,
        subject_validate: true,
        email_validate: true,
        message_validate: true,

        first_name: '',
        last_name: '',
        subject: '',
        email: '',
        message: '',
        submit_status: '',
        
        emailAddress: '',
        phone: '',
        address: '',
        contactText: '',
        map_url: ''
    };
    
    handleForm(e)
    {
        let target = e.target;
        let field  = [target.name]+'_validate';

        if(target.name !== 'email')
        {
            this.setState({
                [target.name]: target.value,
                [field]: true
            });
        }else{
            let status = this.emailValidator(target.value);

            if(status)
            {
                this.setState({
                    [field]: true
                });
            }else{
                this.setState({
                    [field]: false
                });
            }
            
            this.setState({
                [target.name]: target.value
            });
        }
    }

    formRef = React.createRef();

    handleSubmit = async (e)=>{
        e.preventDefault();

        let myForm = new FormData(this.formRef.current);
        
        let respons = await fetch(api.url('contact'), {
                        method: 'post',
                        body: myForm
                    });
        let Status  = await respons.text();
        
        this.setState({
            first_name: '',
            last_name: '',
            subject: '',
            email: '',
            message: ''
        });

        if((+Status)===1)
        {
            this.setState({
                submit_status: true
            });
        }else{
            this.setState({
                submit_status: false
            })
        }
    }

    emailValidator(data){
        let expression = /\S+@\S+\.\S+/;
        if(!data.match(expression))
        {
            return 0;
        }else{
            return 1;
        }
    }

    fetchItems = async () => {
        const data   = await fetch(api.url("site_info"));
        const items  = await data.json();

        this.setState({
            emailAddress: items.email,
            phone: items.phone,
            address: items.address,
            contactText: items.contact_text,
            map_url: items.map_url,
            loading: false
        })
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.fetchItems();
    }
     
    render(){
        const {first_name_validate, 
            last_name_validate, 
            subject_validate, 
            email_validate, 
            message_validate,
            first_name, 
            last_name, 
            subject, 
            email, 
            message} = this.state;

        return (
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
                    <title>Contact Us</title>
                </Helmet>

                <SinglePageHeader title="Contact Us" navigationArray={navigationArray} />

                <section className={classes.contact_section_start}>
                    <div className="container">
                        <div className={classes.content_wraper}>
                            <div className={classes.left}>
                            <h2 className={classes.section_title}>Contact Us</h2>
                            <p>{this.state.contactText}</p>
                            <div className={classes.contact_info}>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`http://maps.google.com/?saddr=Current+Location&${this.state.address}`}
                                >
                                    <span className={classes.icon}>
                                        <i className="ion-navigate"></i>
                                    </span>
                                    <div className={classes.content}>
                                        <strong>Visit Us</strong>
                                        <p>{this.state.address}</p>
                                    </div>
                                </a>

                                <a target="_blank" rel="noreferrer" href={`mailto:${this.state.emailAddress}`}>
                                    <span className={classes.icon}>
                                        <i className="ion-email"></i>
                                    </span>
                                    <div className={classes.content}>
                                        <strong>Mail Us</strong>
                                        <p>{this.state.emailAddress}</p>
                                    </div>
                                </a>

                                <a target="_blank" rel="noreferrer" href={`tel:${this.state.phone}`}>
                                    <span className={classes.icon}>
                                        <i className="ion-android-call"></i>
                                    </span>
                                    <div className={classes.content}>
                                        <strong>Call Us</strong>
                                        <p>{this.state.phone}</p>
                                    </div>
                                </a>
                            </div>
                            </div>
                            <div className={classes.right}>
                                <LoadImage
                                    src={[contactImg]}
                                    alt="Contact Us"
                                />
                            </div>
                        </div>
                        
                        <div className={classes.contact_form}>
                            <form onSubmit={(e)=>{this.handleSubmit(e)}} ref={this.formRef}>
                                {(this.state.submit_status) === false ?
                                    <Alert type="danger">Form Not Submitted!</Alert>
                                : ''}
                                
                                {(this.state.submit_status) === true ?
                                    <Alert type="success">Form Successfully Submitted!</Alert>
                                : ''}

                                <div className={classes.form_flex}>
                                    <div className={classes.form_input_wraper}>
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            value={first_name}
                                            required
                                            onChange={(e)=>{this.handleForm(e);}}
                                            placeholder="First Name..."
                                        />
                                        <label htmlFor="first_name">First Name</label>

                                        {(first_name_validate!==true) ?
                                            <span className={classes.validation_message}>
                                                Only String and Number allowed.
                                            </span>
                                        : '' }
                                    </div>
                                    <div className={classes.form_input_wraper}>
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            value={last_name}
                                            required
                                            onChange={(e)=>{this.handleForm(e);}}
                                            placeholder="Last Name..."
                                        />
                                        <label htmlFor="last_name">Last Name</label>

                                        {(last_name_validate!==true) ?
                                            <span className={classes.validation_message}>
                                                Only String and Number allowed.
                                            </span>
                                        : '' }

                                    </div>
                                </div>

                                <div className={classes.form_input_wraper}>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        value={subject}
                                        required 
                                        onChange={(e)=>{this.handleForm(e);}}
                                        placeholder="Subject"
                                    />
                                    <label htmlFor="subject">Subject</label>

                                    {(subject_validate!==true) ?
                                        <span className={classes.validation_message}>
                                            Only String and Number allowed.
                                        </span>
                                    : '' }
                                </div>

                                <div className={classes.form_input_wraper}>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={email}
                                        required 
                                        onChange={(e)=>{this.handleForm(e);}}
                                        placeholder="Enter Email..."
                                    />
                                    <label htmlFor="email">Email</label>

                                    {(email_validate!==true) ?
                                        <span className={classes.validation_message}>
                                            Please Enter a Valid E-mail Address
                                        </span>
                                    : '' }
                                </div>

                                <div className={classes.form_input_wraper}>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        value={message} 
                                        required 
                                        onChange={(e)=>{this.handleForm(e);}}
                                        placeholder="Write somthing..."
                                    ></textarea>
                                    <label htmlFor="message">Message</label>

                                    {(message_validate!==true) ?
                                        <span className={classes.validation_message}>
                                            Only String and Number allowed.
                                        </span>
                                    : '' }
                                </div>

                                <button
                                    type="submit"
                                    aria-label="Submit Button"
                                    className={["btn primary", classes.submit_button].join(' ')}
                                >
                                    Submit Now
                                    <i className="ion-chevron-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className={classes.map_section}>
                    <iframe
                    title="Google Map"
                    rel="noreferrer"
                    src={this.state.map_url}
                    style={{border: 0}}
                    loading="lazy"
                    ></iframe>
                </section>
            </main>
        );
    }
}