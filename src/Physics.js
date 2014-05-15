var _ = require('lodash');
var util = require('./util');

var Physics = {
  simulateVecOffset: function(pos, vel, acc, t) {
    var result = _.zip(pos, vel, acc).map(function (dim) {
      return Physics.simulateOffset.apply(null, dim.concat([t]));
    });
    return {
      pos: _.pluck(result, 'pos'),
      vel: _.pluck(result, 'vel')
    };
  },

  simulateOffset: function (pos, vel, acc, t) {
    var newPos = pos + vel * t + acc * Math.pow(t, 2);
    var newVel = vel + acc * t;
    return {
      pos: newPos,
      vel: newVel
    };
  }
};

module.exports = Physics;
