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

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
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
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let box = data.outputs[0].data.regions.map(item => { return {
      bottomRow: height - (item.region_info.bounding_box.bottom_row * height),
      leftCol: item.region_info.bounding_box.left_col * width,
      rightCol: width - (item.region_info.bounding_box.right_col * width),
      topRow: item.region_info.bounding_box.top_row * height
    }})
    return box;
  }

  // update the state with the box details received above
  displayFaceBox = (box) => {
    this.setState({box: box}); 
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
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

    fetch('http://localhost:3000/imageUrl',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.text())
    .then(result => {
      if (result) {
        fetch('http://localhost:3000/image', {
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
        .catch(console.log)
      this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)))
      }
    })
    .catch(error => console.log('error', error));
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
              {/* The below onInputChange is a property */}
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
