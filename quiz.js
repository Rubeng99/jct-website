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
        question: "Which of the following fractions is the largest?",
        options: ["2/3", "5/8", "11/16", "3/4"],
        answer: "11/16"

    },
        //[ Question 7]:
    {
        question: "What is the value of YZ",
        options: ["3", "2", "6", "5"],
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
let myImage = null; // global reference

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

   // Show image only on Question 6
    if(currentQuestion == 6){
        if (!myImage) { 
            myImage = new Image(200,200);
            myImage.src = 'images/q7.jpeg';
            // document.body.appendChild(myImage);
            const questionEl = document.getElementById("question");
            questionEl.parentNode.insertBefore(myImage, questionEl);
        }
    } else {
        if (myImage) {
            myImage.remove();
            // document.body.removeChild(myImage);
            myImage = null;
        }
    }
}

function setupCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    canvas.width = 1600/2;
    canvas.height = 900/2;
    return { canvas, ctx };
  }
  const { canvas, ctx } = setupCanvas('canvas-wrapping'); 
    function renderWrappingConfetti() {
    const timeDelta = 0.05;
    const xAmplitude = 0.5;
    const yAmplitude = 1;
    const xVelocity = 2;
    const yVelocity = 3;

    let time = 0;
    const confetti = []

    for (let i = 0; i < 100; i++) {
      const radius = Math.floor(Math.random() * 50) - 10
      const tilt = Math.floor(Math.random() * 10) - 10
      const xSpeed = Math.random() * xVelocity - xVelocity / 2
      const ySpeed = Math.random() * yVelocity
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;

      confetti.push({
        x,
        y,
        xSpeed,
        ySpeed,
        radius,
        tilt,
        color: colors[Math.floor(Math.random() * colors.length)],
        phaseOffset: i, // Randomness from position in list
      })
    }

    function update() {
      // Run for at most 10 seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((piece, i) => {
        piece.y += (Math.cos(piece.phaseOffset + time) + 1) * yAmplitude + piece.ySpeed;
        piece.x += Math.sin(piece.phaseOffset + time) * xAmplitude + piece.xSpeed;
        // Wrap around the canvas
        if (piece.x < 0) piece.x = canvas.width;
        if (piece.x > canvas.width) piece.x = 0;
        if (piece.y > canvas.height) piece.y = 0;
        ctx.beginPath();
        ctx.lineWidth = piece.radius / 2;
        ctx.strokeStyle = piece.color;
        ctx.moveTo(piece.x + piece.tilt + piece.radius / 4, piece.y);
        ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.radius / 4);
        ctx.stroke();
      })
      time += timeDelta;
      requestAnimationFrame(update);
    }
    update();
  }

  //Code from: https://snorre.io/blog/2024-07-19-javascript-canvas-confetti/
function showResult(){
    if(score == currentQuestion){
        quiz.innerHTML = `<h1>Congrats You Got a Perfect Score!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    <script>
    renderWrappingConfetti();
    </script>
    `;
        
        
    }else{
    quiz.innerHTML = `<h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    `;
    }
}

showQuestion();