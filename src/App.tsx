import { useEffect, useState } from "react";

import "./App.css";

import { wordList } from "./words";

// TODO: vertical list for yellow spots
// to show where yellows have been found
/*
 * example
 * A D I E U
 * ---------
 * A D   E
 *   E D
 */

// TODO: support having letters in both yellows/grays and
// green list, for double letters

// TODO: clear button

const hasAllDistinctCharacters = (text: string | string[]) => {
  if (typeof text === "string") {
    return !text.split("").some((v, i, a) => a.lastIndexOf(v) !== i);
  } else {
    return !text.some((v, i, a) => a.lastIndexOf(v) !== i);
  }
};

function App() {
  const [greenLetters, setGreenLetters] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });

  // TODO: prevent duplicate entries
  const [yellowLetters, setYellowLetters] = useState("");
  const [grayLetters, setGrayLetters] = useState("");

  const [words, setWords] = useState(wordList);
  const handleChange = (e) => {
    const key = e.target.name;
    const newPair = { [key]: e.target.value.toLowerCase() };
    setGreenLetters({ ...greenLetters, ...newPair });
  };

  const handleYellowLettersChange = (e) => setYellowLetters(e.target.value);
  const handleGrayLettersChange = (e) => setGrayLetters(e.target.value);

  useEffect(() => {
    const createGreenLetterRegex = (inputState) => {
      return new RegExp(
        "^" +
          Object.values(inputState)
            .map((i: string) => (i && i.length > 0 ? i : "."))
            .join("")
      );
    };

    const wordContainsYellows = (word: string) =>
      yellowLetters.split("").every((letter) => word.includes(letter));
    const wordDoesNotContainGrays = (word: string) =>
      grayLetters.split("").every((letter) => !word.includes(letter));

    const greenLetterRegex = createGreenLetterRegex(greenLetters);

    setWords(
      wordList.filter(
        (word) =>
          word.match(greenLetterRegex) &&
          wordContainsYellows(word) &&
          wordDoesNotContainGrays(word)
      )
    );
  }, [greenLetters, yellowLetters, grayLetters]);

  return (
    <>
      <div className="container">
        <div className="controls">
          <div className="green-letters-container">
            {Object.keys(greenLetters).map((input) => (
              <input
                className="green-letter-field"
                maxLength={1}
                value={greenLetters[input]}
                onChange={handleChange}
                name={input}
              ></input>
            ))}
          </div>
          <div className="text-area-container">
            <h2 style={{ color: "#F1C40F" }}>YELLOW</h2>
            <textarea
              className="yellow-letter-textarea"
              value={yellowLetters}
              onChange={handleYellowLettersChange}
            ></textarea>
          </div>
          <div className="text-area-container">
            <h2 style={{ color: "gray" }}>GRAY</h2>
            <textarea
              className="gray-letter-textarea"
              value={grayLetters}
              onChange={handleGrayLettersChange}
            ></textarea>
          </div>
        </div>
        <div
          style={{
            height: "100vh",
            overflowY: "scroll",
            flex: "1",
          }}
        >
          <ul className="word-list">
            {words.map((word) => (
              <li>{word}</li>
            ))}
          </ul>
        </div>
        {/* <div
          style={{
            height: "100vh",
            overflowY: "scroll",
            flex: "1",
          }}
        >
          <ul className="word-list">
            {words
              .filter((word) => hasAllDistinctCharacters(word))
              .map((word) => (
                <li>{word}</li>
              ))}
          </ul>
        </div> */}
      </div>
    </>
  );
}

export default App;
