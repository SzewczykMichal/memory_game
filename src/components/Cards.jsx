import { useState, useEffect } from "react";
import Card from './Card';


function Cards(){
    const [items, setItems] = useState([
        {id: 1, text: "🍶", stat: ""},
        {id: 1, text: "🍶", stat: ""},
        {id: 2, text: "🍫", stat: ""},
        {id: 2, text: "🍫", stat: ""},
        {id: 3, text: "🍟", stat: ""},
        {id: 3, text: "🍟", stat: ""},
        {id: 4, text: "🍕", stat: ""},
        {id: 4, text: "🍕", stat: ""},
        {id: 5, text: "🍊", stat: ""},
        {id: 5, text: "🍊", stat: ""},
        {id: 6, text: "🍉", stat: ""},
        {id: 6, text: "🍉", stat: ""},
        {id: 7, text: "🍒", stat: ""},
        {id: 7, text: "🍒", stat: ""},
        {id: 8, text: "🍷", stat: ""},
        {id: 8, text: "🍷", stat: ""}
    ].sort(()=>Math.random() - 0.5))

    const [score, setScore] = useState(0);

    const [combo, setCombo] = useState(1);

    const [canSelect, setCanSelect] = useState(true);
    
    const [prev, setPrev] = useState(-1);

    //Comparing cards and result
    function check(current){
        if(items[current].id == items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
            setCanSelect(true);
            setScore(score + (2 * combo));
            setCombo(combo + 1);
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setCanSelect(false);
            if (score > 0) {
                setScore(score - 1);
            }
            setCombo(1);
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
                setCanSelect(true);
            }, 600);
        }
    }

    const [isComplete, setIsComplete] = useState(false);

    //Showing the result
    useEffect(() => {
      const allCorrect = items.every((item) => item.stat === "correct");
      if (allCorrect && !isComplete) {
        setIsComplete(true);
        setTimeout(() => {
            document.getElementById("overlay").style.display = "block";
        }, 300);
      }
    }, [items, isComplete]);

    //Checking selected cards
    function handleClick(id){
        if (canSelect) {
            console.log(id)
            if (prev === id) {
                return;
            }
            if (items[id].stat === "correct") {
                return;
            }
            if(prev === -1){
                items[id].stat = "active"
                setItems([...items])
                setPrev(id)
            }else{
                check(id)
            }
        }
    }


      
    function off() {
    document.getElementById("overlay").style.display = "none";
    window.location.reload();
    }

    return (
        <div>
            <div id="overlay" onClick={off}>
                <div id="text">Congratulations! Your score: <strong>{score}</strong></div>
            </div>
            <div className="score">Score: <strong>{score}</strong> Combo: <strong>{combo}</strong></div>
        <div className="container">
            {items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            )) }
        </div>
        </div>
    )
}

export default Cards;