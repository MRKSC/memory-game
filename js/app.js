//selectors and array of cards
const cardsArray= ['ambulance','camera-retro','bug','child','hourglass-start', 'android',
    'fighter-jet', 'gift','ambulance','camera-retro','bug','child','hourglass-start',
    'android','fighter-jet', 'gift'];
$deck = $('.deck');
$card = $('.card');
selectedCardsByClick = [];
matchCards = [];
let second = 0;
$timer = $('.timer');
$ratingStar = $('.fa-star');
$moveCounterHtml = $('.moves');
movesCount=[];
starResult=[];
const oneStarRank = 24;
const twoStarRank = 16;
const threeStarRank = 8;
let intervalId;
let stars = 3;

//inicialization of the game
function memoryGameInit() {
    $deck.empty();
    generateBoard();
    addFlipCard();
    resetTimer(intervalId);
    timeStart();
    movesCount= 0 ;
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

// function for flipping the cards and adding to them new class styles, pushing them into array for comparssion function

function addFlipCard() {
    $('.card').on("click", function () {
        $(this).addClass("open show clicked");
        selectedCardsByClick.push($(this));
        console.log(selectedCardsByClick.length);
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
            console.log('mateched cards are here ' + matchCards.length);
            selectedCardsByClick.length = 0;
            addFlipCard();
    } else {
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
// this function is reseting the game if user confirm
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

// function wich start a time
function timeStart() {
   intervalId = setInterval(function() {
        $timer.text(`${second}`);
        second++;
    }, 1000);
}

// this function is reseting time
function resetTimer() {
    clearInterval(intervalId);
    $timer.text('0');
    second = 0;

}

//rating star function
function ratePlayerWithStars(movesCount) {
    if (movesCount < threeStarRank ) {
        $ratingStar.eq(2).removeClass('fa-star').addClass('fa-star-o');
        stars = 2;
    } else if (movesCount < twoStarRank ) {
            $ratingStar.eq(1).removeClass('fa-star').addClass('fa-star-o');
            stars=1
    } else if (movesCount < oneStarRank) {
        $ratingStar.eq(1).removeClass('fa-star').addClass('fa-star-o');
                stars = 1;
            }
        return {
                stars

        };
    }
memoryGameInit();
resetGameModal();

/*function finishGame() {
    if(matchCards.length === 8) {
        ratePlayerWithStars(movesCount);
        let score = ratePlayerWithStars(movesCount).score;
        setTimeout(function () {
            gameIsFinishedModal(movesCount,score);
        },500);

    }
}*/



