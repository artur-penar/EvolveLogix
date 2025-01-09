import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "shared/components/Navbar";

// Using parentheses () instead of curly braces {} because we create a concise stateless component.
const Layout = ({ title, content, children }) => (
  // <> </> is called a fragment. Fragments are used when no wrapper is needed, for example, when you don't need CSS styling.
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <div className="layout-container" style={{ marginBottom: "3rem" }}>
      {children}
    </div>
  </>
);

export default Layout;
