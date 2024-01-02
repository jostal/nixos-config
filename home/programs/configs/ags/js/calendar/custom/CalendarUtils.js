import { CalState } from "./Calendar.js"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate()
}

function getWeek(date) {
  let dt = new Date(date)
  let thisDay = dt.getDate()
  let newDate = dt
  newDate.setDate(1)
  let digit = newDate.getDay()
  let Q = (thisDay + digit) / 7
  let R = (thisDay + digit) % 7
  if (R !== 0) return Math.ceil(Q)
  else return Q
}

function getDaysByWeek(date) {
  const numDays = getDaysInMonth(date.month, date.year)

  let monthWeeks = []

  Array(numDays).fill(null).forEach((_, i) => {
    const weekdayNum = new Date(date.year, date.month - 1, i + 1).getDay()
    const weekInd = getWeek(new Date(date.year, date.month - 1, i + 1)) - 1

    if (!monthWeeks[weekInd]) {
      monthWeeks[weekInd] = {
        weekIndex: weekInd,
        days: [],
      }
    }

    if (i === 0 && weekdayNum > 0) {
      const lastMonthDay = new Date(date.year, date.month - 1, 0).getDate()
      for (let j = 0; j < weekdayNum; j++) {
        monthWeeks[weekInd].days.push({
          weekdayIndex: weekdayNum - (j + 1),
          day: lastMonthDay - weekdayNum + (j + 1),
          isCurrentMonth: false
        })
      }
    }

    monthWeeks[weekInd].days.push({
      weekdayIndex: weekdayNum,
      day: i + 1,
      isCurrentMonth: true,
      isToday: (i + 1) === CalState.currentDate.day
    })

    if (i === numDays - 1 && weekdayNum < 6) {
      const monthFinalDay = new Date(date.year, date.month - 1, numDays).getDay()
      for (let j = 0; j < 6 - monthFinalDay; j++) {
        monthWeeks[weekInd].days.push({
          weekdayIndex: weekdayNum + (j + 1),
          day: j + 1,
          isCurrentMonth: false
        })
      }
    }
  })

  return monthWeeks
}

function getDate() {
  const curDate = new Date()
  return {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    day: curDate.getDate()
  }
}

function getMonthString(monthNum) {
  return months[monthNum - 1]
}

export {
  getDaysInMonth,
  getDaysByWeek,
  getDate,
  getMonthString,
  weekdays
}
