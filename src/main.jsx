import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { Container } from './App.jsx'
import {store, mapDispatchToProps, mapStateToProps} from './App.jsx'
import { Provider, connect } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Container />
    </Provider>
  </StrictMode>,
)
