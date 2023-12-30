import { Widget, Mpris, Utils } from "../imports.js"
import GLib from "gi://GLib"
import icons from "../icons.js"

const MusicContainer = () => Widget.EventBox({
  onPrimaryClick: () => {
    const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
    if (!player) return
    player.playPause()
  },
  onSecondaryClick: () => {
    const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
    if (!player) return
    player.next()
  },
  child: Widget.Box({
    className: "barMusicContainer",
    children: [
      Widget.CircularProgress({
        className: "musicProgress",
        start_at: 0.75,
        child: Widget.Icon()
          .hook(Mpris, icon => {
            const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
            if (!player) return
            let icn = icons.mpris.stopped
            if (player.play_back_status === "Playing")
              icn = icons.mpris.playing
            else if (player.play_back_status)
              icn = icons.mpris.paused
            icon.icon = icn
          })
      })
        .hook(Mpris, prog => {
          const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
          if (!player) return
          prog.value = player.position / player.length
        })
        .poll(1000, prog => {
          const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
          if (!player) return
          prog.value = player.position / player.length
        }),
      Widget.Label({
        maxWidthChars: 35,
        truncate: "end"
      })
        .hook(Mpris, label => {
          const player = Mpris.getPlayer("spotify") || Mpris.getPlayer()
          if (!player) return
          label.label = player?.trackTitle + ' - ' + player?.trackArtists
        })
    ]
  })
})

const MusicBarContainer = () => Widget.Box({
  hexpand: true,
  children: [
    MusicContainer()
  ]
})

const MusicBarContainerRevealer = () => {
  const box = Widget.Box({
    vertical: false,
    vpack: "start"
  })

  box.pack_start(Widget.Revealer({
    child: MusicBarContainer(),
    transition: "slide_down",
    transitionDuration: 200,
    revealChild: Mpris.bind("players").transform(players => players.length > 0)
  }), false, false, 0)
  return box
}

const blurCoverArtCss = (coverPath) => {
  if (!coverPath) return ""
  const genCss = bg => `background: center/cover url('${bg}')`
  const blurredPath = Utils.CACHE_DIR + "/media/blurred" + coverPath.substring(Utils.CACHE_DIR.length + 14)

  if (GLib.file_test(blurredPath, GLib.FileTest.EXISTS))
    return genCss(blurredPath)

  Utils.ensureDirectory(Utils.CACHE_DIR + "media/blurred")
  Utils.exec(`convert ${coverPath} -blur 0x22 ${blurredPath}`)

  return genCss(blurredPath)
}

const CoverArt = player => Widget.Box({
  className: "musicCover",
  css: player.bind("cover_path").transform(coverPath => `background-image: url('${coverPath || ""}')`),
  children: [
    Widget.Icon({
      icon: Utils.lookUpIcon(player.name) ? player.name : icons.mpris.fallback,
      vpack: "center",
      hpack: "center",
      visible: player.bind("cover_path").transform(coverPath => !GLib.file_test(coverPath || "", GLib.FileTest.EXISTS))
    })
  ]
})

const MprisPlayer = player => Widget.Box({
  className: "musicContainer",
  css: player.bind("cover_path").transform(path => blurCoverArtCss(path)),
  children: [
    CoverArt(player),
    Widget.Box({
      vertical: true,
      children: [
        Widget.Box({
          vertical: true,
          children: [
            Widget.Label({
              maxWidthChars: 35,
              truncate: "end",
              className: "musicTitle",
              xalign: 0,
              label: player.bind("trackTitle")
            }),
            Widget.Label({
              maxWidthChars: 35,
              truncate: "end",
              className: "musicArtist",
              xalign: 0,
              label: player.bind("track_artists").transform(art => art.join(", "))
            })
          ]
        }),
        Widget.Box({
          children: [
            Widget.Box({
              vpack: "center",
              children: [
                Widget.Button({
                  className: "musicButtonPrev",
                  onClicked: () => player.previous(),
                  child: Widget.Icon(icons.mpris.prev)
                }),
                Widget.Button({
                  className: "musicButtonNext",
                  onClicked: () => player.next(),
                  child: Widget.Icon(icons.mpris.next)
                })
              ]
            }),
            Widget.Box({ hexpand: true }),
            Widget.Button({
              onClicked: () => player.playPause(),
              child: Widget.CircularProgress({
                className: "musicProgress",
                start_at: 0.75,
                child: Widget.Icon()
                  .hook(Mpris, icon => {
                    let icn = icons.mpris.stopped
                    if (player.play_back_status === "Playing")
                      icn = icons.mpris.playing
                    else if (player.play_back_status === "Paused")
                      icn = icons.mpris.paused
                    icon.icon = icn
                  })
              })
                .hook(Mpris, prog => {
                  if (!player) return
                  prog.value = player.position / player.length
                })
                .poll(1000, prog => {
                  if (!player) return
                  prog.value = player.position / player.length
                })
            })
          ]
        })
      ]
    })
  ]
})

const PlayerList = () => Widget.Box({
  vertical: true,
  attribute: {
    "player": new Map(),
    "onAdded": (box, id) => {
      const player = Mpris.getPlayer(id)
      if (!id || !player || box.attribute.player.has(id)) return
      const playerWidget = MprisPlayer(player)
      box.attribute.player.set(id, playerWidget)
      box.pack_start(playerWidget, false, false, 0)
    },
    "onRemoved": (box, id) => {
      if (!id || !box.attribute.player.has(id)) return
      box.attribute.player.get(id).destroy()
      box.attribute.player.delete(id)
    }
  }
})
  .hook(Mpris, (box, id) => box.attribute.onAdded(box, id), "player-added")
  .hook(Mpris, (box, id) => box.attribute.onRemoved(box, id), "player-closed")

export { MusicBarContainerRevealer, PlayerList }
