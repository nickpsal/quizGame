let startbtn = document.getElementById("start-btn");
let nextbtn = document.getElementById("next-btn");
let questionContainer = document.getElementById("question-container");
let questionElement = document.getElementById("question");
let answersbtn = document.getElementById("answer-btn");
let scoreElement = document.getElementById("score");
let score = 0;

let shuffledQuestions, currentQuestionIndex;

startbtn.addEventListener("click", getQuestions);
nextbtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setQuenstion();
});

//φορτώνουμε τις ερωτήσεις και τις απαντήσεις απο το αρείο data.txt
function getQuestions(){
    $.ajax({
        url:'quiz.dat',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            startGame(data);
        },
        error: function(response) {
           alert("Δεν βρέθηκε το άρχειο των ερωτήσεων");
        }
    });
}

function startGame(data){
    console.log(data);
    shuffledQuestions = data.sort(()=>Math.random() - 0.5);
    currentQuestionIndex = 0;
    scoreElement.classList.add("hide");
    startbtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    setQuenstion();
}

function setQuenstion() {
    nextbtn.classList.add("hide");
    resetState();
    ahowQuestion(shuffledQuestions[currentQuestionIndex]);

}

function resetState() {
    nextbtn.classList.add("hode");
    while (answersbtn.firstChild) {
        answersbtn.removeChild(answersbtn.firstChild);
    }
}

function ahowQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer=> {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersbtn.appendChild(button);
    })
}

function selectAnswer(e){
    let selectedAnswer = e.target;
    let correct = selectedAnswer.dataset.correct;
    checkAnswer(correct);
    setStatusClass(document.body, correct);
    Array.from(answersbtn.children).forEach(button => {
        setStatusClass(button,button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextbtn.classList.remove("hide");
    }else {
        scoreElement.classList.remove("hide");
        questionContainer.classList.add("hide");
        scoreElement.innerHTML = "Τέλος Παιχνιδιού!!!!\n Το σκόρ σου είναι " + score + " στα " + shuffledQuestions.length;
        startbtn.classList.remove("hide");
    }
    
}

function checkAnswer(correct) {
    if (correct) {
        score++;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}