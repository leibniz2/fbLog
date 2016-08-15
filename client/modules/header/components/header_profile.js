import React from 'react';
import moment from 'moment';

class HeaderProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userProfile} = this.props;
    if(userProfile){
      return (
        <div className="col-md-6" id='headerProfile'>
          <br />
          <div className="col-md-12">
          {
            userProfile.profile.picture === '' ?
            <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                 alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                 className="img-circle" id='signupImage'/> :
           <img src={userProfile.profile.picture}
                alt={userProfile.profile.picture}
                className="img-circle" id='signupImage'/>
          }
          </div>
          <div className="col-md-12" id='profileHeaderDetails'><h1 className='col-md-12'>{userProfile.profile.firstName+" "+userProfile.profile.lastName+" ("+userProfile.username+")"}</h1></div>
          <div className="col-md-12" id='profileHeaderDetails'>
            <h6>{userProfile.profile.totalPosts+" Posts | "+userProfile.profile.totalUpVotes+" Upvotes | "+userProfile.profile.totalDownVotes+" Downvotes | "}<a href={`/message/${userProfile._id}`}>Private Message</a></h6>
            <h6>{userProfile.profile.location+" | "+userProfile.profile.email}</h6>
            <h6>Joined {(moment(userProfile.profile.createdAt).startOf('minute').fromNow())}</h6>
            <h6><a href='/home'>Home</a></h6><br/>
            <div className="tsc_divider5"></div><br/>
            <h4 className="pull-left">Recent Posts</h4><br/>
          </div>
        </div>
      );
    } else {return <p>Loading</p>}
  }
}

export default HeaderProfile;
