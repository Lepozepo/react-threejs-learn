/* eslint-disable */
import React, { PureComponent } from 'react';
import * as Three from 'three';
import get from 'lodash/get';
import { withCanvas } from './Canvas';

class PerspectiveCamera extends PureComponent {
  componentDidMount() {
    this.updateCamera();
  }

  componentDidUpdate() {
    this.updateCamera();
  }

  updateCamera = () => {
    this.props.camera.position.z = get(this.props, 'position.z', this.props.camera.position.z);
    this.props.camera.position.x = get(this.props, 'position.x', this.props.camera.position.x);
    this.props.camera.position.y = get(this.props, 'position.y', this.props.camera.position.y);
  }

  render() {
    return null;
  }
}

export default withCanvas(PerspectiveCamera);
