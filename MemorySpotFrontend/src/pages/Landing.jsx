import React, { useEffect } from 'react';
import '../assets/css/landing.css';
import NavbarComponent from '../components/Web/MainNavbarComponent';
import { Link, useNavigate } from 'react-router-dom';

import BannerImage from '../assets/images/van.jpg';
import AboutBackgroundImage from '../assets/images/van1.jpg';
import '../assets/css/landing.css';
import { BsPlayFill } from 'react-icons/bs';
import ProfilePic from '../assets/images/john-doe-image.png';
import { AiFillStar } from 'react-icons/ai';
import Footer from '../components/Web/Footer/Footer';
import PickMeals from '../assets/images/pick-meals-image.png';
import ChooseMeals from '../assets/images/choose-image.png';
import DeliveryMeals from '../assets/images/delivery-image.png';
import { useSelector } from 'react-redux';
import { HStack } from '@chakra-ui/react';

const LandingP = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLogin) {
      navigate('/home');
    }
  });

  const workInfo = [
    {
      image: PickMeals,
      title: 'Travel',
      text: 'Travel to your favourite place',
    },
    {
      image: ChooseMeals,
      title: 'Record',
      text: 'Drop your recorded memory',
    },
    {
      image: DeliveryMeals,
      title: 'Set Radius',
      text: 'Set accessibility radius for memory',
    },
  ];
  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center item-center mar-7">
        <div className="pad-2">
          <h1
            className="primary-heading plr-2"
            style={{ lineHeight: '2.5rem' }}
          >
            Memories are made to be Shared
          </h1>
          <p className="primary-text pad-1">
            Share your memories from anywhere, with friends, or everybody!
          </p>
          <button className="secondary-button m-2">
            <Link to="/sign-on"> Sign Up Now! </Link>
          </button>
        </div>
        <div>
          <img
            src={BannerImage}
            alt=""
            style={{
              width: '420px',

              height: '390px',
              borderRadius: '1rem',
            }}
          />
        </div>
      </div>

      <div className="flex justify-center item-center mar-7">
        <div>
          <img
            src={AboutBackgroundImage}
            alt=""
            style={{ width: '420px', height: '390px', borderRadius: '1rem' }}
          />
        </div>

        <div className="pad-2" style={{}}>
          <h1
            className="primary-heading plr-2"
            style={{ lineHeight: '2.5rem' }}
          >
            Listen to Memories posted by your Friends
          </h1>

          <HStack className="about-buttons-container flex mart-2">
            
            <button className="watch-video-button pad-2">
              <a href="https://youtu.be/9Yf4cuQKn-0">
                <BsPlayFill /> Launch Video
              </a>
            </button>
           
            <button className="watch-video-button pad-2">
              <a href="https://youtu.be/2T-_hpcQjUY">
                <BsPlayFill /> Our First memory!
              </a>
            </button>
          </HStack>
        </div>
      </div>

      <div className="work-section-wrapper flex justify-center item-center flex-direction-column mar-7 ">
        <div className="work-section-top flex flex-direction-column item-center">
          <h1 className="primary-heading pad-2 ">How It Works</h1>
          <p className="primary-text text-align-center">
            Travel to your favourite location and record your memory. Then drop
            the memory in that location either to public or private map. You can
            also tag your freind and the memory dropped will only be accessible
            to those who are in that particular region thus your friend and
            anyone esle have to travel to that particular place to listen to
            memory.
          </p>
        </div>
        <div className="work-section-bottom flex mar-2 ">
          {workInfo.map(data => (
            <div
              className="work-section-info m-6 text-align-center flex flex-direction-column justify-center"
              key={data.title}
              style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
            >
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2 className="secondary-heading">{data.title}</h2>
              <p className="mart-2">{data.text}</p>
            </div>
          ))}
        </div>
        {/* <div className="work-section-bottom flex my-2">
          {workInfo.map(data => (
            <div
              className="work-section-info m-6 text-align-center"
              key={data.title}
            >
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2 className="my-1">
                <b>{data.title}</b>
              </h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>*/}
      </div>

      <div className="work-section-wrapper flex flex-direction-column text-align-center item-center justify-center">
        <div className="work-section-top flex flex-direction-column item-center">
          <h1 className="primary-heading pad-2 ">What They Are Saying? </h1>
          <p className="primary-text" style={{ width: '80vw' }}>
            Our users are really happy and amazed to use this new memory sharing
            method where person can actually connect how we feel by being in
            particular location
          </p>
        </div>
        <div className="testimonial-section-bottom flex item-center justify-center flex-direction-column">
          <img src={ProfilePic} alt="" />
          <p className="text-align-center padt-2 ">
            Hi myself Joe, I really enjoyed using this app. I love to drop
            memories for my friend at wierd location with funny message and
            whenever they travel that place they find that message and respond
            back with thier thought. It really feel that they are connecting
            with my feelings since they can feel what i shared.
          </p>
          <div className="testimonials-stars-container flex pad-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2>John Doe</h2>
        </div>
      </div>
      <div className="contact-page-wrapper flex justify-center item-center flex-direction-column mar-7">
        <h1 className="primary-heading text-align-center">
          Have Question In Mind?
          <br />
          Let Us Help You
        </h1>

        <div className="contact-form-container flex justify-center item-center">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="secondary-button">Submit</button>
        </div>
      </div>
      {/* <div className="footer-wrapper flex justify-evenly">
        <div className="footer-section-one flex flex-direction-column  ">
          <div className="footer-logo-container">
            <img src={Logo} className="footer-logo" alt="" />
          </div>
          <div className="footer-icons flex justify-evenly">
            <BsTwitter />
            <SiLinkedin />
            <BsYoutube />
            <FaFacebookF />
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns flex flex-direction-column">
            <span>Qualtiy</span>
            <span>Help</span>
            <span>Share</span>
            <span>Carrers</span>
            <span>Testimonials</span>
            <span>Work</span>
          </div>
        </div>
        <div className="footer-section-three ">
          <div className="footer-section-columns flex flex-direction-column">
            <span>244-5333-7783</span>
            <span>memorymap@gmail.com</span>
            <span>memmaphelp@gmail.com</span>
          </div>
        </div>
        <div className="footer-section-four ">
          <div className="footer-section-columns flex flex-direction-column">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default LandingP;
