import React, { useState } from 'react';
import { createStore } from './redux'
import './app.css';

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
	switch (action.type) {
		case "INCREMENT":
			return {count: state.count + action.amount};
		case "DECREMENT":
			return {count: state.count - action.amount};
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

function useForceUpdate(){
	const [, setValue] = useState(0);
	return () => setValue(v => v > 100 ? 0 : ++v);
}

const incrementAction = (amount) =>  {
	return {type: 'INCREMENT', amount };
};
const decrementAction = (amount) => {
	return {type: 'DECREMENT', amount };
};
const resetAction = () => {
	return {type: 'RESET' }
};

const store = createStore(counterReducer)

function App() {
	const [amount, setAmount] = useState(1);

	const forceUpdate = useForceUpdate();
	store.subscribe(() => forceUpdate());
	const increment = () => {
		store.dispatch(incrementAction(amount || 1));
	}
	const decrement = () => {
			store.dispatch(decrementAction(amount || 1));
	}
	const reset = () => {
		store.dispatch(resetAction());
	}

	const handleChange = (e) => {
		setAmount(parseInt(e.target.value));
	}

  return (
    <div className="app">
				
			<div className="counter">
				<div className="result">{store.getState().count}</div>
				<div className="btns">
					<button onClick={()=> increment()} className="btn">+</button>
					<button onClick={()=> reset()} className="btn">R</button>
					<button onClick={()=> decrement()} className="btn">-</button>
				</div>
				<input className="input" type="text" onChange={handleChange} value={amount} />
			</div>
    </div>
  );
}

export default App;
