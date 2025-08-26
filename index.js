const quizData =[
    {
        question: "What is 10'4'' + 5'8''",
        options: ["15' 13'","5' 4''","16'","4' 8''"],
        answer: "16'"
    },
    {
        question: "You are told you have to make a 3’ 5’’ cut in a 1/4 piece of wood. You will cut…",
        options: ["Inside the mark you made", "Outside the mark you made", "On the mark you made"],
        answer: ["Outside the mark you made"]
    },
];

const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

function showQuestion(){
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerText = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if(selectedButton.innerText === answer){
        score++;
    }
    currentQuestion++;
    
    if(currentQuestion < quizData.length){
        showQuestion();
    }else{
        showResult();
    }
}
function showResult(){
    quiz.innerHTML = `<h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    `;
}

showQuestion();