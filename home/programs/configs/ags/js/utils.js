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
