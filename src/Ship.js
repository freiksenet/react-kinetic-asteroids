/** @jsx React.DOM */

var React = require('react');
var ReactKinetic = require('react-kinetic');
var Sprite = ReactKinetic.Sprite;

var spriteAnimations = {
  base: [0, 1005, 95, 151],
  toLeft: [0, 804, 95, 151,
           0, 603, 95, 151,
           0, 402, 95, 151,
           0, 201, 95, 151,
           0, 0, 95, 151],
  toRight: [0, 1206, 95, 151,
            0, 1407, 95, 151,
            0, 1609, 95, 151,
            0, 1809, 95, 151,
            145, 0, 95, 151]
};

var Ship = React.createClass({
  getDefaultProps: function () {
    return {
      animations: spriteAnimations,
      frameIndex: 0,
      animation: 'base',
      velX: 0,
      rotation: 0
    };
  },

  render: function () {
    var frameStep = Math.PI / 12;
    var animationDirection;
    var turningFrame;
    turningFrame = Math.floor(Math.abs(this.props.rotVel) / frameStep);
    if (turningFrame > 4) {
      turningFrame = 4;
    }
    if (this.props.rotVel < 0) {
      animationDirection = 'toRight';
    } else if (this.props.rotVel > 0) {
      animationDirection = 'toLeft';
    } else {
      animationDirection = 'base';
      turningFrame = 0;
    }

    var rotation = this.props.rotation * (180 / Math.PI);

    return (
      <Sprite x={this.props.x}
              y={this.props.y}
              image={this.props.image}
              animation={animationDirection}
              animations={this.props.animations}
              frameIndex={turningFrame}
              rotation={rotation} />
    );
  }
});

module.exports = Ship;
