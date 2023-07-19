import { useEffect, useState } from "react"
import api from "../../utils/api"


export default function ButtonLike({ likes, myId, cardId }) {
  const [count, setCount] = useState(likes.length);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(likes.some(item => myId === item._id))
  }, [likes, myId])

  function handleCardLike() {
    if (isLike) {
      api.deleteLike(cardId)
        .then(res => {
          setIsLike(false)
          setCount(res.likes.length)
        })
    } else {
      api.setLike(cardId)
        .then(res => {
          setIsLike(true)
          setCount(res.likes.length)
        })
    }
  }

  return (
    <>
      <button className={`card__like-button ${isLike && 'card__like-button_active'}`} type="button" aria-label="Лайкнуть фотографию" onClick={handleCardLike} />
      <span className="card__like-counter">{count}</span >
    </>
  )
}