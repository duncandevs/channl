
console.log(rb_playlistid);
const PLAYLIST = rb_playlistid;
console.log(PLAYLIST);
const APIKEY = 'AIzaSyB9-C6isL_8dRIskc8JN2HXV8WttDD7Fws';
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var height = 520;
var width = 1054;
var player;
var current;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: height,
    width: width,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
//This function initiliazes a playlist and begins playing
function onPlayerReady() {
  loadPlaylist(PLAYLIST,0)
  getVideos(PLAYLIST)//loads video list
}
function onPlayerStateChange(event) {
  if(event.data === 1){//video starts playing
    var title = player.getVideoData()['title'];
    dispTitle(title);
  }
 }

function loadPlaylist(playlist,index){
  player.loadPlaylist({
    list:  playlist,
    index: index
  })
}
//This function grabs the thumbnails for the video playlist
function getVideos(playlistid){
  var videoArray = [];
  $.get( "https://www.googleapis.com/youtube/v3/playlistItems",{
      part: "snippet",
      playlistId: playlistid,
      maxResults: 50,
      key: APIKEY },
      function(data){
        var videoArray = new Array();
        var items = data.items;
        $.each(items,function(i, item){
          var title = item.snippet.title;
          var videoid = item.snippet.resourceId.videoId;
          var thumbnail = item.snippet.thumbnails.maxres;
          thumbnail != undefined? thumbnail = item.snippet.thumbnails.maxres.url : thumbnail = item.snippet.thumbnails.high.url;
          var temp = [title,videoid,thumbnail];
          videoArray.push(temp);
        });// end each
        dispList(videoArray);
      }//end data fxn
   );//end get
}

function dispList(videoArray){
  const VIDEOARRAY = videoArray
  //APPEND TO ID:VIDEO-LIST
  //DISPLAY THUMBNAIL
  //DISPLAY TITLE
  //ATTACH URL
  for(var i = 0; i < VIDEOARRAY.length; i++){
    var videoWrap = document.createElement('div');
    var thumb = document.createElement('div');
    var image = document.createElement('img');
    var title = document.createElement('div');

    videoWrap.className = "video-wrap";
    thumb.className = "thumb";
    image.className = "thumbimg";
    title.className = "title col-md-6";
    title.id = VIDEOARRAY[i][1];
    videoWrap.id = i;
    image.setAttribute("src",VIDEOARRAY[i][2]);
    title.innerHTML = VIDEOARRAY[i][0];

    videoWrap.append(thumb);
    thumb.append(image);
    videoWrap.append(title);
    $("#video-list").append(videoWrap);
  }


  dispTitle(VIDEOARRAY[0][0]);
  changeVideos(VIDEOARRAY)
  hoverStyle()
}//end function
// plays a video from the video-list when thumbnail is clicked
function changeVideos(videos){
  $(".video-wrap").click(function(){
    var index = $(this).attr("id");
    var title = videos[index][0]

    loadPlaylist(PLAYLIST,index);
    dispTitle(title);
  })
}
function hoverStyle(){
  $(".video-wrap").hover(function(){
    $(this).css("border-style", "solid");
    $(this).css("border-color","white");
  }, function(){
    $(this).css("border-style", "");
    $(this).css("border-color","");
 });
}
function dispTitle(title){
  $(".title-playing").html(title)
}

/*
    <h4>MUSIC</h4>
      <img src = "http://i66.tinypic.com/33w2sdl.jpg" class = "image" width="248">
      */
