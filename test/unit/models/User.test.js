describe('User', function () {
  it('should create a user', function (done) {
    User.create({
      username: 'pat',
      email: 'patthecat@gmail.com',
      gravatar: 'https://31.media.tumblr.com/avatar_96959dfdc643_128.png'
    }, function (err, user) {
      done();
    });
  });
});
