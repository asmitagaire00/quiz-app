import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../QuestionCard';
import IQuiz from './IQuiz';
import './Quiz.css';

// interface Props {
//   categoryValue?: number;
//   difficultyLevel?: string;
//   setAnswerClicked: React.Dispatch<React.SetStateAction<boolean>>;
// }

interface locationStateProps {
  username: string;
  categoryValue: string;
  difficultyLevel: string;
}

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<IQuiz[]>([]);
  const [optionsDisabled, setOptionsDisabled] = useState<boolean>(false);
  const [nextClicked, setNextClicked] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quizRunning, setQuizRunning] = useState<boolean>(false);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);

  const location = useLocation();
  const userDetails = location.state as locationStateProps;
  const userCategoryValue = userDetails.categoryValue;
  const userDifficultyLevel = userDetails.difficultyLevel;
  const userName = userDetails.username;

  const handleQuizStart = async (): Promise<void> => {
    setQuizRunning(true);
    setQuestionsLoading(true);

    fetch(
      `https://opentdb.com/api.php?amount=10&category=${userCategoryValue}&difficulty=${userDifficultyLevel}&type=multiple`
    )
      .then((res) => res.json())
      .then((response) => {
        setQuizData(response.results);
        console.log('response', response.results);
      })
      .catch((err) => {
        console.log("couldn't fetch, error occurred", err);
      })
      .finally(() => {
        setQuestionsLoading(false);
      });
  };

  const handleNextQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setOptionsDisabled(false);
    setCurrentIndex(currentIndex + 1);
    setNextClicked(true);
  };

  return (
    <div className="quiz">
      <h1 className="app__header">React Quiz</h1>
      <hr style={{ height: '10px solid black' }} />
      <h1
        className={
          currentIndex < quizData.length - 1
            ? 'quiz__header'
            : 'quiz__header--hide'
        }
      >
        Welcome {userName}
      </h1>
      <div className={!quizRunning ? 'quiz__start' : 'quiz__start--hide'}>
        <button className="start" onClick={handleQuizStart}>
          Start Quiz
        </button>
      </div>
      <h3
        className={currentIndex < quizData.length - 1 ? 'score' : 'score--hide'}
      >
        Your score: {score}/{quizData.length}
      </h3>
      {questionsLoading && <p className="loading">Loading...</p>}
      {quizRunning &&
        quizData.length > 0 &&
        currentIndex < quizData.length - 1 && (
          <QuestionCard
            questionObj={quizData[currentIndex]}
            setScore={setScore}
            nextClicked={nextClicked}
            optionsDisabled={optionsDisabled}
            setOptionsDisabled={setOptionsDisabled}
          />
        )}
      {quizData.length > 0 && currentIndex < quizData.length - 1 ? (
        <div className="test">
          <button
            className={
              quizRunning ? 'question-card__next' : 'question-card__next--hide'
            }
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      ) : (
        <div
          className={
            quizRunning && !questionsLoading
              ? 'total-score'
              : 'total-score-hide'
          }
        >
          <p>Your score is {score}/10</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
