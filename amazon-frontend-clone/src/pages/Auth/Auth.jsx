import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Auth.module.css";
import { auth } from "../../Utility/firbas/";
import { useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import { Type } from "../../Utility/reducer";
import { SpinnerCircular } from "spinners-react";

const Auth = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoding] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(user)
  const authHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setLoding({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoding({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoding({ ...loading, signIn: false });
        });
    } else {
      setLoding({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoding({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoding({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG7.png" />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            name="signin"
            type="submit"
            onClick={authHandler}
            className={classes.login__sinInbutton}
          >
            {loading.signIn ? (
              <SpinnerCircular color="#000" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          name="signup"
          type="submit"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <SpinnerCircular color="#000" size={25} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "10px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};
export default Auth;
