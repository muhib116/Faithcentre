import React from "react";
import { Helmet } from "react-helmet";
import AboutUs from "../../component/Home/aboutUs/aboutUs";
import Banner from "../../component/Home/banner/banner";
import BannerBottom from "../../component/Home/bannerBottom/bannerBottom";
import OurCourses from "../../component/Home/ourCourses/ourCourses";
import OurMission from "../../component/Home/ourMission/ourMission";
import WhatOurClientsSay from "../../component/Home/whatOurClientsSay/whatOurClientsSay";
import WhyChooseUs from "../../component/Home/whyChooseUs/whyChooseUs";

export default class Home extends React.Component 
{ 
  componentDidMount(){
      window.scrollTo(0, 0);
  }

  render(){
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
            <title>Home Page</title>
        </Helmet>  
        <Banner />
        <BannerBottom />
        <OurCourses />
        <AboutUs />
        <WhyChooseUs />
        {/* <Statistics /> */}
        <OurMission />
        {/* <OurVision /> */}
        <WhatOurClientsSay />
    </main>
    );
  }
}