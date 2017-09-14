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
  this.Clear = function(){
    for(var i = 1; i <= points.length; i++){
      console.log(i, points.length, gui.__folders);
      gui.__folders[i].close();
      gui.__folders[i].domElement.parentNode.parentNode.removeChild(gui.__folders[i].domElement.parentNode);
      gui.__folders[i] = undefined;
      gui.onResize();
		}
    points = [];
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
var selectedPoint = undefined;
var selectDist;
var selected = false;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  gui = new dat.GUI();
  gui.add(ctrl, "Create");
  gui.add(ctrl, "Save");
  gui.add(ctrl, "Clear");

  for(var i = 0; i < 3; i++){
    ctrl.Create();
  }

  dat.GUI.toggleHide();
}

function draw(){

  clear();
  // selectedPoint = undefined;
  selectDist = 100;
  // console.log(selected);

  if(mouseIsPressed && !selected){
    for(let p of points){
      if(dist(p.x, p.y, mouseX, mouseY) < selectDist){
        selectDist = dist(p.x, p.y, mouseX, mouseY);
        var i = points.indexOf(p);
        points.splice(i, 1);
        points.unshift(p);
        selectedPoint = p;
        selected = true;
      }
    }
  }

  if(selected){
    //move points
    selectedPoint.x = mouseX;
    selectedPoint.y = mouseY;
    // console.log(selectedPoint);
    //scale points
    if(touches.length > 1){
      selectedPoint.radius = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    }
  }

  //display points from bottom to top
  for(var i = points.length-1; i >=0; i--){
    fill(points[i].x / width * 360, points[i].y / height * 100, 95, 0.5);
    ellipse(points[i].x, points[i].y, points[i].radius);
  }

  for(var i = points.length-1; i >=0; i--){
    fill(0, 0, 100, 1);
    ellipse(points[i].x, points[i].y,  10);
  }

}

function mouseReleased(){
  selectedPoint = undefined;
  selected = false;

  return false;
}

function touchEnded(){
    selectedPoint = undefined;
    selected = false;
}

function touchMoved(){
  selectDist = 100;
  // console.log(selected);

  if(mouseIsPressed && !selected){
    for(let p of points){
      if(dist(p.x, p.y, mouseX, mouseY) < selectDist){
        selectDist = dist(p.x, p.y, mouseX, mouseY);
        var i = points.indexOf(p);
        points.splice(i, 1);
        points.unshift(p);
        selectedPoint = p;
        selected = true;
      }
    }
  }

  if(selected){
    //move points
    selectedPoint.x = mouseX;
    selectedPoint.y = mouseY;
    // console.log(selectedPoint);
    //scale points
    if(touches.length > 1){
      selectedPoint.radius = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    }
  }

  return false;
}

$('.js-plus').on('click', function(e){
  e.preventDefault();
  ctrl.Create();
});

$('.js-plus').on('tap', function(e){
  e.preventDefault();
  ctrl.Create();
});

$('.js-refresh').on('click', function(e){
  e.preventDefault();
  ctrl.Clear();
});

$('.js-refresh').on('tap', function(e){
  e.preventDefault();
  ctrl.Clear();
});

$('.js-bookmark').on('click', function(e){
  e.preventDefault();
  ctrl.Save();
});

$('.js-bookmark').on('tap', function(e){
  e.preventDefault();
  ctrl.Save();
});

$('body').on('touchmove', function (e) {
    e.preventDefault();
});
