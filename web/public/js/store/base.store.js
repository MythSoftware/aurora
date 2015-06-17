var store = store || {};

store.Event = {
  CHANGE: 'CHANGE',
  CHANGE_NEXT: 'CHANGE_NEXT',
  FETCH: 'FETCH',
  FETCH_NEXT: 'FETCH_NEXT',
  ERROR: 'ERROR',
  DELETE: 'DELETE'
};

store.BaseStore = function (options) {
  if (!options) {
    throw 'options is required in constructor.';
  }
  if (!options.url) {
    throw 'options.url is required.';
  }
  angular.extend(this, pubsubable);
  angular.extend(this, Pubsubable.prototype);
  this.pollInterval_ = options.pollInterval || 5;
  this.url_ = options.url;
  this.params_ = {};
  for (var key in options.params) {
    this.params_[key] = options.params[key];
  }
};

store.BaseStore.prototype.startPolling = function () {
  this.fetch();
  this.pollId_ = setInterval(this.fetch.bind(this), this.pollInterval_ * 1000);
};

store.BaseStore.prototype.stopPolling = function (pollId) {
  clearInterval(this.pollId_);
  this.pollId_ = null;
};

store.BaseStore.prototype.handleFetch = function (res) {};

store.BaseStore.prototype.fetch = function () {
  httpUtil.ajax(
    'GET',
    this.url_,
    this.params_,
    function (res) {
      this.handleFetch(res);
      this.publish(store.Event.FETCH, res);
    }.bind(this),
    function (res) {
      this.publish(store.Event.ERROR, res);
    }.bind(this)
  );
};
