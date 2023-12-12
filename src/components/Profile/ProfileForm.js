import { useRef,useState } from "react";
import classes from "./ProfileForm.module.css";
import { UseContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const ProfileForm =   () => {
  const [loading,setLoading] = useState(false);
  const [state,dispatch] = UseContext();
  const navigate = useNavigate();
  const newPassRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPassRef.current.value;
    setLoading(true);
    const handleRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAbwLTVIvQdv6McC4BGXTzfRozc7AoAw3g",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: state.token,
            password: enteredNewPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await handleRequest();
      setLoading(false);
      alert("Password changed successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassRef} />
      </div>
      <div className={classes.action}>
        {loading && <button disabled>Loading...</button>}
        {!loading && <button>Change Password</button>}
      </div>
    </form>
  );
};

export default ProfileForm;
