var board = new Array();
var score =0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    init();

    geneNum();
    geneNum();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0; j<4;j++){
            var gridCell  = $("#cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
            
        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        for(var j=0; j<4;j++){
            board[i][j] =0;    
        }
    }
    updateView();
    score = 0;
}

function updateView(){
    $(".num-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0; j<4;j++){
            $("#grid").append('<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>');
            var temp = $("#num-cell-"+i+"-"+j);
            
            if(board[i][j]==0){
                temp.css('width',"0px");
                temp.css('height',"0px");
                temp.css('top',getPosTop(i,j)+50);                
                temp.css('left',getPosLeft(i,j)+50);                

            }
            else{
                temp.css('width',"100px");
                temp.css('height',"100px");
                temp.css('top',getPosTop(i,j));                
                temp.css('left',getPosLeft(i,j));
                temp.css('background-color',getBgColor(board[i][j]));
                temp.css('color',getNumColor(board[i][j]));
                //temp.text(board[i][j])
                temp.text(getName(board[i][j]))
            }
        }
    }
}

function geneNum(){

    if( nospace( board ) )
        {return false;}

    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    var times=0;
    while( times<50 ){
        if( board[randx][randy] == 0 )
            {break;}

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times ++;
    }
    if (times ==50){
        for(var i =0; i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }


    var randNumber = Math.random() < 0.5 ? 2 : 4;

    board[randx][randy] = randNumber;
    showNumAnime( randx , randy , randNumber );

    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37: 
            if(moveLeft()){
                setTimeout('geneNum()',200);
                setTimeout('isOver()',300);
            }
            break;
        case 38: 
            if(moveUp()){
                setTimeout('geneNum()',200);
                setTimeout('isOver()',300);
            }
            break;
        case 39: 
            if(moveRight()){
                setTimeout('geneNum()',200);
                setTimeout('isOver()',300);
            }
            break;
        case 40: 
            if(moveDown()){
                setTimeout('geneNum()',200);
                setTimeout('isOver()',300);
            }
            break;
        
       default: break;
    }
});

function isOver(){
    if(nospace(board) && noMove(board)){
       gameOver();
    }
}

function gameOver(){
    alert("Game Over!");
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1; j<4;j++){
            if(board[i][j]!=0){
                for(var k =0; k<j;k++){
                    if(board[i][k]==0  && noBlockHori(i,k,j,board)){
                        showMoveAnime(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] =0;
                        continue;
                    }
                    else if(board[i][j]==board[i][k] && noBlockHori(i,k,j,board)){
                        showMoveAnime(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] =0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }   
        }
    }
    setTimeout('updateView()',80);
    return true;
}
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2; j>=0;j--){
            if(board[i][j]!=0){
                for(var k =3;k>j;k--){
                    if(board[i][k]==0  && noBlockHori(i,j,k,board)){
                        showMoveAnime(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] =0;
                        continue;
                    }
                    else if(board[i][j]==board[i][k] && noBlockHori(i,j,k,board)){
                        showMoveAnime(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] =0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }   
        }
    }
    setTimeout('updateView()',80);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1;i<4;i++){
        for(var j=0; j<4;j++){
            if(board[i][j]!=0){
                for(var k =0; k<i;k++){
                    if(board[k][j]==0  && noBlockVerti(j,k,i,board)){
                        showMoveAnime(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] =0;
                        continue;
                    }
                    else if(board[i][j]==board[k][j] && noBlockVerti(j,k,i,board)){
                        showMoveAnime(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] =0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }   
        }
    }
    setTimeout('updateView()',80);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var i=2;i>=0;i--){
        for(var j=0; j<4;j++){
            if(board[i][j]!=0){
                for(var k =3; k>i;k--){
                    if(board[k][j]==0  && noBlockVerti(j,i,k,board)){
                        showMoveAnime(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] =0;
                        continue;
                    }
                    else if(board[i][j]==board[k][j] && noBlockVerti(j,i,k,board)){
                        showMoveAnime(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] =0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }   
        }
    }
    setTimeout('updateView()',80);
    return true;
}