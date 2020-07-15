import { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import Signin from "./Signin";
import UserContext from "../../context/UserContext";

const User = (props) => {
  const { me } = useContext(UserContext);

  if (!me) {
    return <Signin />;
  }

  return <Fragment>{props.children(me)}</Fragment>;
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
