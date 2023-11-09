import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

import './styles/index.scss';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* J'englobe mon application du provider de react-redux afin de fournir les données du store à mon application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
