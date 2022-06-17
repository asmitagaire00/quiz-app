import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import Categories from '../Quiz/categories';
import Button from '../Button';

const Login = () => {
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyLevel(e.target.value);
  };

  // const handleLogin = () => {
  //   if (!categoryValue && !difficultyLevel) {
  //     console.log('Opps! Please category and difficulty level cant be empty ');
  //   } else {
  //   }
  // };

  const levels = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="login">
      <form>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login__username"
          placeholder="Enter your username.."
        />

        <select
          value={categoryValue}
          onChange={(e) => handleCategoryChange(e)}
          className="select-category"
          placeholder="Select Category"
        >
          {Categories.map((category) => {
            return (
              <option key={category.category} value={category.value}>
                {category.category}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => handleLevelChange(e)}
          className="select-difficulty"
          placeholder="Select Difficulty"
          value={difficultyLevel}
        >
          {levels.map((level) => {
            return <option key={level + 1}>{level}</option>;
          })}
        </select>

        <Link to="/quiz" state={{ username, categoryValue, difficultyLevel }}>
          <input
            type="button"
            value="Login"
            disabled={!username}
            className="button-login"
          />
        </Link>

        {/* <Link to="/quiz">
          <Button text="Login" handleClick={handleLogin} disabled={!username} />
        </Link> */}
      </form>
    </div>
  );
};

export default Login;
