import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
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
      </div>  
      )
    };

function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;