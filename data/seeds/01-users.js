exports.seed = function (knex) {
  return knex('users').insert({
    username: 'Captain Marvel',
    password: 'eyJ1c2VybmFtZSI6IkNhcHRhaW4gTWFydmVsIiwicGFzc3dvcmQiOiJmb29iYXIifQ' //password foobar
   
  })
};