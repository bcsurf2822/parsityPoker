const Navbar = (props) => {
  return (
    <header>
      <h1>Poker Game</h1>
      <p>Score: {props.score}</p>
      <button onClick={props.logout}>Logout</button>
    </header>
  );
};

export default Navbar;