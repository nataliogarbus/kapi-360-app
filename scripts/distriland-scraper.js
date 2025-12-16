const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('🚀 Iniciando scraper de Distriland...');

    const browser = await puppeteer.launch({
        headless: false, // Ver el navegador ayuda a debuggear y a veces evita bloqueos
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    const url = 'https://www.distriland.com.ar/productos/';

    console.log(`🌐 Navegando a: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Función para hacer scroll automático
    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    // Si llegamos al final, o si pasaron muchos scrolls, podríamos parar.
                    // Aquí confiamos en que el usuario lo parará o definimos un límite.
                    // Para este script, vamos a scrollear hasta que no crezca más la altura o por un tiempo fijo.
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        // Try to find a "Load More" button if it exists
                        // but usually infinite scroll handle it.
                        // clearInterval(timer);
                        // resolve();
                    }
                }, 100);

                // Freno de emergencia o límite: parar después de X tiempo (ej: 30 segundos de scroll)
                setTimeout(() => {
                    clearInterval(timer);
                    resolve();
                }, 30000); // 30 segundos de scroll continuo
            });
        });
    }

    console.log('⬇️ Scrolleando para cargar productos (esto tomará unos 30 segundos)...');
    await autoScroll(page);

    // Esperar un poco más por si acaso
    await new Promise(r => setTimeout(r, 5000));

    console.log('📦 Extrayendo productos...');
    const products = await page.evaluate(() => {
        // Ajustar estos selectores según la estructura real de Distriland
        // Basado en lo que vio el agente: Texto del nombre y luego el precio con $
        // Buscamos contenedores de productos.
        // Como no tenemos el selector exacto, vamos a intentar una estrategia genérica 
        // buscando elementos que contengan "$" y tengan texto cerca.

        // ESTRATEGIA: Buscar nodos que parezcan items de producto
        const items = [];

        // Intentamos encontrar cards de productos comunes
        // Muchos sitios usan .product-item, .item, .card, etc.
        // Si no, buscamos por precio.

        // Selector Genérico Probabilístico
        const potentialPrices = Array.from(document.querySelectorAll('*'))
            .filter(el => el.innerText && el.innerText.includes('$') && el.innerText.length < 20);

        potentialPrices.forEach(priceEl => {
            // El nombre suele estar en un hermano anterior o un padre cercano
            // Navegamos hacia arriba para encontrar el contenedor del producto
            let container = priceEl.parentElement;
            let name = '';
            let loopCount = 0;

            while (container && loopCount < 3) {
                // Buscamos un elemento de texto largo que no sea el precio
                const texts = container.innerText.split('\n').filter(t => t.trim().length > 5 && !t.includes('$'));
                if (texts.length > 0) {
                    name = texts[0];
                    break;
                }
                container = container.parentElement;
                loopCount++;
            }

            if (name && priceEl.innerText) {
                items.push({
                    name: name.trim(),
                    price: priceEl.innerText.trim()
                });
            }
        });

        // Deduplicar por nombre
        const uniqueItems = [];
        const seen = new Set();
        items.forEach(item => {
            if (!seen.has(item.name)) {
                seen.add(item.name);
                uniqueItems.push(item);
            }
        });

        return uniqueItems;
    });

    console.log(`✅ Se encontraron ${products.length} productos.`);

    // Guardar en CSV
    const csvContent = "Nombre,Precio\n" + products.map(p => `"${p.name.replace(/"/g, '""')}","${p.price}"`).join("\n");
    const filePath = path.join(__dirname, '..', 'distriland_productos.csv');

    fs.writeFileSync(filePath, csvContent);
    console.log(`💾 Guardado en: ${filePath}`);

    await browser.close();
})();
