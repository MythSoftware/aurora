module.exports = function () {

  var appendUrlParams = function (baseUrl, req) {
    var url, key, i;
    url = baseUrl;
    i = 0;
    for (key in req.query) {
      if (i == 0) {
        url += '?';
      }
      else {
        url += '&';
      }
      url += key + '=' + req.query[key];
      i++;
    }
    return url;
  };

  return {
    appendUrlParams:appendUrlParams
  };

};
