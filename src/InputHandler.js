var InputHandler = function () {
  var keyCodeMapping = {
    37: 'leftOn',
    38: 'upOn',
    39: 'rightOn',
    40: 'downOn'
  };

  this.leftOn = false;
  this.rigttOn = false;
  this.downOn = false;
  this.upOn = false;

  this.handleKeyDown = function (e) {
    var key = e.keyCode;
    var direction = keyCodeMapping[key];
    if (direction) {
      this[direction] = true;
    }
  }.bind(this);

  this.handleKeyUp = function (e) {
    var key = e.keyCode;
    var direction = keyCodeMapping[key];
    if (direction) {
      this[direction] = false;
    }
  }.bind(this);

  document.body.addEventListener("keydown", this.handleKeyDown, false);
  document.body.addEventListener("keyup", this.handleKeyUp, false);
};

module.exports = InputHandler;
