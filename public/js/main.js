var updatePostStats = {
            UpVote: function (postId) {
                document.querySelector('#likes-count-' + postId).textContent++;
            },
            DownVote: function(postId) {
                document.querySelector('#likes-count-' + postId).textContent--;
            }
};

var toggleButtonText = {
  UpVote: function(button) {
    button.textContent = "DownVote";
  },
            DownVote: function(button) {
                button.textContent = "UpVote";
            }
        };

        var actOnPost = function (event) {
            var postId = event.target.dataset.postId;
            var action = event.target.textContent.trim();
            toggleButtonText[action](event.target);
            updatePostStats[action](postId);
            axios.post('/profiles/' + postId + '/act', { action: action });
          };
      var pusher = new Pusher('695685', {
                    cluster: 'ap2'
                });
                var socketId;

                // retrieve the socket ID on successful connection
                pusher.connection.bind('connected', function() {
                    socketId = pusher.connection.socket_id;
                });


                var channel = pusher.subscribe('post-events');
                channel.bind('postAction', function(data) {
                    // log message data to console - for debugging purposes
                    console.log(data);
                    var action = data.action;
                    updatePostStats[action](data.postId);
                });
                var vote = function (event) {
                  event.preventDefault();
                  var pollId = event.target.id;
                  var choice = event.target.optionsRadios.value;

                  // we add the socket ID to our POST data
                  axios.post('/' + pollId + '/vote', {choice: choice, socketId: socketId});
                  document.querySelector('#vote-btn-' + pollId).disabled = true;
                  var voteCount = document.querySelector('#vote-count-' + pollId + '-' + choice);
                  voteCount.textContent++;
                  voteCount.style.color = 'blue';
                  voteCount.style.fontWeight = '900';
              };
                        var pusher = new Pusher('695685', { cluster: 'ap2' });
                                var socketId;

                                // retrieve the socket ID once we are connected
                                pusher.connection.bind('connected', function() {
                                    socketId = pusher.connection.socket_id;
                                });

                                pusher.subscribe('poll-events')
                                        .bind('vote', function (data) {
                                            var pollId = data.pollId;
                                            var choice = data.choice;
                                            var voteCount = document.querySelector('#vote-count-' + pollId + '-' + choice);
                                            voteCount.textContent++;
                                            // we'll flash the colour for a moment
                                            var color = voteCount.style.color;
                                            setTimeout(function () {
                                                voteCount.style.color = color;
                                            }, 2000);
                                            voteCount.style.color = 'green';
                                        });
