export default {

  upVote({Meteor, LocalState, FlowRouter, Collections}, postId, upVotersUserIds, downVotersUserIds, createdBy){
    if(downVotersUserIds.indexOf(Meteor.userId()) !== -1){
      Meteor.call('removeDownVote',postId, Meteor.userId(),function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('decrementTotalDownVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    }
    if(upVotersUserIds.indexOf(Meteor.userId()) === -1){
      Meteor.call('upVotePost', postId, Meteor.userId(), function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('incrementTotalUpVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    } else {
      Meteor.call('removeUpVote',postId, Meteor.userId(),function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('decrementTotalUpVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    }

  },

  downVote({Meteor, LocalState, FlowRouter, Collections}, postId, upVotersUserIds, downVotersUserIds, createdBy){
    if(upVotersUserIds.indexOf(Meteor.userId()) !== -1){
      Meteor.call('removeUpVote',postId, Meteor.userId(),function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('decrementTotalUpVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    }
    if(downVotersUserIds.indexOf(Meteor.userId()) === -1){
      Meteor.call('downVotePost', postId, Meteor.userId(), function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('incrementTotalDownVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    } else {
      Meteor.call('removeDownVote',postId, Meteor.userId(),function(err){
        if(err) return LocalState.set('VOTE_ERROR', "Server Error: "+err);
        else {
          Meteor.call('decrementTotalDownVotesCount', createdBy, function(error){
            if(error) return LocalState.set('VOTE_ERROR', "Server Error: "+error);
            else return LocalState.set('VOTE_ERROR', null);
          });
        }
      });
    }
  },

  deletePost({Meteor, LocalState}, postId, totalPostUpVotes, totalPostDownVotes){
    Meteor.call('deletePost',postId, function(err){
      if(err) return LocalState.set("POST_ERROR", err);
      else {
        Meteor.call('decrementTotalPostCount', function(error){
          if(error) return LocalState.set('POST_ERROR',"Server Error: "+err);
          else {
            Meteor.call('decrementTotalUpVotesCountUponDelete', totalPostUpVotes, function(errs){
              if(errs) return LocalState.set('POST_ERROR',"Server Error: "+errs);
              else {
                Meteor.call('decrementTotalDownVotesCountUponDelete', totalPostDownVotes, function(errss){
                  if(errss) return LocalState.set('POST_ERROR',"Server Error: "+errss);
                  else return LocalState.set('POST_ERROR', null);
                });
              }
            });
          }
        });
      }
    });
  },

  clearPostErrors({LocalState}){
    return LocalState.set("POST_ERROR", null);
  },
}
