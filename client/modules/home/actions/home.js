import Slingshot from 'meteor/edgee:slingshot';

export default {
  addPost({Meteor, LocalState, FlowRouter, Collections}, formData){
    if(!formData.content)return LocalState.set('POST_ERROR','Content is Required');
    LocalState.set('POST_ERROR',null);
    if(!(formData.postPicture instanceof window.File) && !(formData.postPicture instanceof window.Blob)){
      formData.postPicture = '';
      Meteor.call("addPost",formData, function (err){
        if(err) return LocalState.set('POST_ERROR',"Server Error: "+err);
        else {
          Meteor.call('incrementTotalPostCount', function(error){
            if(error) return LocalState.set('POST_ERROR',"Server Error: "+err);
            else return LocalState.set('POST_ERROR',null);
          });
        }
      });
    } else {
      var uploader = new Slingshot.Slingshot.Upload( "imageUpload" );
      uploader.send(formData.postPicture, function (error, downloadUrl) {
       if (error) return LocalState.set('POST_ERROR',"Server Error: Picture can't be Uploaded");
       else {
         formData.postPicture = downloadUrl;
         Meteor.call("addPost",formData, function (err){
           if(err) return LocalState.set('POST_ERROR',"Server Error: "+err);
           else {
             Meteor.call('incrementTotalPostCount', function(error){
               if(error) return LocalState.set('POST_ERROR',"Server Error: "+err);
               else return LocalState.set('POST_ERROR',null);
             });
           }
         });
       }
      });
    }
  },

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

  addAvatar({LocalState}, imageFile){
    var reader = new FileReader();
    reader.onload = function (e) {
      return LocalState.set('avatar', e.target.result);
    }
    reader.readAsDataURL(imageFile);
  },

  removeAvatar({LocalState}){
    return LocalState.set('avatar', null);
  },

  clearPostErrors({LocalState}){
    return LocalState.set({"POST_ERROR": null, "VOTE_ERROR": null});
  },
}
