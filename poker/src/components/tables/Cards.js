

const Cards = () => {
  const map = new Map([
    ["Two", "🂢"],
    ["Three", "🂣"],
    ["Four", "🂤"],
    ["Five", "🂥"],
    ["Six", "🂦"],
    ["Seven", "🂧"],
    ["Eight", "🂨"],
    ["Nine", "🂩"],
    ["Ten", "🂪"],
    ["Jack", "🂫"],
    ["Queen", "🂭"],
    ["King", "🂮"],
    ["Ace", "🂡"]
  ]);

  return (
    <div>
     <h2>Cards Room</h2>
     {map}
    </div>
  )
}

export default Cards;