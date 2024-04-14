import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { interceptors } from './Utils/Interceptors';
import { Provider } from 'react-redux';
import { appStore } from './Redux/store';
import Modal from './Components/LayoutArea/Modal/Modal';

// create interceptor once:
interceptors.listen();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Layout />
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
