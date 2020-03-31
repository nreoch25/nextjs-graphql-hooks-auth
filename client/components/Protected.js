import { Fragment } from "react";
import Router from "next/router";
import MessageForm from "./Messages/MessageForm";
import Messages from "./Messages";
import { Row, Col } from "reactstrap";

const Protected = ({ me }) => {
  if (process.browser && !me) {
    Router.push("/signin");
    return null;
  }
  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <MessageForm />
        </Col>
      </Row>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <Messages />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Protected;
