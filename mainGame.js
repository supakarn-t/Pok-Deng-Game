const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log("Welcome to Pok-Deng!");
startGame();

let totalChips = 0;

function startGame() {
	rl.question("Please put your bet\n", (bet) => {
		const chip = parseInt(bet);

		if (isNaN(chip) || chip <= 0) {
			console.log("Invalid value. Please input numbers only.");
			return startGame();
		}

		let deck = shuffleDeck(createDeck());

		let playerCards = dealCard(deck);
		let dealerCards = dealCard(deck);

		let playerPoints = calculatePoint(playerCards);
		let dealerPoints = calculatePoint(dealerCards);

		console.log(`You got ${playerCards.join(", ")}`);
		console.log(`The dealer got ${dealerCards.join(", ")}`);

		if (playerPoints > dealerPoints) {
			console.log(`You won!!!, received ${chip} chips`);
			totalChips += chip;
		} else if (playerPoints < dealerPoints) {
			console.log(`You lost!!!, lost ${chip} chips`);
			totalChips -= chip;
		} else {
			console.log("You tie!!!");
		}

		console.log(`Your total chips is ${totalChips}`);

		askPlayMore();
	});
}

function createDeck() {
	const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
	const values = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"Jack",
		"Queen",
		"King",
		"Ace",
	];
	const deck = [];

	suits.forEach((suit) => {
		values.forEach((value) => {
			deck.push(`${suit}-${value}`);
		});
	});

	return deck;
}

function shuffleDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	return deck;
}

function dealCard(deck) {
	return [deck.pop(), deck.pop()];
}

function calculatePoint(cards) {
	let points = 0;

	cards.forEach((card) => {
		const value = card.split("-")[1];

		if (["Jack", "Queen", "King", "10"].includes(value)) {
			points += 0;
		} else if (value === "Ace") {
			points += 1;
		} else {
			points += parseInt(value);
		}
	});

	return points % 10;
}

function askPlayMore() {
	rl.question("Wanna play more (Yes/No)?\n", (answer) => {
		const lowerAnswer = answer.toLowerCase();

		if (lowerAnswer === "yes" || lowerAnswer === "y") {
			console.log("==============================");
			startGame();
		} else if (lowerAnswer === "no" || lowerAnswer === "n") {
			console.log(`You got total ${totalChips} chips`);
			rl.close();
		} else {
			console.log("Invalid input. Please answer Yes or No.");
			askPlayMore();
		}
	});
}
