# quizGame
This is a simply quiz game.
When it opens It loads the questions from quiz.dat file and shuffles them. So the order of the questions is random.
You can add as many questions as you want seperated by comma.
questions format : 
 {
        "question": "Questions",
        "answers": [
            {
                "correct": true,
                "text": "wright answer"
            },
            {
                "correct": false,
                "text": "alternative"
            },
            {
                "correct": false,
                "text": "alternative"
            },
            {
                "correct": false,
                "text": "alternative"
            }
        ]
    }
if the answer is correct the correct must be true the others false.
Only one question can be true.
