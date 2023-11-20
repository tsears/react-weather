function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${hour % 12}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'AM' : 'PM'}`
}

// function blah () {
//
//   let value = (k == 'sunset' || k == 'sunrise')
//     ? formatDate(currentWeather[k])
//     : currentWeather[k]
//
// }
