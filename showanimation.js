function showNumAnime(x,y,num){
    var numCell = $('#num-cell-'+x+'-'+y);

    numCell.css('background-color',getBgColor(num));    
    numCell.css('color',getNumColor(num));   
    numCell.text(num);   

    numCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y),
    },70);
}

function showMoveAnime(fromx, fromy, tox,toy){
    var numCell = $('#num-cell-'+fromx+'-'+fromy);
    numCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $('#score').text(score);
}