import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import 'tachyons';
import Particles from 'react-tsparticles'
import { Component } from 'react';

// Below 3 variables are for the particles moving feature

const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
        outMode: "bounce",
        random: false,
        speed: 4,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 400,
        },
        value: 25,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
}

const particlesInit = (main) => {
  console.log(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        {/* The below onInputChange is a property */}
        <ImageLinkForm 
          onInputChange1={this.onInputChange} 
          onButtonSubmit1={this.onButtonSubmit}
        />
        {/*<FaceRecognition />*/}
        <Particles className='particles' id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesOptions}/>
      </div>
    );
  }
}

export default App;
