image2 = "";
status = "";
objects = [];


function preload()
{
   image2 = loadImage("BedRoom.jpg");
}

function setup()
{
    canvas = createCanvas(800,600);
    canvas.position(540,330);
    dectector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("st").innerHTML = "Detecting Objects....";
}

function modelLoaded()
{
   console.log("model loaded successfully!");
   status = true;
   dectector.detect(image2,gotResult);
}

function gotResult(error,result)
{
   if(error)
   {
       console.log(error);
   }
   else
   {
       console.log(result);
       objects = result;
   }
}

function draw()
{
    image(image2,0,0,800,600);
    if(status !="")
    {
        document.getElementById("st").innerHTML = "Objects Detected !";
        document.getElementById("n").innerHTML = "Number Of Objects = "+objects.length;
        for(i=0;i<objects.length;i++)
        {
            fill("black");
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

