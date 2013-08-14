// Cookie object
var Cookie = function(batch_type, bake_time) {
  this.batch_type = batch_type;
  this.bake_time = bake_time;
  this.time_baked = 0;
};

Cookie.prototype.bakeOneMinute = function() {
  this.time_baked++;
};

Cookie.prototype.state = function() {
  if (this.time_baked === 0) {
    return "raw";
  }
  else if (this.time_baked < this.bake_time) {
    return "still_gooey";
  }
  else if (this.time_baked === this.bake_time) {
    return "just_right";
  }
  else if (this.time_baked > this.bake_time) {
    return "crispy";
  }
};


// Oven object
var Oven = function() {
  this.cookies = [];
};

Oven.prototype.addCookie = function(cookie) {
  if (this.cookies.length < 3) {
    this.cookies.push(cookie);
    this.updateView();
  }
};

Oven.prototype.bake = function() {
  for (i = 0; i < this.cookies.length; i++) {
    this.cookies[i].bakeOneMinute();
  }
  this.updateView();
};

Oven.prototype.updateView = function() {
  for (i = 0; i < this.cookies.length; i++) {
    $('#rack_' + i).addClass(this.cookies[i].state());
    $('#rack_' + i).html(this.cookies[i].batch_type + " <span class='status'>[" + this.cookies[i].state() + "]</span>");
  }
}


// Document ready
$(function() {
  oven = new Oven();

  // Event listeners
  $('#new_batch').on('submit', function(e) {
    e.preventDefault();
    var batch_type = $('input[name=batch_type]').val();
    var bake_time = parseInt($('input[name=bake_time]').val());
    oven.addCookie(new Cookie(batch_type, bake_time));
  });

  $('#bake').on('click', function(e) {
    e.preventDefault();
    oven.bake();
  });
});