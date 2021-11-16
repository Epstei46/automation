const {Builder, Capabilities, By} = require("selenium-webdriver")

require("chromedriver")

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get("http://localhost:5500/movieList/index.html")
})

afterAll(async () => {
    await driver.quit()
})

let testMovie = "Spaceballs"

test("Add a movie to the page", async () => {
    let inputField = await driver.findElement(By.css("input"))
    inputField.sendKeys(testMovie)
    let addButton = await driver.findElement(By.css("button"))
    addButton.click()
    await driver.sleep(2000)
})
test("Confirm the saved movie says the right thing", async () => {
    let testSpanText = await driver.findElement(By.css("span")).getText()
    expect(testMovie).toEqual(testSpanText)
})
test("Click on created movie to grey it out", async () => {
    let testSpan = await driver.findElement(By.xpath(`//*[contains(text(), '${testMovie}')]`))
    testSpan.click()
    await driver.sleep(2000)
})
test("Click on created movie to delete it", async () => {
    let testSpan = await driver.findElement(By.xpath(`//*[contains(text(), 'x')]`))
    testSpan.click()
    await driver.sleep(2000)
})