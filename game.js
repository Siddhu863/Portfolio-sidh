// const quotes = [
//     "The best way to predict the future is to invent it. - Alan Kay",
//     "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
//     "The only way to do great work is to love what you do. - Steve Jobs",
//     "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
//     "Believe you can and you're halfway there. - Theodore Roosevelt",
//     "Do what you can, with what you have, where you are. - Theodore Roosevelt",
//     "You miss 100% of the shots you don’t take. - Wayne Gretzky",
//     "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt"
// ];

// document.getElementById("generate-quote").addEventListener("click", function() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     document.getElementById("quote").textContent = quotes[randomIndex];
// });


let randomNumber = Math.floor(Math.random() * 100) + 1;
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const result = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');

guessBtn.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    if (userGuess === randomNumber) {
        result.textContent = `🎉 Congrats! You guessed the number ${randomNumber} correctly!`;
        result.style.color = 'green';
        resetBtn.style.display = 'block';
    } else if (userGuess > randomNumber) {
        result.textContent = '📉 Too high! Try again.';
        result.style.color = 'orange';
    } else if (userGuess < randomNumber) {
        result.textContent = '📈 Too low! Try again.';
        result.style.color = 'orange';
    } else {
        result.textContent = '❌ Please enter a valid number.';
        result.style.color = 'red';
    }
});

resetBtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    result.textContent = '';
    guessInput.value = '';
    resetBtn.style.display = 'none';
});
