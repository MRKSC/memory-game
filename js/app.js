// all selectors and array of used  cards
const cardsArray= ['ambulance','camera-retro','bug','child','hourglass-start', 'android',
    'fighter-jet', 'gift','ambulance','camera-retro','bug','child','hourglass-start',
    'android','fighter-jet', 'gift'];
selectedCardsByClick = [];
matchCards = [];
movesCount=[];
starResult=[];
$deck = $('.deck');
$card = $('.card');
$timer = $('.timer');
$ratingStar = $('.fa-star');
$moveCounterHtml = $('.moves');
const oneStarRank = 20;
const twoStarRank = 16;
const threeStarRank = 11;
let second = 0;
let stars = 3;
let intervalId;


//**********************************CODEMRKSC**********************************//


//initialization of the game
function memoryGameInit() {
    $deck.empty();
    generateBoard();
    addFlipCard();
    resetTimer(intervalId);
    $moveCounterHtml.text('0');
    movesCount=0;
    matchCards = 0;
    timeStart();

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Generating cards for Index HTML with class attributes and font awesome icons
function generateBoard() {
    let startingCards = shuffle(cardsArray);
        for (let i = 0; i < startingCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + startingCards[i] + '"></i></li>'));

    }
}


// function for flipping the cards and adding to them new class styles, pushing them into array for comparison function

function addFlipCard() {
    $('.card').on("click", function () {
        $(this).addClass("open show clicked");
        selectedCardsByClick.push($(this));
        comparingCards();
        finishGame();

    })
}


//this function is comparing cards in the game
function comparingCards() {
    if (selectedCardsByClick.length === 2) {
        let cardOne = $(selectedCardsByClick[0]).children().attr('class');
        let cardTwo = $(selectedCardsByClick[1]).children().attr('class');
            movesCount++;
            ratePlayerWithStars(movesCount);
            $moveCounterHtml.html(movesCount);
            $(".card").off("click");

        if(cardOne === cardTwo) {
            selectedCardsByClick[0].addClass('match') && selectedCardsByClick[1].addClass('match');
            matchCards.push($('.match'));
            selectedCardsByClick.length = 0;
            addFlipCard();

         }

         else {
            //selectedCardsByClick.length = 0;
            setTimeout(function () {
                $(selectedCardsByClick[0]).removeClass('open show clicked') && $(selectedCardsByClick[1]).removeClass('open show clicked');
                selectedCardsByClick.length = 0;
                addFlipCard();
            }, 500);

          }

}}


// when system reach 8 match in  matchCards array  its ends the game as win
function finishGame() {
    if(matchCards.length === 8) {
        setTimeout(function () {
            gameIsFinishedModal();
        },500);

    }
}


//this function is shown when a player finish the game as modal
function gameIsFinishedModal() {
    timerStop();
    swal({
        allowEscapeKey: true,
        allowOutsideClick: true,
        title: 'Good Play,',
        text: 'You win with ' + movesCount + ' moves and earn  ' + stars + ' stars in '+ (second-1) + ' Seconds.\n GG!',
        type: 'success',
        confirmButtonColor: '#00ccc4',
        confirmButtonText: 'Play Again',
    }).then(function(isConfirm) {
        if (isConfirm) {
            memoryGameInit();
        }
    })
}


// this function is resetting the game if user confirm
function resetGameModal() {
    $('.restart').on('click', function () {
        swal({
            title: 'One more time ?',
            text: "Confirm with button below!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ccc84',
            cancelButtonColor: '#f9550c',
            confirmButtonText: 'Restart Game!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                memoryGameInit();
            }
        })
    });
}


// function which start a time
function timeStart() {
   intervalId = setInterval(function() {
        $timer.text(`${second}`);
        second++;
    }, 1000);

}


// this function is resetting time
function resetTimer() {
    clearInterval(intervalId);
    $timer.text('0');
    second = 0;

}
// This function stops timer
function timerStop() {
    clearInterval(intervalId);

}


//rating star function
function ratePlayerWithStars(movesCount) {
    if (movesCount <= threeStarRank ) {
        $ratingStar.eq(3).removeClass('fa-star').addClass('fa-star-o');
        stars = 3;
            }

    else if (movesCount > threeStarRank && movesCount < twoStarRank ) {
            $ratingStar.eq(2).removeClass('fa-star').addClass('fa-star-o');
            stars=2
             }

    else if (movesCount > oneStarRank) {
        $ratingStar.eq(1).removeClass('fa-star').addClass('fa-star-o');
        stars = 1;
             }

    return {
        stars
        };
    }


memoryGameInit();
resetGameModal();