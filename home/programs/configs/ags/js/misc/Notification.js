import { Widget, Notifications, Utils } from "../imports.js";
import icons from "../icons.js";
import GLib from "gi://GLib"
import Pango from "gi://Pango"

const NotificationIcon = notification => {
  let icon
  if (notification.image) {
    return Widget.Box({
      vexpand: false,
      hexpand: false,
      vpack: "center",
      className: "notificationIcon",
      css: `background-image: url('${notification.image}');
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;`
    })
  } else if (Utils.lookUpIcon(notification.app_icon)) {
    icon = notification.app_icon
  } else {
    icon = icons.notifications.notification
  }

  return Widget.Icon({
    className: 'notificationIcon',
    icon: icon
  })
}

const Notification = notification => Widget.Box({
  className: "notification",
  vertical: true,
  children: [
    Widget.EventBox({
      onPrimaryClick: (box) => {
        const label = box.child.children[1].children[1]
        if (label.lines < 0) {
          label.lines = 3
          label.truncate = "end"
        } else {
          label.lines = -1
          label.truncate = "none"
        }
      },
      child: Widget.Box({
        children: [
          NotificationIcon(notification),
          Widget.Box({
            vertical: true,
            children: [
              Widget.Box({
                children: [
                  Widget.Label({
                    className: "notificationTitle",
                    label: notification.summary,
                    justification: "left",
                    maxWidthChars: 24,
                    truncate: "end",
                    wrap: true,
                    xalign: 0,
                    hexpand: true,
                  }),
                  Widget.Label({
                    className: "notificationTime",
                    label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M")
                  }),
                  Widget.Button({
                    className: "notificationClose",
                    child: Widget.Icon(icons.ui.close),
                    onClicked: () => {
                      notification.close()
                    }
                  })
                ]
              }),
              Widget.Label({
                className: "notificationBody",
                justification: "left",
                maxWidthChars: 24,
                lines: 3,
                truncate: "end",
                wrapMode: Pango.WrapMode.WORD_CHAR,
                xalign: 0,
                wrap: true,
                label: notification.body.replace(/(\r\n|\n|\r)/gm, " ") // removes linebreaks
              }),
              notification.hints.value
                ? Widget.ProgressBar({
                  className: "notificationProgress",
                  value: Number(notification.hints.value.unpack()) / 100
                }) : Widget.Box()
            ]
          })
        ]
      })
    }),
    Widget.Box({
      children: notification.actions.map(action => Widget.Button({
        child: Widget.Label(action.label),
        onClicked: () => notification.invoke(action.id),
        className: "notificationActionButton",
        hexpand: true,
      }))
    })
  ]
})

export const NotificationReveal = (notification, visible = false) => {
  const secondRevealer = Widget.Revealer({
    child: Notification(notification),
    revealChild: visible,
    transition: "slide_left",
    transition_duration: 200,
    setup: revealer => {
      Utils.timeout(1, () => {
        revealer.reveal_child = true
      })
    }
  })

  const firstRevealer = Widget.Revealer({
    child: secondRevealer,
    revealChild: true,
    transition: "slide_down",
    transition_duration: 200,
  })

  let box

  const destroyWithAnims = () => {
    secondRevealer.revealChild = false
    Utils.timeout(200, () => {
      firstRevealer.revealChild = false
      Utils.timeout(200, () => {
        box.destroy()
      })
    })
  }

  box = Widget.Box({
    hexpand: true,
    hpack: "end",
    attribute: {
      "destroyWithAnims": destroyWithAnims,
      "count": 0
    },
    children: [firstRevealer]
  })
  return box
}

const Popups = () => Widget.Box({
  vertical: true,
  spacing: 5,
  hpack: "end",
  attribute: {
    "map": new Map(),
    "dismiss": (box, id) => {
      if (!box.attribute.map.has(id))
        return

      const notif = box.attribute.map.get(id)
      notif.attribute.count--

      if (notif.attribute.count <= 0) {
        box.attribute.map.delete(id)
        notif.attribute.destroyWithAnims()
      }
    },
    "notify": (box, id) => {
      const notif = Notifications.getNotification(id)
      if (!notif)
        return

      const replace = box.attribute.map.get(id)
      if (!replace) {
        const notification = NotificationReveal(notif)
        box.attribute.map.set(id, notification)
        notification.attribute.count = 1
        box.pack_start(notification, false, false, 0)
      } else {
        const notification = NotificationReveal(notif, true)
        notification.attribute_count = replace.attribute.count + 1
        box.remove(replace)
        replace.destroy()
        box.pack_start(notification, false, false, 0)
        box.attribute.map.set(id, notification)
      }
    },
  }
})
  .hook(Notifications, (box, id) => box.attribute.notify(box, id), "notified")
  .hook(Notifications, (box, id) => box.attribute.dismiss(box, id), "dismissed")
  .hook(Notifications, (box, id) => box.attribute.dismiss(box, id, true), "closed")

const PopupList = () => Widget.Box({
  className: "notificationsPopupList",
  css: "padding: 1px; min-width: 1px",
  children: [
    Popups()
  ]
})

export const NotificationPopup = (monitor) => Widget.Window({
  layer: "overlay",
  name: `popupNotifications${monitor}`,
  monitor: monitor,
  margins: [5, 5],
  className: "popupNotificationsContainer",
  anchor: ["top", "right"],
  child: PopupList()
})
