$(document).ready(function(){
const APIKEY =  'AIzaSyB9-C6isL_8dRIskc8JN2HXV8WttDD7Fws';
// defines a class Category
function Category(playlistid,title){
  this.playlistid = playlistid;
  this.title = title;
}

Category.prototype = {
  constructor: Category,
  showid: function(){
    return this.playlistid;
  },
  display: function(){
    getVideos(this.playlistid,this.title)
  },
  newtitle: function(title){
    this.title = title
  }
}
//api call to get videos from youtube playlist
//Note if a video is deleted from playlist then it breaks the code....find a fix
//upload a video..add to playlist test, then delete video
function getVideos(playlistid,categorytitle){
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
        dispCategory(videoArray,categorytitle,playlistid);
      }//end data fxn
   );//end get
}//end function

// create html elements and display thumbnails, title, url
function dispCategory(videoArray,categorytitle,playlistid){
  console.log(playlistid);
  const VIDEOARRAY = videoArray.reverse();
  const ROWTITLE = categorytitle.toUpperCase();
  var row = document.createElement('div');
  var channeltitle = document.createElement('div');

  row.className = "row";
  row.id = "row-"+ROWTITLE;
  $(".container").append(row);
  channeltitle.innerHTML = ROWTITLE;
  channeltitle.id = playlistid;
  channeltitle.className = "channel-title";
  $("#"+row.id).append(channeltitle);

  for(var i = 0; i < 4 ; i++){
    var videotitle = VIDEOARRAY[i][0];
    if(videotitle.length >= 37){videotitle = VIDEOARRAY[i][0].substring(0,37)+"..."};
    var videourl = VIDEOARRAY[i][1];
    var thumbnail = VIDEOARRAY[i][2];
    var divwrap  = document.createElement('div');
    var divvideo = document.createElement('div');
    var divimg   = document.createElement('img');
    var divtitle = document.createElement('div');

    $("#"+row.id).append(divwrap);
    divwrap.setAttribute("url", videourl);
    divwrap.setAttribute("type", ROWTITLE);
    divwrap.setAttribute("list", playlistid);
    divwrap.className = "video-wrap";
    divvideo.className = "video";
    divimg.setAttribute("src", thumbnail);
    divimg.className = "category-img";
    divtitle.className = "video-title";
    divtitle.innerHTML = videotitle.toLowerCase();
    divwrap.append(divvideo);
    divwrap.append(divtitle);
    divvideo.append(divimg);

    goToChannelPage();
  }
}//end function


MUSIC = new Category("PLrESQ_Ih_XDy02Wf925pSxZ5-OV4p8cT0","Music");
MUSIC.display();

TECH = new Category("PLrESQ_Ih_XDyum_nmWozpX300ESe6z4mp", "Tech");
TECH.display();

TALKS = new Category("PLrESQ_Ih_XDxcoFeFql3eXtlNBGicq8qt","Talks");
TALKS.display();

TRAVEL = new Category("PLrESQ_Ih_XDxBMVh97VjRG9ouKMtGIjLA","Travel");
TRAVEL.display();

DOCUMENTARY = new Category("PLrESQ_Ih_XDzaeuwqnvui6lfst6VMhXDv","Documentary");
DOCUMENTARY.display();

FOOD = new Category("PLrESQ_Ih_XDzoAr7e_FYmZrnVPetKExIV","Food");
FOOD.display();

CARS = new Category("PLrESQ_Ih_XDz6lIwmluaHTkAyGZeGDQE0","Cars");
CARS.display();

VLOGS = new Category("PLrESQ_Ih_XDypRqFK0RNOZwSWTVjtPHU5","Vlogs");
VLOGS.display();
})//END DOCUMENT.READY

//HELPER FUNCTIONS
function goToChannelPage(){
  var $form = $("form");
  $form.css("display","none");
  var $name = $("#channel_name");
  var $playlist_id = $("#channel_playlist_id");
  var $video_id = $("#channel_video_id");
  $(".channel-title").click(function(){
    var name = $(this).html();
    var playlist_id = $(this).attr("id");
    $name.val(name);
    $playlist_id.val(playlist_id);
    $form.submit();
  })
  $(".video-wrap").click(function(){
    var name = $(this).attr("type");
    var playlist_id = $(this).attr("list");
    var video_id = $(this).attr("url");
    $name.val(name);
    $playlist_id.val(playlist_id);
    $video_id.val(video_id);
    $form.submit();
  })
}
//scroll top element
$(document).on('click','.video-wrap', function(){
    var id = $(this).attr("url");
})

$(document).ready(function(){
  $("#return-to-top").click(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })
})

/*
$(document).on('mouseenter','.video-wrap', function(){
    alert("enter")
}).on('mouseleave','.video-wrap', function(){
    alert("leave")
});
*/
