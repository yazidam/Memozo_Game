import React, { useEffect } from "react";
import { useState } from "react";
import Shape from "../Shape";
const Cards = () => {
  const [prev, setPrev] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [items, setItems] = useState(
    [
      {
        id: 1,
        img: (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="30" />
          </svg>
        ),
        stat: "",
      },
      {
        id: 1,
        img: (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="30" />
          </svg>
        ),
        stat: "",
      },
      {
        id: 2,
        img: (
          <svg
            viewBox="0 0 220 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginRight: 50,
            }}
          >
            <rect x="120" width="100" height="100" rx="15" />
          </svg>
        ),
        stat: "",
      },
      {
        id: 2,
        img: (
          <svg
            viewBox="0 0 220 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginRight: 50,
            }}
          >
            <rect x="120" width="100" height="100" rx="15" />
          </svg>
        ),
        stat: "",
      },
      {
        id: 3,
        img: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="50%"
            viewBox="0 0 100 100"
          >
            <polygon points="50 15, 100 100, 0 100" />
          </svg>
        ),
        stat: "",
      },
      {
        id: 3,
        img: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="50%"
            viewBox="0 0 100 100"
          >
            <polygon points="50 15, 100 100, 0 100" />
          </svg>
        ),
        stat: "",
      },
    ].sort(() => Math.floor(Math.random() * 360))
  );

  console.log(items);
  useEffect(() => {
    let timer;
    if (startTimer) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [minutes, seconds, startTimer]);

  useEffect(() => {
    if (pairs === items.length / 2) setStartTimer(false);
  }, [pairs, items.length]);

  const check = (current) => {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPairs(pairs + 1);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 500);
    }
  };

  const handleClick = (id) => {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  };

  return (
    <>
      <div className="container">
        {(startTimer || pairs === 3) && (
          <>
            {items.map((item, index) => (
              <Shape
                key={index}
                item={item}
                id={index}
                handleClick={handleClick}
              />
            ))}
          </>
        )}
      </div>

      <div className="timer">
        <button className="btn" onClick={() => setStartTimer(true)}>
          Start Game
        </button>{" "}
        <h1>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </h1>
      </div>
    </>
  );
};

export default Cards;
