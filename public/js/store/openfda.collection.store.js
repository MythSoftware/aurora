store.OpenFDACollectionStore = function (options) {
  store.BaseStore.call(this, options);
  this.collection_ = [];
  this.meta_ = {};
};

store.OpenFDACollectionStore.prototype = Object.create(store.CollectionStore.prototype);

store.OpenFDACollectionStore.prototype.handleFetch = function (res) {
  this.collection_ = this.collection_.concat(res.results || []);
  this.meta_ = res.meta || {};
};

store.OpenFDACollectionStore.prototype.getMeta = function (res) {
  return this.meta_;
};

store.OpenFDACollectionStore.prototype.fetch = function () {
  if (!this.getParams().skip) {
    this.getParams().skip = 0;
  }
  httpUtil.ajax(
    'GET',
    this.buildUrl(),
    null,
    function (res) {
      this.handleFetch(res);
      this.publish(store.Event.FETCH, res);
    }.bind(this),
    function (res) {
      this.publish(store.Event.ERROR, res);
    }.bind(this)
  );
};

// encountering a problem encoding the '+' chars so I just add them manually
store.OpenFDACollectionStore.prototype.buildUrl = function () {
  var key, i, url;
  if (!this.getParams()) {
    return this.url_;
  }
  i = 0;
  url = this.url_;
  for (key in this.getParams()) {
    if (i == 0) {
      url += '?';
    }
    else {
      url += '&';
    }
    url += key + '=' + this.getParams()[key];
    i++;
  }
  return url;
};

store.OpenFDACollectionStore.prototype.fetchNext = function (res) {
  if (!this.getMeta() || this.getMeta().results === undefined) {
    return;
  }
  this.getParams().skip = this.getMeta().results.skip 
    + this.getMeta().results.limit;
  this.fetch();
};
