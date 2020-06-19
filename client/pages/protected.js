import Layout from "../components/Layout/Layout";
import Protected from "../components/Protected";
import User from "../components/Auth/User";

const ProtectedPage = () => (
  <Layout>
    <User>{(me) => <Protected me={me} />}</User>
  </Layout>
);

export default ProtectedPage;
