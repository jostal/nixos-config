import icons from "../../icons.js"
import { Widget, Utils, Audio, Hyprland } from "../../imports.js"
import { audioIconSub, getAudioTypeIcon, streamIconSub } from "../../utils.js"
import HoverableButton from "../../misc/HoverableButton.js"
import Menu from "./Menu.js"

const sorm = type => type === "sink" ? "speaker" : "microphone"
const sorms = type => type === "sink" ? "speakers" : "microphones"

const VolumeIndicator = (type = 'sink') => HoverableButton({
  className: "sliderTooltip",
  cursor: "pointer",
  onClicked: () => Audio[sorm(type)].isMuted = !Audio[sorm(type)].isMuted,
  child: Widget.Icon()
    .hook(Audio, icon => {
      if (Audio[sorm(type)])
        icon.icon = audioIconSub(Audio[sorm(type)].icon_name, type)
      if (Audio[sorm(type)].isMuted)
        icon.icon = icons.audio.volume.muted
    }, sorm(type) + "-changed")
})

const PercentLabel = (type = "sink") => Widget.Label({
  className: "audioVolumeLabel"
}).hook(Audio, label => {
  if (Audio[sorm(type)])
    label.label = `${Math.floor(Audio[sorm(type)].volume * 100)}%`
}, sorm(type) + "-changed")

const VolumeSlider = (type = "sink") => Widget.Slider({
  className: "volumeSlider",
  cursor: "pointer",
  hexpand: true,
  drawValue: false,
  onChange: ({ value }) => Audio[sorm(type)].volume = value,
}).hook(Audio, slider => {
  if (!Audio[sorm(type)])
    return

  slider.value = Audio[sorm(type)].volume
}, sorm(type) + "-changed")

export const Volume = (type = "sink") => Widget.Box({
  className: "volumeBox",
  children: [
    VolumeIndicator(type),
    VolumeSlider(type),
    PercentLabel(type)
  ]
})

const MixerItem = stream => Widget.EventBox({
  onPrimaryClick: () => stream.isMuted = !stream.isMuted,
  child: Widget.Box({
    hexpand: true,
    className: "mixerItem",
    children: [
      Widget.Icon({
        icon: stream.bind("icon_name").transform(() => streamIconSub(stream)),
        tooltipText: stream.bind("name").transform(name => name || "")
      }),
      Widget.Box({
        children: [
          Widget.Box({
            vertical: true,
            vpack: "center",
            children: [
              Widget.Box({
                children: [
                  Widget.Label({
                    xalign: 0,
                    hexpand: true,
                    className: "mixerItemTitle",
                    truncate: "end",
                    label: stream.bind("description").transform(desc => desc || "")
                  }),
                  Widget.Label({
                    xalign: 0,
                    className: "mixerItemVolume",
                    label: stream.bind("volume").transform(volume => `${Math.floor(volume * 100)}%`)
                  }),
                ]
              }),
              Widget.Slider({
                hexpand: true,
                className: "mixerItemSlider",
                drawValue: false,
                value: stream.bind("volume"),
                onChange: (value => {
                  stream.volume = value
                })
              })
            ]
          })
        ]
      })
    ]
  })
})

const SinkItem = (type) => stream => HoverableButton({
  onClicked: () => Audio[sorm(type)] = stream,
  child: Widget.Box({
    children: [
      Widget.Icon({
        icon: audioIconSub(stream.icon_name, type),
        tooltipText: stream.icon_name
      }),
      Widget.Label(stream.description?.split(" ").slice(0, 4).join(" ")),
      Widget.Icon({
        icon: icons.tick,
        hexpand: true,
        hpack: "end"
      }).hook(Audio, icon => {
        icon.visible = Audio[sorm(type)] === stream
      })
    ]
  })
})

const SettingsButton = (tab = 0) => HoverableButton({
  onClicked: () => Hyprland.sendMessage("dispatch exec pavucontrol -t " + tab),
  child: Widget.Icon(icons.settings)
})

export const AppMixer = () => Menu({
  title: "App Mixer",
  vpack: "center",
  icon: icons.audio.mixer,
  className: "appMixerContainer",
  content: Widget.Box({
    className: "appMixer",
    vertical: true,
    children: [
      Widget.Box({ vertical: true })
        .hook(Audio, box => {
          box.children = Audio.apps.map(MixerItem)
        }, "notify::apps")
    ]
  }),
  headerChild: SettingsButton(1)
})

export const SinkSelector = (type = "sink") => Menu({
  title: "Sink Selector",
  className: "sinkSelectorContainer",
  icon: type === "sink" ? icons.audio.type.headset : icons.audio.mic.unmuted,
  content: Widget.Box({
    className: "sinkSelector",
    vertical: true,
    children: [
      Widget.Box({ vertical: true })
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(SinkItem(type))
        }, "stream-added")
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(SinkItem(type))
        }, "stream-removed")
    ]
  }),
  headerChild: SettingsButton(type === "sink" ? 3 : 4)
})

const AudioContent = () => Widget.Box({
  vertical: true,
  className: "settingsPage",
  children: [
    Volume("sink"),
    // Volume("source"),
    SinkSelector("sink"),
    // SinkSelector("source"),
    // AppMixer()
  ]
})

export default AudioContent
