document.addEventListener('DOMContentLoaded', function() {
    // Particles.js initialization
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": {"value": 40, "density": {"enable": true, "value_area": 800}}, "color": {"value": "#ffffff"}, "shape": {"type": "circle"}, "opacity": {"value": 0.3, "random": false, "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}}, "size": {"value": 2, "random": true}, "line_linked": {"enable": true, "distance": 150, "color": "#4A4A4A", "opacity": 0.2, "width": 1}, "move": {"enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false}},
            "interactivity": { "detect_on": "window", "events": {"onhover": {"enable": false, "mode": "repulse"}, "onclick": {"enable": false}, "resize": true}, "modes": {"grab": {"distance": 140, "line_linked": {"opacity": 0.5}}}},
            "retina_detect": true
        });
    }

    // --- Lógica del Formulario de Modos de Análisis ---
    function setupAnalysisModeRadio() {
        const modeSelectors = document.querySelectorAll('input[name="analysis_mode"]');
        const customWrapper = document.getElementById('custom-options-wrapper');
        const manualWrapper = document.getElementById('manual-options-wrapper');
        const consultaWrapper = document.getElementById('consulta-options-wrapper');
        const mainActionGroup = document.querySelector('.main-action-group'); // Adaptado al nuevo HTML
        const mainInput = document.getElementById('main-input');

        // Genera dinámicamente las opciones de checkbox para el modo 'Personalizado'
        const options = {
            'Mercado y Competencia': 'Análisis SEO y de la competencia.',
            'Plataforma y UX': 'Rendimiento y experiencia de usuario.',
            'Contenido y Redes': 'Auditoría de contenido y social media.',
            'Crecimiento e IA': 'Generación de leads y oportunidades.'
        };
        customWrapper.innerHTML = Object.entries(options).map(([title, desc], index) => `
            <div>
                <input type="checkbox" id="enfoque${index+1}" name="enfoques" value="${title}" class="enfoque-checkbox-input">
                <label for="enfoque${index+1}" class="enfoque-checkbox-label" data-tooltip="${desc}">
                    <span class="enfoque-title">${title}</span>
                    <span class="enfoque-desc">${desc}</span>
                </label>
            </div>
        `).join('');

        // Añade el listener para manejar la lógica de cambio de modo
        modeSelectors.forEach(selector => {
            selector.addEventListener('change', function() {
                // --- Lógica de Estilos (del nuevo boceto) ---
                document.querySelectorAll('.mode-selector-label').forEach(label => {
                    label.classList.remove('selected');
                });
                if (this.nextElementSibling && this.nextElementSibling.tagName === 'LABEL') {
                    this.nextElementSibling.classList.add('selected');
                }

                // --- Lógica Funcional (adaptada a la nueva estructura) ---
                customWrapper.classList.add('hidden');
                manualWrapper.classList.add('hidden');
                consultaWrapper.classList.add('hidden');
                if (mainActionGroup) mainActionGroup.style.visibility = 'visible';
                
                mainInput.placeholder = "Ingresa tu URL de sitio web";

                if (this.value === 'custom') {
                    customWrapper.classList.remove('hidden');
                }
                if (this.value === 'manual') {
                    if (mainActionGroup) mainActionGroup.style.visibility = 'hidden';
                    manualWrapper.classList.remove('hidden');
                }
                if (this.value === 'consulta') {
                    if (mainActionGroup) mainActionGroup.style.visibility = 'hidden';
                    consultaWrapper.classList.remove('hidden');
                }
            });
        });
    }
    setupAnalysisModeRadio();

    // --- Lógica del Acordeón de FAQ ---
    function setupFaqAccordion() {
        const faqData = [
            {
                category: "Nuestras Soluciones y Resultados",
                questions: [
                    { q: "¿Cómo puede Kapi potenciar mi negocio con IA y datos?", a: "Kapi no solo usa IA, la convierte en tu motor de crecimiento. Implementamos soluciones para automatizar marketing, predecir qué clientes comprarán, y optimizar tus costos operativos. En resumen: no te damos una herramienta, te entregamos un plan de acción para aumentar tu rentabilidad." },
                    { q: "Tengo muchos datos, ¿cómo los transforman en ventas?", a: "Esa es nuestra especialidad. Convertimos tu ‘mina de oro’ de datos en una máquina de ventas. Mediante Business Intelligence, identificamos los patrones de compra de tus mejores clientes, creamos dashboards para visualizar oportunidades en tiempo real y te damos la claridad para enfocar tus esfuerzos comerciales donde realmente importa." },
                ]
            },
            {
                category: "El Informe y Nuestro Proceso",
                questions: [
                    { q: "¿Qué recibo exactamente en el «Informe Ejecutivo Confidencial»?", a: "Recibirás un análisis conciso y visual de la presencia online de tu empresa, identificando puntos ciegos, oportunidades de optimización y una comparación inicial con tus competidores. Es el punto de partida para una conversación estratégica más profunda." },
                    { q: "Ya tengo mi informe, ¿cuál es el siguiente paso?", a: "El informe es el diagnóstico; el primer paso hacia la claridad. El siguiente paso es crear el plan de acción. Te invitamos a agendar tu «Consultoría Estratégica Gratuita», una sesión sin costo con nuestros expertos donde analizaremos juntos los hallazgos y definiremos los 3 puntos de mayor impacto para potenciar tu negocio." },
                ]
            },
            {
                category: "Modelo de Trabajo y Confidencialidad",
                questions: [
                     { q: "Si ya tengo un equipo de marketing o IT, ¿cómo se integran?", a: "Perfecto. No venimos a reemplazar, sino a potenciar. Podemos actuar como líderes estratégicos para tu equipo actual, o integrarnos como un «squad» especializado en datos para acelerar proyectos específicos. Somos flexibles y nos adaptamos a tu estructura." },
                     { q: "¿Cómo garantizan la confidencialidad de mis datos?", a: "La seguridad es nuestra máxima prioridad. Operamos bajo estrictos acuerdos de confidencialidad (NDA) y utilizamos protocolos de encriptación de nivel bancario. Tus datos solo se utilizan para generar tu informe y nunca se comparten con terceros." }
                ]
            },
            { 
                category: "Reuniones, Soporte y Alianzas",
                questions: [
                    { q: "¿Cómo son las reuniones? ¿Presenciales o virtuales?", a: "Ambas. Nos adaptamos a tu comodidad. Realizamos reuniones virtuales para mayor agilidad y, si te encuentras en Buenos Aires, estamos encantados de coordinar reuniones presenciales en nuestras oficinas o las tuyas para profundizar en la estrategia." },
                    { q: "¿Brindan soporte humano durante el proyecto?", a: "Totalmente. La tecnología es nuestra herramienta, pero nuestro valor está en el talento humano. Cada proyecto es liderado por un estratega de Kapi que trabaja codo a codo contigo. Tendrás reuniones periódicas, soporte directo y un socio estratégico, no solo un dashboard." },
                    { q: "¿Tienen un programa de socios para referir clientes?", a: "Sí. Nuestro Programa de Socios está diseñado para consultores, agencias y profesionales que deseen ofrecer nuestras soluciones de alto impacto a sus clientes a cambio de una comisión. Es una oportunidad para generar ingresos y aportar un valor diferencial a tu propia cartera. Contáctanos indicando tu interés en el 'Programa de Socios' para conocer más." }
                ]
            }
        ];

        const faqContainer = document.querySelector('#faq .space-y-8');
        if (faqContainer) {
            faqContainer.innerHTML = faqData.map(cat => `
                <div class="faq-category">
                    <h3 class="faq-category-title text-2xl font-bold text-white mb-4 border-b-2 border-gray-700 pb-2 flex justify-between items-center">
                        <span>${cat.category}</span>
                        <span class="faq-icon text-2xl text-gray-400">&plus;</span>
                    </h3>
                    <div class="faq-category-content space-y-4 pl-4">
                        ${cat.questions.map(item => `
                            <div class="faq-question-container bg-gray-800/50 p-6 rounded-lg">
                                <div class="faq-question flex justify-between items-center">
                                    <h4 class="text-lg font-semibold text-white">${item.q}</h4>
                                    <span class="faq-icon text-2xl text-gray-400">&plus;</span>
                                </div>
                                <div class="faq-answer pt-4"><p class="text-gray-300">${item.a}</p></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            const faqCategories = document.querySelectorAll('.faq-category');
            faqCategories.forEach(category => {
                const title = category.querySelector('.faq-category-title');
                const content = category.querySelector('.faq-category-content');
                title.addEventListener('click', () => {
                    const isOpen = category.classList.contains('open');
                    faqCategories.forEach(c => { c.classList.remove('open'); c.querySelector('.faq-category-content').style.maxHeight = null; });
                    if (!isOpen) {
                        category.classList.add('open');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
                const questions = category.querySelectorAll('.faq-question-container');
                questions.forEach(qContainer => {
                    const question = qContainer.querySelector('.faq-question');
                    const answer = qContainer.querySelector('.faq-answer');
                    question.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isQOpen = qContainer.classList.contains('open');
                        questions.forEach(qc => { qc.classList.remove('open'); qc.querySelector('.faq-answer').style.maxHeight = null; });
                        if (!isQOpen) {
                            qContainer.classList.add('open');
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        }
                        setTimeout(() => { if (category.classList.contains('open')) content.style.maxHeight = content.scrollHeight + 'px'; }, 500);
                    });
                });
            });
        }
    }
    setupFaqAccordion();

    // --- Lógica de Animación por Scroll ---
    function setupScrollAnimation() {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-on-scroll').forEach(elem => scrollObserver.observe(elem));
    }
    setupScrollAnimation();

    // --- Lógica Principal del Informe y Navegación ---
    function setupReportLogic() {
        // --- State Management ---
        let reportData = null; // Almacenará los datos del informe una vez cargados

        // --- Elementos del DOM ---
        const heroSection = document.getElementById('hero-section');
        const resultsSection = document.getElementById('report-results');
        const registrationSection = document.getElementById('registration-section');
        const dashboardSection = document.getElementById('dashboard-section');
        const loader = document.getElementById('report-loader');
        const reportDataContainer = document.getElementById('report-data');
        const mainForm = document.getElementById('diagnosticoForm');
        const registrationForm = document.getElementById('registration-form');
        const unlockButton = document.getElementById('unlock-map-button');
        const backToReportButton = document.getElementById('back-to-report-button');
        const intelligencePanel = document.getElementById('intelligence-panel');
        const closePanelButton = document.getElementById('close-panel-button');
        const panelTitle = document.getElementById('panel-title');
        const panelContent = document.getElementById('panel-content');
        const actionPlanContainer = document.getElementById('action-plan-container');

        // --- Renderizado FASE 1: Informe Resumido ---
        function renderReport(data) {
            const reportUrlElement = document.getElementById('report-url');
            const scoreValueElement = document.getElementById('compass-score-value');
            const rutasContainer = document.getElementById('rutas-optimas-container');

            if(rutasContainer) rutasContainer.innerHTML = '';
            reportUrlElement.textContent = `Análisis de ${data.clientUrl}`;

            data.rutas.forEach(ruta => {
                const scoreColor = ruta.score > 80 ? 'text-green-400' : (ruta.score > 60 ? 'text-yellow-400' : 'text-red-400');
                const coordenadasHtml = ruta.coordenadas.map(coord => {
                    const coordStatusColor = coord.status === 'Crítico' ? 'text-red-400' : (coord.status === 'Mejorable' ? 'text-yellow-400' : 'text-green-400');
                    return `<div class="flex justify-between items-center text-sm py-2 border-b border-gray-700/50"><span class="text-gray-300" data-tooltip="${coord.what_is_it}">${coord.title}</span><span class="font-semibold ${coordStatusColor}">${coord.score}</span></div>`;
                }).join('');
                const cardHtml = `<div class="bg-gray-800/50 p-6 rounded-2xl card-hover-effect flex flex-col h-full"><div class="flex justify-between items-start mb-4"><h3 class="text-lg font-bold text-white">${ruta.title}</h3><span class="text-2xl font-bold ${scoreColor}">${ruta.score}<span class="text-base text-gray-400">/100</span></span></div><div class="space-y-1">${coordenadasHtml}</div></div>`;
                if(rutasContainer) rutasContainer.innerHTML += cardHtml;
            });

            const score = data.generalScore;
            scoreValueElement.textContent = score;
            const chartCtx = document.getElementById('strategicCompassChart').getContext('2d');
            if (window.myCompassChart) window.myCompassChart.destroy();
            window.myCompassChart = new Chart(chartCtx, {
                type: 'doughnut',
                data: { datasets: [{ data: [score, 100 - score], backgroundColor: ['#00DD82', '#374151'], borderColor: 'transparent', borderWidth: 0 }] },
                options: { cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { animateScale: true, duration: 1500 } }
            });
        }

        // --- Renderizado FASE 3: Dashboard Completo (Acordeón) ---
        function renderDashboard(data) {
            const container = document.getElementById('action-plan-container');
            const dashboardUrl = document.getElementById('dashboard-url');
            if (!container || !data) return;

            dashboardUrl.textContent = `Análisis de ${data.clientUrl}`;
            container.innerHTML = data.rutas.map(ruta => {
                const scoreColor = ruta.score > 80 ? 'text-green-400' : (ruta.score > 60 ? 'text-yellow-400' : 'text-red-400');
                const coordenadasHtml = ruta.coordenadas.map((coord, index) => {
                    const solutions = coord.soluciones || { diy: {}, con_kapi: {}, kapi_lo_hace: {} };
                    return `
                        <div class="py-4 border-t border-gray-700">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="md:col-span-2">
                                    <h4 class="font-semibold text-white cursor-pointer" data-coord-id="${coord.id}">${coord.title} (${coord.score})</h4>
                                    <p class="text-sm text-gray-400 mt-1">${coord.why_it_matters}</p>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="w-24 h-24 relative">
                                        <canvas id="sub-kpi-chart-${coord.id}"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="solution-tabs" data-coord-id="${coord.id}">
                                    <button class="tab-button active" data-tab="diy">Lo hago yo</button>
                                    <button class="tab-button" data-tab="con_kapi">Lo hago con Kapi</button>
                                    <button class="tab-button" data-tab="kapi_lo_hace">Lo hace Kapi</button>
                                </div>
                                <div class="solution-content text-sm text-gray-300 space-y-2 py-4">
                                    <div id="tab-content-${coord.id}-diy" class="tab-content active"><p>${solutions.diy?.content || 'No disponible.'}</p></div>
                                    <div id="tab-content-${coord.id}-con_kapi" class="tab-content"><p>${solutions.con_kapi?.content || 'No disponible.'}</p></div>
                                    <div id="tab-content-${coord.id}-kapi_lo_hace" class="tab-content"><p>${solutions.kapi_lo_hace?.content || 'No disponible.'}</p></div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                return `
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="text-xl font-bold text-white">${ruta.title}</h3>
                            <div class="flex items-center gap-4">
                                <span class="text-2xl font-bold ${scoreColor}">${ruta.score}<span class="text-base text-gray-400">/100</span></span>
                                <svg class="accordion-arrow w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                        <div class="accordion-content">
                            ${coordenadasHtml}
                        </div>
                    </div>
                `;
            }).join('');

            // --- Lógica para crear los Gráficos ---
            data.rutas.forEach(ruta => {
                ruta.coordenadas.forEach(coord => {
                    const chartEl = document.getElementById(`sub-kpi-chart-${coord.id}`);
                    if (chartEl && coord.sub_kpis) {
                        const ctx = chartEl.getContext('2d');
                        new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: coord.sub_kpis.map(kpi => kpi.label),
                                datasets: [{
                                    data: coord.sub_kpis.map(kpi => kpi.value),
                                    backgroundColor: ['#00DD82', '#0057FF', '#4A4A4A', '#E5E7EB'].slice(0, coord.sub_kpis.length),
                                    borderColor: 'transparent',
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                cutout: '70%',
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: false }
                                }
                            }
                        });
                    }
                });
            });

            // --- Lógica del Acordeón y Pestañas ---
            container.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.parentElement;
                    item.classList.toggle('open');
                });
            });

            container.querySelectorAll('.solution-tabs').forEach(tabGroup => {
                tabGroup.addEventListener('click', (e) => {
                    if (!e.target.matches('.tab-button')) return;
                    const button = e.target;
                    const coordId = tabGroup.dataset.coordId;
                    const tabId = button.dataset.tab;

                    tabGroup.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const contentContainer = tabGroup.nextElementSibling;
                    contentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                    contentContainer.querySelector(`#tab-content-${coordId}-${tabId}`).classList.add('active');
                });
            });
        }

        // --- Renderizado FASE 3: Plan de Acción Recomendado ---
        function renderRecommendedActionPlan(data) {
            const container = document.getElementById('recommended-action-plan-list');
            if (!container || !data || !data.rutas) return;

            const allCoordenadas = data.rutas.flatMap(ruta => 
                ruta.coordenadas.map(coord => ({ ...coord, rutaTitle: ruta.title }))
            );

            const sortedCoordenadas = allCoordenadas.sort((a, b) => a.score - b.score);
            
            const top3Criticas = sortedCoordenadas.slice(0, 3);

            container.innerHTML = top3Criticas.map((coord, index) => {
                const scoreColor = coord.score > 80 ? 'text-green-400' : (coord.score > 60 ? 'text-yellow-400' : 'text-red-400');
                return `
                    <div class="bg-gray-800/50 p-4 rounded-lg flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="text-blue-400 font-bold text-lg mr-4">#${index + 1}</span>
                            <div>
                                <h4 class="font-semibold text-white">${coord.title}</h4>
                                <p class="text-sm text-gray-400">En ${coord.rutaTitle}</p>
                            </div>
                        </div>
                        <span class="font-bold text-lg ${scoreColor}">${coord.score}</span>
                    </div>
                `;
            }).join('');
        }

        // --- Lógica del Panel de Inteligencia ---
        function setupIntelligencePanel() {
            actionPlanContainer.addEventListener('click', function(e) {
                if (e.target && e.target.matches('[data-coord-id]')) {
                    const coordId = e.target.dataset.coordId;
                    const allCoordenadas = reportData.rutas.flatMap(ruta => ruta.coordenadas);
                    const clickedCoord = allCoordenadas.find(c => c.id === coordId);
                    
                    if (clickedCoord) {
                        panelTitle.textContent = clickedCoord.title;
                        panelContent.innerHTML = `
                            <div class="space-y-4">
                                <div>
                                    <h3 class="font-bold text-lg text-white">¿Qué es esto?</h3>
                                    <p class="text-gray-300">${clickedCoord.what_is_it}</p>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg text-white">¿Por qué es importante?</h3>
                                    <p class="text-gray-300">${clickedCoord.why_it_matters}</p>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg text-white">Próximos Pasos</h3>
                                    <p class="text-gray-300">Acciones recomendadas para mejorar este KPI.</p>
                                </div>
                            </div>
                        `;
                        intelligencePanel.classList.add('open');
                    }
                }
            });

            closePanelButton.addEventListener('click', function() {
                intelligencePanel.classList.remove('open');
            });
        }

        // --- Flujo de Navegación ---
        mainForm.addEventListener('submit', function(event) {
            event.preventDefault();
            heroSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            registrationSection.classList.add('hidden');
            dashboardSection.classList.add('hidden');
            loader.classList.remove('hidden');
            reportDataContainer.classList.add('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            const urlInput = document.getElementById('main-input');
            const url = urlInput.value;

            // Basic URL validation
            try {
                new URL(url);
            } catch (_) {
                alert('Por favor, ingresa una URL válida.');
                return;
            }

            fetch('/api/get-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { 
                        throw new Error(`Error del servidor: ${response.status} - ${text}`);
                    });
                }
                return response.json();
            })
            .then(result => {
                console.log('Respuesta del backend:', result);
                if (!result.success || !result.data || !result.data.report_content) {
                    throw new Error('La respuesta del servidor no tiene el formato esperado.');
                }
                
                // El backend devuelve el report_content como un string JSON, necesita ser parseado.
                console.log('Contenido del informe antes de parsear:', result.data.report_content);
                const parsedData = JSON.parse(result.data.report_content);
                reportData = parsedData; // Guardar los datos parseados en el estado
                
                // Actualizar la URL del cliente en los datos
                if (reportData) {
                    reportData.clientUrl = url || 'ejemplo.com';
                }

                renderReport(reportData); // Renderizar el informe inicial
                
                loader.classList.add('hidden');
                reportDataContainer.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error al conectar con el backend:', error);
                loader.innerHTML = `<p class="text-red-500">Error al conectar con el servidor: ${error.message}. Revisa la consola para más detalles.</p>`;
            });
        });

        unlockButton.addEventListener('click', () => {
            resultsSection.classList.add('hidden');
            registrationSection.classList.remove('hidden');
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        });

        backToReportButton.addEventListener('click', () => {
            registrationSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        });

        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('reg-name').value,
                title: document.getElementById('reg-title').value,
                company: document.getElementById('reg-company').value,
                email: document.getElementById('reg-email').value,
                phone: document.getElementById('reg-phone').value,
                city: document.getElementById('reg-city').value,
                state: document.getElementById('reg-state').value,
                country: document.getElementById('reg-country').value,
                website: reportData ? reportData.clientUrl : ''
            };

            if (!formData.name || !formData.email || !formData.company) {
                alert('Por favor, completa los campos de Nombre, Empresa y Email.');
                return;
            }

            const submitButton = registrationForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Enviando...';
            submitButton.disabled = true;

            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Error en el servidor.') });
                }
                return response.json();
            })
            .then(result => {
                if (reportData) {
                    renderDashboard(reportData);
                    renderRecommendedActionPlan(reportData);
                    setupIntelligencePanel();
                }
                registrationSection.classList.add('hidden');
                dashboardSection.classList.remove('hidden');
                dashboardSection.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error en el registro:', error);
                alert(`Hubo un problema con el registro: ${error.message}`);
            })
            .finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    setupReportLogic();

    // --- Lógica de la Animación del Titular con Anime.js ---
    function setupAnimatedHeadline() {
        const words = ["Visión", "Control", "Gestión", "Clientes", "Ingresos", "Éxitos", "Ventas", "POTENCIA"];
        let currentIndex = 0;
        const headline = document.getElementById('headline-animated');
        if (!headline) return;

        // Función para dividir el texto en letras envueltas en <span>
        function splitText(element) {
            element.innerHTML = element.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            return element.querySelectorAll('span.letter');
        }

        function animateWords() {
            const letters = splitText(headline);

            anime.timeline({ loop: false })
                .add({
                    targets: letters,
                    translateY: [0, -40],
                    opacity: [1, 0],
                    easing: "easeInExpo",
                    duration: 600,
                    delay: anime.stagger(50),
                    complete: () => {
                        // Cambiar la palabra
                        currentIndex = (currentIndex + 1) % words.length;
                        headline.textContent = words[currentIndex];
                        
                        // Dividir la nueva palabra y animar la entrada
                        const newLetters = splitText(headline);
                        anime({
                            targets: newLetters,
                            translateY: [40, 0],
                            opacity: [0, 1],
                            easing: "easeOutElastic(1, .8)", // Efecto "pesado"
                            duration: 1200,
                            delay: anime.stagger(70),
                            complete: () => {
                                // Preparar la siguiente animación
                                setTimeout(animateWords, 2000);
                            }
                        });
                    }
                });
        }

        // Iniciar el ciclo de animación
        setTimeout(animateWords, 2000);
    }
    setupAnimatedHeadline();

    // --- Lógica de la Animación del Placeholder ---_V2
    function setupPlaceholderAnimation() {
        const input = document.getElementById('main-input');
        if (!input) return;

        const placeholders = [
            "https://tuempresa.com",
            "https://www.tu-competidor.com",
            "https://www.ejemplo.com.ar"
        ];
        let placeholderIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 120;
        const deletingSpeed = 60;
        const delay = 2000;
        const cursor = '|';

        let intervalId;

        function type() {
            if (document.activeElement === input) return; // Pausar si el input está en foco
            const currentPlaceholder = placeholders[placeholderIndex];
            let displayText;

            if (isDeleting) {
                displayText = currentPlaceholder.substring(0, charIndex--);
            } else {
                displayText = currentPlaceholder.substring(0, charIndex++);
            }

            input.setAttribute('placeholder', displayText + cursor);

            if (!isDeleting && charIndex === currentPlaceholder.length + 1) {
                isDeleting = true;
                clearInterval(intervalId);
                setTimeout(() => {
                    intervalId = setInterval(type, deletingSpeed);
                }, delay);
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                clearInterval(intervalId);
                intervalId = setInterval(type, typingSpeed);
            }
        }
        
        input.addEventListener('focus', () => {
            clearInterval(intervalId);
            input.setAttribute('placeholder', 'https://');
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.setAttribute('placeholder', '');
                charIndex = 0;
                isDeleting = false;
                placeholderIndex = 0; // Reiniciar al primer placeholder
                // Reiniciar animación
                setTimeout(() => {
                     intervalId = setInterval(type, typingSpeed);
                }, 500);
            }
        });

        // Iniciar al cargar la página
        intervalId = setInterval(type, typingSpeed);
    }
    setupPlaceholderAnimation();
});