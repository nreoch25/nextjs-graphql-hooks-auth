import { Component } from "react";
import { Jumbotron } from "reactstrap";
class Index extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="p-2 pl-3 pr-3 mt-3">
          <h2>
            Authentication system boilerplate application using NextJS, GraphQL, Apollo Client,
            Apollo Server, NodeJS, MongoDB, and Nginx
          </h2>
          <a href="https://github.com/nreoch25/nextjs-graphql-hooks-auth" target="_blank">
            Click here to checkout the Github repo
          </a>
        </Jumbotron>
      </div>
    );
  }
}

export default Index;
