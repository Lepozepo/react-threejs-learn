/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import * as Three from 'three';
import Canvas from '@components/Canvas';
import Box from '@components/Box';
import PerspectiveCamera from '@components/PerspectiveCamera';

export default class App extends PureComponent {
  state = {
    children: [
      {
        Component: Box,
        props: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      }
    ],
  }

  // NOTE: These state changes
  // would exist in redux
  addBox = () => {
    this.setState({
      children: [
        ...this.state.children,
        {
          Component: Box,
          props: {
            position: {
              x: 3,
              y: 0,
              z: 0,
            },
          },
        },
      ],
    });
  }

  removeBox = () => {
    this.setState({
      children: [
        {
          Component: Box,
          props: {
            position: {
              x: 0,
              y: 0,
              z: 0,
            },
          },
        },
      ],
    });
  }

  render() {
    return (
      <Fragment>
        <button
          style={{
            position: 'absolute',
            background: 'white',
            top: 10,
            left: 10,
            width: 70,
            height: 50,
          }}
          onClick={this.addBox}
        >
          {'add'}
        </button>
        <button
          style={{
            position: 'absolute',
            background: 'white',
            top: 10,
            left: 100,
            width: 70,
            height: 50,
          }}
          onClick={this.removeBox}
        >
          {'remove'}
        </button>

        <Canvas>
          <PerspectiveCamera
            position={{
              z: 5,
            }}
          />
          {this.state.children.map((child, idx) => (
            <child.Component key={idx} {...child.props} />
          ))}
        </Canvas>
      </Fragment>
    );
  }
}
