const STORE = [
    {
      question: 'Cats conserve energy by sleeping for an average of ______ hours a day.' ,
      answers: [
        '21-25',
        '10-12',
        '13-14',
        '15-18',
        ],
      correctAnswer:'13-14' ,
    },
    {
      question: 'There are over _____ million domestic cats in the world.',
      answers: [
        '600',
        '250',
        '300',
        '500',
        ],
      correctAnswer:'500',
    },
    {
     question: 'Cats are one of, if not the most, _______ pets in the world.',
      answers: [
        'Aggressive',
        'Popular',
        'Dangerous',
        'Smart',
        ],
      correctAnswer:'Popular',
    },
    {
       question: 'Cats have excellent hearing and a powerful sense of ______.',
      answers: [
        'Direction',
        'Touch',
        'Smell',
        'Humor',
        ],
      correctAnswer:'Smell',
    },
    {
       question: 'On average cats live for around _____ years.',
      answers: [
        '12 to 15',
        '15 to 20',
        '8 to 10',
        '9 to 11',
        ],
      correctAnswer:'12 to 15',
    },
];

let questionNumber = 1;
let score = 0;

$(document).ready(function (){
  startQuiz();
});

//generate question html
function generateQuestion () {
  if (questionNumber-1 < STORE.length) {
    var buildQuestion= `<div id="question-${questionNumber}">
    <h2>${STORE[questionNumber-1].question}</h2>
    <form>
    <fieldset><legend>Select an answer from the options below:</legend>`;
    for (i=0; i<STORE[questionNumber-1].answers.length; i++) {
      buildQuestion+=`<label class="answerOption">
    <input type="radio" value="${STORE[questionNumber-1].answers[i]}" name="answer" required>
    <span>${STORE[questionNumber-1].answers[i]}</span>
    </label>`;
    }
    buildQuestion+=`<button type="submit" id="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
    $('#question').text(`Question: ${questionNumber}/${STORE.length}`);
    $('#score').text(`Score: ${score}/${STORE.length}`);
    
    return buildQuestion;
    
} else {
    renderResults();
    $('#question').text('Question ' + (questionNumber-1));
  }
}


function startQuiz () {
  $('#Quiz-Button').on('click', function (event) {
    $('#quiz-content').empty();
    questionNumber=1;
    score=0;
    renderQuestion();
    userSelectAnswer();
    $('#question').text('Question '+ questionNumber);
    $('#score').text('Score ' + score);
  });
}

// render question in DOM
function renderQuestion () {
  $('#quiz-content').append(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber-1].correctAnswer}`;
    if (answer === correctAnswer) {
     $('#quiz-content').append('<p>Yay! Correct!</p><button type="button" id="Next">Next</button>');
     score++;
     $('#score').text('Score ' + score);
    } else {
      $('#quiz-content').append('<p>Sorry, Incorrect! The correct answer is: '+ correctAnswer +' </p><button type="button" id="Next">Next</button>');
    }
    questionNumber++;
    nextAction();
  });
  $('form').submit(function(){
    $(this).find(':input[type=submit]').prop('disabled', true);
});

}

function nextAction (){
  $('#Next').on('click',function(){
    $('#quiz-content').empty();
     $('#question').text('Question '+ questionNumber);
    renderQuestion();
    userSelectAnswer();
  });
}

//quiz end
function renderResults () {
  if (score >= 5) {
    $('#quiz-content').append(`<div class='results correctFeedback'><h2>'You are a cat genius!'</h2><p>'You got ${score} / 5'</p><button id="Quiz-Button">'Restart Quiz'</button></div>`);
  } else if (score < 5 && score >= 3) {
     $('#quiz-content').append(`<div class="results correctFeedback"><h2>You’ve got nine lives, so try the quiz again</h2><p>You got ${score} / 5</p><button id="Quiz-Button">Restart Quiz</button></div>`);
  } else {
     $('#quiz-content').append(`<div class="results correctFeedback"><h2>You didn’t pass the quiz, but you’re still purrfect. Try the quiz again!</h2><p>You got ${score} / 5</p><button id="Quiz-Button">Restart Quiz</button></div>`);
  }
  startQuiz();
}

