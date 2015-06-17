var Pubsubable = function () {
  this.subscriptionId_ = 0;
  this.subscriptions_ = {};
};

Pubsubable.prototype.subscribe = function (event, func) {
  this.subscriptionId_++;
  this.subscriptions_[this.subscriptionId_] = {event:event, func:func};
  return this.subscriptionId_;
};

Pubsubable.prototype.unsubscribe = function (idOrIds) {
  if (!Array.isArray(idOrIds)) {
    idOrIds = [idOrIds];
  }
  idOrIds.forEach(function (id) {
    delete this.subscriptions_[id];
  }.bind(this));
};

Pubsubable.prototype.publish = function (event, payload) {
  var key, subscription;
  for (key in this.subscriptions_) {
    subscription = this.subscriptions_[key];
    if (subscription.event === event) {
      subscription.func(payload);
    }
  };
};

var pubsubable = new Pubsubable();
