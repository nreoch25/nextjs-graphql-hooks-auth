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
import CURRENT_USER_QUERY from "../../graphql/current-user.query";
import SIGNIN_MUTATION from "../../graphql/signin.mutation";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    mutationComplete: false,
  });
  const [signinUser, { error }] = useMutation(SIGNIN_MUTATION, {
    variables: user,
    update: (store, { data: { signinUser } }) => {
      if (signinUser.token) {
        localStorage.setItem("token", signinUser.token);
      }
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      setUser({
        ...user,
        mutationComplete: true,
      });
    },
  });
  const saveToState = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  return (
    <Row style={{ paddingTop: "100px" }}>
      <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader className="text-center">Sign in</CardHeader>
          <CardBody>
            <Form
              method="post"
              onSubmit={async (evt) => {
                evt.preventDefault();
                setUser({ ...user, email: "", password: "" });
                await signinUser();
              }}
            >
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Email Address"
                  onChange={saveToState}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={saveToState}
                />
              </FormGroup>
              <Button type="submit" color="primary" block>
                Sign in
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
              <Alert className="mb-0" color="success">
                User successfully signed in
              </Alert>
            </CardFooter>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Signin;
