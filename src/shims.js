module.exports = {
  shimIt: function () {
    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    (function (global) {
      if (!Math.sign) {
        var isNaN = Number.isNaN;

        Object.defineProperty(Math, 'sign', {
          value: function sign(value) {
            var n = +value;
            if (isNaN(n))
              return n /* NaN */;

            if (n === 0)
              return n; // Keep the sign of the zero.

            return (n < 0) ? -1 : 1;
                   },
            configurable: true,
            enumerable: false,
            writable: true
        });
      }
    })(this);
  }
};
