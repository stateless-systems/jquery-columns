(function($) {
  var methods = {
    init: function(options) {
      return this.each(function() {
        var $this = $(this), data = $this.data('columns');
        if (!data) $(this).data('columns', $.extend({target: $this, width: $this.children().first().width()}, options));
        $this.columns('layout'); // TODO: Pretty sure this isn't the right way to do this.
      });
    },

    destroy: function() {
      return this.each(function() {
        var $this = $(this), data = $this.data('columns');
        $(window).unbind('.columns');
        $this.removeData('columns');
      })
    },

    layout: function() {
      var $this    = $(this),
          data     = $this.data('columns'),
          $columns = data.target.children(),
          $first   = $columns.first();

      $first.css({width: '100%'});
      data.wrap    = $this.innerWidth(); // WTF: != $first.outerWidth(true)
      data.columns = Math.floor(data.wrap / data.width);

      data.column             = {};
      data.column.outer_width = Math.floor(data.wrap / data.columns);
      data.column.alley       = $first.outerWidth(true) - $first.width(); // Margin and border.
      data.column.width       = data.column.outer_width - data.column.alley;
      $columns.css({width: data.column.width + 'px'});

      return this;
    },

    // TODO: Spans are removed on re-layout :(
    span: function(target, columns) {
      var $this = $(this), data = $this.data('columns');
      var width = (columns * data.column.outer_width) - data.column.alley;
      target.css({width: width + 'px'});
      return this;
    }
  };

  $.fn.columns = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      $.error('Method ' +  method + ' does not exist on jQuery.columns');
    }
  };
})(jQuery);

