const questions = [
    
    {
        question: "1.Мағжан Жұмабаевтың 'Қарағым' өлеңіндегі негізгі идеяны анықтаңыз ?",
        options: ["Елге деген сүйіспеншілік", "Жастарды білімге шақыру", "Табиғатты сүю"],
        correct: 1,
        
    },
    {
        question: "2.Мағжан Жұмабаевтың 'Қарағым' өлеңі мен Сұлтанмахмұт Торайғыровтың 'Шәкірт ойы' өлеңінің қандай ұқсастығы бар ?",
        options: ["Екі өлең де табиғатты сипаттайды", "Екі өлең де жастарды білім мен өнерге шақырады", "Екі өлең де ата-ананың баласына деген махаббаты туралы"],
        correct: 1,
        
    },
    {
        question: "3.Сұлтанмахмұт Торайғыровтың 'Шәкірт ойы' өлеңінде қолданылған көркемдік тәсілдерді анықтаңыз ?",
        options: ["Метафора, теңеу", "Қайталау, антитеза", "Гипербола, эпитет"],
        correct: 0,
    },
    {
        question: "4.Мағжан Жұмабаев 'Қарағым' өлеңінде қандай жолдар арқылы жастардың білімге ұмтылуы керек екенін көрсетеді ?",
        options: ["Қазақ еліңді сүй, Білімді болсаң, бәрі де өзіңдік", "Жерімнің көркі бол, Бақытты болар күн келеді", "Білім керек балаға, Оқу оқып ғаламды тану керек"],
        correct: 2,
     
    },
    {
        question: "5.Егер сіз Сұлтанмахмұт Торайғыровтың 'Шәкірт ойы' өлеңінің жалғасын жазсаңыз, қандай тақырыпты қозғайсыз ?",
        options: ["Туған жерге деген сағыныш" , "Білім мен еңбектің маңыздылығы" , "Табиғаттың сұлулығы"],
        correct: 1,
        
    },
    


];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const answerSection = document.getElementById('answer-section');
    const checkmark = document.getElementById('checkmark');
    const answerImage = document.getElementById('answer-image');
    const quizContainer = document.getElementById('quiz-container');

    // Егер сұрақтар бітіп қалса
    if (currentQuestionIndex >= questions.length) {
        quizContainer.innerHTML = `
            <h2>Сұрақтар аяқталды!</h2>
            <p>Сіз барлық сұрақтарды аяқтадыңыз. Қатысқаныңыз үшін рахмет!</p>
            <button id="restart-button">Қайта бастау</button>
        `;
        document.getElementById('restart-button').onclick = restartQuiz; // Қайта бастау түймесіне оқиға қосу
        return;
    }

    // Ағымдағы сұрақты алу
    const currentQuestion = questions[currentQuestionIndex];

    // Сұрақты және жауап нұсқаларын көрсету
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    answerSection.style.visibility = 'hidden'; // Сурет пен птичканы жасыру
    checkmark.style.visibility = 'hidden'; // Птичканы жасыру
    answerImage.classList.remove('show'); // Сурет анимациясын қалпына келтіру

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionElement.onclick = () => checkAnswer(index, currentQuestion.correct, currentQuestion.image);
        optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex, correctIndex, imageUrl) {
    const options = document.querySelectorAll('.option');
    const answerSection = document.getElementById('answer-section');
    const checkmark = document.getElementById('checkmark');
    const answerImage = document.getElementById('answer-image');

    if (selectedIndex === correctIndex) {
        // Дұрыс жауап
        options[selectedIndex].classList.add('correct');
        checkmark.style.visibility = 'visible'; // Птичканы көрсету
        
    } else {
        // Қате жауап
        options[selectedIndex].classList.add('incorrect');
        setTimeout(() => loadQuestion(), 1000); // Қайта жүктеу
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function loadPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Тестті қайта бастау функциясы
function restartQuiz() {
    currentQuestionIndex = 0;
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="question" id="question">Сұрақ жүктелуде...</div>
        <div id="options-container"></div>
        <div class="answer-section" id="answer-section">
            <div class="correct-checkmark" id="checkmark">✔</div>
            <img id="answer-image" class="answer-image" src="" alt="Answer illustration">
        </div>
        <div class="nav-buttons">
            <button onclick="loadPreviousQuestion()">Алдыңғы сұрақ</button>
            <button onclick="loadNextQuestion()">Келесі сұрақ</button>
        </div>
    `;
    loadQuestion();
}

// Алғашқы сұрақты жүктеу
loadQuestion();

