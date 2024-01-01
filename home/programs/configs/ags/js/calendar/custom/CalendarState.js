import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import Service from "resource:///com/github/Aylur/ags/service.js"
import { getDate } from "./CalendarUtils.js";

class CalendarState extends Variable {
  static {
    Service.register(this, {}, {})
  }

  currentDate = {
    year: null,
    month: null,
    day: null
  }

  navDate = {
    year: null,
    month: null,
    day: null
  }

  constructor(value) {
    super(value)
    this.currentDate = getDate()
    this.navDate = getDate()
  }

}

export default CalendarState
