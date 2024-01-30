import './styles/App.css';
import 'normalize.css';
import Root from './routes/Root';
import { WindowSizeProvider } from './context/WindowSize';
import { Provider } from 'react-redux'
import { store } from "../src/redux/store"

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
