/** @jsx React.DOM */

var React = require('react');
var ReactKinetic = require('react-kinetic');
var Circle = ReactKinetic.Circle;

var Asteroid = React.createClass({
  getDefaultProps: function () {
    return {
      radius: 20,
      velocity: [5, 5]
    };
  },

  render: function () {
    return (
      <Circle x={this.props.x}
              y={this.props.y}
              radius={this.props.radius}
              stroke="white"
              strokeWidth="2" />
    );
  }
});

module.exports = Asteroid;
