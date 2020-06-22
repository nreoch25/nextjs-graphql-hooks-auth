import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import RESET_MUTATION from "../../graphql/reset.mutation";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";

const Reset = ({ resetToken }) => {
  const [user, setUser] = useState({
    password: "",
    passwordConfirm: "",
    mutationCompleted: false,
  });
  const [resetPassword, { error }] = useMutation(RESET_MUTATION, {
    variables: {
      resetToken,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => setUser({ password: "", passwordConfirm: "", mutationComplete: true }),
  });
  const saveToState = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };
  return (
    <Row style={{ paddingTop: "100px" }}>
      <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader className="text-center">Reset your password</CardHeader>
          <CardBody>
            <Form
              method="post"
              onSubmit={async (evt) => {
                evt.preventDefault();
                await resetPassword();
              }}
            >
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={saveToState}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="passwordConfirm"
                  value={user.passwordConfirm}
                  placeholder="Confirm Password"
                  onChange={saveToState}
                />
              </FormGroup>
              <Button type="submit" color="primary" block>
                Reset password
              </Button>
            </Form>
          </CardBody>
          {error && (
            <CardFooter>
              <Alert style={{ marginBottom: "0" }} color="danger">
                {error.message}
              </Alert>
            </CardFooter>
          )}
          {user.mutationComplete && !error && (
            <CardFooter>
              <Alert style={{ marginBottom: "0" }} color="success">
                You have successfully reset your password
              </Alert>
            </CardFooter>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Reset;
