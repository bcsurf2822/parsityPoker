import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../../rtk/slices/registrationSlice";


const Register = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registration = useSelector((state) => state.register);

  return (
    <div className="registration">
      <h3>Thanks for Signing Up</h3>
      <p>
        This is a decentralized platform to create your account please enter a
        valid email and password that will be used to login, your username will
        be displayed in game
      </p>

      <div className="mb-3">
        <form>
          <label for="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          ></input>
          <label for="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="exampleFormControlInput1"
          ></input>
          <label for="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-labelledby="passwordHelpBlock"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Register;
