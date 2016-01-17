/* global riot, util */

function openWithRiot (tag, opts) {
  riot.compile('tags/' + tag + '.html', function () {
    riot.mount('div#app', tag, opts)

    // Tracking
    //window.optimizely = window.optimizely || []
    //window.optimizely.push(['activate', 4443712297])
    //window.optimizely.push('activateUniversalAnalytics')
    window.ga('send', 'pageview')
  })
}

// Routes
riot.compile('tags/ds-nav-layout.html', function (tag) {
  window.navigationTag = riot.mount('ds-nav-layout')
})

riot.route('/', function () {
  openWithRiot('ds-top')
})

riot.route('/app/*', function (name) {
  openWithRiot('ds-app', {name: name})
})

riot.route('/blog/*', function (name) {
  openWithRiot('ds-blog', {name: name})
})

riot.route('/slides/*', function (name) {
  openWithRiot('ds-app', {name: name})
})

riot.route.base('')
riot.route.start(true)
