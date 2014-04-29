/**
 Left Side Me Purple
 */

Physics(function(world){

  var $win = $(window);
  var viewWidth = $win.width()/2;
  var viewHeight = $win.height();

  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  var isMouseDown = false;
  var elements = [];
  var bodies = [];
  var properties = [];
  var mouseOnClick = [];

  // constrain objects to these bounds
  var edgeBounce = Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
  });

  // play/pause
  $(document).on('click', '.start-stop', function(e){
      e.preventDefault();
      var paused = world.isPaused();
      if (paused){
          $(this).text('pause');
          world.unpause();
      } else {
          $(this).text('play');
          world.pause();
      }
  });

  // render to dom
  var renderer = Physics.renderer('dom', {
    el: 'me-canvas',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    debug: false
  });

  //resize window
  $(window).on('resize', function(){
      viewWidth = $win.width()/2;
      viewHeight = $win.height();
      renderer.el.style.width = viewWidth + "px";
      renderer.el.style.height = viewHeight + "px";
      renderer.options.width = viewWidth;
      renderer.options.height = viewHeight;
      viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
      edgeBounce.setAABB( viewportBounds );
  }).trigger('resize');

  // add the renderer
  world.add( renderer );

  // render on each step
  world.on('step', function () {
    world.render();
  });


  //get elements
  elements = getElementsByClass("dot-element-me");

  for ( var i = 0; i < elements.length; i ++ ) {
    properties[i] = getElementProperties( elements[i] );
  };

  // large screen size
  if ($(window).width() > 480) {

    for ( var i = 0; i < elements.length; i ++ ) {
      var element = elements[ i ];


      element.style.position = 'absolute';
      element.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      element.style.top = ( - properties[i][3]/2) + 'px';
      element.style.width = properties[i][2] + 'px';

      //mouse event
      element.addEventListener( 'mousedown', onElementMouseDown, false );
      element.addEventListener( 'mouseup', onElementMouseUp, false );

      bodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 60,
        mass: 1.0,
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      bodies[i].view = element;
    };

  } else { //small screen < 480px
    for ( var i = 0; i < elements.length; i ++ ) {
      var element = elements[ i ];


      element.style.position = 'absolute';
      element.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      element.style.top = ( - properties[i][3]/2) + 'px';
      element.style.width = properties[i][2] + 'px';

      //mouse event
      element.addEventListener( 'mousedown', onElementMouseDown, false );
      element.addEventListener( 'mouseup', onElementMouseUp, false );

      bodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 30,
        mass: 1.0,
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      bodies[i].view = element;
    };

  }

  // stop rotation
  world.on('integrate:positions', function(){
    for(var i = 0, l = bodies.length; i < l; i++) {
        bodies[i].state.angular.pos = 0;
    }
  });

  // add the bodies to the world
  world.add( bodies );

  // add behaviours
  world.add( edgeBounce );
  world.add( Physics.behavior('body-impulse-response') );

  // add gravity
  // world.add( Physics.behavior('constant-acceleration') );

  // body collision
  world.add( Physics.behavior('body-collision-detection', { checkAll: false }) );
  world.add( Physics.behavior('sweep-prune') );

  // add mouse-events
  world.add(Physics.behavior('demo-mouse-events', {
      el: '#me-canvas'
  }));

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time ) {
    world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

  function slideContent() {
    $('.me-container').toggleClass('open');
  };

  // close
  $('#close-me').click(function() {
    $('.me-container').removeClass('open');
  })



  // utils
  function onElementMouseDown( event ) {
    event.preventDefault();

    mouseOnClick[0] = event.clientX;
    mouseOnClick[1] = event.clientY;

    if ( event.target == document.getElementById( 'me' ) ) {
      slideContent();
    }
    // if ( event.target == document.getElementById( 'curiosity' ) ) {
    //   slideContent();
    // }
    // if ( event.target == document.getElementById( 'drive' ) ) {
    //   slideContent();
    // }
    // if ( event.target == document.getElementById( 'creativity' ) ) {
    //   slideContent();
    // }
  }

  function onElementMouseUp( event ) {
    event.preventDefault();
  }

  function getElementsByClass( searchClass ) {

    var classElements = [];
    var els = document.getElementsByTagName('*');
    var elsLen = els.length

    for (i = 0, j = 0; i < elsLen; i++) {

      var classes = els[i].className.split(' ');
      for (k = 0; k < classes.length; k++)
        if ( classes[k] == searchClass )
          classElements[j++] = els[i];
    }

    return classElements;
  }

  function getElementProperties( element ) {

    var x = 0;
    var y = 0;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    do {

      x += element.offsetLeft;
      y += element.offsetTop;

    } while ( element = element.offsetParent );

    return [ x, y, width, height ];
  }

  function random( min, max ){
    return (Math.random() * (max-min) + min)|0
  }

});