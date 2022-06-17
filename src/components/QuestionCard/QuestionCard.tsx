import React from 'react';

import './QuestionCard.css';
import { IQuiz } from '../Quiz';
import { useState } from 'react';

interface Props {
  questionObj: IQuiz;
  setScore: CallableFunction;
  optionsDisabled: boolean;
  nextClicked: boolean;
  setOptionsDisabled: CallableFunction;
}

const QuestionCard: React.FC<Props> = ({
  questionObj,
  setScore,
  nextClicked,
  optionsDisabled,
  setOptionsDisabled,
}) => {
  const [answerClicked, setAnswerClicked] = useState<boolean>(false);

  const answerOptions = [
    ...questionObj.incorrect_answers,
    questionObj.correct_answer,
  ];

  const shuffleArray = (answerOptions: Array<string>) => {
    return answerOptions.sort(() => Math.random() - 0.5);
  };

  const shuffledOptions = shuffleArray(answerOptions);

  const handleAnswerClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLInputElement;
    const ans = element.value;

    setAnswerClicked(true);
    setOptionsDisabled(true);

    // check if ans is correct
    if (ans === questionObj.correct_answer) {
      setScore((prevScore: number) => prevScore + 1);
    }
  };

  return (
    <>
      <div className="card">
        <p
          className="card__question"
          dangerouslySetInnerHTML={{ __html: questionObj.question }}
        ></p>

        <div className="card__answers">
          {shuffledOptions.map((ans) => (
            <input
              type="button"
              value={ans}
              className={
                !answerClicked
                  ? 'answer'
                  : answerClicked && ans === questionObj.correct_answer
                  ? 'answer--incorrect'
                  : 'answer--correct'
              }
              key={ans}
              onClick={handleAnswerClick}
              disabled={optionsDisabled}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
