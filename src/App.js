import './styles/App.css';
import 'normalize.css';
import Root from './routes/Root';
import { WindowSizeProvider } from './context/WindowSize';
import { Provider } from 'react-redux'
import { store, useAppDispatch } from "../src/redux/store"
import { useEffect } from 'react';
import { getStackoverflowToken } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <WindowSizeProvider>
          <Root />
        </WindowSizeProvider>
      </Provider>

    </div>
  );
}

export default App;
