var util = util || {};

util.ScrollEvent = {
  SCROLL_TO_BOTTOM:'SCROLL_TO_BOTTOM'
};

util.ScrollDetector = function () {
  angular.extend(this, new Pubsubable());
  angular.extend(this, Pubsubable.prototype);

  $(window).on('scroll', this.handleScrollBottom_.bind(this));
};

util.ScrollDetector.prototype.destroy = function () {
  $(window).unbind('scroll', this.handleScrollBottom_);
};

util.ScrollDetector.prototype.handleScrollBottom_ = function () {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
    this.publish(util.ScrollEvent.SCROLL_TO_BOTTOM);
  }
};
