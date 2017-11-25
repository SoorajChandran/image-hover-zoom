import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ImageZoom extends Component {

  constructor(props){
    super(props);
    this.zoomFactor = parseInt(this.props.options.zoomFactor, 10) || 3;
    this.frameHeight = 100;
    this.frameWidth = 200;
  }

  addFrame = (x,y,el) => {
    const { left, top , width ,height } = el.getBoundingClientRect();
    const minX = Math.min(x,(left + width - this.frameWidth));
    const minY = Math.min(y,(top + height - this.frameHeight));
    const frameEl = this.getTargetElement(el,"frame");
    frameEl.style.left = `${minX}px`;
    frameEl.style.top = `${minY}px`;
    const scaledValues = this.scaleValues(minX - el.offsetLeft,minY - el.offsetTop);
    this.getTargetElement(el,"zoomedImageContainer").style.backgroundPosition = `${scaledValues[0]}px ${scaledValues[1]}px`;
  }

  getTargetElement = (el,targetId) => {
    const children = el.parentNode.childNodes;
    return Array.from(children).find(function(item){
      if(item.id === targetId){
        return true;
      }
    })
    return false;
  }

  hide(id,el){
      this.getTargetElement(el,id).style.display = 'none';
  }

  scaleValues = (x,y) => ([-1*this.zoomFactor*parseInt(x,10),-1*this.zoomFactor*parseInt(y,10)])

  showZoomedContainer = (el) => {
    const targetEl = this.getTargetElement(el,"zoomedImageContainer");
    targetEl.style.display = 'block';
    const { left, top , width } = el.getBoundingClientRect();
    targetEl.style.left = left <= window.screen.width/2 ? `${left + width}px`:  `${left - 600}px`;
    targetEl.style.top = `${top}px` ;

    if(this.isImageLoaded()){
      targetEl.style.background = `url(${this.props.options.originalImage}) no-repeat`;
      targetEl.style.backgroundSize = `${this.zoomFactor*600}px ${this.zoomFactor*300}px`;
    }else{
      targetEl.style.background = `url(${this.props.options.  compressedImage}) no-repeat`;
      targetEl.style.backgroundSize = `${this.zoomFactor*600}px ${this.zoomFactor*300}px`;
    }
    
  }

  isImageLoaded = () => {
    const img = new Image();
    img.src = this.props.originalImage;
    return img.complete;
  }

  handleMouseEnter = (e) => {
    this.getTargetElement(e.target,"frame").style.display = 'block';
    this.showZoomedContainer(e.target);
  }

  handleMouseMove = (e) => {
    this.addFrame(e.clientX,e.clientY,e.target);
  }
  handleMouseLeave = (e) => {
    this.hide("frame",e.target);
    this.hide("zoomedImageContainer",e.target);
  }

  render(){

    const { compressedImage,dir } = this.props.options;

    return(
      <div>
       <div className={`image-container ${dir}`}>
        <img 
        onMouseMove={this.handleMouseMove.bind(this)} 
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        className="sampleImage" 
        src={compressedImage} 
        alt="sample"/>
        <div id="frame" className="frame">
        </div>
        <div id="zoomedImageContainer" className="zoomedImageContainer">  
        </div>
      </div>
      </div>
    )
  }
}

ImageZoom.PropTypes = {
  imgSrc: PropTypes.string.isRequired,
  zoomFactor: PropTypes.string
}

export default ImageZoom;
