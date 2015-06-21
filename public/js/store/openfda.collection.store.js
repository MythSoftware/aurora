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
  store.BaseStore.prototype.fetch.bind(this)();
};

store.OpenFDACollectionStore.prototype.fetchNext = function (res) {
  if (!this.getMeta() || this.getMeta().results === undefined) {
    return;
  }
  this.getParams().skip = this.getMeta().results.skip 
    + this.getMeta().results.limit;
  this.fetch();
};
