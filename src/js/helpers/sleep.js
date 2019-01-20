export default function (waitTime) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, waitTime)
  })
}
