var CreateJS = require('CreateJS');

var ResourceLoader = function (callback) {
  this.queue = new CreateJS.LoadQueue();
  this.queue.on("complete", function () {
    callback();
  });
  this.queue.loadManifest([
    {
      id: 'planeSprite',
      src: "./static/planesprite.png"
    }
  ]);

  this.getResource = function (resourceId) {
    return this.queue.getResult(resourceId);
  };
};

module.exports = ResourceLoader;
