/* eslint-disable */
import React, { PureComponent } from 'react';
import * as Three from 'three';
import PropTypes from 'prop-types';
import { getContext } from 'recompact';

export const withCanvas = getContext({
  scene: PropTypes.shape({}),
  camera: PropTypes.shape({}),
});

export default class Canvas extends PureComponent {
  static childContextTypes = {
    scene: PropTypes.shape({}),
    camera: PropTypes.shape({}),
  };

  getChildContext() {
    return {
      scene: this.scene,
      camera: this.camera,
    };
  }

  scene = new Three.Scene();
  camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new Three.WebGLRenderer();
  canvas = this.renderer.domElement;

  componentDidMount() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.canvas);
    this.addResizeListener();

    this.animate();
  }

  componentWillUnmount() {
    this.removeResizeListener();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // this.cube.rotation.x += 0.1;
    // this.cube.rotation.y += 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  addResizeListener = () => {
    addEventListener('resize', this.onWindowResize, false);
  }

  removeResizeListener = () => {
    removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = (e) => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <div
        ref={r => this.container = r}
      >
        {this.props.children}
      </div>
    );
  }
}
