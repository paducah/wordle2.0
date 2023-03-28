// Array of words to choose from
const words = ['apple', 'least', 'cheat', 'grape', 'lemon', 'angry', 'peach', 'raise', 'pluto', 'water'];

// Choose a random word from the array
const word = words[Math.floor(Math.random() * words.length)];
console.log(word);

// Convert the word to an array of letters
const letters = word.split('');

// Initialize the guessed letters array
const guessedLetters = ['_', '_', '_', '_', '_'];

// Display the word with underscores for unguessed letters
const wordContainer = document.getElementById('word');
letters.forEach((letter, index) => {
  const letterContainer = document.createElement('div');
  letterContainer.classList.add('letter');
  letterContainer.innerText = '_';
  letterContainer.dataset.letter = letter;
  wordContainer.appendChild(letterContainer);
});

// Handle the guess button click
const guessButton = document.getElementById('guess');
guessButton.addEventListener('click', () => {
  const letter1 = document.getElementById('letter1').value.toLowerCase();
  const letter2 = document.getElementById('letter2').value.toLowerCase();
  const letter3 = document.getElementById('letter3').value.toLowerCase();
  const letter4 = document.getElementById('letter4').value.toLowerCase();
  const letter5 = document.getElementById('letter5').value.toLowerCase();
  const guess = [letter1, letter2, letter3, letter4, letter5];
  console.log(guess);

  // Check the guess against the letters
  let correctLetterAndPosition = 0;
  let correctLetterOnly = 0;
  guess.forEach((letter, index) => {
    if (letter === letters[index]) {
      correctLetterAndPosition++;
      guessedLetters[index] = letter;
    } else if (letters.includes(letter)) {
      correctLetterOnly++;
    }
  });

  // Update the guessed letters display
  const letterContainers = document.querySelectorAll('.letter');
  letterContainers.forEach((letterContainer, index) => {
    const guessedLetter = guessedLetters[index];
    letterContainer.innerText = guessedLetter;
    if (guessedLetter === '_') {
      letterContainer.classList.remove('green');
      letterContainer.classList.remove('yellow');
      letterContainer.classList.add('black');
    } else if (guessedLetter === letters[index]) {
      letterContainer.classList.remove('yellow');
      letterContainer.classList.remove('black');
      letterContainer.classList.add('green');
    } else {
      letterContainer.classList.remove('green');
      letterContainer.classList.remove('black');
      letterContainer.classList.add('yellow');
    }
  });

  // Decrement the chances counter
  const chances = document.getElementById('chances');
  chances.innerText = parseInt(chances.innerText) - 1;

  // Show the result message
  const result = document.getElementById('result');
  if (correctLetterAndPosition === 5) {
    result.innerText = 'Congratulations! You guessed the word!';
    guessButton.disabled = true;
  } else if (parseInt(chances.innerText) === 0) {
    result.innerText = 'Sorry, you ran out of chances. The word was ' + word + '.';
    guessButton.disabled = true;
  } else {
    result.innerText = 'Correct letter and position: ' + correctLetterAndPosition + ', correct letter only: ' + correctLetterOnly + '.';
  }
});
