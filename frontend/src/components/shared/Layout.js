import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "components/shared/Navbar";
// Using curly bracket () instead of curly braces {} because we  create a
// concise stateless component.
const Layout = ({ title, content, children }) => (
    // <> </> its called fragment. Fragment are use when no wrapper is needed.
    // for example dont need css styling.
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <div className="container mt-5">{children}</div>
  </>
);

export default Layout;
