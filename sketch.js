const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var torre;
var cannonBall;
var canon;
var backgroundImg;
var boat;
var angle;
var boats=[];

var balls=[];

function preload() {
 torre=loadImage("assets/tower.png");
 backgroundImg=loadImage("assets/background.gif");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle=15;
  canon = new Canon(180,110,130,100,angle);
  cannonBall = new CannonBall(canon.x,canon.y);
  boat=new Boat(width-79,height-60,170,170,-80)
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

}

function draw() {
  background(189);
  Engine.update(engine);
 image(backgroundImg,0,0,1200,600);
 push();
 imageMode(CENTER);
 image(torre,160,350,160,310);
 pop();
 rect(ground.position.x, ground.position.y,width*2,1);
 showBoats();
 for(var i=0;i<balls.length;i++){
  showCannonBalls(balls[i],i);
  collisionWithBoat(i);
 }
  canon.display();
  //Matter.Body.setVelocity(boat.body,{x:-0.9,y:0});
  //boat.display()
   //cannonBall.display();
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
//cannonBall.shoot();
balls[balls.length-1].shoot();
  }
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    cannonBall=new CannonBall(canon.x,canon.y);
    balls.push(cannonBall);
  }
}
function showCannonBalls(ball,index){
  if(ball){
ball.display();
if(ball.body.position.x>=width|| ball.body.position.y>=height-50){
  ball.remove(index);
}
  }
}
function showBoats(){
  if(boats.lenght>0){
    if(boats[boats.lenght-1]===undefined ||boats[boats.lenght-1].body.position.x<width-300){
var positions=[-40,-60,-70,-20];
var position=random(positions);
var boat=new Boat(width,height-100,170,170,position);
boats.push(boat);
    }
    for(var i=0;i<boats.lenght;i++){
if(boats[i]){
Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
boats[i].display();

}else{
  var boat=new Boat(width-79,height-60,170,170,-60);
  boats.push(boat);
}
    }
  }
}
function collisionWithBoat(index){
  for(var i=0;i<boats.length;i++){
    if(balls[index]!= undefined && boats[i]!= undefined){
      var collision=Matter.SAT.collides(balls[index].body,boats[i].body);
      if(collision.collided){
boats[i].remove(i);
balls[index].remove(index);

      }
    }
  }
}