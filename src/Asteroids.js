/** @jsx React.DOM */

var shims = require('./shims');
shims.shimIt();
var Physics = require('./Physics');
var React = require('react');
var ReactKinetic = require('react-kinetic');
var InputHandler = require('./InputHandler');
var ResourceLoader = require('./ResourceLoader');

var Ship = require('./Ship');
var Asteroid = require('./Asteroid');

var Stage = ReactKinetic.Stage;
var Layer = ReactKinetic.Layer;

var Game = React.createClass({
  getDefaultProps: function () {
    return {
      shipAcceleration: 150,
      shipRotAcceleration: Math.PI / 6,
      shipHeight: 191,
      shipWidth: 95
    };
  },

  getInitialState: function () {
    return {
      playerPos: [this.props.height - 200,
                  this.props.width / 2 - 47],
      playerVel: [0, 0],
      playerAcc: [0, 0],
      playerRot: 0,
      playerRotVel: 0,
      playerRotAcc: 0,
      currentTick: 0,
      asteroids: [{
       pos: [50, 50]
      }]
    };
  },

  tick: function (timestampMs) {
    var timestamp = timestampMs / 1000.0;
    var inputHandler = this.props.inputHandler;

    if ((this.state.currentTick === 0)) {
      this.setState({
        currentTick: timestamp
      });
    } else {
      var diff = timestamp - this.state.currentTick;
      var rotation = this.state.playerRot;
      var rotVel = this.state.playerRotVel;
      var rotAcc;
      var latAcc;

      if (inputHandler.leftOn) {
        rotAcc  = -this.props.shipRotAcceleration;
      } else if (inputHandler.rightOn) {
        rotAcc = this.props.shipRotAcceleration;
      } else if (rotVel > 0) {
        rotAcc = -this.props.shipRotAcceleration;
      } else if (rotVel < 0) {
        rotAcc = this.props.shipRotAcceleration;
      } else {
        rotAcc = 0;
      }

      if (inputHandler.upOn) {
        latAcc = [Math.sin(rotation) * this.props.shipAcceleration,
                  -Math.cos(rotation) * this.props.shipAcceleration];
      }
      else {
        latAcc = [0, 0];
      }

      var latResult = Physics.simulateVecOffset(
        this.state.playerPos,
        this.state.playerVel,
        latAcc,
        diff
      );

      var newLatPos = latResult.pos;

      if (newLatPos[0] < 0 - this.props.shipHeight) {
        newLatPos[0] = this.props.width;
      } else if (newLatPos[0] > this.props.width + this.props.shipHeight) {
        newLatPos[0] = this.props.width - newLatPos[0];
      }

      if (newLatPos[1] < 0 - this.props.shipHeight) {
        newLatPos[1] = this.props.height;
      } else if (newLatPos[1] > this.props.height + this.props.shipHeight) {
        newLatPos[1] = this.props.height - newLatPos[1];
      }

      var rotResult = Physics.simulateOffset(
        rotation,
        this.state.playerRotVel,
        rotAcc,
        diff
      );

      var newRotVel = rotResult.vel;

      if (rotAcc === 0 && Math.abs(newRotVel) < 1) {
          newRotVel = 0;
      }

      this.setState({
        currentTick: timestamp,
        playerPos: latResult.pos,
        playerVel: latResult.vel,
        playerAcc: latAcc,
        playerRot: rotResult.pos,
        playerRotVel: newRotVel,
        playerRotAcc: rotAcc
      });
    }
    window.requestAnimationFrame(this.tick);
  },

  handlePause: function () {
    if (document.hidden) {
      this.setState({
        currentTick: 0
      });
    }
  },

  componentDidMount: function () {
    document.addEventListener("visibilitychange", this.handlePause, false);
    window.requestAnimationFrame(this.tick);
  },

  render: function () {
    var planeSprite = this.props.resourceLoader.getResource('planeSprite');
    var asteroids = this.state.asteroids.map(function (asteroid, i) {
      return (
        <Asteroid key={i}
                  x={asteroid.pos[0]}
                  y={asteroid.pos[1]} />
      );
    });
    return (
      <Layer>
        <Ship x={this.state.playerPos[0]}
              y={this.state.playerPos[1]}
              rotation={this.state.playerRot}
              rotVel={this.state.playerRotVel}
              velX={this.state.playerVelX}
              image={planeSprite}/>
        {asteroids}
      </Layer>
    );
  }
});

module.exports = {
  start: function () {
    var loader = new ResourceLoader(function () {
    });
    React.renderComponent(
      <Stage height={700} width={1000}>
        <Game height={700} width={1000}
         inputHandler={new InputHandler()}
         resourceLoader={loader} />
      </Stage>,
      document.getElementById('canvas')
    );
  }
};
