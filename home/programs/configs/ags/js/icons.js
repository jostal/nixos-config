export default {
  tick: "object-select-symbolic",
  audio: {
    mic: {
      muted: "microphone-disabled-symbolic",
      unmuted: "microphone-sensitivity-high-symbolic"
    },
    volume: {
      muted: 'audio-volume-muted-symbolic',
      low: 'audio-volume-low-symbolic',
      medium: 'audio-volume-medium-symbolic',
      high: 'audio-volume-high-symbolic'
    },
    type: {
      headset: "audio-headset-symbolic",
      headphones: "audio-headphones-symbolic",
      speakers: "audio-speakers-symbolic",
      card: "audio-card-symbolic"
    },
    mixer: "multimedia-volume-control-symbolic"
  },
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic",
  },
  notifications: {
    new: 'notification-new-symbolic',
    noisy: 'preferences-system-notifications-symbolic',
    silent: 'notifications-disabled-symbolic',
    critical: "messagebox_critical-symbolic",
    notification: "notification-symbolic",
    close: "window-close-symbolic"
  },
  header: {
    refresh: "view-refresh-symbolic",
    settings: "settings-symbolic",
    power: "system-shutdown-symbolic"
  },
  mpris: {
    fallback: "audio-x-generic-symbolic",
    shuffle: {
      enabled: "media-playlist-shuffle-symbolic",
      disabled: "media-playlist-no-shuffle-symbolic",
    },
    loop: {
      none: "media-playlist-no-repeat-symbolic",
      track: "media-playlist-repeat-song-symbolic",
      playlist: "media-playlist-repeat-symbolic"
    },
    playing: "media-playback-pause-symbolic",
    paused: "media-playback-start-symbolic",
    stopped: "media-playback-stop-sybolic",
    prev: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic"
  },
  ui: {
    close: 'window-close-symbolic',
    info: 'info-symbolic',
    menu: 'open-menu-symbolic',
    link: 'external-link-symbolic',
    settings: 'emblem-system-symbolic',
    arrow: {
      right: 'pan-end-symbolic',
      left: 'pan-start-symbolic',
      down: 'pan-down-symbolic',
      up: 'pan-up-symbolic'
    },
  },
  apps: {
    apps: 'view-app-grid-symbolic',
    search: 'folder-saved-search-symbolic'
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic"
  }
}
