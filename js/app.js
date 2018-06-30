//selectors and array of cards

const cardsArray= ['ambulance','camera-retro','bug','child','hourglass-start', 'android','fighter-jet', 'gift','ambulance','camera-retro','bug','child','hourglass-start', 'android','fighter-jet', 'gift'];
$deck = $('.deck');
$card = $('.card');
selectedCardsByClick = [];

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
function generateGame() {
    let startingCards = shuffle(cardsArray);
    for (let i = 0; i < startingCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + startingCards[i] + '"></i></li>'));
        addFlipCard();
    }
}

// function for flipping the cards and adding to them new class styles, pushing them into array for comparssion function
function addFlipCard() {
    let $card = $('.card'), $visibleCard;

    $card.bind('click', function() {
        $visibleCard = $(this).addClass('card open show');
        selectedCardsByClick.push($visibleCard);

    })
}

generateGame();


