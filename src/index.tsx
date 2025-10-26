/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { HopeProvider } from '@hope-ui/solid';
import { AppProvider } from './store/index';

const root = document.getElementById('root');

render(
  () => (
    <HopeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HopeProvider>
  ),
  root!
);
