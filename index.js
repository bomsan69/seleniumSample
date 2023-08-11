const { Builder, By, Key, until } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');


const main= async ()=>{

    const Options = new Chrome.Options();

    const driver = await new Builder()
    .forBrowser('chrome')    
    .setChromeOptions(Options.addArguments("--disable-gpu", "window-size=1920x1080","lang=utf-8"))
    .build();


    try {

        await driver.get('https://finance.naver.com/marketindex/');

        await driver.sleep(3000)

        const title = await driver.findElement(By.className('h_calculator'));
        const deltaY = (await title.getRect()).y

        await driver.actions()
        .scroll(0, 0, 0, deltaY)
        .perform()

        await driver.sleep(3000)

        const input = await driver.findElement(By.id('input_from_money'));
        await input.clear();
        await input.sendKeys('1000');
        await input.sendKeys(Key.UP);

        await driver.sleep(5000)

        const result = await driver.findElement(By.id('input_to_money'));

        console.log(await result.getAttribute('value'));

              

        
    } catch (error) {

        console.log(error);
        
    }finally{
        await driver.quit();
    }


    
}

main()