const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "?ނަވައި",
        choice1: '90',
        choice2: '85',
        choice3: '88',
        choice4: '65',
        answer: 1,
    },
    {
        question: "އެކާނަވައި؟",
        choice1: '44',
        choice2: '91',
        choice3: '56',
        choice4: '87',
        answer: 2,
    },
    {
        question: "ބަޔާނަވައި؟",
        choice1: "74",
        choice2: '90',
        choice3: '92',
        choice4: '34',
        answer: 3,
    },
    {
        question: "ތެޔާނަވައި؟",
        choice1: '88',
        choice2: '51',
        choice3: '62',
        choice4: '93',
        answer: 4,
    },
    
    {
        question: "ސައުރަޔާނަވައި",
        choice1: '34',
        choice2: '94',
        choice3: '22',
        choice4: '49',
        answer: 2,
    },
    
    {
        question: "ފަންސަޔާނަވައި؟",
        choice1: '19',
        choice2: '12',
        choice3: '21',
        choice4: '95',
        answer: 4,
    },
    
    {
        question: "ސަޔާނަވައި؟",
        choice1: '96',
        choice2: '66',
        choice3: '73',
        choice4: '79',
        answer: 1,
    },
    
    {
        question: "ސަތާނަވައި؟",
        choice1: '32',
        choice2: '54',
        choice3: '97',
        choice4: '38',
        answer: 3,
    },
    
    {
        question: "އަށާނަވައި؟",
        choice1: '14',
        choice2: '98',
        choice3: '09',
        choice4: '89',
        answer: 2,
    },
    
    {
        question: "ނަވާނަވައި / އޮނަަސައްތަ؟",
        choice1: '99',
        choice2: '98',
        choice3: '65',
        choice4: '39',
        answer: 1,
    },
    
    {
        question: "ސަތޭކަ؟",
        choice1: '76',
        choice2: '77',
        choice3: '100',
        choice4: '44',
        answer: 3,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 11

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()