import App from "next/app";
import { withApollo } from "../lib/withApollo";
import { UserProvider } from "../context/UserContext";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { pageProps, Component } = this.props;
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }
}
export default withApollo({ ssr: true })(MyApp);
