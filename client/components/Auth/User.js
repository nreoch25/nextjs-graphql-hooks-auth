import { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";
import Signin from "./Signin";

const User = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }

  if (!data.me) {
    return <Signin />;
  }

  return <Fragment>{props.children(data.me)}</Fragment>;
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
