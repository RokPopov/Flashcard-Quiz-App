import React, { useState } from 'react'

export default function Flashcard(props) {
const [toggle, setToggle] = useState(false)

  return (
    <div onClick={() => setToggle(!toggle)}>
      {toggle ? props.flashcard.answer : props.flashcard.question}
    </div>
  )
}
