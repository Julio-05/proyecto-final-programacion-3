const { Builder, By, until } = require('selenium-webdriver');
const { ExpectedConditions } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function takeScreenshot(driver, filename) {
    const screenshotData = await driver.takeScreenshot();
    const screenshotPath = `screenshots/${filename}`;
    fs.writeFileSync(screenshotPath, screenshotData, 'base64');
    console.log(`Captura de pantalla guardada como: ${screenshotPath}`);
}

async function runTest() {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Abrir la página de inicio de sesión
        await driver.get('http://127.0.0.1:5500/login.html');

        await takeScreenshot(driver, 'screenshot_inicio_sesion.png');
        await driver.sleep(1000);
        // Iniciar sesión con credenciales válidas
        const usernameInput = await driver.findElement(By.name('username'));
        const passwordInput = await driver.findElement(By.name('password'));
        const loginButton = await driver.findElement(By.name('login-button'));

        await usernameInput.sendKeys('admin');
        await passwordInput.sendKeys('1234');
        await driver.sleep(1000);

        await takeScreenshot(driver, 'screenshot_credenciales_ingresadas.png');

        await loginButton.click();
        await driver.sleep(1000);
        await driver.wait(until.titleIs('Inicio-venta-de-ropa'), 20000); 

        await takeScreenshot(driver, 'screenshot_inicio_html.png');
        console.log('Prueba de Iniciar Sesión con Credenciales Correctas: Exitosa');
        //contacto
        await driver.get('http://127.0.0.1:5500/contacto.html');
        await driver.sleep(1000);
        await takeScreenshot(driver, 'screenshot_pagina_contacto.png');
        
        //producto//
        await driver.get('http://127.0.0.1:5500/producto.html');
        await driver.sleep(1000);
        await takeScreenshot(driver, 'screenshot_pagina_producto.png');
        console.log('Prueba de ingresar a Producto: Exitosa');
        //agregar carrito//
         const agregarCarritoBtn = await driver.findElement(By.css('.product .agregar-carrito'));
        await agregarCarritoBtn.click();
        await driver.sleep(1000);

        // Pasar el mouse por encima del icono del carrito
        const carritoIcono = await driver.findElement(By.id('img-carrito'));
        await driver.actions().move({ origin: carritoIcono }).perform();
        await driver.sleep(2000);

   
        await takeScreenshot(driver, 'screenshot_carrito_con_producto.png');

        const listaCarrito = await driver.findElement(By.id('lista-carrito'));
        const productosEnCarrito = await listaCarrito.findElements(By.tagName('tr'));

        if (productosEnCarrito.length === 1) {
            console.log('Prueba de Agregar al Carrito: Exitosa');
        } else {
            console.log('Prueba de Agregar al Carrito: Fallida');
        }
        
        // Cerrar sesión
        await driver.get('http://127.0.0.1:5500/cerrar_sesion.html');
        await driver.sleep(1000);
        await takeScreenshot(driver, 'screenshot_cierre_seccion.png');
        console.log('Prueba de Cerrar Sesión: Exitosa');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

runTest();
