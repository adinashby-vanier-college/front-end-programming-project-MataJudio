var grid = document.getElementById("tetris-grid"); //global variable
var intervalID;
var gridOfFilledSquares = []; //global variable   
var controller = [];
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
            
            let shapeCoordinates = this.coordinates.shape;
            this.coordinates.y = 4;//initial starting Y
            this.coordinates.x = 4;//initial starting X
            shapeCoordinates.blockX1Y1= function() {return "#x-"+this.coordinates.x+"y-"+(this.coordinates.y-3)};
            shapeCoordinates.blockX2Y1= function() {return "#x-"+(this.coordinates.x)+"y-"+(this.coordinates.y-2)};
            shapeCoordinates.blockX1Y2= function() {return "#x-"+this.coordinates.x+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX2Y2= function() {return "#x-"+(this.coordinates.x)+"y-"+(this.coordinates.y)};

        },
        function() {//An 'L' tetris piece is made here
            
            let shapeCoordinates = this.coordinates.shape;
            this.coordinates.y = 3;//initial starting Y
            this.coordinates.x = 4;//initial starting X
            shapeCoordinates.blockX1Y1= function() {return "#x-"+this.coordinates.x+"y-"+(this.coordinates.y-2)};
            shapeCoordinates.blockX2Y1= function() {return "#x-"+(this.coordinates.x)+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX1Y2= function() {return "#x-"+((this.coordinates.x)+1)+"y-"+(this.coordinates.y)};
            shapeCoordinates.blockX2Y2= function() {return "#x-"+(this.coordinates.x)+"y-"+(this.coordinates.y)};

        },
        function() {//An 'S' tetris piece is made here
            
            let shapeCoordinates = this.coordinates.shape;
            this.coordinates.y = 2;//initial starting Y
            this.coordinates.x = 3;//initial starting X
            shapeCoordinates.blockX1Y1= function() {return "#x-"+((this.coordinates.x)+2)+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX2Y1= function() {return "#x-"+((this.coordinates.x)+1)+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX1Y2= function() {return "#x-"+((this.coordinates.x)+1)+"y-"+(this.coordinates.y)};
            shapeCoordinates.blockX2Y2= function() {return "#x-"+(this.coordinates.x)+"y-"+(this.coordinates.y)};

        },
        function() {//A 'Z' tetris piece is made here
            
            let shapeCoordinates = this.coordinates.shape;
            this.coordinates.y = 2;//initial starting Y
            this.coordinates.x = 3;//initial starting X
            shapeCoordinates.blockX1Y1= function() {return "#x-"+(this.coordinates.x-1)+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX2Y1= function() {return "#x-"+this.coordinates.x+"y-"+(this.coordinates.y-1)};
            shapeCoordinates.blockX1Y2= function() {return "#x-"+(this.coordinates.x+1)+"y-"+this.coordinates.y};
            shapeCoordinates.blockX2Y2= function() {return "#x-"+this.coordinates.x+"y-"+this.coordinates.y};

        }
    ],
    generateRandomBlock: function(){

        
        
        this.arrayOfShapes[2].call(this); //I have to use the call method here because the function
                                                                                //is being invoked as standalone function (i.e, not attached to tetrisBlock)
        //DRAW ALL SQUARES, initial starting point.
        
        
        intervalID = setInterval(()=> this.moveDown.call(this),100);
        //call is used here again because of the context in which moveDown is called
        //After drawning, periodically move the shape down.                 
    },
    moveDown: function (e){
        var stopAndGenerate = function(){
            console.log("stopandgenerate");
            for(const object in this.coordinates.shape){ //change the fill value in the coordinates where the tetris piece is currently 
                let someString = this.coordinates.shape[object].call(tetrisBlock, e);
                console.log(gridOfFilledSquares[(Number(someString.slice(3,4))+(Number(someString.slice(6))*10))-10]);           
            }
            clearInterval(intervalID);
            this.generateRandomBlock();
        } 
        
        
        var newXY = checkGrid.call(tetrisBlock, this.moveDown, e);
        newXY.sort((a,b)=>{return a[0]-b[0] || b[1]-a[1]});
        for(const object in this.coordinates.shape){//ERASES all the squares
            console.log(this.coordinates.shape[object].call(tetrisBlock));
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }

        if(newXY[0][1] >= 20 || ((newXY[0][0]-1) === this.coordinates.x && newXY[0][1] === this.coordinates.y)){
            this.coordinates.x=((newXY[0][0])-1);
            this.coordinates.y=(newXY[0][1]);
            for(const object in this.coordinates.shape){//Draws the squares one block down
                let someString = this.coordinates.shape[object].call(tetrisBlock);
                grid.querySelector(someString).style="background-color: yellow; border: 1px solid grey;";
                gridOfFilledSquares[gridOfFilledSquares.findIndex((element)=>{return element[2] === someString.slice(1)})][3] = Number(1);
            }
            stopAndGenerate.call(this);
            
        }
        else{//MOVES THE SHAPE COORDINATES DOWN
            this.coordinates.x=((newXY[0][0])-1);
            this.coordinates.y=(newXY[0][1]);
            console.log(newXY[0][0]);
            for(const object in this.coordinates.shape){//Draws the squares one block down
                grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
            }
           
        }
        
    },
    moveHorizontal: function(e) {
        console.log("hello");
        console.log(e.target.id.slice(2,3));
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        };//ERASE THE OBJECT

        let newX = checkGrid.call(tetrisBlock, this.moveHorizontal, e).sort((a,b)=>{return a[0]-b[0] || b[1]-a[1]})[0][0]-1;
        console.log(newX);
        newX == 9 ? this.coordinates.x = 8 : this.coordinates.x = newX;
        console.log(newX);
        
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: yellow; border: 1px solid grey;";
        }//Draw the object again, translated horizontally (or not).
        
    },
    bringDownShape: function(e) {
        
        for(const object in this.coordinates.shape){
            grid.querySelector(this.coordinates.shape[object].call(tetrisBlock)).style="background-color: red; border: 1px solid white;";
        }//ERASE THE ENTIRE TETRIS SHAPE
        var newXY = checkGrid.call(tetrisBlock, this.bringDownShape, e);
        newXY.sort((a,b)=>{return a[0]-b[0] || b[1]-a[1]});

        this.coordinates.x=((newXY[0][0])-1);
        this.coordinates.y=(newXY[0][1]);
        //after checkGrid() is done the coordinates will be updated and it will be safe to draw into the grid
        
        for(const object in this.coordinates.shape){ //DRAW THE SHAPE
            let someString = this.coordinates.shape[object].call(tetrisBlock);
            grid.querySelector(someString).style="background-color: yellow; border: 1px solid grey;";
            gridOfFilledSquares[gridOfFilledSquares.findIndex((element)=>{return element[2] === someString.slice(1)})][3] = 1;
        }

                
    }
}

