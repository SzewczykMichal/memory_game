function Card({item, id, handleClick}){
    const itemClass = item.stat ? " active " + item.stat : ""

    return (
    <div className={"card" + itemClass} onClick={() => handleClick(id)}>
        <div className="emote">{item.text}</div>
    </div>
    )
}

export default Card;