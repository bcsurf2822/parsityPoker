
const Options = (props) => {
  return (
    <main>
      <button onClick={props.joinGame}>Join a Game</button>
      <button onClick={props.hostGame}>Host a Game</button>
      <button onClick={props.tutorial}>Tutorial</button>
      <button onClick={props.settings}>Settings</button>
    </main>
  );
};

export default Options;