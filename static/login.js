<script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
<script>
SC.initialize({
  client_id: '5cf04062a450048534698b4374a8ae62',
  redirect_uri: 'http://localhost:3000.com'
});

// initiate auth popup
SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});
</script>