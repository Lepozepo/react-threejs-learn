/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Three from 'three';
import get from 'lodash/get';

export default class PerspectiveCamera extends PureComponent {
  static contextTypes = {
    scene: PropTypes.shape({}),
    camera: PropTypes.shape({}),
  };

  componentDidMount() {
    this.updateCamera();
  }

  componentDidUpdate() {
    this.updateCamera();
  }

  updateCamera = () => {
    this.context.camera.position.z = get(this.props, 'position.z', this.context.camera.position.z);
    this.context.camera.position.x = get(this.props, 'position.x', this.context.camera.position.x);
    this.context.camera.position.y = get(this.props, 'position.y', this.context.camera.position.y);
  }

  render() {
    return null;
  }
}

