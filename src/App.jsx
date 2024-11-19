import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const API_KEY = '';
const quoteAPI = `https://api.api-ninjas.com/v1/quotes?category=computers&X-Api-Key=${API_KEY}`;

const fetchQuote = async (url=quoteAPI) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("Fetch Data : ", data);

  return data;
};
let defaultQuote = {};
window.addEventListener('load', async () => {
  const quote = await fetchQuote();

  if(!quote[0].quote){
    console.log("Loading....")
  } else {
    defaultQuote = quote[0];
    store.dispatch(newQuote(defaultQuote));
  }
})




// React 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.newQuote = this.newQuote.bind(this);
  }

  async newQuote () {
    const quote = await fetchQuote();

    // setTimeout(() => {
    //   this.props.addNewQuote(quote[0]);
    // }, 5000);
   
    if(!quote[0].quote){
      console.log("Loading....")
    } else {
      this.props.addNewQuote(quote[0]);
    }
  }

  render() {

    return (
      <>
      <main className="container d-flex align-items-center justify-content-center min-vh-100">
          <div id='quote-box' className="modern-card">
              <div className="card-body">
                  <blockquote className="blockquote mb-0">
                      <p id='text' className="quote-text">{this.props.quote}</p>
                      <footer id='author' className="blockquote-footer">{this.props.author}</footer>
                  </blockquote>
              </div>
              <div className="card-footer d-flex justify-content-between">
                  <div className="social-icons">
                      <a id="tweet-quote" target="_top" href='https://twitter.com/intent/tweet'><i className="fab fa-twitter"></i></a>
                      <a id="tumblr-quote" href='#'><i className="fab fa-tumblr"></i></a>
                  </div>
                  <button id='new-quote' className="btn btn-quote" onClick={this.newQuote}>New Quote</button>
              </div>
          </div>
      </main>
      </>
    )
  }

}


// REDUX 

const NEW_QUOTE = 'NEW_QUOTE';


const newQuote = (quote) => ({ 
  quote,
  type: NEW_QUOTE
});

// React-Redux:
export const mapStateToProps = (state) => {
  return state
};

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewQuote: (quote) => {
      dispatch(newQuote(quote));
    }
  }
};


const newQuoteReducer = (state=defaultQuote, action) => {
  switch (action.type) {
    
    case NEW_QUOTE:
      console.log("Object : ", Object.assign({},  newQuote(), action.quote))
      return Object.assign({}, newQuote(), action.quote);
      default:
        return state;
      }
};

export const store = createStore(newQuoteReducer);
export const Container = connect(mapStateToProps, mapDispatchToProps)(App)

export default App
