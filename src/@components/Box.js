/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Three from 'three';

export default class Box extends PureComponent {
  static defaultProps = {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  static contextTypes = {
    scene: PropTypes.shape({}),
    camera: PropTypes.shape({}),
  };

  geometry = new Three.BoxGeometry(1, 1, 1);
  material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new Three.Mesh(this.geometry, this.material);

  componentDidMount() {
    console.log('add to scene');
    this.cube.position.set(
      this.props.position.x,
      this.props.position.y,
      this.props.position.z,
    );
    this.context.scene.add(this.cube);
  }

  componentWillUnmount() {
    console.log('remove from scene');
    this.context.scene.remove(this.cube);
  }

  animate = () => {
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
  }

  render() {
    return null;
  }
}
