const quizData = [
    {
        //[ Question 1]:
        question: "What is 10'4'' + 5'8''",
        options: ["15' 13'","5' 4''","16'","4' 8''"],
        answer: "16'"
    },
        //[ Question 2]:
    {
        question: "You are told you have to make a 3’ 5’’ cut in a 1/4 piece of wood. You will cut…",
        options: ["Inside the mark you made", "Outside the mark you made", "On the mark you made"],
        answer: "Outside the mark you made"
    },
        //[ Question 3]:
    {
        question: "You were told to make a cut that was 8' 5.9375''. You are then told to make another one half the size, what would be your new size?",
        options: ["4' 2.96875", "4' 2.4739", "3' 4", "4' 2.5"],
        answer: "4' 2.5"
    },
        //[ Question 4]:
    {
        question: "Which of the following fractions is the largest, 15/16 or 11/16",
        options: ["15/16","7/8"],
        answer: "15/16"
    },
        //[ Question 5]:
    {
        question: "Add 1/16 + 1/4 + 3/8",
        options: ["0.615", "0.6875", "0.75", "0.625"],
        answer: "0.6875"
    },
        //[ Question 6]:
    {
        question: "Add 1/16 + 1/4 + 3/8",
        options: ["0.615", "0.6875", "0.75", "0.625"],
        answer: "11/16"

    },
        //[ Question 7]:
    {
        question: "Which of the following fractions is the largest?",
        options: ["2/3", "5/8", "11/16", "3/4"],
        answer: "3"
    },
        //[ Question 8]:
    {
        question: "Solve: (7*1/7)/(3*3/14)",
        options: ["64/52", "(1*5/8)", "9", "(2*2/9)"],
        answer: "2*(2/9)"
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

    optionElement.innerText = "";
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