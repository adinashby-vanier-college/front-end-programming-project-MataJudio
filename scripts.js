var grid = document.getElementById("tetris-grid"); //global variable
var intervalID;
var gridOfFilledSquares = []; //global variable   
var areaListener = new AbortController();
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
        
        
        grid.addEventListener("mouseover", e => {
            
            this.moveHorizontal(e);       
        },{signal: areaListener.signal});
        
        grid.addEventListener("click", e =>{
            
            this.bringDownShape(e);
            
        },{signal: areaListener.signal});
        
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
        if (this.coordinates.y >= 19){
            areaListener.abort();
            clearInterval(intervalID);
            gridOfFilledSquares
            //what should happen is I should reset the this.coordinate.x/y 
            //if I call generateRandomBlock again without removing event listeners 
            //they can stack and cause weird errors.
        }
        checkGrid.call(tetrisBlock);
        let shapeCoordinates = this.coordinates.shape;
        
        
        for(const object in this.coordinates.shape){//ERASES all the squares
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }
        

           //MOVES THE SHAPE COORDINATES DOWN
        console.log(this.coordinates.y);
        this.coordinates.updateY((this.coordinates.y)+1);
        
        
        for(const object in this.coordinates.shape){//Draws the squares one block down
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
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
        checkGrid.call(tetrisBlock);
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }//ERASE THE ENTIRE TETRIS SHAPE
    
           //MOVES THE SHAPE COORDINATES DOWN
        this.coordinates.updateY(20);
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }
        
        clearInterval(intervalID);
        areaListener.abort();
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
        },{ once: true}
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
    let yCounter =0;
    let someCounter=0;
    while(square != null){
        
        let xCounter = 0;
        while(xCounter < 10){
            
            gridOfFilledSquares.push([xCounter,yCounter,square.id, 0]); //0 for unfilled, 1 for filled
            console.log(gridOfFilledSquares[someCounter]);
            square = square.nextSibling;
            xCounter++;
            someCounter++;
        }
        yCounter++;
    }
    
 
}
//I have a feeling it would be better to implement potentialPlace function first
//because then I can reuse some of the code. 
//Don't know yet.
//
function potentialPlace(){
    //this function will run with moveHorizontal but instead of     
}
function checkGrid(check){ //this function will check whether the block can be placed (bringDown()) or can 
//                           move down one square (movedDown()). the parameter passed (boolean) true= bringdown(), false =movedown().
    var arrayOfCoordinates = [];
    var xy= [];
    var x;
    var y;
    for(const object in this.coordinates.shape){
        arrayOfCoordinates.push(this.coordinates.shape[object].call(this));
    }
    for(const object of arrayOfCoordinates){
        x = Number(object.slice(2,3));
        y = Number(object.slice(5));
        xy.push([x,y]);
        xy = xy.sort((a,b)=>{
            return b[1]-a[1]
        });


    }
    for(const object in xy){ 
            //coordinate in this.coordinates.shape is function it's an object with only function as properties
            //                                                      coordinate will give me a string, but I have to turn it into numbers
            
            var filledSquare;
            //two contingencies: movedown() calls this function,
            //                    bringdown() calls this function
            
            //in hindsight, I could have used a cartesian system. This is one is not efficient.
            filledSquare = gridOfFilledSquares.filter((arr)=>{
                arr[0] === x; //checking to see if the square is on the same x value
            }).filter((arr)=>{
                arr[3] === 1 ; //checking to see if the square is filled in or not
            }).sort()[0];// gives me the top-most filled-in square closest to the tetris piece
            if(filledSquare.length === 0){
                return;
            }
            gridOfFilledSquares[];
            this.coordinates.y = gridOfFilledSquares.filter((arr)=>{ //to get back the square right above the filled-in square
            return (arr[1] === filledSquare[1]+1 && arr[0] === filledSquare[0]); 
            })[2]; //now we change the y value of the tetris piece for one of it's square/blocks

            

        }

}
startMenu();

