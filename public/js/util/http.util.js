var httpUtil = {
  ajax: function (method, url, form, onSuccess, onFailure, opt_token) {
    $.ajax({
      url: url,
      data: form,
      type: method,
      success: function(data, textStatus, jqXHR) {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var cb = onFailure || onSuccess;
        if (cb) {
          cb(jqXHR.responseJSON);
        }
      }
    });
  }
};
