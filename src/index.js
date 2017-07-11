import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
debugger;
let initialState = {todos:[{
          id: 1,
          text: "Gaurav Kkurana creating basic todoapp",
          completed: false
        }],
        visibilityFilter:'SHOW_ALL'
    	};
let store = createStore(todoApp,initialState);


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

