import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons';
import Particles from 'react-tsparticles'

//Below 4 lines of code are old API calling method, which has been deprecated.
//You must add your own API key here from Clarifai.
// const app = new Clarifai.App({
//   apiKey: 'ca4eb1d7da2546c38fd0a1adc5f2edad'
//  });


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

// let raw = JSON.stringify({
//   "user_app_id": {
// 		"user_id": "tra7i359vth1",
// 		"app_id": "d20f248f4a5f4db88aa17ed8c7169ef2"
// 	},
//   "inputs": [
//     {
//       "data": {
//         "image": {
//           // image used for face detection
//           "url": this.state.imageUrl
//         }
//       }
//     }
//   ]
// });

// let requestOptions = {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Authorization': 'Key 3ef7c5cbf81b4bcc863b3abef3fc0834'
//   },
//   body: 
//     JSON.stringify({
//     "user_app_id": {
//       "user_id": "tra7i359vth1",
//       "app_id": "d20f248f4a5f4db88aa17ed8c7169ef2"
//     },
//     "inputs": [
//       {
//         "data": {
//           "image": {
//             // image used for face detection
//             "url": this.state.imageUrl
//           }
//         }
//       }
//     ]
//   })
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 3ef7c5cbf81b4bcc863b3abef3fc0834'
      },
      body: 
        JSON.stringify({
        "user_app_id": {
          "user_id": "tra7i359vth1",
          "app_id": "d20f248f4a5f4db88aa17ed8c7169ef2"
        },
        "inputs": [
          {
            "data": {
              "image": {
                // image used for face detection
                "url": this.state.input
              }
            }
          }
        ]
      })
    })
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
    .catch(error => console.log('error', error));
    // deprecated models
    // app.models
    //   .predict('a403429f2ddf4b49b307e318f00e528b', 
    //   'https://petapixel.com/assets/uploads/2012/07/1992_mini.jpeg')
    //   .then(response => {
    //     console.log('hi',  response)
    //   }
    // ).catch(err => {
    //     console.log(err)
    //   });
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
          onButtonSubmit1={this.onButtonSubmit} />
        <FaceRecognition 
          imageUrl1={this.state.imageUrl} />
        <Particles className='particles' id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesOptions}/>
      </div>
    );
  }
}

export default App;
