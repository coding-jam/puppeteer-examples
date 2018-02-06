const puppeteer = require('puppeteer')
const path = require('path')

const pdfPath = path.join(__dirname, '..', 'pdf')
const TOTAL_PAGES = 11

module.exports = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    try {
      const url = `http://codingjam.it/page/${i}/?s=javascript`
      await page.goto(url)
      /*
        To use screen media type just add this instruction
        await page.emulateMedia('screen')
      */
      await page.pdf({
        path: path.join(pdfPath, `page_${i}.pdf`)
      })
    } catch (e) {
      console.error(`Error in converting page ${i}: ${e.message}`)
    }
  }
  await page.close()
  await browser.close()
}
