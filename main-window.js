var h = require('./lib/h')
var MutantMap = require('@mmckegg/mutant/map')
var electron = require('electron')

var Player = require('./widgets/player')
var renderAudioPost = require('./widgets/audio-post')

module.exports = function (client, config) {
  var api = require('./api')(client, config)
  var background = require('./models/background-remote')(config)

  var context = { config, api, background }
  var player = context.player = Player(context)

  var feed = api.getGlobalFeed(context, {feedTitle: 'DESTROY WITH SCIENCE'})
  player.currentFeed.set(feed)

  return h('Holder', [
    h('div.top', [
      h('span.appTitle', ['Ferment']),
      h('span', [
        h('a.upload', {href: '#', 'ev-click': openAddWindow}, ['+ Add Audio'])
      ])
    ]),
    h('div.main', [
      h('Feed', [
        h('h1', 'Feed'),
        MutantMap(feed, renderAudioPost)
      ])
    ]),
    h('div.bottom', [
      player.audioElement
    ])
  ])
}

function openAddWindow () {
  electron.ipcRenderer.send('open-add-window')
}
