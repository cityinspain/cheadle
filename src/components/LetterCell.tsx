import clsx from "clsx";

const LetterCell = ({ letters, index, setLetters }) => {
  const classes = clsx({
    "Row-letter": true,
    focused: letters[index].focused,
  });

  return (
    <div
      key={index}
      className={classes}
      onClick={() => {
        console.log("hi", index);
        letters[index] = {
          ...letters[index],
          focused: !letters[index].focused,
        };
        setLetters(letters);
      }}
    >
      {letters[index].value}
    </div>
  );
};

export default LetterCell;
