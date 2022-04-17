import React from 'react';
import s from './Post.module.css'

type PropsType = {
    message:string
    counts: number
}

function Post(props:PropsType) {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThIE_WG-ywUwymdSlOZfw4q0mgj5EjaIwBqQ&usqp=CAU"/>

            {props.message}

            <div>
                <span>like {props.counts}</span>
            </div>
        </div>
    )
}

export default Post;