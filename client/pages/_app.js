import App from "next/app";
import { withApollo } from "../lib/withApollo";

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
    return <Component {...pageProps} />;
  }
}
export default withApollo({ ssr: true })(MyApp);
