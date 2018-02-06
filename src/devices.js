const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const path = require('path')

const URL = 'http://codingjam.it/'

const screenshotsPath = path.join(__dirname, '..', 'screenshosts')

module.exports = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  for (let index = 0; index < devices.length; index++) {
    const device = devices[index]
    try {
      await page.emulate(device)
      await page.goto(URL)
      await page.screenshot({
        path: path.join(screenshotsPath, `${device.name}.png`)
      })
    } catch (e) {
      console.error(`Error in creating screenshot for ${device.name}: ${e.message}`)
    }
  }
  await page.close()
  await browser.close()
}
