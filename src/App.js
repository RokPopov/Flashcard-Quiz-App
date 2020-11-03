import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./components/FlashcardList/index";
import "./style.css";
const axios = require("axios");

function App() {
const [flashcards, setFlashcards] = useState([]);
const [categories, setCategories] = useState([]);

const categoryElement = useRef();
const amountElement = useRef();

useEffect(() => {
  axios.get("https://opentdb.com/api_category.php")
  .then(res => {
    setCategories(res.data.trivia_categories)
  })
}, [])

useEffect(() => {
   axios.get("https://opentdb.com/api.php?amount=10")
   .then(res => {
     setFlashcards(res.data.results.map((questionItem, i) => {
       const answer = decodeString(questionItem.correct_answer)
       const options = [
         ...questionItem.incorrect_answers.map(ans => decodeString(ans)), 
         answer
      ]
       return {
         id: `${i} - ${Date.now()}`,
         question: decodeString(questionItem.question),
         answer: answer,
         options: options.sort(() => Math.random() - 0.5)
       }
     }))
     console.log("response", res.data)
   })
}, [])

function decodeString(str) {
  const textArea = document.createElement("textArea")
  textArea.innerHTML = str
  return textArea.value
}

function handleSubmit(e) {
  e.preventDefault();
  axios.get("https://opentdb.com/api.php", {
    params: {
      amount: amountElement.current.value,
      category: categoryElement.current.value,
    }
  })
   .then(res => {
     setFlashcards(res.data.results.map((questionItem, i) => {
       const answer = decodeString(questionItem.correct_answer)
       const options = [
         ...questionItem.incorrect_answers.map(ans => decodeString(ans)), 
         answer
      ]
       return {
         id: `${i} - ${Date.now()}`,
         question: decodeString(questionItem.question),
         answer: answer,
         options: options.sort(() => Math.random() - 0.5)
       }
     }))
     console.log("response", res.data)
   })
}

  return (
    <>
    <form className="header" onSubmit={handleSubmit}> 
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryElement}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number Of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountElement} />
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
    </>
  );
}



export default App;
