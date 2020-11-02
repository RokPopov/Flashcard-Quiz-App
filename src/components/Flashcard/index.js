import React, { useState } from 'react'

export default function Flashcard(props) {
const [toggle, setToggle] = useState(false)

  return (
    <div
    className={`card ${toggle ? 'toggle' : ''}`}
    onClick={() => setToggle(!toggle)}
    >
      <div className="front">
        {props.flashcard.question}
        <div className="flashcard-options">
          {props.flashcard.options.map((option, i) => {
            return <div key={i} className="flashcard-option">{option}</div>
          })}
        </div>
      </div>
        <div className="back">{props.flashcard.answer}</div>
    </div>
  )
}