function play(){
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
            tempDiv.setAttribute("class","square");
            tempDiv.setAttribute("id","x-"+j+"y-"+i);
            grid.appendChild(tempDiv);
        }
        
    }

    let square = grid.querySelector(".square");
    let yCounter =1;
    let someCounter=0;
    while(square != null){
        
        let xCounter = 1;
        while(xCounter <= 10){
            
            controller.push(new AbortController());
            square.addEventListener("mouseover",function(e){
                e.stopPropagation();
                tetrisBlock.moveHorizontal(e);
            },{signal: controller.at(-1).signal});
            
            square.addEventListener("click", function(e){
                e.stopPropagation();
                tetrisBlock.bringDownShape(e);
            },{signal: controller.at(-1).signal});

            gridOfFilledSquares.push([xCounter,yCounter,square.id, 0]); //0 for unfilled, 1 for filled
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
function checkGrid(callingFunction, e){ //this function will check whether the block can be placed (bringDown()) or can 
//                         move down one square (movedDown()). the parameter passed (boolean) true= bringdown(), false =movedown().
 
    var arrayOfCoordinates = [];
    var xy= [];
    var x;
    var y;
    var height;
    var width;
    
    for(const object in this.coordinates.shape){
        arrayOfCoordinates.push(this.coordinates.shape[object].call(this));
    }
    console.log(arrayOfCoordinates);
    
    for(const object of arrayOfCoordinates){
        x = Number(object.slice(3,4));
        y = Number(object.slice(6));
        xy.push([x,y]);
        
        
    }
    xy = xy.sort((a,b)=>{
        return b[1]-a[1]
    });
    
    //I now have the x-y value in number format 
    //and I now have the "x-*y-*" format of the coordinates
    //and I now have an xy array sorted from highest y value to lowest.
    //this is important to do because the order the redraw the shape 
    //matters. 
    if(callingFunction === this.bringDownShape){
        let filledSquare =[];
        let drawingSquares= [];

        for(const obj of xy){
            filledSquare.push(gridOfFilledSquares.filter((arr)=>{
                return arr[0] === (obj[0]+1); //checking to see if the square is on the same x value
            }).filter((arr)=>{
                return arr[3] === 1 ; //checking to see if the square is filled in or not
            }).sort((a,b)=>{return a[1]-b[1]})[0]);
        }
        filledSquare = filledSquare.sort((a,b)=>{return a[1]-b[1]});
        if (filledSquare.every((element)=>{return element[0] === undefined;})) {//if the whole array is undefined then fill it 
            for(const obj of xy)
                drawingSquares.push(gridOfFilledSquares[((obj[0])+((20-((xy[0][1]-obj[1])))*10))-10]);
        } 
        else {
            for(const obj of xy){     
                if(filledSquare[iterator] === undefined){   
                    drawingSquares.push(gridOfFilledSquares[((obj[0])+((filledSquare[0][1]-(1 +(xy[0][1]-obj[1])))*10))-10]);
                }
                drawingSquares.push(gridOfFilledSquares[((obj[0])+((filledSquare[0][1]-(1 +(xy[0][1]-obj[1])))*10))-10]);
            }
        }
        return drawingSquares;
    }
    else if(callingFunction === this.moveDown) {
        let drawingSquares = [];
        let tempSquare;
        for(const obj of xy){
            tempSquare = gridOfFilledSquares[(((obj[0])+((obj[1]+1))*10))-10];
            
            if(tempSquare[3] === 1 ){ //if there's square blocking the tetris shape return the squares as they are. 
                for(const obj2 of xy){
                    drawingSquares.push(gridOfFilledSquares[((obj2[0])+((tempSquare[1]-(1+(xy[0][1]-obj2[1])))*10))-10]);
                }
                return drawingSquares;
            }
        }
        //if the tetris is not blocked return the squares moved down one block.
        for(const obj2 of xy){
            drawingSquares.push(gridOfFilledSquares[(((obj2[0])+((obj2[1]+1)-((xy[0][1]-obj2[1])))*10))-10]);
        }
        return drawingSquares;
    }
    else if(callingFunction === this.moveHorizontal){
        let drawingSquares = [];
        xy.sort((a,b)=>{return a[0]-b[0] || b[1]-a[1]});
        let shapeX = xy[0][0];
        let width = xy.at(-1)[0]-shapeX;
        let cursorX = Number(e.target.id.slice(2,3));
        let difference = shapeX - cursorX;
        
        if(difference > 0){
            
            for(const obj of xy){
                for(let i = (obj[0]-1); i >= cursorX; i--){
                     //take the square of the tetris shape and compare every square in front of it horizontally in the cursor direction
                    if(gridOfFilledSquares[((i)+(obj[1]*10))-10][3] === 1){//if one of the squares is a filled-in square 
                        for(const obj2 of xy){                             //then return the shape right next to the filled-in square
                            console.log("moses");
                            drawingSquares.push(gridOfFilledSquares[((((i+1)+(obj2[0]-xy[0][0]))+(obj2[1])*10))-10]);
                        }
                        return drawingSquares;
                    }                   
                }                
            }           
            console.log("this is running");
            for(const obj3 of xy){//if the program makes it here, it's safe to draw directly to cursor
                drawingSquares.push(gridOfFilledSquares[((cursorX+(obj3[0]-xy[0][0]))+((obj3[1])*10))-10]);
            }

            return drawingSquares;
        }
        else if(difference < ((width)*(-1))){
            for(const obj of xy){
                for(let i = (obj[0]+1); i <= cursorX; i++){
                     //take the square of the tetris shape and compare every square in front of it horizontally in the cursor direction
                    if(gridOfFilledSquares[((i)+(obj[1]*10))-10][3] === 1){//if one of the squares is a filled-in square 
                        for(const obj2 of xy){                             //then return the shape right next to the filled-in square
                            console.log("moses");
                            drawingSquares.push(gridOfFilledSquares[((((i-1)-(obj2[0]-xy[0][0]))+(obj2[1])*10))-10]);
                        }
                        return drawingSquares;
                    }                   
                }                
            }           
            console.log("this is running");
            for(const obj3 of xy){//if the program makes it here, it's safe to draw directly to cursor
                drawingSquares.push(gridOfFilledSquares[((cursorX-(obj3[0]-xy[0][0]))+((obj3[1])*10))-10]);
            }

            return drawingSquares;
        }
        else{
            for(const obj of xy){
                let a = gridOfFilledSquares[(((obj[0]-1)+(obj[1])*10))-10];//check each square
                if(a[3] === 1){
                    for(const obj2 of xy){
                        drawingSquares.push(gridOfFilledSquares[(((obj2[0])+(obj2[1])*10))-10]);//return the exact same block you started with
                    }
                    return drawingSquares;
                }
                else{//this is a problem area
                    drawingSquares.push(gridOfFilledSquares[((cursorX+(xy[0][0]-obj[0]))+((obj[1])*10))-10]);
                }
            }
            return drawingSquares;
        }
        
        
    }

}

    


startMenu();

