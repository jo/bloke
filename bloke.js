/* Bloke - a Poor Text Editor
 *
 * Author: Johannes J. Schmidt
 * (c) 2012 null2 GmbH
 * */
(function($, doc, win) {
  var selector = '[contenteditable]';

  function Bloke(el, opts) {
    this.$el      = $(el);

    var $toolbar = this.$el.find('.bloke-toolbar');

    this.$el.on('focus', '[contenteditable]', function(e) {
      $(e.target).before($toolbar.show());
    });
    this.$el.on('blur', '[contenteditable]', function(e) {
      var $el = $(this);

      // wait a bit
      setTimeout(function() {
        // still blured?
        if (!$el.is(':focus')) $toolbar.hide();
      }, 500);
    });
    this.$el.on('click', '.bloke-toolbar', function(e) {
      // re show toolbar, set focus
      $(this).next('[contenteditable]').focus();
    });
    this.$el.on('click', '.bloke-toolbar button', function(e) {
      var button = $(this);
      
      if (button.data('get')) return doc.execCommand(button.data('command'), false, prompt(button.data('ask'), button.data('default')));
      
      doc.execCommand(button.data('command'), false, button.data('value'));
      
      $(this).next('[contenteditable]').focus();
    });
  };

  $.fn.bloke = function(opts) {
    return this.each(function() {
      new Bloke(this, opts);
    });
  };
})(jQuery, document, window);
