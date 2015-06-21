store.OpenFDACollectionStore = function (options) {
  store.BaseStore.call(this, options);
  this.collection_ = [];
  this.meta_ = {};
};

store.OpenFDACollectionStore.prototype = Object.create(store.CollectionStore.prototype);

// this will change when we get pagination on the api
store.OpenFDACollectionStore.prototype.handleFetch = function (res) {
  this.collection_ = res.results || [];
  this.meta_ = res.meta || {};
};

store.OpenFDACollectionStore.prototype.getMeta = function (res) {
  return this.meta_;
};
