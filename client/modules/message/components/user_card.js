import React from 'react';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }
  // should be pre-processed in the container
  getInformation(user){
    const default_pic = "https://answers.atlassian.com/images/icons/profilepics/default.png";
    const isOnline = (user.profile.isOnline ? "online" : "offline");
    const name = ( user._id == Meteor.userId() ?
      " ( You )" :
      user.profile.firstName + " " + user.profile.lastName
    );
    const profile_link = `/profile/${user._id}`;
    const message_link = `/message/${user._id}`;
    return {
      default_pic,
      isOnline,
      name,
      profile_link,
      message_link
    }
  }

  render() {
    const {user} = this.props;
    const data = this.getInformation(user);
    return (
        <li className="list-group-item">
                        <div className="col-xs-12 col-sm-4">
                          {user.profile.picture === '' ?
                             <img src={data.default_pic} alt="Avatar" className="img-responsive img-circle" />
                             :
                              <img src={user.profile.picture} alt="Avatar" className="img-responsive img-circle" />
                          }

                        </div>
                        <div className="col-xs-12 col-sm-8">
                            <a href={data.message_link}><span className="name">{data.name}</span></a><br/>
                            <a href={data.profile_link}><span className="glyphicon glyphicon-home text-muted c-info" data-toggle="tooltip" title="Visit Profile"></span></a>
                            <span id={`glyphicon-${data.isOnline}-dot`}></span>
                        </div>
                        <div className="clearfix"></div>

       </li>
    );
  }
}

export default UserCard;
