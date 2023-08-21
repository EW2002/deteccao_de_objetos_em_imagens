var img = "";
objects = [];
var objectFounded = false;
var porcentagem = 0;

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detectando objetos";
}

function modelLoaded(){
    objectFounded = true;
    console.log("modelLoaded");
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload(){
    img = loadImage("gato fofinho.jpg");
}

function draw(){
    image(img,0,0,640,420);


    if (objectFounded){//if(objectFounded==true)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : objeto detectado"
            fill("#800000");
            porcentagem = floor(objects[i].confidence*100);
            text(objects[i].label+" "+porcentagem+"%",objects[i].x+5,objects[i].y+20);
            noFill();
            stroke("#800000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}