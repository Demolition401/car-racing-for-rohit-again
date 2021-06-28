var button 
var inp
var heading 

var db

var pc
var gs

var car1, car2

function setup(){

  db=firebase.database()

  var canvas=createCanvas(window.innerWidth,window.innerHeight);
  button = createButton("Join Game")
  button.position(100,100)
  button.mousePressed(playerEnter)

  reset=createButton("Reset")
  reset.position(400,300)
  reset.mousePressed(resetGame)

  db.ref("playercount").on("value", function(data){pc=data.val()})
  db.ref("gamestate").on("value", function(data){gs=data.val()})

  inp=createInput().attribute("placeholder", "Username")
  inp.position(200,200)

  heading=createElement("h2")
  heading.html("Car Racing Game")
  heading.position(window.innerWidth/2,window.innerHeight/2)

  car1=createSprite(500,500,20,20)
  car2=createSprite(400,500,20,20)

}
function draw()
{
  background(100);
  
  if(pc === 2){
    gs = "play"
    db.ref("/").update({gamestate:gs})
  }
if(gs === 2){
  drawSprites(); 
}


}

function playerEnter(){
  pc = pc+1
  db.ref("/").update({playercount:pc})
  greeting = createElement("h3").html("hello " + inp.value() + ".....waiting for other players to join")
  greeting.position(100,100)
  button.hide()
  inp.hide()

  db.ref("players/player" + pc).set({y:200})
}

function resetGame(){
  gs = "start"
  db.ref("/").update({gamestate:gs, playercount:0})
  db.ref("players").remove()
}
