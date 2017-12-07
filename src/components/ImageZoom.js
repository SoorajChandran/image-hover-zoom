import React, { Component } from "react";
import PropTypes from "prop-types";

class ImageZoom extends Component {
  constructor(props) {
    super(props);
    this.zoomFactor = parseInt(this.props.options.zoomFactor, 10) || 3;
    this.frameHeight = 100;
    this.frameWidth = 200;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  /* find the target sibling element - takes element - el and the id of the sibling - targetId  */
  getTargetElement = (el, targetId) => {
    const children = el.parentNode.childNodes;
    return Array.from(children).find(item => item.id === targetId);
  };

  /* to add the frame on hover */
  addFrame = (x, y, el) => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const minX = Math.min(x, left + width - this.frameWidth);
    const minY = Math.min(y, top + height - this.frameHeight);
    const frameEl = this.getTargetElement(el, "frame");
    frameEl.style.left = `${minX}px`;
    frameEl.style.top = `${minY}px`;
    const scaledValues = this.scaleValues(
      minX - el.offsetLeft,
      minY - el.offsetTop
    );
    this.getTargetElement(
      el,
      "zoomedImageContainer"
    ).style.backgroundPosition = `${scaledValues[0]}px ${scaledValues[1]}px`;
  };

  hide(id, el) {
    this.getTargetElement(el, id).style.display = "none";
  }

  /* return the scaled values */
  scaleValues = (x, y) => [
    -1 * this.zoomFactor * parseInt(x, 10),
    -1 * this.zoomFactor * parseInt(y, 10)
  ];

  /* show the zoomed image container */
  showZoomedContainer = el => {
    const targetEl = this.getTargetElement(el, "zoomedImageContainer");
    targetEl.style.display = "block";
    const { left, top, width } = el.getBoundingClientRect();
    /* to check the location if the images - whether left/right */
    targetEl.style.left =
      left <= window.screen.width / 2 ? `${left + width}px` : `${left - 600}px`;
    targetEl.style.top = `${top}px`;

    if (this.isImageLoaded()) {
      targetEl.style.background = `url(${
        this.props.options.originalImage
      }) no-repeat`;
      targetEl.style.backgroundSize = `${this.zoomFactor * 600}px ${this
        .zoomFactor * 300}px`;
    } else {
      targetEl.style.background = `url(${
        this.props.options.compressedImage
      }) no-repeat`;
      targetEl.style.backgroundSize = `${this.zoomFactor * 600}px ${this
        .zoomFactor * 300}px`;
    }
  };

  /* to check if the high-def image is loaded */
  isImageLoaded = () => {
    const img = new Image();
    img.src = this.props.options.originalImage;
    return img.complete;
  };

  /* handle mouse enter */
  handleMouseEnter = e => {
    this.getTargetElement(e.target, "frame").style.display = "block";
    this.showZoomedContainer(e.target);
  };

  /* handle mouse move */
  handleMouseMove = e => {
    this.addFrame(e.clientX, e.clientY, e.target);
  };

  /* handle mouse leave */
  handleMouseLeave = e => {
    this.hide("frame", e.target);
    this.hide("zoomedImageContainer", e.target);
  };

  render() {
    const { compressedImage, dir } = this.props.options;

    return (
      <div>
        <div className={`image-container ${dir}`}>
          <img
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            onMouseEnter={this.handleMouseEnter}
            className="sampleImage"
            src={compressedImage}
            alt="sample"
          />
          <div id="frame" className="frame" />
          <div id="zoomedImageContainer" className="zoomedImageContainer" />
        </div>
      </div>
    );
  }
}

ImageZoom.propTypes = {
  options: PropTypes.shape({
    originalImage: PropTypes.string.isRequired,
    compressedImage: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    zoomFactor: PropTypes.string
  })
};

export default ImageZoom;
