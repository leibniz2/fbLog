import Slingshot from 'meteor/edgee:slingshot';

export default function(){
  Slingshot.Slingshot.createDirective("imageUpload", Slingshot.Slingshot.S3Storage, {
    bucket: "snapzio-blog",
    acl: "public-read",
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: 10 * 1024 * 1024,

    authorize: function () {
      return true;
    },

    key: function (file) {
      var user = 'avatar';
      return user + "/" + file.name;
    }

  });
}
