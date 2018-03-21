/* eslint-disable */
import React, { PureComponent } from 'react';
import * as Three from 'three';
import PropTypes from 'prop-types';
import { getContext } from 'recompact';
import uuid from 'uuid/v4';

export const withCanvas = getContext({
  scene: PropTypes.shape({}),
  camera: PropTypes.shape({}),
  registerAnimation: PropTypes.func,
  cancelAnimation: PropTypes.func,
});

export default class Canvas extends PureComponent {
  static childContextTypes = {
    scene: PropTypes.shape({}),
    camera: PropTypes.shape({}),
    registerAnimation: PropTypes.func,
    cancelAnimation: PropTypes.func,
  };

  getChildContext() {
    return {
      scene: this.scene,
      camera: this.camera,
      registerAnimation: this.registerAnimation,
      cancelAnimation: this.cancelAnimation,
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

  animations = [];

  registerAnimation = (fn) => {
    const id = uuid();
    this.animations.push({
      id,
      start: fn,
    });
    return id;
  }

  cancelAnimation = (id) => {
    const animationIndex = this.animations.findIndex(animation => animation.id === id);
    if (animationIndex === -1) return;
    this.animations = [
      ...this.animations.slice(0, animationIndex),
      ...this.animations.slice(animationIndex + 1),
    ];
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.animations.forEach(animation => animation.start());

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
