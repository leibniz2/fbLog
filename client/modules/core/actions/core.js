import Slingshot from 'meteor/edgee:slingshot';

export default {

  registerUser({FlowRouter}){
    FlowRouter.go('/signup')
  },

  signupUser({Meteor, LocalState, FlowRouter, Collections}, formData){
    if(!formData.username)return LocalState.set('SIGN_UP_ERROR','Username is Required');
    if(!formData.password)return LocalState.set('SIGN_UP_ERROR','Password is Required');
    if(!formData.profile.email)return LocalState.set('SIGN_UP_ERROR','Email is Required');
    if(!formData.profile.firstName)return LocalState.set('SIGN_UP_ERROR','First Name is Required');
    if(!formData.profile.lastName)return LocalState.set('SIGN_UP_ERROR','Last Name is Required');
    if(!formData.profile.location)return LocalState.set('SIGN_UP_ERROR','Location is Required');
    if(formData.profile.gender==='false')return LocalState.set('SIGN_UP_ERROR','Gender is Required');

    formData.profile.totalUpVotes = 0;
    formData.profile.totalDownVotes = 0;
    formData.profile.totalPosts = 0;
    formData.profile.isOnline = true;
    formData.profile.createdAt = new Date();

    if(!(formData.profile.picture instanceof window.File) && !(formData.profile.picture instanceof window.Blob)){
      formData.profile.picture = '';
      Meteor.call("addUser",formData, function (err){
        if(err) return LocalState.set('SIGN_UP_ERROR',"Server Error: Account can't be created");
        else { FlowRouter.go('/signin');}
      });
    } else {
      var uploader = new Slingshot.Slingshot.Upload( "imageUpload" );
      uploader.send(formData.profile.picture, function (error, downloadUrl) {
       if (error) return LocalState.set('SIGN_UP_ERROR',"Server Error: Avatar can't be Uploaded");
       else {
         formData.profile.picture = downloadUrl;
         Meteor.call("addUser",formData, function (err){
           if(err) return LocalState.set('SIGN_UP_ERROR',"Server Error: "+err);
           else { FlowRouter.go('/signin');}
         });
       }
      });
    }
  },

  signinUser({Meteor, LocalState, FlowRouter}, formData){
    if(!formData.username){return LocalState.set('SIGNIN_ERROR', 'Username is required.');}
    if(!formData.password){return LocalState.set('SIGNIN_ERROR', 'Password is required.');}

    LocalState.set('SIGNIN_ERROR', null);

    Meteor.loginWithPassword(formData.username,formData.password, (err) => {
      if(err){return LocalState.set('SIGNIN_ERROR', err.message);}
      Meteor.call('userSignin', function(err){
        if(err){return LocalState.set('SIGNIN_ERROR', err.message);}
          FlowRouter.go('/home');
      })
    });

      // return LocalState.set('SIGNIN_ERROR', "Error 503: Ongoing server maintenance");
  },

  addAvatar({LocalState}, imageFile){
    var reader = new FileReader();
    reader.onload = function (e) {
      return LocalState.set('avatar', e.target.result);
    }
    reader.readAsDataURL(imageFile);
  },

  next({LocalState}, username, users, pictures, usersFullName){
    if(!username){return LocalState.set('SIGNIN_ERROR', 'Username is required.');}
    const user = users.indexOf(username);
    if(user != -1){
      const avatar = pictures[user];
      const name = usersFullName[user].firstName + " " + usersFullName[user].lastName;
      return LocalState.set({
        username: username,
        avatar: avatar,
        name: name,
        buttonName: "LOGIN",
        SIGNIN_ERROR: null,
      });
    } else {
      return LocalState.set('SIGNIN_ERROR', 'Username not found');
    }
  },

  clearSignupErrors({LocalState}){
    return LocalState.set({'avatar': null,"SIGN_UP_ERROR": null});
  },
}
