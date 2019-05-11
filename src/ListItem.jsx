import React from 'react';
import { Animated } from "react-animated-css";
import { FiX, FiCheck, FiEdit2 } from "react-icons/fi";

const ListItem = (props) => {
    return (
        <Animated animationIn="fadeInLeft" animationOut="fadeOutRight" isVisible={props.animation}>
            <li className={props.classes}>
                <div>
                    <div className="done_icon" onClick={props.clicker}><p>completed.</p></div>
                    <h2>{props.name}</h2>
                    <p>{props.text}</p>
                    <small>{props.date}</small>
                    <div className="finished_button" onClick={props.clicker}><FiCheck /></div>
                    <div className="edit_button" onClick={props.editer}><FiEdit2 /></div>
                    <div className="delete_button" onClick={props.deleter}><FiX /></div>
                </div>
            </li>
        </Animated>
    );
}

export default ListItem;