import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {재고context} from './App.js';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
// import './Detail.scss';
import {CSSTransition} from "react-transition-group"; // 컴포넌트 등장/ 업데이트시 transition 쉽게쉽게 줄 수 있음

// import './Detail.scss';

// let 박스 = styled.div`
//     padding : 20px;
// `;

// let 제목 = styled.h4`
//     font-size : 25px;
//     color : ${ props => props.색상}
// `;

function Detail(props) {
    let [alert, alert변경] = useState(true); //현재 alert창을 저장하는 플래그
    let [inputData, inputData변경] = useState('');
    let 재고 = useContext(재고context);
    let [누른탭, 누른탭변경] = useState(0); // state를 저장하는 공간
    let [스위치, 스위치변경] = useState(false);

    useEffect(()=>{
      let 타이머 = setTimeout(()=>{alert변경(false)}, 2000);
      return ()=>{clearTimeout(타이머)} // detail component가 사라질때 타이머를 제거해준다(버그염두)
    },[]);//[]안에 실행조건을 지정할 수 있다, alert가 변경이 될 때만 실행하지만 []빈 칸으로 둔다면 한번 실행되고 만다.

    

    let { id } = useParams();
    let history = useHistory();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id
    });

    

    return (
        <div className="container">
          {/* <박스>
            <제목 className="red">Detail</제목>
          </박스> */}
          {inputData}
          <input onChange={(e)=>{inputData변경(e.target.value)}} />

          {
            alert === true
            ? (<div>
                <p>재고가 얼마 남지 않았습니다.</p>
              </div>)
            : null
          }
          
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>

              <Info 재고={props.재고}></Info>
              <button className="btn btn-danger" onClick={()=>{
                props.재고변경([9, 11, 12])
              }}>주문하기</button> 
            </div>
          </div>
          
          {/* mt-5 는 margin-top : 5px 과 같다.(bootstrap에서 제공)
              eventKey 버튼마다 유니크한 키를 부여 */}
          <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0"> 
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false) }}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false) }}>Option 2</Nav.Link>
            </Nav.Item>
          </Nav>
            
          {/* timeout : 몇초동안 애니메이션이 동작할지
          classNames : 클래스명 작명
          in : true로 변할때만 애니메이션이 동작한다. */}
          <CSSTransition in={스위치} classNames="wow" timeout={500}>
          <TabContent 누른탭={누른탭} 스위치변경={스위치변경}></TabContent>
          </CSSTransition>
      </div>  
      )
    };

function TabContent(props){ 
  useEffect(()=>{
    props.스위치변경(true); //이 컴포넌트가 로드가 되거나 변동이 일어날때 스위치 true
  });
  if(props.누른탭 === 0){
    return <div>00</div>
  }else if(props.누른탭 === 1){
    return <div>11</div>
  }else if(props.누른탭 === 2){
    return <div>22</div>
  }
}


function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;