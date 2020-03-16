import React from 'react'
import styles from './styles.css'

export default function RulesBtn(props) {
    return (
        <div class="rules-container">
             <button class="rules" onClick={props.openModal}> Rules </button>
        </div>
    )
}
