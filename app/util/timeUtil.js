function formatTime(i) {
  return i > 10 ? i : '0' + i
}

function extractTime(dateToFormat) {
  let day = dateToFormat.getDay()
  let month = dateToFormat.getMonth()
  let year = dateToFormat.getFullYear()

  let hour = dateToFormat.getHours()
  let minute = dateToFormat.getMinutes()

  minute = formatTime(minute)

  return {date: `${day}/${month}/${year}`, time: `${hour}:${minute}`}
}

function compareTimes(timeA, timeB) {
  if (timeA < timeB) return 1
  if (timeA > timeB) return -1
  return 0
}

module.exports = {
  extractTime: extractTime,
  compareTimes: compareTimes
}
