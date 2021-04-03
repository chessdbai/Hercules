import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { GameStudio } from './controls/GameStudio';
import { EditorPopup } from './controls/EditorPopup';
export { GameStudio };
export { EditorPopup };


if (process.env.NODE_ENV === 'rollup') {
  ReactDOM.render(<StrictMode>
      <GameStudio />
    </StrictMode>, document.getElementById('root'));
}