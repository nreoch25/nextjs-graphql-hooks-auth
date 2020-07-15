import { useMutation } from "@apollo/react-hooks";
import { DropdownItem } from "reactstrap";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";
import SIGN_OUT_MUTATION from "../../graphql/signout.mutation";

const Signout = () => {
  const [signoutUser] = useMutation(SIGN_OUT_MUTATION, {
    update: () => {
      localStorage.removeItem("token");
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <DropdownItem style={{ cursor: "pointer" }} onClick={signoutUser}>
      Signout
    </DropdownItem>
  );
};
export default Signout;
