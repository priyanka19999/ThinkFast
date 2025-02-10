/*API Used:
https://opentdb.com/api.php?amount=1&category=18&type=multiple

amount=1 → Fetches 1 question at a time
category=18 → Computer Science (includes JavaScript)
type=multiple → Multiple choice*/



// API URL to fetch JavaScript-related multiple-choice questions
const apiUrl = 'https://opentdb.com/api.php?amount=1&category=18&type=multiple';

let currentQuestion = {};  // Stores the current question object
let usedQuestions = new Set();  // Stores already used questions to prevent repetition

/* Fetches a new unique question from the API */
async function fetchQuestion() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        // Check if results array is empty
        if (!data.results || data.results.length === 0) {
            throw new Error("No questions received. API may have reached the limit.");
        }

        let questionData = data.results[0];
        // Ensure the question is unique
        while (usedQuestions.has(questionData.question)) {
            const newResponse = await fetch(apiUrl);
            const newData = await newResponse.json();

            if (!newData.results || newData.results.length === 0) {
                throw new Error("No new questions available.");
            }
            questionData = newData.results[0];
        }
        usedQuestions.add(questionData.question);
        currentQuestion = questionData;
        displayQuestion();

    }  catch (error) {
        console.error("Error fetching question:", error);
        document.querySelector("h1").innerHTML = "⚠️ Failed to load question. Try again later.";
    }
}



/* Displays the fetched question and answer choices*/

function displayQuestion() {
    document.querySelector('h1').innerHTML = decodeHTML(currentQuestion.question); // Set the question text

    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]; // Combine answers
    shuffleArray(options); // Shuffle answer order

    // Assigning shuffled options to radio buttons and labels
    options.forEach((option, index) => {
        document.getElementById(`option${index + 1}`).value = option;
        document.querySelector(`label[for=option${index + 1}]`).innerHTML = decodeHTML(option);
    });
}

// Show welcome message first, then fade in quiz
setTimeout(() => {
    document.getElementById("welcome").style.display = "none"; // Hide welcome message
    document.getElementById("box").style.display = "block"; // Show quiz
    document.getElementById("box").classList.add("fade-in"); // Apply fade-in effect
}, 5000); // Wait for 5 seconds before showing the quiz


/* Submits the selected answer, checks correctness, and loads the next question*/

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("⚠️ Please select an option!");
        return;
    }

    // Remove the welcome message permanently after the first question is answered
    const welcomeMessage = document.getElementById("welcome");
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const userAnswer = selectedOption.value.trim();  // Trim to avoid any unwanted spaces
    const correctAnswer = decodeHTML(currentQuestion.correct_answer).trim();  // Decode and trim

    if (userAnswer === correctAnswer) {
        alert("✅ Correct!");
    } else {
        alert(`❌ Wrong! The correct answer was: ${correctAnswer}`);
    }

    // Deselect all radio buttons before loading the next question
    document.querySelectorAll('input[name="option"]').forEach(input => input.checked = false);

    // Load the next question after 1 second
    setTimeout(fetchQuestion, 1000);
}


/* Shuffles an array (used to randomize answer positions) */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Decodes HTML entities (e.g., &quot; → ")*/
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Event listener for submit button
document.querySelector('.btn').addEventListener('click', submitAnswer);

// Load the first question when the page loads
window.onload = fetchQuestion;
