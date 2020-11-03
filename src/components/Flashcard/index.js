import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard(props) {
const [toggle, setToggle] = useState(false)
const [height, setHeight] = useState("initial")

const frontElement = useRef();
const backElement = useRef();

function setMaxHeight() {
  const frontHeight = frontElement.current.getBoundingClientRect().height;
  const backHeight = backElement.current.getBoundingClientRect().height;
  setHeight(Math.max(frontHeight, backHeight, 300))
}

useEffect(setMaxHeight, [props.flashcard.question, props.flashcard.answer, props.flashcard.options])
useEffect(() => {
  window.addEventListener('resize', setMaxHeight)
  return () => window.removeEventListener('resize', setMaxHeight)
}, [])

  return (
    <div
    className={`card ${toggle ? 'toggle' : ''}`}
    style={{ height: height }}
    onClick={() => setToggle(!toggle)}
    >
      <div className="front" ref={frontElement}>
        {props.flashcard.question}
        <div className="flashcard-options">
          {props.flashcard.options.map((option, i) => {
            return <div key={i} className="flashcard-option">{option}</div>
          })}
        </div>
      </div>
        <div className="back" ref={backElement}>{props.flashcard.answer}</div>
    </div>
  )
}
