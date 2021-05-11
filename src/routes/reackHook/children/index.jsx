import React,{forwardRef, useImperativeHandle} from 'react';

const  ChildCom = forwardRef((props, ref)=> {
    useImperativeHandle(ref, () => ({
        submit
    }))

    const submit = () => {
        console.log('提交');
    }

    return(
        <div>
            {props.children}
            {props.value}
            子组件
        </div>
    )
})

export default ChildCom