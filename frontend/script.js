const problems = [
    "What is bullish meaning?", 
    "What is bearish meaning?",
    "What is the main purpose of investing? a. To buy and sell assets quickly b. To build wealth and reach financial goals c. To keep money in a savings account d. To avoid financial markets",
    "Which of the following is an example of an asset you can invest in? a. Groceries b. Clothes c. Stocks d. Vacations",
    "Where was the first modern stock market established? a. New York b. London c. Amsterdam d. Tokyo",
    "Scenario: Juny wants to build wealth and reach her financial goals. Based on the text, which of the following should she consider investing in? a. Clothes b. Stocks c. Groceries d. Vacations",
    "Investing guarantees growth in value over time. True False",
    "In ancient times, people invested in tangible assets like land, livestock, and trade goods. True False"
];

function createQuiz() {
    const quizContainer = document.getElementById('quiz');
    problems.forEach((problem, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${problem}</p>
            <input type="text" id="answer${index}" placeholder="Your answer">
        `;
        quizContainer.appendChild(questionDiv);
    });
}

async function submitQuiz() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    for (let i = 0; i < problems.length; i++) {
        const answer = document.getElementById(`answer${i}`).value;
        const response = await fetch('http://127.0.0.1:8134/checkanswer/${encodeURIComponent(problems[i])}/${encodeURIComponent(answer)}');
        const result = await response.text();
        const resultDiv = document.createElement('div');
        resultDiv.innerText = `Question ${i + 1}: ${result}`;
        resultsDiv.appendChild(resultDiv);
    }
}


document.addEventListener('DOMContentLoaded', createQuiz);
