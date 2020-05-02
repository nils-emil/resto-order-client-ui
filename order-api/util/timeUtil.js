function formatTime(i) {
  return i > 10 ? i : '0' + i
}

function extractTime(dateTime) {
  let date = dateTime.toLocaleDateString('en-GB')
  let time = dateTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
  return {date: date, time: time}
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
