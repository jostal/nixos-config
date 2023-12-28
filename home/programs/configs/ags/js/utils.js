import Gdk from 'gi://Gdk'
import icons from './icons.js'

export function range(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start)
}

export function forMonitors(widget) {
  const n = Gdk.Display.get_default().get_n_monitors()
  return range(n, 0).map(widget)
}

export function getAudioTypeIcon(icon) {
  const substitues = [
    ['audio-headset-analog-usb', icons.audio.type.headset],
    ['audio-headset-bluetooth', icons.audio.type.headphones],
    ['audio-card-analog-usb', icons.audio.type.speakers],
    ['audio-card-analog-pci', icons.audio.type.speakers],
    ['audio-card-analog', icons.audio.type.speakers],
  ]

  for (const [from, to] of substitues) {
    if (from === icon)
      return to
  }

  return icons.audio.type.card
}

export const audioIconSub = (item, type) => {
  const microphoneSubstitutes = {
    "audio-headset-analog-usb": "audio-headset-symbolic",
    "audio-headset-bluetooth": "audio-headphones-symbolic",
    "audio-card-analog-usb": "audio-input-microphone-symbolic",
    "audio-card-analog-pci": "audio-input-microphone-symbolic",
    "audio-card-analog": "audio-input-microphone-symbolic",
    "camera-web-analog-usb": "camera-web-symbolic"
  }
  const substitutes = {
    "audio-headset-bluetooth": "audio-headphones-symbolic",
    "audio-card-analog-usb": "audio-speakers-symbolic",
    "audio-card-analog-pci": "audio-speakers-symbolic",
    "audio-card-analog": "audio-speakers-symbolic",
    "audio-headset-analog-usb": "audio-headset-symbolic"
  };

  if (type === "sink") {
    return substitutes[item] || item;
  }
  return microphoneSubstitutes[item] || item;
}

export const streamIconSub = stream => {
  const subs = {
    "spotify": "spotify",
    "Firefox": "firefox",
  }
  return subs[stream.name] || stream.icon_name
}
