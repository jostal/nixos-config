
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
  let monthStart = new Date(date)
  monthStart.setDate(0)
  let offset = (monthStart.getDay() + 1) % 7 - 1
  return Math.ceil((date.getDate() + offset) / 7)
}

function getDaysByWeek(date) {
  const numDays = getDaysInMonth(date.month, date.year)

  let monthWeeks = []
  let monthDays = []

  Array(numDays).fill(null).forEach((_, i) => {
    const weekdayNum = new Date(date.year, date.month - 1, i + 1).getDay()
    const weekInd = getWeek(new Date(date.year, date.month - 1, i + 1)) - 1

    if (!monthWeeks[weekInd]) {
      monthWeeks[weekInd] = {
        weekIndex: weekInd,
        days: []
      }
    }

    monthWeeks[weekInd].days.push({
      weekdayIndex: weekdayNum,
      day: i + 1
    })

    monthDays.push({
      weekdayIndex: weekdayNum,
      day: i + 1,
      weekIndex: weekInd
    })
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
