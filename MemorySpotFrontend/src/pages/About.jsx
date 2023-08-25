import React from 'react';
import DisplayAboutUs from '../components/Web/About/DisplayAboutUs';
import '../assets/css/displayAboutPage.css';
import Logo from '../assets/images/Memory-Spot-logos_black.svg';
import { SiLinkedin } from 'react-icons/si';
import { FaFacebookF } from 'react-icons/fa';
import NavbarComponent from '../components/Web/MainNavbarComponent';
import profilepic from '../assets/images/Sait-Photo-ID-Original.jpg';
import profilepic2 from '../assets/images/Lynden-Profile.png';
import profilepic3 from '../assets/images/Harshit.png';
import profilepic4 from '../assets/images/mudit.png';
import profilepic6 from '../assets/images/Komal.png';
import profilepic7 from '../assets/images/Tyson.jpg';
import profilepic8 from '../assets/images/colby.jpg';
import profilepic9 from '../assets/images/diaz.jpg';
import profilepic15 from '../assets/images/param.jpg';
import profilepic10 from '../assets/images/dude.jpg';
const developers = [
  {
    name: 'Harshit Patel',
    title: 'Head of Development',
    subtitle: 'Full-stack Developer',
    bio: "I am a skilled full stack web developer proficient in a range of programming languages and frameworks. With a track record of delivering high-quality work, I am committed to creating robust and dynamic web applications that exceed expectations.",
    image: profilepic3,
  },
  {
    name: 'Lynden Kidd',
    title: 'Founder',
    subtitle: 'Front-end Developer',
    bio: "I'm a Calgary-based artist with a diverse skillset in video production, photography, editing, and full-stack software development. I thrive on pushing creative boundaries and delivering fresh perspectives to every project. With experience working with different brands. I'm passionate about bridging the gap between art and technology through innovative software solutions.",
    image: profilepic2,

  },
  {
    name: 'Kylan Kidd',
    title: 'Co-Founder',
    subtitle: 'Front-end Developer',
    bio: "I am a full-stack software developer who goes to the gym daily to be a greek god! I am the life of the party who prefers to stay in instead of going out. I had lots of fun creating this project. Of course there where challenges along the way but I learned many things and problem solved my way through.  ",
    //image: '../assets/images/Kylan.jpg',
    image: profilepic,
  },
  {
    name: 'Paramveer Singh Thind',
    title: 'Director Of Technology',
    subtitle: 'Full-stack Developer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel leo eget turpis pharetra aliquet a non velit. Donec non nunc ullamcorper, rhoncus nisl ac, venenatis urna. Donec euismod urna et metus imperdiet, ut maximus nibh commodo.',
    image: profilepic15,
  },
  {
    name: 'Mudit Somra',
    title: "Design Lead",
    subtitle: 'Front-end Developer',
    bio:"I'm an experienced web developer based in Calgary. I'm passionate about creating user-friendly websites and applications, staying up-to-date with the latest trends and technologies to ensure modern and efficient solutions. Whether working on a new project or improving an existing website, I am committed to delivering exceptional results that exceed expectations.",
    image: profilepic4,
  },

  {
    name: 'Komaldeep Kaur',
    title: 'Front-end Developer',
    subtitle: '',
    bio: "I'm Komaldeep Kaur, a front-end software developer currently pursuing on software development. I have a strong background in creating visually stunning and highly functional user interfaces using HTML, CSS, JavaScript, React and other related technologies. I am passionate about delivering the best user experience possible and strive for excellence in every project I work on.",
    image: profilepic6,
  },
  {
    name: 'Tyson Baskerville',
    title: 'Back-end Developer',
    subtitle: '',
    bio:  "I'm Tyson, a duel major student in networking and software development. My favorite things are books, movies, games and hanging out with my friends.",
    image: profilepic7,
  },
  {
    name: 'Colby Walmsley',
    title: 'Back-end Developer',
    subtitle: '',
    bio: "My name is Colby Walmsley, and I’m a software developer! In my own time, I enjoy drawing, programming, and photography. I’m also looking forward to travelling to different countries with friends in the coming years.",
    image: profilepic8,
  },
  {
    name: 'Diaz Ramazanov',
    title: 'Back-end Developer',
    subtitle: '',
    bio: "Hi, I'm Dias, a back-end developer and current software development student at SAIT. When I'm not studying the latest tech, you can usually find me playing video games.",
    image: profilepic9,
  },
  {
    name: 'Long Vu',
    title: 'Back-end Developer',
    subtitle: '',
    bio: "I'm Long Vu, a student of software development. My favorite things are music, movies, and soccer.",
    image: profilepic10,
  },
 
];

const AboutP = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="About_us">
        <h1 className="About_us_header">About Us</h1>
        <p>
          We are Team Memory spot! Our Team has set out to create and code an
          original Idea From Lynden Kidd. We have set out to help people create
          and track memories for friends and family for years to come.{' '}
        </p>
      </div>

   

      <div>
        {developers.map(developer => (
          <DisplayAboutUs
            key={developer.name}
            name={developer.name}
            title={developer.title}
            subtitle={developer.subtitle}
            bio={developer.bio}
            image={developer.image}
          />
        ))}
      </div>
      <div className="footer">
        <div className="footer-wrapper flex justify-evenly">
          <div className="footer-section-one flex flex-direction-column  ">
            <div className="footer-logo-container">
              <img src={Logo} className="footer-logo" alt="" />
            </div>
            <div className="footer-icons flex justify-evenly">
              {/* <BsTwitter /> */}
              <SiLinkedin />
              {/* <BsYoutube /> */}
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
        </div>
      </div>
    </div>
  );
};

export default AboutP;
