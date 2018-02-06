import puppeteer from 'puppeteer'

jest.setTimeout(30 * 1000)

const URL = 'http://codingjam.it/'

let browser

const getFirstContentfulPaint = async page => {
  const value = await page.evaluate(() => {
    const firstContentfulPaintEntry = window.performance
            .getEntriesByType('paint')
            .find(entry => entry.name === 'first-contentful-paint')
    return firstContentfulPaintEntry && Math.round(firstContentfulPaintEntry.startTime)
  })

  return value
}

describe('performances', () => {
  test('should have the first contentful paint in less than 2 seconds', async () => {
    const FIRST_PAINT_MAX_VALUE = 2000

    const page = await browser.newPage()

    const client = await page.target().createCDPSession()
    await client.send('Network.clearBrowserCache')

    await page.goto(URL)
    await page.waitForSelector('header')

    const firstContentfulPaint = await getFirstContentfulPaint(page)

    expect(firstContentfulPaint).toBeLessThanOrEqual(FIRST_PAINT_MAX_VALUE)
  })

  test('should have the first contentful paint in less than 10 seconds on a slow network', async () => {
    const FIRST_PAINT_MAX_VALUE = 10000

    const page = await browser.newPage()

    const client = await page.target().createCDPSession()
    await client.send('Network.clearBrowserCache')
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 100,
      downloadThroughput: 750 * 1024,
      uploadThroughput: 200 * 1024,
      connectionType: 'cellular3g'
    })

    await page.goto(URL)
    await page.waitForSelector('header')

    const firstContentfulPaint = await getFirstContentfulPaint(page)

    expect(firstContentfulPaint).toBeLessThanOrEqual(FIRST_PAINT_MAX_VALUE)
  })
})

beforeAll(async () => {
  browser = await puppeteer.launch()
})

afterAll(() => {
  browser.close()
})
