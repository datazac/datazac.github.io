/**
 Right Side Work Green
 */

Physics(function(world){

  var $win = $(window);
  var viewWidth = $win.width()/2;
  var viewHeight = $win.height();

  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  var isMouseDown = false;
  var mouseOnClick = [];

  //dot bodies
  var properties = [];

  var titles = [];
  var titleBodies = [];
  var rowOnes = [];
  var rowOneBodies = [];
  var rowTwos = [];
  var rowTwoBodies = [];
  var rowThrees = [];
  var rowThreeBodies = [];

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
    el: 'work-canvas',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    debug: false
  });

  //resize Window
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

  // large screen
  if ($(window).width() > 480) {
    //get elements
    // title
    titles = getElementsByClass("dot-element-work-title");

    for ( var i = 0; i < titles.length; i ++ ) {
      properties[i] = getElementProperties( titles[i] );
    };

    for ( var i = 0; i < titles.length; i ++ ) {
      var title = titles[ i ];


      title.style.position = 'absolute';
      title.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      title.style.top = ( - properties[i][3]/2) + 'px';
      // title.style.width = properties[i][2] + 'px';

      //mouse event
      title.addEventListener( 'mousedown', onElementMouseDown, false );
      title.addEventListener( 'mouseup', onElementMouseUp, false );

      titleBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 60,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      titleBodies[i].view = title;

    };

    // row 1
    rowOnes = getElementsByClass("dot-element-work-row-one");

    for ( var i = 0; i < rowOnes.length; i ++ ) {
      properties[i] = getElementProperties( rowOnes[i] );
    };

    for ( var i = 0; i < rowOnes.length; i ++ ) {
      var rowOne = rowOnes[ i ];

      rowOne.style.position = 'absolute';
      rowOne.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowOne.style.top = ( - properties[i][3]/2) + 'px';
      // rowOne.style.width = properties[i][2] + 'px';

      //mouse event
      rowOne.addEventListener( 'mousedown', onElementMouseDown, false );
      rowOne.addEventListener( 'mouseup', onElementMouseUp, false );

      rowOneBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 60,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowOneBodies[i].view = rowOne;

    };

    // row 2
    rowTwos = getElementsByClass("dot-element-work-row-two");

    for ( var i = 0; i < rowTwos.length; i ++ ) {
      properties[i] = getElementProperties( rowTwos[i] );
    };

    for ( var i = 0; i < rowTwos.length; i ++ ) {
      var rowTwo = rowTwos[ i ];

      rowTwo.style.position = 'absolute';
      rowTwo.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowTwo.style.top = ( - properties[i][3]/2) + 'px';
      // rowTwo.style.width = properties[i][2] + 'px';

      //mouse event
      rowTwo.addEventListener( 'mousedown', onElementMouseDown, false );
      rowTwo.addEventListener( 'mouseup', onElementMouseUp, false );

      rowTwoBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 350,
        radius: 60,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowTwoBodies[i].view = rowTwo;

    };

    // row 3

    rowThrees = getElementsByClass("dot-element-work-row-three");

    for ( var i = 0; i < rowThrees.length; i ++ ) {
      properties[i] = getElementProperties( rowThrees[i] );
    };

    for ( var i = 0; i < rowThrees.length; i ++ ) {
      var rowThree = rowThrees[ i ];

      rowThree.style.position = 'absolute';
      rowThree.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowThree.style.top = ( - properties[i][3]/2) + 'px';
      // rowThree.style.width = properties[i][2] + 'px';

      //mouse event
      rowThree.addEventListener( 'mousedown', onElementMouseDown, false );
      rowThree.addEventListener( 'mouseup', onElementMouseUp, false );

      rowThreeBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 500,
        radius: 60,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowThreeBodies[i].view = rowThree;
    };

  } else { // small screen < 480px

    titles = getElementsByClass("dot-element-work-title");

    for ( var i = 0; i < titles.length; i ++ ) {
      properties[i] = getElementProperties( titles[i] );
    };

    for ( var i = 0; i < titles.length; i ++ ) {
      var title = titles[ i ];


      title.style.position = 'absolute';
      title.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      title.style.top = ( - properties[i][3]/2) + 'px';
      // title.style.width = properties[i][2] + 'px';

      //mouse event
      title.addEventListener( 'mousedown', onElementMouseDown, false );
      title.addEventListener( 'mouseup', onElementMouseUp, false );

      titleBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 30,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      titleBodies[i].view = title;

    };

    // row 1
    rowOnes = getElementsByClass("dot-element-work-row-one");

    for ( var i = 0; i < rowOnes.length; i ++ ) {
      properties[i] = getElementProperties( rowOnes[i] );
    };

    for ( var i = 0; i < rowOnes.length; i ++ ) {
      var rowOne = rowOnes[ i ];

      rowOne.style.position = 'absolute';
      rowOne.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowOne.style.top = ( - properties[i][3]/2) + 'px';
      // rowOne.style.width = properties[i][2] + 'px';

      //mouse event
      rowOne.addEventListener( 'mousedown', onElementMouseDown, false );
      rowOne.addEventListener( 'mouseup', onElementMouseUp, false );

      rowOneBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 200,
        radius: 30,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowOneBodies[i].view = rowOne;

    };

    // row 2
    rowTwos = getElementsByClass("dot-element-work-row-two");

    for ( var i = 0; i < rowTwos.length; i ++ ) {
      properties[i] = getElementProperties( rowTwos[i] );
    };

    for ( var i = 0; i < rowTwos.length; i ++ ) {
      var rowTwo = rowTwos[ i ];

      rowTwo.style.position = 'absolute';
      rowTwo.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowTwo.style.top = ( - properties[i][3]/2) + 'px';
      // rowTwo.style.width = properties[i][2] + 'px';

      //mouse event
      rowTwo.addEventListener( 'mousedown', onElementMouseDown, false );
      rowTwo.addEventListener( 'mouseup', onElementMouseUp, false );

      rowTwoBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 350,
        radius: 30,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowTwoBodies[i].view = rowTwo;

    };

    // row 3

    rowThrees = getElementsByClass("dot-element-work-row-three");

    for ( var i = 0; i < rowThrees.length; i ++ ) {
      properties[i] = getElementProperties( rowThrees[i] );
    };

    for ( var i = 0; i < rowThrees.length; i ++ ) {
      var rowThree = rowThrees[ i ];

      rowThree.style.position = 'absolute';
      rowThree.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
      rowThree.style.top = ( - properties[i][3]/2) + 'px';
      // rowThree.style.width = properties[i][2] + 'px';

      //mouse event
      rowThree.addEventListener( 'mousedown', onElementMouseDown, false );
      rowThree.addEventListener( 'mouseup', onElementMouseUp, false );

      rowThreeBodies[i] = Physics.body('circle', {
        x: viewWidth/2,
        y: 500,
        radius: 30,
        mass: 1.0,
        // gravity part
        vx: random(-5, 5)/100,
        vy: 0.15
      });

      rowThreeBodies[i].view = rowThree;
    };
  }

  // stop rotation
  world.on('integrate:positions', function(){
    for(var i = 0, l = titleBodies.length; i < l; i++) {
        titleBodies[i].state.angular.pos = 0;
    }
    for(var i = 0, l = rowOneBodies.length; i < l; i++) {
        rowOneBodies[i].state.angular.pos = 0;
    }
    for(var i = 0, l = rowTwoBodies.length; i < l; i++) {
        rowTwoBodies[i].state.angular.pos = 0;
    }
    for(var i = 0, l = rowThreeBodies.length; i < l; i++) {
        rowThreeBodies[i].state.angular.pos = 0;
    }
  });


  // add the bodies to the world
  // delay title
  world.add( titleBodies );

  // projects
  world.add( rowOneBodies );
  world.add( rowTwoBodies );
  world.add( rowThreeBodies );

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
      el: '#work-canvas'
  }));

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time ) {
    world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

  // click dots and select project
  function onElementMouseDown( event ) {
    event.preventDefault();

    mouseOnClick[0] = event.clientX;
    mouseOnClick[1] = event.clientY;

    if ( event.target == document.getElementById( 'lego' ) ) {

        var skills = ['Concept', 'Pitching', 'UI', 'Team'];
        var values = [80, 75, 60, 50];
        var project = "lego";
        var color = "#ffff00";
        var position = "Concept & Pitching";
        var textLeft = "I was selected as one of 30 students to participate in a 48 hour hackathon with LEGO in Aaarhus, Denmark, as part of brief for LEGO Future Labs on the future of toys. The participants were selected from Hyper Island and Kaos Pilots schools. I worked with a team of 3 on a new toy concept.";
        var textRight = "We worked closely with the senior designers at Future labs to create the concept and then at end of the 48 hours, I pitched the concept to a panel including the Future Lab team and one of Lego's VP's. This was an exciting brief which included concept development, design prototyping, defining the user journey, and pitching.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'coke' ) ) {

        var skills = ['Strategy', 'Branding', 'UX', 'Pitching'];
        var values = [90, 75, 50, 50];
        var project = "coke";
        var color = "#f80000";
        var position = "Team Leader, Concept & Copy";
        var textLeft = "Coca-Cola came to Hyper Island so the entire school could work on a brief for 72 hours. Working as lead of a team of three, I came up with a concept/platform which we developed a pitch for and presented to Coke's swedish marketing team. The concept was very good: “it connected all the dots”. We pitched again several weeks later to an entire boardroom of marketing execs from across Europe.";
        var textRight = "Our concept came in first place out of 38 teams and is actively in development at coke. This brief involved concept development, business strategies, market segmentation, purchase mechanisms, copy-writing, bleeding-edge technologies, and pitching.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'halebop' ) ) {

        var skills = ['Digital Marketing', 'Data', 'UX', 'Pitching'];
        var values = [90, 70, 60, 50];
        var project = "halebop";
        var color = "#a62169";
        var position = "Strategy & Pitching";
        var textLeft = "During our second client module in the Digital Data Strategist program at Hyper Island, I worked on a brief for Halebop, the friendlier younger brother of Telia, one of Sweden's largest telecoms. In a team of 5, responsible for leading ideation sessions and pitching, we worked with Halebop's CMO, and the CEO of their agency of record, Honesty, to deliver a service that would improve the efficiency of their marketing spend.";
        var textRight = "Gathering insights from their marketing data, we created a digital strategy that would improve how they directed potential customer's to their site and acquired new customers. The CMO was extremely happy with the results and is implementing the strategy.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'barpass' ) ) {

        var skills = ['Founder', 'PM', 'UX', 'Design'];
        var values = [100, 90, 80, 60];
        var project = "barpass";
        var color = "#45345b";
        var position = "Founder & App Director";
        var textLeft = "I founded Barpass with a friend when we saw an opportunity to introduce new customers to bars. As founder, and App Director, I built the original iOS prototype which we showed to our potential customers (bars and alcohol distributors), and then went on to build a team including and an Art Director and two developers (iOS and Android). We built the original iOS app in 6 weeks, working longs nights after our day jobs.";
        var textRight = "The app allows people to sign up anonymously to events at bars (that we organized), where they can drink for free for an hour. The bar pays us to get people in the door and alcohol companies pay us for advertising in the app. Barpass was an incredible experience of lean and agile development, encompassing both product and service, b2b and b2c.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'breathr' ) ) {

        var skills = ['Code', 'Design', 'UX', 'API'];
        var values = [100, 85, 80, 80];
        var project = "breathr";
        var color = "#31485f";
        var position = "Concept, Design & Code";
        var textLeft = "During the Toolbox module at Hyper Island, I developed my first real web app. We were asked to create a web app using open data that would improve the lives of the people of Stockholm. Breathr is an app that allows the user to take a break and find the closest beautiful view of the much sought after Stockholm waterfront.";
        var textRight = "You go to the app, and you can pick from closest view, browse through all the view locations, or even choose an area of the city and it will give you the closest view near you. I coded and designed the entire app using javascript with weather, map, and direction's apis. We presented this app at the Stockholm Open Data Exhibition.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'screw-sweden' ) ) {

        var skills = ['PM', 'Code', 'Data', 'Ux'];
        var values = [90, 80, 80, 70];
        var project = "screw-sweden";
        var color = "#000000";
        var position = "Team Leader & Code";
        var textLeft = "As part of the data visualization module, we were given a dataset containing the sex habits of swedes. Using this dataset, I lead a team of 3 to create Screw Sweden. Screw Sweden is scrolling info-graphic and questionnaire, designed to look a bit like an ikea catalog. The user goes through the site reading info and answering some provocative questions about sex habits. At the end the users receive a post-card of where they should visit in Sweden that would be best for their sex habits,";
        var textRight = "based on real data. The team designed and coded the entire site in 10 days, and then we presented to a well regarded data journalist. I managed the team, created the storyboard, co-developed the quiz matrix, and coded the quiz matrix in the app. As result of this work, I was invited to continue working with module leader, Jans Finnas, on data visualization projects outside of the course.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'jobbook' ) ) {

        var skills = ['PM', 'Customer Service', 'Strategy', 'UX'];
        var values = [80, 75, 50, 30];
        var project = "jobbook";
        var color = "#44a8c8";
        var position = "Project Manager & VP University Relations";
        var textLeft = "My experience working in the web. I was lucky enough to get an opportunity at this start-up on my return from Rio de Janeiro. I began as an unpaid intern and when I left a year and half later, I was lead project manager. I was the first non-technical full time employee. I worked side by side everyday with the founders. Jobbook still attempts to change the face of online recruiting, and while I was there we were totally bootstrapped.";
        var textRight = "I worked on everything from project management, cold-calling, pitching, running a Wordpress news blog, social media management, and leading a team of more than 50 university ambassadors across North America. This is where I realized I wanted to work with digital products and that I need to learn some code and creative tools to better work with devs.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
    if ( event.target == document.getElementById( 'sos-barnbyar' ) ) {

        var skills = ['PM', 'Pitching', 'UX', 'Concept'];
        var values = [75, 70, 60, 50];
        var project = "sos-barnbyar";
        var color = "#f47822";
        var position = "Motivator, Strategy & Pitching";
        var textLeft = "This was the first brief at Hyper Island. I worked in a team of 3 to develop the future of charitable fundraising. We came up with a concept to create a charitable link shortener so Ads could be played while the page is loading and then the charity receives the funds. In 48 hours, we developed the concept and created a 1 minute video.";
        var textRight = "I pitched the idea to the SOS Barnbyar team. During this brief I helped develop the concept, prune ideas, and direct the movie's storyboard in order to meet the deadline to do a killer pitch.";

        dotColor(color);
        workContent(project, position, textLeft, textRight);
        workChart(skills, values, color);
        openContent();
    }
  }

  // open
  function openContent() {
    $('.work-container').addClass('open');
  };

  // close
  $('#close-work-bottom').click(function() {
    var color = "#B3B8B6";

    $('.work-container').removeClass('open');

    dotColor(color);
  })

  $('#close-work-top').click(function() {
    var color = "#B3B8B6";

    $('.work-container').removeClass('open');

    dotColor(color);
  })

// Change dot color
  function dotColor(color) {
    $('.dot-element-work-title').animate({ 'background-color': color }, 400);
    $('.dot-element-work-row-one').animate({ 'background-color': color }, 400);
    $('.dot-element-work-row-two').animate({ 'background-color': color }, 400);
    $('.dot-element-work-row-three').animate({ 'background-color': color }, 400);
    $('.start-stop').animate({ 'color': color }, 400);
    $('#close-work-bottom').css('background-color', color);
    $('#close-work-top').css('background-color', color);
  };


// Chart function
  function workChart(skill, value, color) {

// chart titles
    $('#work-var-title-one').html(skill[0]).css({'opacity':0}).animate({'opacity':1}, 400);
    $('#work-var-title-two').html(skill[1]).css({'opacity':0}).animate({'opacity':1}, 400);
    $('#work-var-title-three').html(skill[2]).css({'opacity':0}).animate({'opacity':1}, 400);
    $('#work-var-title-four').html(skill[3]).css({'opacity':0}).animate({'opacity':1}, 400);

//doughnut charts
    // util
    function reverseVal(value) {
      var newValue = 100-value;
      return newValue;
    };


    // Chart Data
    var data1 = [{
            value: reverseVal(value[0]),
            color: "#fff"
        }, {
            value: value[0],
            color: color
        }
    ]

    var data2 = [{
            value: reverseVal(value[1]),
            color: "#fff"
        }, {
            value: value[1],
            color: color
        }
    ]

    var data3 = [{
            value: reverseVal(value[2]),
            color: "#fff"
        }, {
            value: value[2],
            color: color
        }
    ]

    var data4 = [{
            value: reverseVal(value[3]),
            color: "#fff"
        }, {
            value: value[3],
            color: color
        }
    ]

    var options = {
     animation: true,
     animationSteps: 60,
     segmentShowStroke : false,
     percentageInnerCutout : 65,
     animationEasing : "easeOutQuad"
    };

    var ctx1 = document.getElementById("work-doughtnut1").getContext("2d");
    new Chart(ctx1).Doughnut(data1,options);

    var ctx2 = document.getElementById("work-doughtnut2").getContext("2d");
    new Chart(ctx2).Doughnut(data2,options);

    var ctx1 = document.getElementById("work-doughtnut3").getContext("2d");
    new Chart(ctx1).Doughnut(data3,options);

    var ctx2 = document.getElementById("work-doughtnut4").getContext("2d");
    new Chart(ctx2).Doughnut(data4,options);

  }

  // Work Content
  function workContent(project, position, textLeft, textRight) {

    // Logo
    $('#work-logo').attr('src', 'assets/logos/'+project+'_logo.png').css({'opacity':0}).animate({'opacity':1}, 400);

    // Image
    $('#work-image').attr('src', 'assets/images/'+project+'_image.jpg');

    // Text
    $('.xyz.left p').html(textLeft);
    $('.xyz.right p').html(textRight);

    // Position
    $('.role h1').html(position);
  }

  function onElementMouseUp( event ) {
    event.preventDefault();
  }

  // utils
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

//original

// elements = getElementsByClass("dot-element-work-title");

// for ( var i = 0; i < elements.length; i ++ ) {
//   properties[i] = getElementProperties( elements[i] );
// };

// for ( var i = 0; i < elements.length; i ++ ) {
//   var element = elements[ i ];


//   element.style.position = 'absolute';
//   element.style.left = ( - properties[i][2]/2) + 'px'; // will be set by renderer
//   element.style.top = ( - properties[i][3]/2) + 'px';
//   element.style.width = properties[i][2] + 'px';

//   //mouse event
//   element.addEventListener( 'mousedown', onElementMouseDown, false );
//   element.addEventListener( 'mouseup', onElementMouseUp, false );

//   bodies[i] = Physics.body('circle', {
//     x:500,
//     y: 0,
//     radius: 60,
//     mass: 1.0,
//     // gravity part
//     vx: 0.05,
//     vy: 0.1
//   });

//   bodies[i].view = element;

// };


