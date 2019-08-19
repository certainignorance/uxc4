// BACKGROUND VIDEO JAVASCRIPT

  // const (can be set but not changed), var (can be set & changed), & let (temp variable to be used in loop, etc)
  // are variations of variables

  const tag = document.createElement('script');
    // with const you can add & permenantly define additions
    tag.src = 'https://www.youtube.com/player_api';

  var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var tv,
    playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
  var vid = [
    {'videoId': 'DEj0PNdp9c0', 'startSeconds': 0, 'endSeconds': 21, 'suggestedQuality': 'large'}
  ],
    randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

// background YouTube Video Player functions
  function onYouTubePlayerAPIReady(){
    tv = new YT.Player('back1', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
  }

  function onPlayerReady(){
    let w = window.innerWidth+200,
        h = window.innerHeight+200;
    if (w > h){
      tv.loadVideoById(vid[currVid]);
      tv.mute();
    }
  }

  function onPlayerStateChange(e) {
    let element = document.getElementById("back1");
    let w = window.innerWidth+200,
        h = window.innerHeight+200;
    if (e.data === 1){
      element.classList.add("active");
    } else if (e.data === 0){
        element.classList.remove("active");
        // if(currVid === vid.length - 1){
        //   currVid = 0;
        // } else {
        //   currVid++;
        // }
        if (w > h){
          currVid = 0;
          tv.loadVideoById(vid[currVid]);
          tv.seekTo(vid[currVid].startSeconds);
        }
    }

  }

  function vidRescale(){
    let w = window.innerWidth+200,
      h = window.innerHeight+200;

    if (w/h > 16/9){
      tv.setSize(w, w/16*9);
      // $('.screen').css({'left': '0px'});
    } else {
      tv.setSize(h/9*16, h);
      // $('.screen').css({'left': -($('.screen').outerWidth()-w)/2});
      // stylesheet.insertRule('.screen {left: '+ -(document.getElementById('back1').parentElement.style.outerWidth-w)/2 +'px;}', 0);
    }
  }

// include additional external files function
  function include(filename, onload) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
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

// JAVASCRIPT CAROUSEL
  function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  }

  function updateCarousels(){
    removeElementsByClass("carouselControls");
    removeElementsByClass("carouselLeft");
    removeElementsByClass("carouselRight");
    let w = window.innerWidth,
        h = window.innerHeight;
    let caseSlides = document.querySelectorAll(".container");
  	for (let caseSlider of caseSlides) {
      let caseSlide = caseSlider.getElementsByTagName("article");
      for (let j = 0; j < caseSlide.length; j++) {
        let my_elem = caseSlide[j];
        if (j==0){
          var div = document.createElement('div');
              div.innerHTML = '';
              div.className = 'carousel';
          my_elem.parentNode.insertBefore(div, my_elem);
          caseSlider.classList.add("containCarousel");
          if (w > h && caseSlide.length > 3 && !caseSlider.parentNode.classList.contains('processSection')){
            var cControls = document.createElement('div');
              cControls.innerHTML = ' <span class="clickedSlide"></span>';
              cControls.className = 'carouselControls';
            var cLeft = document.createElement('div');
              cLeft.innerHTML = '<span cMove="0" style="display:none;">&#10094;</span>';
              cLeft.className = 'carouselLeft';
            var cRight = document.createElement('div');
              cRight.innerHTML = '<span cMove="1">&#10095;</span>';
              cRight.className = 'carouselRight';
            // insert After
            caseSlider.parentNode.insertBefore(cRight, caseSlider.nextSibling);
            caseSlider.parentNode.insertBefore(cLeft, caseSlider.nextSibling);
            caseSlider.parentNode.insertBefore(cControls, caseSlider.nextSibling);
          } else if (h > w && caseSlide.length > 1 || caseSlider.parentNode.classList.contains('processSection') && caseSlide.length > 1) {
            var cControls = document.createElement('div');
              cControls.innerHTML = ' <span class="clickedSlide"></span>';
              cControls.className = 'carouselControls';
            var cLeft = document.createElement('div');
              cLeft.innerHTML = '<span cMove="0" style="display:none;">&#10094;</span>';
              cLeft.className = 'carouselLeft';
            var cRight = document.createElement('div');
              cRight.innerHTML = '<span cMove="1">&#10095;</span>';
              cRight.className = 'carouselRight';
            // insert After
            caseSlider.parentNode.insertBefore(cRight, caseSlider.nextSibling);
            caseSlider.parentNode.insertBefore(cLeft, caseSlider.nextSibling);
            caseSlider.parentNode.insertBefore(cControls, caseSlider.nextSibling);

          }
        }else{
          if (w > h && caseSlide.length > 3 && (j+1) % 3 === 0 && !caseSlider.parentNode.classList.contains('processSection') ){
            cControls.innerHTML += ' <span></span>';
          } else if (h > w && caseSlide.length > 1 || caseSlider.parentNode.classList.contains('processSection') && caseSlide.length > 1) {
            cControls.innerHTML += ' <span></span>';
          }
        }
        div.appendChild(my_elem);
      }
  	}
    let caseControls = document.querySelectorAll(".carouselControls span");
  	for (let j = 0; j < caseControls.length; j++) {
        //Defines the span
        let spanControl = caseControls[j];

        //Checks if 'addEventListener' can be used and adds the click eventlListener
        if (spanControl.addEventListener) spanControl.addEventListener('click', carouselShift, false);
        else spanControl.attachEvent('onclick', carouselShift);

        //Creates a click event
        // var spanClick = new Event('click');
        //dispatches the click event for the span
        // spanControl.dispatchEvent(spanClick);
    }
      let spanRights = document.querySelectorAll(".carouselRight span");
      let spanLefts = document.querySelectorAll(".carouselLeft span");
      for (let j = 0; j < spanRights.length; j++) {
        let spanRight = spanRights[j];
        let spanLeft = spanLefts[j];
        if (spanRight.addEventListener) spanRight.addEventListener('click', carouselMove, false);
        else spanRight.attachEvent('onclick', carouselMove);
        if (spanLeft.addEventListener) spanLeft.addEventListener('click', carouselMove, false);
        else spanLeft.attachEvent('onclick', carouselMove);
      }
  }

  //Defines the function to be called on click
  var cmove = 0;
  var cstring;
  function carouselShift() {
    let w = window.innerWidth,
        h = window.innerHeight;
    for (let j = 0; j < this.parentNode.childElementCount; j++) {
      if (this.parentNode.children[j].classList.contains("clickedSlide")){
        this.parentNode.children[j].classList.remove("clickedSlide");
      }
    }
    this.classList.add("clickedSlide");
    for (let j = 0; j < this.parentNode.childElementCount; j++) {

      if (this.parentNode.children[j].classList.contains("clickedSlide")){
        if (j > 0){
          cmove = j * (-1);
        }else{
          cmove = 0;
        }
      }
      if (cmove < 0){
        if (w>h && !this.parentNode.parentNode.classList.contains('processSection')){
          cstring = 'calc(' + cmove*100 + '% + ' + 1.5*cmove + 'em)';
        }else if (h>w && !this.parentNode.parentNode.classList.contains('processSection')){
          cstring = 'calc(' + cmove*100 + '% + ' + 2*cmove + 'em)';
        }else{
          cstring = 'calc(' + cmove*100 + '% + ' + 3*cmove + 'em)';
        }
      }else{
        cstring = '0%';
      }
    }
    this.parentNode.previousSibling.getElementsByClassName("carousel")[0].style.transform = "translateX("+ cstring +")";
  }

  function carouselMove(){
    let w = window.innerWidth,
        h = window.innerHeight;
    let cmove = this.getAttribute("cMove");
        cmove = Number(cmove);
    let removeN = this.parentNode.parentNode.getElementsByClassName("carouselControls")[0];
    for (let j = 0; j < removeN.childElementCount; j++) {
      if (removeN.children[j].classList.contains("clickedSlide")){
        removeN.children[j].classList.remove("clickedSlide");
      }
    }
    removeN.children[cmove].classList.add("clickedSlide");
    let cstring = 0;
    if (cmove > 0){
      cstring = cmove * (-1);
    }
    if (w>h && !this.parentNode.parentNode.classList.contains('processSection')){
      cstring = 'calc(' + cstring*100 + '% + ' + 1.5*cstring + 'em)';
    }else if (h>w && !this.parentNode.parentNode.classList.contains('processSection')){
      cstring = 'calc(' + cstring*100 + '% + ' + 2*cstring + 'em)';
    }else{
      cstring = 'calc(' + cstring*100 + '% + ' + 3*cstring + 'em)';
    }
    if (cmove <= 0){
      cstring = "0%"
    }

    if (this.parentNode.classList.contains('carouselRight') && this.parentNode.parentNode.getElementsByClassName("carouselControls")[0].childElementCount > cmove+1){
      cmove += 1;
      this.style.display="inline";
    }else if (this.parentNode.classList.contains('carouselRight')){
      this.style.display="none";
      cmove += 1;
    }else{
      this.parentNode.nextSibling.firstChild.setAttribute("cMove", cmove+1);
      this.parentNode.nextSibling.firstChild.style.display="inline";
    }
    if (this.parentNode.classList.contains('carouselLeft') && cmove > 0){
      cmove += -1;
      this.style.display="inline";
    }else if (this.parentNode.classList.contains('carouselLeft')){
      cmove = 0;
      this.style.transform = "opacity .25s ease-in-out";
      this.style.display="none";
    }else{
      let tmove = cmove-1;
      if (tmove <= 1 ){tmove=1;}
      this.parentNode.previousSibling.firstChild.setAttribute("cMove", tmove-1);
      this.parentNode.previousSibling.firstChild.style.display="inline";
    }
    this.setAttribute("cMove", cmove);
    this.parentNode.parentNode.getElementsByClassName("containCarousel")[0].getElementsByClassName("carousel")[0].style.transform = "translateX("+ cstring +")";
  }



// LOAD FONT AWESOME ICONS AND YOUTUBE VIDEO PLAYER
  include('https://kit.fontawesome.com/98631fb0ca.js',function() {});

// event listeners
  window.addEventListener('load', function(){vidRescale(); updateCarousels(); });

  var resizeId;
  window.addEventListener('resize', function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

  function doneResizing(){
      vidRescale();
      updateCarousels();
  }
