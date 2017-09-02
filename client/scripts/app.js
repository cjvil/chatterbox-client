// var Parse = require('parse');
var ReceivedMessages = Parse.Object.extend('ReceivedMessage');
var receivedMessages = new ReceivedMessages();

var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

  init: function() {
  
  },
  
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      //data: JSON.stringify(message),
      data: (message), // changed from stringify to pass tests
      contentType: 'PlainObject',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });  
  },
  //query: '?' + encodeURI({"limit":"7"}),
  fetch: function(query = '') {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + query,
      // url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?limit=777&where',
      type: 'GET',
      contentType: 'PlainObject',
      //data: '{"limit":"200"}',
      success: function (data) {
        receivedMessages = data;
        console.log('chatterbox: data recieved', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
      
    });
  },
// testtesttest
  getOptions: function() {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'OPTIONS',
      contentType: 'PlainObject',
      success: function (data) {
        console.log('options are: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
      
    });
  },


// testtesttest
  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var msgBox = `<div class="msg-box">${message}</div>`;
    $('#chats').append(msgBox);
  },

  renderRoom: function(roomName) {
    var roomBox = `<div class="room-box">${roomName}</div>`;
    $('#roomSelect').append(roomBox);
  }


};

