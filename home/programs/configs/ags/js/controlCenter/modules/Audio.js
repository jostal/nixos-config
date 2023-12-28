import icons from "../../icons.js"
import { Widget, Utils, Audio, Hyprland } from "../../imports.js"
import { getAudioTypeIcon } from "../../utils.js"
import HoverableButton from "../../misc/HoverableButton.js"
import Menu from "./Menu.js"

const sorm = type => type === "sink" ? "speaker" : "microphone"
const sorms = type => type === "sink" ? "speakers" : "microphones"

const VolumeIndicator = (type = 'sink') => HoverableButton({
  className: "sliderTooltip",
  onClicked: () => Audio[sorm(type)].isMuted = !Audio[sorm(type)].isMuted,
  child: Widget.Icon()
    .hook(Audio, icon => {
      if (!Audio[sorm(type)])
        return

      icon.icon = getAudioTypeIcon(Audio[sorm(type)].iconName || '')

      icon.tooltipText = `Volume ${Math.floor(Audio[sorm(type)].volume * 100)}%`
    }, sorm(type) + "-changed")
})

const VolumeSlider = (type = "speaker") => Widget.Slider({
  className: "volumeSlider",
  hexpand: true,
  drawValue: false,
  onChange: ({ value }) => Audio[sorm(type)].volume = value,
}).hook(Audio, slider => {
  if (!Audio[sorm(type)])
    return

  slider.sensitive = !Audio[sorm(type)].isMuted
  slider.value = Audio[sorm(type)].volume
}, sorm(type) + "-changed")

export const Volume = (type = "speaker") => Widget.Box({
  className: "volumeBox",
  children: [
    VolumeIndicator(type),
    VolumeSlider(type)
  ]
})

const SinkItem = (type) => stream => HoverableButton({
  onClicked: Audio[sorm(type)] = stream,
  child: Widget.Box({
    children: [
      Widget.Icon({
        icon: getAudioTypeIcon(stream.iconName || ""),
        tooltipText: stream.iconName
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

export const SinkSelector = (type = "sink") => Menu({
  title: type + " Selector",
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
  headerChild: SettingsButton(type === "speaker" ? 3 : 4)
})

const AudioContent = () => Widget.Box({
  vertical: true,
  className: "settingsPage",
  children: [
    Volume("speaker"),
    // Volume("source"),
    SinkSelector("speaker"),
    // SinkSelector("source")
  ]
})

export default AudioContent
