import React from 'react';

const Layout = ({content = () => null }) => (
  <div id="topmost">
    <div id="main-layout">
      {content()}
    </div>
  </div>
);

export default Layout;
