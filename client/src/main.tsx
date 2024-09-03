import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// redux toolkit
import { Provider } from 'react-redux'
import store from './API/redux/store/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
