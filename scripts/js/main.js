// background video varibiles
  var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var tv,
  playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, loop: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
  var vid = [
    {'videoId': 'hTUmYn8_mAE', 'startSeconds': 0, 'endSeconds': 1700, 'suggestedQuality': 'large'}
  ],
  randomVid = Math.floor(Math.random() * vid.length),
  currVid = randomVid;

// background YouTube Video Player functions
  function onYouTubePlayerAPIReady(){
    tv = new YT.Player('back1', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
  }

  function onPlayerReady(){
    tv.loadVideoById(vid[currVid]);
    tv.mute();
  }

  function onPlayerStateChange(e) {
    if (e.data === 1){
      $('#back1').addClass('active');
    } else if (e.data === 2){
      $('#back1').removeClass('active');
        if(currVid === vid.length - 1){
          currVid = 0;
        } else {
          currVid++;
        }
      tv.loadVideoById(vid[currVid]);
      tv.seekTo(vid[currVid].startSeconds);
    }
  }

  function vidRescale(){
    var w = $(window).width()+200,
      h = $(window).height()+200;

    if (w/h > 16/9){
      tv.setSize(w, w/16*9);
      $('.screen').css({'left': '0px'});
    } else {
      tv.setSize(h/9*16, h);
      $('.screen').css({'left': -($('.screen').outerWidth()-w)/2});
    }
  }

// include additional external files function
function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;
                onload();
            }
        }
        else {
            onload();
        }
    };
    head.appendChild(script);
}

// Load Font Awesome Icons, Jquery and YouTube Video Player
include('https://kit.fontawesome.com/98631fb0ca.js',function() {});
include('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', function() {
    $(document).ready(function() {
      $(window).on('load resize', function(){
        vidRescale();
      });
    });
});
