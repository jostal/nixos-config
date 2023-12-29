import { Widget, Utils, Notifications } from "../../imports.js";
import { NotificationReveal } from "../../misc/Notification.js"

const NotificationList = () => Widget.Box({
  vertical: true,
  hpack: "end",
  spacing: 5,
  setup: box => {
    Utils.timeout(1000, () => {
      Notifications.notifications.forEach(notif => {
        box.attribute.onAdded(box, notif.id)
      })
    })
  },
  attribute: {
    "notifications": new Map(),
    "onAdded": (box, id) => {
      const notif = Notifications.getNotification(id)
      if (!notif)
        return

      const replace = box.attribute.notifications.get(id)

      if (replace)
        replace.destroy()

      const notification = NotificationReveal(notif, !!replace)
      box.attribute.notifications.set(id, notification)
      box.pack_start(notification, false, false, 0)
    },
    "onRemoved": (box, id) => {
      if (!box.attribute.notifications.has(id))
        return

      box.attribute.notifications.get(id).attribute.destroyWithAnims()
      box.attribute.notifications.delete(id)
    }
  }
})
  .hook(Notifications, (box, id) => box.attribute.onAdded(box, id), "notified")
  .hook(Notifications, (box, id) => box.attribute.onRemoved(box, id), "closed")

export default NotificationList
