import { useMutation } from "@apollo/react-hooks";
import { Card, CardBody, Button, Form, FormGroup, Input } from "reactstrap";
import POST_MESSAGE from "../../graphql/post-message.mutation";

const MessageForm = () => {
  const [postMessage] = useMutation(POST_MESSAGE);
  const handleSubmit = evt => {
    evt.preventDefault();
    const text = evt.target.text.value;
    if (!text) return;
    postMessage({
      variables: {
        text
      }
    });
    evt.target.text.value = "";
  };
  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="text" name="text" placeholder="type a message" />
          </FormGroup>
          <Button type="submit" color="primary" block>
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default MessageForm;
