function deleteUser(self, user) {
  function reqListener () {
    console.log(this.responseText);
  }
  console.log(user);
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    var res = JSON.parse(this.responseText);
    console.log(res);
    console.log(self);
    if (res.success) self.parentElement.parentElement.remove();
  });
  oReq.open("POST", "/deleteuser");
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send(JSON.stringify({
    user: user
  }));
}

function editUser(self, user) {
  window.location = '/edituser/' + user;
}
