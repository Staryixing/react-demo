import React, {useState, useRef}  from 'react';
import ChildCom from './children/index.jsx';
import sum from './sum';

// function useCount(initialValue){
//     const [count, setCount] = useState(initialValue)
//     return [
//         count,
//         () => {
//             setCount(count + 1)
//         }
//     ]
// } 

// export default  (props) =>{
//     const [count1, addCount1] = useCount(0)
//     const [count2, addCount2] = useCount(0)
//     return <div>
//         your count1: {count1},
//         your count2: {count2},
//         <button onClick={() =>addCount1() }>Add1</button>
//         <button onClick={() =>addCount2() }>Add2</button>
//         <div>
//             <canvas id="my-house" width="300" height="300"></canvas>
//         </div>
//     </div>
// }

export default () => {
    const cRef = useRef(null);

    const handleClick = ()=> {
        if(cRef.current){
            cRef.current.submit()
        }
    }
    return (
        <div>
            <div onClick={handleClick}>点击</div>
            <ChildCom ref ={cRef} value="小熊">
                <div>子孩子</div>
            </ChildCom>
            { sum(2,3) }
        </div>
    )
}
