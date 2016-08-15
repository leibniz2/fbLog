import React from 'react';
import UserCard from './user_card';
import FlipMove from 'react-flip-move';

class Contactlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {total_online} = this.props;
    return (
      <div className="col-md-2">
        <div className="panel panel-default" id="contactlist">
                  <div className="panel-heading">
                      <span className="title">Total Users: {total_online}</span>
                  </div>


                    <ul className="list-group" >
                        {
                         this.renderItems()
                        }

                        <div className="clearfix"></div>
                    </ul>

          </div>
        </div>
    );
  }

  renderItems(){
    const {users} = this.props;

    return (
       <FlipMove enterAnimation="fade" leaveAnimation="fade" >
       {
          users.map(function(user){
               return <UserCard key={user._id} user={user} />
          })
       }
       </FlipMove>
    );
  } 
         

}

export default Contactlist;
