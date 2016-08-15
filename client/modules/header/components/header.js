import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  redirectHome(){
    const {redirectHome} = this.props;
    redirectHome();
  }

  redirectMessages(){
    const {redirectMessages} = this.props;
    redirectMessages();
  }

  signout(){
    const {signout} = this.props;
    signout();
  }

  render() {
    const {currentUser} = this.props;
    if(currentUser){
      return (
        <nav className="navbar navbar-default navbar-fixed-top col-md-7" id="nav">
          <div className="container-fluid" id="navbar">
            <div className="navbar-header">
              {
                currentUser.profile.picture === '' ?
                  <a href="#" ><img alt="Brand" src="https://answers.atlassian.com/images/icons/profilepics/default.png" className="img-circle" id='headerImage' /></a> :
                  <a href="#" ><img alt="Brand" src={currentUser.profile.picture} className="img-circle" id='headerImage'/></a>
              }
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li id='nav-details'><a href={`/profile/${currentUser._id}`}>{currentUser.profile.firstName+" "+currentUser.profile.lastName+" ("+currentUser.username+")"}</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown" id='nav-details'>
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="nav-actions">Actions<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a onClick={this.redirectHome.bind(this)}>Home</a></li>
                    <li><a onClick={this.redirectMessages.bind(this)}>Messages</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a onClick={this.signout.bind(this)}>Signout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    } else {return <div>Loading</div>}
  }

  old(){
    const {currentUser} = this.props;
    return (
      <div className="row" id='header'>
        <div className="col-md-2">
          <a href='#'>
            {
              currentUser.profile.picture === '' ?
              <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                   alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                   className="img-circle" id='signupImage'/> :
             <img src={currentUser.profile.picture}
                  alt={currentUser.profile.picture}
                  className="img-circle" id='signupImage'/>
            }
          </a>
        </div>
        <div className="col-md-8">
          <h1 className='col-md-12'><a href={`/profile/${currentUser._id}`}>{currentUser.profile.firstName+" "+currentUser.profile.lastName}</a>{" ("+currentUser.username+")"}</h1>
          <div className="btn-group col-md-12" role="group" aria-label="...">
            <button type="button" className="btn btn-default" onClick={this.redirectHome.bind(this)}>Home</button>
            <button type="button" className="btn btn-default" onClick={this.redirectMessages.bind(this)}>Messages</button>
            <button type="button" className="btn btn-default" onClick={this.signout.bind(this)}>Signout</button>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
