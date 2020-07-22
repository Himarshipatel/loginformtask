import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const signinUser = ({ identifier, password, history }) => {
  let token;

  return (dispatch) => {
    dispatch({ type: "Signin_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier,
        password,
      })

      .then((res) => {
        dispatch({ type: "Signin_SUCCESS", stats: res.data.data });
        toast.success("Login Success !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("token", (token = res.data.jwt));
        console.log("token", token);
        var token = localStorage.getItem("token");

        console.log("token", token);

        history.push("/dashboard");
      })

      .catch((error) => {
        dispatch({ type: "Signin_FAILURE", message: error.response });
        alert("login error");
      });
  };
};
export const createPaste = ({ content, Expiration, Exposure, title }) => {
  console.log(content, Expiration, Exposure, title);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  console.log(authtoken);
  return (dispatch) => {
    dispatch({ type: "Createpaste_PENDING" });

    axios
      .post(
        "https://pastebindemo.herokuapp.com/pastes",
        {
          content,
          Expiration,
          Exposure,
          title,
        },
        authtoken
      )

      .then((res) => {
        dispatch({ type: "Createpaste_SUCCESS", stats: res.data.data });
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
        dispatch({ type: "Createpaste_FAILURE", message: error.response });
      });
  };
};
export const pasteList = () => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  console.log(authtoken);
  return (dispatch) => {
    dispatch({ type: "Pastelist_PENDING" });

    axios
      .get("https://pastebindemo.herokuapp.com/pastes", authtoken)

      .then((res) => {
        dispatch({ type: "Pastelist_SUCCESS", stats: res.data });
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
        dispatch({ type: "Pastelist_FAILURE", message: error.response });
      });
  };
};
