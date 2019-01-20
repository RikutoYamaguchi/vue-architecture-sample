export default function (key) {
  if (window.$app && window.$app[key]) {
    return window.$app[key]
  }

  return undefined
}
