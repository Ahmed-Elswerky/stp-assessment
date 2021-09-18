function colorChange (e) {
  e.preventDefault()
  let col = e.target.children[1].value.match(/[a-zA-Z1-9]/g).join('')
  document.getElementById('style').innerHTML = ` *{color:${col} !important;}`
}
let interv = false
function counter (e) {
  e.preventDefault()

  if (interv != false) clearInterval(interv)

  let time = document.getElementById('time'),
    time1 = document.getElementById('time1'),
    start = {
      hour: Number(time?.value?.split(':')[0]),
      min: Number(time?.value?.split(':')[1])
    },
    end = {
      hour: Number(time1?.value?.split(':')[0]),
      min: Number(time1?.value?.split(':')[1])
    },
    counterDiv = document.getElementById('counter'),
    countDown =
      (end.hour - start.hour) * 60 * 60 +
      (Math.max(end.min, start.min) - Math.min(end.min, start.min)) * 60

  if (end.hour < start.hour || (end.hour == start.hour && end.min < start.min))
    counterDiv.innerHTML = 'Please Select the End time to be after Start time'
  else counterDiv.innerHTML = 'The timer will begin in the selected start time'

  interv = setInterval(() => {
    if (
      new Date().getHours() >= start.hour &&
      new Date().getMinutes() >= start.min
    ) {
      counterDiv.innerHTML = `${get(countDown,'h')} : ${get(countDown,'m')} : ${get(countDown,'s')}`

      countDown--

      if (countDown <= 0) {
        clearInterval(interv)
        counterDiv.innerHTML = 'Time counter has reached the target time'
      }
    }
  }, 1000)
}

function get (s, t) {
  if (t == 'h') return Math.floor(s / 60 / 60)
  if (t == 'm') return Math.floor((s - get(s,'h')*60*60)/60)
  if (t == 's')
    return (
      s - get(s,'h')*60*60 - get(s,'m')*60
    )
}
