var util = util || {};

util.Throttle = function (func, maxIntervalInMillis) {
  this.func_ = func;
  this.interval_ = maxIntervalInMillis || 1000;
  this.lastExecution_ = 0;
  this.executionPending_ = false;
};

util.Throttle.prototype.execute = function () {
  var now, timeElapsed, timeTillNextExecution;
  if (this.executionPending_) {
    return;
  }
  this.executionPending_ = true;
  this.executeHelper_();
};

util.Throttle.prototype.executeHelper_ = function () {
  var self;

  self = this;
  now = Date.now();
  timeElapsed = now - this.lastExecution_;
  if (timeElapsed > this.interval_) {
    this.executionPending_ = false;
    this.lastExecution_ = now;
    this.func_();
  }
  else {
    timeTillNextExecution = this.interval_ - timeElapsed;
    setTimeout(function () {
      self.executeHelper_();
    }, timeTillNextExecution);
  }
};
