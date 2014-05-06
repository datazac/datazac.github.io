// Virtual Pages
$("[data-virtual-view]").click(function(e) {
  var $self = $(this),
      virtualPath = $self.attr("data-virtual-view");

  if(virtualPath) {
      ga('send', 'pageview', virtualPath);
  };
});

// Events
$("#pause-play").click(function(e) {
    ga('send', 'event', 'button', 'start-stop', $(this).html());
});

$("#close-me").click(function(e) {
    ga('send', 'event', 'button', 'close', $(this).attr("id"));
});

$("#close-work-top").click(function(e) {
    ga('send', 'event', 'button', 'close', $(this).attr("id"));
});

$("#close-work-bottom").click(function(e) {
    ga('send', 'event', 'button', 'close', $(this).attr("id"));
});

