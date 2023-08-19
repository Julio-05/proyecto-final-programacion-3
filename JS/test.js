// test_login.js
const { Builder, By, until } = require('selenium-webdriver');
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

        // Tomar captura de pantalla antes de ingresar las credenciales
        await takeScreenshot(driver, 'screenshot_inicio_sesion.png');
        await driver.sleep(1000);
        // Iniciar sesión con credenciales válidas
        const usernameInput = await driver.findElement(By.name('username'));
        const passwordInput = await driver.findElement(By.name('password'));
        const loginButton = await driver.findElement(By.name('login-button'));

        await usernameInput.sendKeys('admin');
        await passwordInput.sendKeys('1234');
        await driver.sleep(1000);

        // Tomar otra captura de pantalla con las credenciales ingresadas
        await takeScreenshot(driver, 'screenshot_credenciales_ingresadas.png');

        // Hacer clic en el botón de inicio de sesión
        await loginButton.click();
        await driver.sleep(1000);
        // Esperar a que se redireccione a la página correcta después de iniciar sesión
        await driver.wait(until.titleIs('Inicio-venta-de-ropa'), 20000); 

        // Tomar captura de pantalla después de iniciar sesión exitosamente
        await takeScreenshot(driver, 'screenshot_inicio_html.png');
        console.log('Prueba de Iniciar Sesión con Credenciales Correctas: Exitosa');
        //producto//
        await driver.get('http://127.0.0.1:5500/producto.html');
        await driver.sleep(1000);
        await takeScreenshot(driver, 'screenshot_pagina_producto.png');
        console.log('Prueba de ingresar a Producto: Exitosa');
        //agregar carrito//
         // Hacer clic en el botón "Agregar Carrito" del primer producto
         const agregarCarritoBtn = await driver.findElement(By.css('.product .agregar-carrito'));
         await agregarCarritoBtn.click();
         await driver.sleep(1000);
 
         // Pasar el mouse por encima del icono del carrito
         const carritoIcono = await driver.findElement(By.id('img-carrito'));
         await driver.actions().move({ origin: carritoIcono }).perform();
         await driver.sleep(2000); // Esperar unos segundos para que puedas ver el carrito
 
         // Tomar una captura de pantalla del carrito para verificar el resultado
         await takeScreenshot(driver, 'screenshot_carrito.png');
 
         // Verificar si el producto se agregó al carrito
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
