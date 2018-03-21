/* eslint-disable */
import React, { PureComponent } from 'react';
import * as Three from 'three';
import { withCanvas } from './Canvas';

class Box extends PureComponent {
  static defaultProps = {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
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
    this.props.scene.add(this.cube);
  }

  componentWillUnmount() {
    console.log('remove from scene');
    this.props.scene.remove(this.cube);
  }

  render() {
    return null;
  }
}

export default withCanvas(Box);
