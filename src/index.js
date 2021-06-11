import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'; 
import { combineReducers, createStore } from 'redux';

// let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2}]  })

let alert초기값 = true; // cart.js의 알림창 

function reducer2(state = alert초기값, 액션){
  if(액션.type === '닫기'){
    state = false
  }
  return state
}

let 초기값 = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발2', quan : 3}
]

function reducer(state = 초기값, 액션){//redux에선 state데이터의 수정방법을 미리 정의한다.
  if( 액션.type === '항목추가'){
    let copy = [...state];
    copy.push(액션.payload)
    return copy
  }else if( 액션.type === '수량증가' ){//data가 수정되는 조건
    let copy = [...state] //deepcopy
    copy[0].quan++;
    return copy
  }else if(액션.type === '수량감소' ){
    let copy = [...state]
    if (copy[0].quan > 0){
      copy[0].quan--;
    }
    return copy
  }else{
    return state
  }
}

// combinereducers() 내가 생성한 다수의 reducer들을 담을 수 있는 문법
let store = createStore(combineReducers({reducer, reducer2})) // return 하는 함수를 생성가능


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
