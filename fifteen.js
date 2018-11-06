/*GLOBALS*/
//move()-animation feature
var space =['300px','300px'];

$(document).ready(function() {
    init();
    let puzzPieces = getPuzzpieces();

    document.getElementById("shufflebutton").onclick = function() {
        shuffle(puzzPieces);
        puzzPieces = getPuzzpieces();
    };

    for (var i = 0; i < puzzPieces.length; i++) {
        puzzPieces[i].addEventListener("mouseover", function() {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzPieces[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        puzzPieces[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                move(this, true);
            }
        });
    }

});

function init(){
    let puzzleArea = document.getElementById("puzzlearea").childNodes,
        nullState = [],
        x = 0,
        y = 0,
        top = 0,
        left = 0,
        counter = 1;

    for (let i = 0; i < puzzleArea.length; i++) {
        if (puzzleArea[i].nodeName === "DIV") {
            puzzleArea[i].className += "puzzlepiece";
            nullState.push([top.toString() + "px", left.toString() + "px"]);
            puzzleArea[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (counter % 4 === 0) {
                y -= 100;
                top += 100;
                left = 0;
            }
            counter += 1;

        }
    }
    return nullState;
}

function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(space[0]) & parseInt(piece.style.left) === parseInt(space[1]) | parseInt(piece.style.top) - 100 === parseInt(space[0]) & parseInt(piece.style.left) === parseInt(space[1]) | parseInt(piece.style.top) === parseInt(space[0]) & parseInt(piece.style.left) - 100 === parseInt(space[1]) | parseInt(piece.style.top) === parseInt(space[0]) & parseInt(piece.style.left) + 100 === parseInt(space[1]);
};

function move(piece, animate) {
    let topSpace = piece.style.top,
        leftSpace = piece.style.left;

    if (animate) {
        $(piece).animate({ "top": space[0], "left": space[1] }, "slow");
    } else {
        piece.style.top = space[0];
        piece.style.left = space[1];
    }
    space = [topSpace, leftSpace];
}

function shuffle(pieces) {
    let piece,
        rand;

    for (let index = 0; index < pieces.length; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move(piece[0], false);
    }
}

function getPuzzpieces() {
    return $('.puzzlepiece');
}