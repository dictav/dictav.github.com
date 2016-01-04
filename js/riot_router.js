window.openWithRiot = function(tag, opts) {
  console.log('OPEN', tag);
  riot.compile("tags/" + tag + ".html", function() {
    riot.mount("div#app", tag, opts);
  });
};

/// Routes
riot.compile("tags/ds-nav-layout.html", function(tag){
  window.navigationTag = riot.mount("ds-nav-layout");
});

riot.route('/', function(name) {
  openWithRiot("ds-top");
})

riot.route('/app/*', function(name) {
  openWithRiot("ds-app", {name: name});
})

riot.route('/blog', function(name) {
  openWithRiot("ds-blog", {name: name});
})

riot.route('/slides', function(name) {
  openWithRiot("ds-app", {name: name});
})

riot.route.start(true);
