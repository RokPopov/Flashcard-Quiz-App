import React from 'react';
import Flashcard from "../Flashcard/index";

export default function FlashcardList(props) {
  return (
    <div className="card-grid">
      {props.flashcards.map(flashcard => {
        return <Flashcard key={flashcard.id} flashcard={flashcard} />
      })}
    </div>
  )
}
