/* Bloke - a Poor Text Editor
 *
 * Author: Johannes J. Schmidt
 * (c) 2012 null2 GmbH
 * */
(function() {
  var formats = [
    {
      title: 'Heading',
      command: 'formatBlock',
      value: 'H1'
    },
    {
      title: 'Paragraph',
      command: 'formatBlock',
      value: 'P'
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

  function toolbar(element) {
    var toolbar = $('<menu>');

    toolbar.addClass('bloke-toolbar');

    formats.forEach(function(format) {
      var button = $('<button>');

      button.attr('title', format.title);

      button.data('command', format.command);
      button.data('value', format.value);
      button.data('get', format.get);
      button.data('ask', format.ask);
      button.data('default', format.default);

      button.html(format.title);

      toolbar.append(button);
    });

    element.before(toolbar);

    toolbar.css('position', 'absolute');
  }

  $(document.body).on('focus', '[contenteditable]', function(e) {
    toolbar($(e.target));
  });
  $(document.body).on('blur', '[contenteditable]', function(e) {
    // wait a bit
    setTimeout(function() {
      $(e.target).prev('.bloke-toolbar').remove()
    }, 100);
  });
  $(document.body).on('click', '.bloke-toolbar', function(e) {
    // re show toolbar
    $(this).next('[contenteditable]').focus();
  });
  $(document.body).on('click', '.bloke-toolbar button', function(e) {
    var button = $(this);
    
    if (button.data('get')) return document.execCommand(button.data('command'), false, prompt(button.data('ask'), button.data('default')));
    
    document.execCommand(button.data('command'), false, button.data('value'));
  });
})();
