const grid = document.getElementById("tetris-grid"); //global variable

let gridOfFilledSquares = []; //global variable   

makeGrid();



const tetrisBlock = {
    coordinates: {
        
        y: 2,
        x: 2,
        updateX: function(x){
            
            this.x = x;
        },
        updateY: function(y){
            
            this.y = y;
        },
        getY: function(){
            return this.y;
        },
        getX: function(){
            return this.x;
        }
    },
    someFuckShit: {
        
        something: 2
    },
    arrayOfShapes: [
        function() {//A square tetris piece is made here. 
            
            this.coordinates.updateY(2);//initial starting Y
            this.coordinates.updateX(4);//initial starting X
            this.coordinates.shape.blockX1Y1= "#x-"+this.x+"y-"+(this.y-1);
            this.coordinates.shape.blockX2Y1= "#x-"+(this.x+1)+"y-"+(this.y-1);
            this.coordinates.shape.blockX1Y2= "#x-"+this.x+"y-"+this.y;
            this.coordinates.shape.blockX2Y2= "#x-"+(this.x+1)+"y-"+this.y;
        }, 
        function() {//An 'I' tetris piece is made here
            this.coordinates.updateX(4); //initial starting Y
            this.coordinates.updateY(4); //initial starting X
            this.coordinates.shape.blockX1Y1= "#x-"+this.x+"y-"+(this.y-3);
            this.coordinates.shape.blockX2Y1= "#x-"+(this.x)+"y-"+(this.y-2);
            this.coordinates.shape.blockX1Y2= "#x-"+this.x+"y-"+this.y-1;
            this.coordinates.shape.blockX2Y2= "#x-"+(this.x)+"y-"+this.y;

        }
    ],
    generateRandomBlock: function(){
        console.log(this.someFuckShit.something);
        this.arrayOfShapes[0/*Math.floor(Math.random()*6)*/]();
        
        let concat = ""; 
        Object.values(this.coordinates.shape).forEach((value)=>{
            concat += value+", ";
        });
        grid.querySelectorAll(concat.substring(0, concat.length-2)).forEach(element => {        
            element.style="background-color: yellow; border: 1px solid grey;";
        });//DRAW ALL SQUARES, initial starting point.
    }

}

function play(){
    
    /**The subsequent code between the comments will be strictly for the play function */
    removeStartMenu();
    
    




    tetrisBlock.generateRandomBlock();
    
    
    
    grid.addEventListener("mouseover", e => {
        moveHorizontal(e);       
    });
    grid.addEventListener("click", e =>{
        e.stopPropagation();
        bringDownShape(e);
        console.log(e);
    });

    

    function moveDown(){
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
        element.style="background-color: red; border: 1px solid white;";
        });//ERASE THE ENTIRE TETRIS SHAPE

           //MOVES THE SHAPE COORDINATES DOWN
        
        coordinates.updateY((coordinates.getY())+1);
        
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
            element.style="background-color: yellow; border: 1px solid grey;";
        });
        if (coordinates.getY >= 20){
            clearInterval(intervalID);
        }
    }      
    function moveHorizontal(e){
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
            element.style="background-color: red; border: 1px solid white;";
        });//ERASE THE OBJECT

        let newX = Number(e.target.id.slice(2,3));
        newX == 9 ? coordinates.updateX(8) : coordinates.updateX(newX);
        
    
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
            element.style="background-color: yellow; border: 1px solid grey;";
        });
    }
    function bringDownShape(e){
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
        element.style="background-color: red; border: 1px solid white;";
        });//ERASE THE ENTIRE TETRIS SHAPE
    
           //MOVES THE SHAPE COORDINATES DOWN
        coordinates.updateY(20);
        grid.querySelectorAll(coordinates.blockX1Y1()+", "+coordinates.blockX2Y1()+", "+coordinates.blockX1Y2()+", "+coordinates.blockX2Y2()).forEach(element => {        
            element.style="background-color: yellow; border: 1px solid grey;";
        });
        
        clearInterval(intervalID);
    }
    
    var intervalID = setInterval(moveDown,1000);

}

function addStartMenuBackground(){
    let someDiv = document.createElement("div");
    someDiv.setAttribute("class","content");
    someDiv.setAttribute("id","start-menu-background");
    grid.appendChild(someDiv);
}
function addLogo(){
    let image = document.createElement("img");
    image.setAttribute("src","assets/start-menu-banner-image.png");
    image.setAttribute("id","start-menu-banner-image");
    grid.appendChild(image);
}
function addPlayButton(){
    let playButton = document.createElement("button");
    playButton.setAttribute("type","button");
    playButton.setAttribute("name","button");
    playButton.addEventListener("click",  function(e) {
            e.stopPropagation();    
            play(); 
        }
    );
    playButton.setAttribute("id","play-button");
    let span = document.createElement("span");
    span.innerText= "PLAY";
    playButton.appendChild(span);
    grid.appendChild(playButton);
}
function addHighScores(){
    let highScores = document.createElement("div");
    highScores.setAttribute("id","high-scores");
    let h3 = document.createElement("h3");
    h3.innerText = "HIGH SCORES";
    highScores.appendChild(h3);
    for(let i =1; i<=5; i++){
        let tempDiv = document.createElement("div");
        tempDiv.setAttribute("class","scores");
        tempDiv.setAttribute("id","div-score"+i)
        let tempSpan = document.createElement("span");
        tempSpan.setAttribute("id","score"+i);
        tempDiv.appendChild(tempSpan);
        highScores.appendChild(tempDiv);
    }
    grid.appendChild(highScores);
}
function startMenu(){
    addStartMenuBackground();
    addLogo();
    addPlayButton();
    addHighScores()
}
function removeStartMenu(){
    grid.removeChild(document.getElementById("start-menu-background"));
    grid.removeChild(document.getElementById("start-menu-banner-image"));
    grid.removeChild(document.getElementById("play-button"));
    grid.removeChild(document.getElementById("high-scores"));
}
function makeGrid(){
    
    for(let i =1; i<=20; i++){
        for(let j = 0; j<=9; j++){
            let tempDiv = document.createElement("div");
            tempDiv.setAttribute("class","square ");
            tempDiv.setAttribute("id","x-"+j+"y-"+i);
            grid.appendChild(tempDiv);
        }
        
    }

    let square = grid.querySelector(".square");

    while(square != null){
        let counter = 1;
        while(counter <= 10){
            console.log(square);
            gridOfFilledSquares.push(Number(square.id.slice(5,7))-1,square);
            square = square.nextSibling;
            counter++;  
        }
    }
 
}
startMenu();

