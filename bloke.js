/* Bloke - a Poor Text Editor
 *
 * Author: Johannes J. Schmidt
 * (c) 2012 null2 GmbH
 * */

;(function($, doc, win) {
  var name = 'bloke',
      selector = '[contenteditable]';

  var formats = [
    {
      title: 'Heading',
      command: 'formatBlock',
      value: 'h2'
    },
    {
      title: 'Paragraph',
      command: 'formatBlock',
      value: 'p'
    },
    {
      title: 'Italic',
      command: 'italic'
    },
    {
      title: 'Bold',
      command: 'bold'
    },
    {
      title: 'Underline',
      command: 'underline'
    },
    {
      title: 'List',
      command: 'insertUnorderedList'
    },
    {
      title: 'Link',
      command: 'createLink',
      get: 'href',
      ask: 'Please enter the URL. Use "mailto:me@example.com" to link to an e-mail address.',
      default: 'http://'
    }
  ];

  function buildToolbar() {
    var toolbar = $('<menu>');

    toolbar.addClass('bloke-toolbar');
    toolbar.css('position', 'absolute');

    formats.forEach(function(format) {
      var button = $('<button>');

      button.attr('title', format.title);

      button.attr('data-command', format.command);
      button.attr('data-value', format.value);
      button.attr('data-get', format.get);
      button.attr('data-ask', format.ask);
      button.attr('data-default', format.default);

      button.html(format.title);

      toolbar.append(button);
    });

    return toolbar;
  }

  function Bloke(el, opts) {
    this.$el      = $(el);
    this.$el.data(name, this);

    this.defaults = {};

    var meta      = this.$el.data(name + '-opts');
    this.opts     = $.extend(this.defaults, opts, meta);

    var $toolbar = buildToolbar();

    this.$el.on('focus', '[contenteditable]', function(e) {
      $(e.target).before($toolbar);
    });
    this.$el.on('blur', '[contenteditable]', function(e) {
      var $el = $(this);

      // wait a bit
      setTimeout(function() {
        if (!$el.is(':focus')) $toolbar.detach();
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
