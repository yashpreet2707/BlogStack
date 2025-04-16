import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store, persistor } from './redux/store.js'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'flowbite-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
