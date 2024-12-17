const question = [
{
    question: "Pjevačka skupina koja izvodi izvorne dalmatinske pjesme zove se ...",
    answers: [
        { text: "Zbor", correct: false},
        { text: "Klapa", correct: true},
        { text: "Duo", correct: false},
        { text: "Band", correct: false},
    ]
},
{
    question: "Michael Schumacher je posljednji naslov u F1 osvojio kao vozač",
    answers: [
        { text: "Wulliamsa", correct: false},
        { text: "McLarena", correct: false},
        { text: "Ferrarija", correct: true},
        { text: "Arrowsa", correct: false},
    ]
},
{
    question: "Ragusa je italijanski naziv za ...",
    answers: [
        { text: "Korčulu", correct: false},
        { text: "Mljet", correct: false},
        { text: "Dubrovnik", correct: true},
        { text: "Cavtat", correct: false},
    ]
},
{
    question: "Na kojem se kontinentu mogu naci tigrovi u divljni?",
    answers: [
        { text: "Africi", correct: false},
        { text: "Južnoj Americi", correct: false},
        { text: "Aziji", correct: true},
        { text: "Australiji", correct: false},
    ]
},
{
    question: "Rakija se dobiva",
    answers: [
        { text: "vrenjem", correct: false},
        { text: "destilacijom", correct: true},
        { text: "prženjem", correct: false},
        { text: "sušenjem", correct: false},
    ]
},

];

const questionElement = document.getElementById ("question");
const answerButtons = document.getElementById ("answer-buttons");
const nextButton = document.getElementById ("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement ("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
        
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore()
{
resetState();
questionElement.innerHTML = questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;

nextButton.innerHTML = "Play Again";
nextButton.style.display = "block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();