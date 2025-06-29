 // Bootstrap CSS
 // Custom CSS from public folder
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./css/font-awesome.css";
    import "./css/slick.css";
    import "./css/slick-theme.css";
    import "./css/animate.css";
    import "./css/bootstrap.css";
    import "./css/color11.css";
    import "./css/latest.css";
    import "./css/style.css" ;
    
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
