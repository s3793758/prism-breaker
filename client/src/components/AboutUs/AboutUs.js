import { Carousel } from 'antd';
import React from 'react';
import WP1 from '../../assets/img/wp447014.jpg';
import WP2 from '../../assets/img/wp2227164.jpg';
import WP3 from '../../assets/img/wp2227193.jpg';
import WP4 from '../../assets/img/wp2770242.jpg';
import './aboutus.css';
import Donate from '../Donate/Donate';

const AboutUs = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <>
      <Donate />
      <div className="carousel-images">
        <Carousel afterChange={onChange} effect="fade">
          <div className="slide-container">
            <img src={WP1} alt="Slide 1" />
            <p className="content-text">
              The Purpose of this social media platform is to assist the user in
              finding, people to play with, virtually or in person thus
              developing a community based social media platform, assiting in
              the discirpancy, the community has faced over countless of years.
            </p>
          </div>
          <div className="slide-container">
            <img src={WP2} alt="Slide 2" />
            <p className="content-text">
              user: finding people to play along. finding a host to host the
              game. finding new people to play along. User: can host a game,
              game type, game amount of players, game location, game
              rulings/regulations.
            </p>
          </div>
          <div className="slide-container">
            <img src={WP3} alt="Slide 3" />
            <p className="content-text">
              With the majoir increase of people being aware of Dungeon and
              Dragon, from such netflix show, strange things. Also Dungeon and
              Dragon moving comming out in 2023. Also through COVID lockdown,
              Its now a great time for the community to have its own platform.
            </p>
          </div>
          <div className="slide-container">
            <img src={WP4} alt="Slide 4" />
            <p className="content-text">
              We are not affilated with wizard gameing
            </p>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default AboutUs;
