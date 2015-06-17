var httpUtil = {
  ajax: function (method, url, form, onSuccess, onFailure, opt_token) {
    $.ajax({
      url: url,
      data: form,
      type: method,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('x-auth-token', opt_token || localStorage['token']);
        xhr.setRequestHeader('x-canary', $('#canary').val());
      },
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
