import Gdk from 'gi://Gdk'

export function range(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start)
}

export function forMonitors(widget) {
  const n = Gdk.Display.get_default().get_n_monitors()
  return range(n, 0).map(widget)
}
