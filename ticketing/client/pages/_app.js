import "bootstrap/dist/css/bootstrap.css";
import BuidClient from "../api/build-client";
import { Fragment } from "react";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <Fragment>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />;
    </Fragment>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = BuidClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};

  //handle child component getInitialprops() and calling it with the right context
  if (appContext.Component.getInitialProps) {
    pageProps = appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data };
};

export default AppComponent;
