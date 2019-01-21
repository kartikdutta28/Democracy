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
