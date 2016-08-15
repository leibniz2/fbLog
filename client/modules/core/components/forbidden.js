import React from 'react';

class Forbidden extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="outer" className='signinBackground'>
        <div id="middle">
          <div id="innerSignin">
            <div className="panel panel-primary" id="signinPanel">
              <div className="panel-heading">
                <h3 className="panel-title">Error 404: Page not found!</h3>
              </div>
              <div className="panel-body">
                  Return to <a href="/home">home page</a>.
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Forbidden;
