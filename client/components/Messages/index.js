import { useQuery } from "@apollo/react-hooks";
import MessageList from "./MessageList";
import MESSAGES from "../../graphql/messages.query";
import NEW_MESSAGE from "../../graphql/new-message.subscription";

const Messages = () => {
  const { data, loading, error, subscribeToMore } = useQuery(MESSAGES);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }
  const subscribeToNewMessages = () =>
    subscribeToMore({
      document: NEW_MESSAGE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return;
        const newMessage = subscriptionData.data.newMessage;
        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages]
        });
      }
    });
  return (
    <MessageList data={data} subscribeToNewMessages={subscribeToNewMessages} />
  );
};

export default Messages;
