import React, { Component } from 'react';
import './App.css';
import ImageZoom from './components/ImageZoom'

class App extends Component {

  render() {

    const img1 = {
          compressedImage: "https://images.pexels.com/photos/683940/pexels-photo-683940.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb",
          originalImage: "https://static.pexels.com/photos/683940/pexels-photo-683940.jpeg",
          zoomFactor: "3",
          dir: "left"
        }

    const img2 = {
          compressedImage: "https://images.pexels.com/photos/681687/pexels-photo-681687.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb",
          originalImage: "https://static.pexels.com/photos/681687/pexels-photo-681687.jpeg",
          zoomFactor: "3",
          dir: "right"
        }
    return (
      <div className="App">
        <ImageZoom options={img1}/>
        <ImageZoom options={img2}/>        
      </div>
    );
  }
}

export default App;
