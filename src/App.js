import logo from './logo.svg';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './App.css';
import React, { useContext, useState } from 'react';
import Data from './data.js';
import Detail from './Detail.js'
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

// context만들기
// 1. React.createContext() 만들기 => 범위를 생성해주는 문법
// 2. 재고context.Provider value={재고}
// 3. useContext()로 공유된 값 사용하기
export let 재고context = React.createContext(); //Detail.js에서 쓰고 싶을땐 export를 앞에 붙여주고 Detail.js에서 import해야한다.

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as ={Link} to="/">Home</Nav.Link>
            <Nav.Link as ={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div>main page</div>
          <Jumbotron className="background">
            <h1>20% season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
          </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">

            <재고context.Provider value={재고}>

            <div className="row">

              {
                shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} />
                })
              }
            </div>

            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{
              
              axios.post('서버URL', {id : 'codingapple', pw : 1234})

              //axios를 쓰면 json을 object로 자동으로 바꿔준다.
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                console.log(result.data) //성공한 경우
                shoes변경([...shoes, ...result.data])
              })
              .catch(()=>{
                console.log("실패했어요") // 실패한 경우
              })
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} ></Detail>
          </재고context.Provider>
        </Route>

        <Route path="/:id">
          <div>아무거나</div>
        </Route>

      </Switch>


    </div>
  )
}
 
function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <Test></Test>
    </div>
  )
}

function Test(){
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>
}

export default App;
