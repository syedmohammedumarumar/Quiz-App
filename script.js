const questions = [
    {
        question:"which is largest animal in the world?",
        answers:[
            { text:"shark",correct:false },
            { text:"blue whale",correct:true },
            { text:"elephant",correct:false },
            { text:"giraffe",correct:false },
        ]
    },
    {
        question:"which is the smallest country in the world?",
        answers:[
            { text:"vatican city",correct:true },
            { text:"bhutan",correct:false },
            { text:"nepal",correct:false },
            { text:"shri lanka",correct:false },
        ]
    },
    {
        question:"which is the largest desert in the world?",
        answers:[
            { text:"kalhari",correct:false },
            { text:"gobi",correct:false },
            { text:"sahara",correct:false },
            { text:"antarctica",correct:true },
        ]
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            { text:"asia",correct:false },
            { text:"australia",correct:true },
            { text:"arctic",correct:false },
            { text:"africa",correct:false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("ans_btns");
const nextBtn = document.getElementById("next_btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextBtn.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct ==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = "ture";
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "play Again"
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
});

startQuiz();