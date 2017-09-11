function Controls(){
  this.Create = function(){
    var p = new Point(random(width - 100) + 50, random(height - 100) + 50, width/1.5);
    points[points.length] = p;
    var f = gui.addFolder(points.length);
    f.add(p, "x").listen();
    f.add(p, "y").listen();
    f.add(p, "radius").listen();
  }
  this.Save = function(){
    saveCanvas('colorspace', 'png');
  }
}

function Point(x_, y_, r_){
  this.x = x_;
  this.y = y_;
  this.radius = r_;
}

var points = [];

var alreadySelected = false;
var gui;
var ctrl = new Controls();


function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  gui = new dat.GUI();
  gui.add(ctrl, "Create");
  gui.add(ctrl, "Save");

  for(var i = 0; i < 3; i++){
    ctrl.Create();
  }

  dat.GUI.toggleHide();

  console.log(width/80);
}

function draw(){

  clear();

  for(let p of points){
    //move points
    if(!alreadySelected &&
       mouseIsPressed &&
       mouseX < p.x + 80 &&
       mouseX > p.x - 80 &&
       mouseY < p.y + 80 &&
       mouseY > p.y - 80){
      //if a point has already been selected, don't move another
      alreadySelected = true;
      //move currently selected point to the top
      var i = points.indexOf(p);
      points.splice(i, 1);
      points.unshift(p);
      p.x = mouseX;
      p.y = mouseY;

      if(touches.length > 1){
        p.radius = dist(touches[0].x, touches[0].y, touches[touches.length-1].x, touches[touches.length-1].y);
      }
    }
  }
  //display points from bottom to top
  for(var i = points.length-1; i >=0; i--){
    fill(points[i].x / width * 360, points[i].y / height * 100, 95, 0.3);
    ellipse(points[i].x, points[i].y, points[i].radius);
    //TODO: make centers more visible
    fill(0, 0, 100, 1);
    ellipse(points[i].x, points[i].y,  10);
  }

  alreadySelected = false;
}

var lastTouchY = 0;
var preventPullToRefresh = false;

$('.js-plus').on('click', function(e){
  e.preventDefault();
  ctrl.Create();
});

$('.js-plus').on('tap', function(e){
  e.preventDefault();
  ctrl.Create();
});

$('body').on('touchstart', function (e) {
    // if (e.originalEvent.touches.length != 1) { return; }
    // lastTouchY = e.originalEvent.touches[0].clientY;
    // preventPullToRefresh = window.pageYOffset == 0;

    // e.preventDefault();
});

$('body').on('touchmove', function (e) {
    // var touchY = e.originalEvent.touches[0].clientY;
    // var touchYDelta = touchY - lastTouchY;
    // lastTouchY = touchY;
    // if (preventPullToRefresh) {
    //     // To suppress pull-to-refresh it is sufficient to preventDefault the first overscrolling touchmove.
    //     preventPullToRefresh = false;
    //     if (touchYDelta > 0) {
    //         e.preventDefault();
    //         return;
    //     }
    // }
    e.preventDefault();
});
