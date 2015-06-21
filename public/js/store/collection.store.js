store.CollectionStore = function (options) {
  store.BaseStore.call(this, options);
  this.collection_ = [];
};

store.CollectionStore.prototype = Object.create(store.BaseStore.prototype);

// this will change when we get pagination on the api
store.CollectionStore.prototype.handleFetch = function (res) {
  this.collection_ = res;
};

store.CollectionStore.prototype.getCollection = function (res) {
  return this.collection_;
};

store.CollectionStore.prototype.setCollection = function (collection) {
  this.collection_ = collection;
};
