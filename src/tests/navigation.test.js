import puppeteer from 'puppeteer'

jest.setTimeout(30 * 1000)

const URL = 'http://codingjam.it/'
const POST_LINK_SELECTOR = '.entry-title a'
const POST_TITLE_SELECTOR = 'div.post-title'

let browser

describe('navigation', () => {
  test(`navigation should work`, async () => {
    const page = await browser.newPage()
    await page.goto(URL)
    const href = await page.$eval(POST_LINK_SELECTOR, el => el.href)
    await page.click(POST_LINK_SELECTOR)
    await page.waitForSelector(POST_TITLE_SELECTOR)
    expect(page.url()).toBe(href)
    await page.close()
  })
})

beforeAll(async () => {
  browser = await puppeteer.launch()
})

afterAll(() => {
  browser.close()
})
