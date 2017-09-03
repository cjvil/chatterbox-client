var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

  init: function() {
    app.fetch('recent100');
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      //data: JSON.stringify(message),
      data: (message), // changed from stringify to pass tests
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', message);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });  
  },

  
  //query: '?' + encodeURI('where={"createdAt":{"$gte":{"__type":"Date","iso":"2017-08-31T18:02:52.249Z"}}}'),
  fetch: function(query = '', target) {
    var magicWords = '';

    if (query === 'recent100') {
      magicWords = '?order=-createdAt';
    } else if (query === 'byUsername') {
      magicWords = '?where=' + encodeURIComponent('{"username":"' + target + '"}'); // pass username
    } else if (query === 'byRoom') {
      magicWords = '?where=' + encodeURIComponent('{"roomname":"' + target + '"}'); // pass room
    }

    $.ajax({

// use encodeURI to make string from instructions at http://docs.parseplatform.org/rest/guide/#data-types
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + magicWords,  //   ?order%3D-createdAt', //+ query,
      // url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?limit=777&where',
      type: 'GET',
      contentType: 'PlainObject',
      //data: '{"limit":"200"}',
      success: function (data) {
        for ( var i = 0; i < data.results.length; i ++) {
          app.renderMessage(data.results[i]);
        }
        console.log('chatterbox: data recieved', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
      
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var msgBox = `<div class="msg-box"></div>`;
    var msg = `<div class="message"><span class="msg">${message.text}</span></div>`;
    var user = `<div class="user"><span class="usr">${message.username}</span></div>`;

    $('#chats').append(msgBox);
    console.log(msgBox);

// append to last message box
    //$(msgBox).append(msg + user);
    $('.msg-box:last').append(msg + user);  //TODO select onlylasst one
  },

  renderRoom: function(roomName) {
    var roomBox = `<div class="room-box">${roomName}</div>`;
    $('#roomSelect').append(roomBox);
  },
  handleUsernameClick: function(username) {
    var friendChange = ($(username).text());
    var allFriendElements = $('.usr').filter((index, element) => $(element).text() === friendChange);
    //console.log(allFriendElements.text());
    allFriendElements.toggleClass('friends');
  },

    /*var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'}
  */

  handleSubmit: function(e) {
    var newMessageString = $('textarea').val();
    
    var messageObj = {
      username: app.user,
      text: newMessageString,
      roomname: '4chan' // TODO fix this to a variable
   
    };
    console.log('submitting message now ', messageObj);
    messageObj = JSON.stringify(messageObj);
    app.send(messageObj);
  }
};

$(document).ready(function() {

  app.init();
  app.user = window.location.search;
  console.log(app.user);
  app.user = app.user.slice(app.user.indexOf('=') + 1);
  console.log(app.user);
  $('#chats').on('click', '.usr', function () { app.handleUsernameClick(this); });
  $('#send-msg').click(function() { 
    console.log('working'); 
    app.handleSubmit(); 
  }); 
  
  

});

