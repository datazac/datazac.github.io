/**
 RIgth Side Work Green
 */

Physics(function(world){

  var $win = $(window);
  var viewWidth = $win.width()/2;
  var viewHeight = $win.height();

  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  var edgeBounce = Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
  });

  // Play/Pause
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

  var renderer = Physics.renderer('canvas', {
    el: 'work-canvas',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    debug: false,
    styles: {
        // set colors for the circle bodies
        'circle' : {
          strokeStyle: 'hsla(172, 41%, 89%, 1)',
          lineWidth: 1,
          fillStyle: 'hsla(172, 41%, 89%, 1)',
          angleIndicator: false
        }
    }
  });

  //Resize Window
  $(window).on('resize', function(){
      viewWidth = $win.width()/2;
      viewHeight = $win.height();
      renderer.el.width = viewWidth;
      renderer.el.height = viewHeight;
      renderer.options.width = viewWidth;
      renderer.options.height = viewHeight;
      viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
      edgeBounce.setAABB( viewportBounds );
  }).trigger('resize');

  // add the renderer
  world.add( renderer );
  // render on each step
  world.subscribe('step', function(){
    world.render();
  });

  world.add(Physics.behavior('demo-mouse-events', {
      el: '#work-canvas'
  }));

  // begin
  var cokeDot = Physics.body('circle', {
      x: Physics.util.random(60, 400),
      y: Physics.util.random(500),
      radius: 60,
      mass: 1.5,
      vx: 0.25,
      vy: .1,
      name:"coca-cola"
  });

  var legoDot = Physics.body('circle', {
      x: Physics.util.random(60, 400),
      y: Physics.util.random(500),
      radius: 60,
      mass: 1.5,
      vx: 0.25,
      vy: .1,
      name:"lego"
  });

  var teliaDot = Physics.body('circle', {
      x: Physics.util.random(60, 400),
      y: Physics.util.random(500),
      radius: 60,
      mass: 1.5,
      vx: 0.25,
      vy: .1,
      name:"halebop"
  });

  var barpassDot = Physics.body('circle', {
      x: Physics.util.random(60, 400),
      y: Physics.util.random(500),
      radius: 60,
      mass: 1.5,
      vx: 0.25,
      vy: .1,
      name:"barpass"
  });

  var screwswedenDot = Physics.body('circle', {
      x: Physics.util.random(60, 400),
      y: Physics.util.random(500),
      radius: 60,
      mass: 1.5,
      vx: 0.25,
      vy: .1,
      name:"screw sweden"
  });

  // add things to world
  world.add( [cokeDot, legoDot, teliaDot, barpassDot, screwswedenDot] );

  world.add( edgeBounce );
  world.add( Physics.behavior('body-impulse-response') );

  // add gravity
  world.add( Physics.behavior('constant-acceleration') );

  // Body Collision
  world.add( Physics.behavior('body-collision-detection', { checkAll: false }) );
  world.add( Physics.behavior('sweep-prune') );

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.subscribe(function( time, dt ){
      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});