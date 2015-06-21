var util = util || {};

util.ScrollEvent = {
  SCROLL_TO_BOTTOM:'SCROLL_TO_BOTTOM'
};

util.ScrollDetector = function () {
  angular.extend(this, new Pubsubable());
  angular.extend(this, Pubsubable.prototype);

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      this.publish(util.ScrollEvent.SCROLL_TO_BOTTOM);
    }
  }.bind(this));
};
