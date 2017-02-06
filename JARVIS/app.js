var videoId;
var player;

function tplawesome(e, t) {
	res = e;
	for (var n = 0; n < t.length; n++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
			return t[n][r]
		})
	}
	return res
}

function play(param) {
	var request = gapi.client.youtube.search.list({
		part : "snippet",
		type : "video",
		q : decodeURIComponent(param).replace(/%20/, "+"),
		maxResults : 1,
		order : "viewCount",
		publishedAfter : "2015-01-01T00:00:00Z",
		autoplay : 1
	});

	request.execute(function(response) {
		var results = response.result;
		$.each(results.items, function(index, item) {
			var tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			console.log(item);
			
			$.get("item.html", function(data) {
				videoId = item.id.videoId;
			});

		});
	});
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('video', {
		height : '100%',
		width : '100%',
		playerVars : {
			autoplay : 1,
			loop : 1,
			controls : 0,
			showinfo : 0,
			autohide : 0,
			modestbranding : 1,
			vq : 'hd1080'
		},
		videoId : videoId,
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {
}

function stopVideo() {
	if (player != null) {
		player.stopVideo();
	}
}

function init() {
	gapi.client.setApiKey("AIzaSyCwuzCcixhD6V2l1cezHo7M_GBRCkY8qXs");
	gapi.client.load("youtube", "v3", function() {
	});
}