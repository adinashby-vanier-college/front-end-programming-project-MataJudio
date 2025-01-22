var grid = document.getElementById("tetris-grid"); //global variable
var intervalID;
var gridOfFilledSquares = []; //global variable   

makeGrid();



var tetrisBlock = {  //global variable I want this to be available in every part of the program
    coordinates: {
        shape:{},
        y: 0,
        x: 0,
        updateX: function(a){
            
            this.x = a;
        },
        updateY: function(b){
            this.y = b;
                    
            
        },
        getY: function(){
            return this.y;
        },
        getX: function(){
            return this.x;
        }
    },
    someStuff: {
        
        something: 2
    },
    arrayOfShapes: [
        function() {//A square tetris piece is made here. 
            
            let shapeCoordinates = this.coordinates.shape;
            this.coordinates.y = 2;//initial starting Y
            this.coordinates.x = 4;//initial starting X
            shapeCoordinates.blockX1Y1= function() {return "#x-"+this.coordinates.x+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX2Y1= function() {return "#x-"+(this.coordinates.x+1)+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX1Y2= function() {return "#x-"+this.coordinates.x+"y-"+this.coordinates.y};
            shapeCoordinates.blockX2Y2= function() {return "#x-"+(this.coordinates.x+1)+"y-"+this.coordinates.y};
        }, 
        function() {//An 'I' tetris piece is made here
            let xy = this.coordinates;
            let shapeCoordinates = this.coordinates.shape;
            xy.x= 4; //initial starting Y
            xy.Y= 4; //initial starting X
            shapeCoordinates.blockX1Y1= "#x-"+xy.x+"y-"+(xy.y-3);
            shapeCoordinates.blockX2Y1= "#x-"+(xy.x)+"y-"+(xy.y-2);
            shapeCoordinates.blockX1Y2= "#x-"+xy.x+"y-"+xy.y-1;
            shapeCoordinates.blockX2Y2= "#x-"+(xy.x)+"y-"+xy.y;

        }
    ],
    generateRandomBlock: function(){
        const areaListener = new AbortController();
        const areaListener2 = new AbortController();
        grid.addEventListener("mouseover", e => {
            
            this.moveHorizontal(e);       
    },{signal: areaListener.signal});
        
        grid.addEventListener("click", e =>{
            e.stopPropagation();
            this.bringDownShape(e);
            
        },{signal: areaListener2.signal});
        
        this.arrayOfShapes[0/*Math.floor(Math.random()*6)*/].call(this); //I have to use the call method here because the function
                                                                                //is being invoked as standalone function (i.e, not attached to tetrisBlock)
        /*grid.querySelectorAll(Object.values(this.coordinates.shape).toString()).forEach(element => {        
            element.style="background-color: yellow; border: 1px solid grey;";
        });*/ //DRAW ALL SQUARES, initial starting point.
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }
        
        intervalID = setInterval(()=> this.moveDown.call(this),1000);
        //call is used here again because of the context in which moveDown is called
        //After drawning, periodically move the shape down.                 
    },
    moveDown: function (){
        let shapeCoordinates = this.coordinates.shape;
        console.log(Object.values(this.coordinates.shape));
        
        for(const object in this.coordinates.shape){//ERASES all the squares
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }
        

           //MOVES THE SHAPE COORDINATES DOWN
        console.log(this.coordinates.y);
        this.coordinates.updateY((this.coordinates.y)+1);
        
        
        for(const object in this.coordinates.shape){//Draws the squares one block down
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }
        if (this.coordinates.y >= 20){
            
            areaListener.abort();
            clearInterval(intervalID);
            //what should happen is I should reset the this.coordinate.x/y 
            //if I call generateRandomBlock again without removing event listeners 
            //they can stack and cause weird errors.
        }
        
    },
    moveHorizontal: function(e) {
        
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        };//ERASE THE OBJECT

        let newX = Number(e.target.id.slice(2,3));
        newX == 9 ? this.coordinates.updateX(8) : this.coordinates.updateX(newX);
        
    
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }//Draw the object again, translated horizontally.
        
    },
    bringDownShape: function(e) {
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }//ERASE THE ENTIRE TETRIS SHAPE
    
           //MOVES THE SHAPE COORDINATES DOWN
        this.coordinates.updateY(20);
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }
        
        clearInterval(intervalID);
    }

}

function play(){
    
    /**The subsequent code between the comments will be strictly for the play function */
    removeStartMenu();
    
    




    tetrisBlock.generateRandomBlock();
    
    
    
    

    

    
    
    
    
    

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

