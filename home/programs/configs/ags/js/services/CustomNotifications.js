import { Service, Utils, Notifications, Variable } from "../imports.js";

class NotificationsService extends Service {
  static {
    Service.register(
      this,
      {
      },
      {
        'notificationsLength': ['int', 'rw']
      }
    )
  }

  #notificationsLength = new Variable(0)
  get notificationsLength() {
    return this.#notificationsLength
  }

  constructor() {
    super()

    this.#notificationsLength.connect('changed', () => this.changed('notificationsLength'))

    this.onChange()
  }



}

const service = new NotificationsService

export default service
