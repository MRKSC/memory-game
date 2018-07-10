//selectors and array of cards
const cardsArray= ['ambulance','camera-retro','bug','child','hourglass-start', 'android',
    'fighter-jet', 'gift','ambulance','camera-retro','bug','child','hourglass-start',
    'android','fighter-jet', 'gift'];
$deck = $('.deck');
$card = $('.card');
selectedCardsByClick = [];
matchCards = [];

//inicialization of the game
function memoryGameInit() {
    $deck.empty();
    generateBoard();
    addFlipCard();

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
//if (!$('.card').classList.contains('open') && !$('.card').classList.contains('show') && !$('.card').classList.contains('match')) {
function addFlipCard() {

    $('.card').on("click", function () {
        $(this).addClass("open show");
        selectedCardsByClick.push($(this));
        console.log(selectedCardsByClick.length);
        controlClicks();
        comparingCards();
    })
}
/*function addFlipCard() {
    let $card = $('.card'), $visibleCard;

    $card.bind('click', function() {
        $visibleCard = $(this).addClass('card open show');
        selectedCardsByClick.push($visibleCard);
        console.log(selectedCardsByClick.length);
        comparingCards()
    })
}*/

//this function is comparing cards
function comparingCards() {
    if (selectedCardsByClick.length === 2) {
        let cardOne = $(selectedCardsByClick[0]).children().attr('class');
        let cardTwo = $(selectedCardsByClick[1]).children().attr('class');

        if(cardOne === cardTwo) {
            selectedCardsByClick[0].addClass('match') && selectedCardsByClick[1].addClass('match');
            matchCards.push($('.match'));
            console.log('mateched cards are here ' + matchCards.length);
            selectedCardsByClick.length = 0;
    } else {
            //selectedCardsByClick.length = 0;
            setTimeout(function () {
                $(selectedCardsByClick[0]).removeClass('open show') && $(selectedCardsByClick[1]).removeClass('open show');
                selectedCardsByClick.length = 0;
            }, 500);


    }
}}

function controlClicks(){
    if ($('.card').hasClass('open') || $('.card').hasClass('show') || $('.card').hasClass('match')) {
        $('.open').off();


    }
}
    /*if (selectedCardsByClick === 2) {
        let cardOne = $(selectedCardsByClick[0]).children().attr('class'),
            cardTwo = $(selectedCardsByClick[1]).children().attr('class');

        if(cardOne === cardTwo) {
            selectedCardsByClick[0].addClass('match') && selectedCardsByClick[1].addClass('match');
            selectedCardsByClick = [];
        }
        else {
            selectedCardsByClick[0].addClass('red') && selectedCardsByClick[1].addClass('red');
            setTimeout(function () {
                selectedCardsByClick[0].removeClass('open show red') && selectedCardsByClick[1].addClass('open show red');
                selectedCardsByClick = [];
            }, delay /1.5);
        }}}*/


memoryGameInit();



