const devices = require('./devices')
const report = require('./report')

const run = async () => {
  await report()
  await devices()
}

try {
  run()
} catch (e) {
  console.error('Error in getting screenshots: ' + e.message)
}
