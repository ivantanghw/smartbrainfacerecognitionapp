import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-tsparticles'

//Below 4 lines of code are old API calling method, which has been deprecated.
//You must add your own API key here from Clarifai.
// const app = new Clarifai.App({
//   apiKey: 'ca4eb1d7da2546c38fd0a1adc5f2edad'
//  });


// Below variable is for the particles moving feature
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
        speed: 2,
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email:'',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // get response from service and return the box details
  calculateFaceLocation = (data) => {
    const clarifaiFaceDetected = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height, clarifaiFaceDetected) --> doing a console.log here to text if things work
    return {
      //values like bottom_row are extracted from services
      bottomRow: height - (clarifaiFaceDetected.bottom_row * height),
      leftCol: clarifaiFaceDetected.left_col * width,
      rightCol: width - (clarifaiFaceDetected.right_col * width),
      topRow: clarifaiFaceDetected.top_row * height
    }
  }

  // update the state with the box details received above
  displayFaceBox = (box) => {
    this.setState({box: box}); // with ES6 we can make it like "this.setState({box});"
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    // console.log('Submitted');
    this.setState({imageUrl: this.state.input});

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    // https://docs.clarifai.com/api-guide/predict/images
    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ID_PUT_HERE'
      },
      body: 
        JSON.stringify({
        "user_app_id": {
          "user_id": "USER_ID",
          "app_id": "APP_ID"
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
    // .then(result => this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2))))
    .then(result => {
      if (result) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {
            entries: count
          }))
        })
      this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)))
      }
    })
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
    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn1={isSignedIn} onRouteChange1={this.onRouteChange}/>
        <Particles className='particles' id="tsparticles" options={particlesOptions}/>
        { route === 'home'
          ? <div> 
              <Logo />
              <Rank 
                userName={this.state.user.name} 
                userEntries={this.state.user.entries} />
              {/* The below onInputChange is a pro5555555perty */}
              <ImageLinkForm 
                onInputChange1={this.onInputChange} 
                onButtonSubmit1={this.onButtonSubmit} />
              <FaceRecognition 
                box1={box}
                imageUrl1={imageUrl} />
            </div>
          : (
            this.state.route === 'signin'
            ? <Signin loadUser1={this.loadUser} onRouteChange1={this.onRouteChange}/>
            : <Register loadUser1={this.loadUser} onRouteChange1={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
