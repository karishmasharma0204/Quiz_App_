// Step 1: Fetch data from the API
fetch('https://opentdb.com/api.php?amount=25&difficulty=hard')
  .then(response => response.json())
  .then(data => {

//Code for creating heading
const heading = document.createElement('h1');
heading.textContent = 'Welcome to Quiz App';
heading.style.color = 'white'; 
heading.style.textAlign = 'center'; 
document.body.appendChild(heading);

// Step 2: Create HTML elements for displaying questions and options
const quizContainer = document.createElement('div');
quizContainer.id = 'quiz-container';
document.body.appendChild(quizContainer);

function displayQuestions() {
    data.results.forEach((question, index) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    const questionElement = document.createElement('p');
    questionElement.textContent = `Question ${index + 1}: ${question.question}`;
    questionContainer.appendChild(questionElement);

    const options = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(options); 

    options.forEach((option, i) => {
        const optionElement = document.createElement('input');
        optionElement.type = 'radio';
        optionElement.name = `question${index}`;
        optionElement.value = option;

        const label = document.createElement('label');
        label.textContent = option;

        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
        optionContainer.appendChild(optionElement);
        optionContainer.appendChild(label);

        questionContainer.appendChild(optionContainer);
    });

    quizContainer.appendChild(questionContainer);
    });
}

displayQuestions();

// Step 3: Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

// Step 4: Create a Submit Button
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.classList.add('submit-button'); 
submitButton.style.fontWeight = 'bold'; 
submitButton.style.border = '2px solid black'; 
document.body.appendChild(submitButton);


// Step 5: Display the result: Correct Answers/Total Questions
submitButton.addEventListener('click', () => {
    let score = 0;
    const userAnswers = [];

    data.results.forEach((question, index) => {
    const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    userAnswers.push(userAnswer ? userAnswer.value : 'Not Attempted');
    if (userAnswer && userAnswer.value === question.correct_answer) {
        score++;
    }
    });

const resultText = `Result: ${score}/${data.results.length}`;
alert(resultText);

// Step 6: Display selected and correct answers in table format
const table = document.createElement('table');
table.innerHTML = `
<tr>
    <th>Question</th>
    <th>Selected Answer</th>
    <th>Correct Answer</th>
</tr>
`;
data.results.forEach((question, index) => {
    const row = table.insertRow();
    const questionCell = row.insertCell(0);
    const selectedAnswerCell = row.insertCell(1);
    const correctAnswerCell = row.insertCell(2);

    questionCell.textContent = question.question;
    selectedAnswerCell.textContent = userAnswers[index];
    correctAnswerCell.textContent = question.correct_answer;
});

document.body.appendChild(table);
});
})
.catch(error => console.error('Error fetching data:', error));


// Adding CSS dynamically
const style = document.createElement('style');
style.textContent = `

/* Styles for the quiz container */
#quiz-container {
padding: 20px;
border: 2px solid #6a5acd;
border-radius: 10px;
background-color: #f5f5f5;
font-family: "Times New Roman";
font-size: 18px;
font-weight:bold;
margin-bottom: 20px;
}

/* Styles for questions */
.question-container {
margin-bottom: 20px;
}

/* Styles for options */
.option-container {
margin-bottom: 10px;
}

/* Styles for the submit button */
.submit-button {
padding: 10px 20px;
background-color: #6a5acd;
color: #fff;
border: #007bff;
border-radius: 10px;
cursor: pointer;
font-family: Arial, sans-serif;
font-size: 16px;
}

/* Styles for the result table */
.result-table {
border: 2px solid #000;
border-collapse: collapse;
width: 100%;
margin-top: 20px;
}

.result-table th, .result-table td {
border: 2px solid #ddd;
padding: 8px;
text-align: center;
}

.result-table th {
background-color: #007bff;
color: white;
}

/* Styles for the heading */
@keyframes moveRight {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  h1 {
    background-color: #6a5acd;
    animation: moveRight 5s ease-in-out;
  }

/* Responsive Styles */
@media only screen and (max-width: 600px) {
    #quiz-container {
        font-size: 16px;
    }

    .submit-button {
        font-size: 14px;
    }
}
`;
document.head.appendChild(style);
