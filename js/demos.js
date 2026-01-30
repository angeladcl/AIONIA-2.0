// ===================================
// AIONIA DEMOS - Interactive Demonstrations
// ===================================

// Tab Navigation
document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initDemoLaunchers();
});

function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const demosGrids = document.querySelectorAll('.demos-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding grid
            demosGrids.forEach(grid => {
                if (grid.dataset.tab === category) {
                    grid.classList.remove('hidden');
                } else {
                    grid.classList.add('hidden');
                }
            });
        });
    });
}

// Demo Launchers
function initDemoLaunchers() {
    const demoCards = document.querySelectorAll('.demo-card');
    const modal = document.getElementById('demoModal');
    const modalClose = document.querySelector('.modal-close');
    const demoContent = document.getElementById('demoContent');

    demoCards.forEach(card => {
        const launchBtn = card.querySelector('.demo-launch-btn');
        const demoType = card.dataset.demo;

        launchBtn.addEventListener('click', () => {
            openDemo(demoType, modal, demoContent);
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        demoContent.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            demoContent.innerHTML = '';
        }
    });
}

function openDemo(type, modal, content) {
    modal.classList.add('active');

    const demos = {
        consultoria: renderConsultoriaDemo,
        desarrollo: renderDesarrolloDemo,
        integracion: renderIntegracionDemo,
        soporte: renderSoporteDemo,
        automatizacion: renderAutomatizacionDemo,
        monitoreo: renderMonitoreoDemo,
        ecommerce: renderEcommerceDemo,
        erp: renderERPDemo
    };

    if (demos[type]) {
        demos[type](content);
    }
}

// ===================================
// DEMO 1: CONSULTORÍA - Process Analyzer
// ===================================
function renderConsultoriaDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">💡 Consultoría - Analizador de Procesos</h2>
                <p class="demo-subtitle">Describe tu proceso actual y obtén recomendaciones de optimización</p>
                <div class="demo-disclaimer">
                    ✨ Demo Interactiva - Análisis simulado con IA
                </div>
            </div>
            
            <div class="demo-steps">
                <div class="demo-step active" id="step1">
                    <div class="step-number">1</div>
                    <strong>Describe</strong>
                    <p>Tu proceso actual</p>
                </div>
                <div class="demo-step" id="step2">
                    <div class="step-number">2</div>
                    <strong>Analiza</strong>
                    <p>Identifica cuellos de botella</p>
                </div>
                <div class="demo-step" id="step3">
                    <div class="step-number">3</div>
                    <strong>Optimiza</strong>
                    <p>Recibe recomendaciones</p>
                </div>
            </div>
            
            <div class="demo-workspace" id="consultoriaWorkspace">
                <label><strong>Describe tu proceso actual de negocio:</strong></label>
                <textarea class="demo-input demo-textarea" id="processInput" 
                    placeholder="Ejemplo: Recibimos pedidos por WhatsApp, los anotamos en Excel, luego llamamos a los proveedores..."></textarea>
                
                <label><strong>¿Cuántas personas están involucradas?</strong></label>
                <input type="number" class="demo-input" id="peopleInput" min="1" value="3">
                
                <label><strong>¿Cuánto tiempo toma completar el proceso?</strong></label>
                <input type="text" class="demo-input" id="timeInput" placeholder="Ejemplo: 2 horas">
                
                <button class="demo-btn" id="analyzeBtn">Analizar Proceso</button>
            </div>
            
            <div id="consultoriaResults"></div>
        </div>
    `;

    const analyzeBtn = document.getElementById('analyzeBtn');
    const processInput = document.getElementById('processInput');
    const peopleInput = document.getElementById('peopleInput');
    const timeInput = document.getElementById('timeInput');
    const workspace = document.getElementById('consultoriaWorkspace');
    const results = document.getElementById('consultoriaResults');

    analyzeBtn.addEventListener('click', () => {
        if (!processInput.value.trim()) {
            alert('Por favor describe tu proceso');
            return;
        }

        // Show loading
        workspace.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p class="loading-text">Analizando tu proceso...</p>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        `;

        // Update steps
        document.getElementById('step1').classList.add('completed');
        document.getElementById('step2').classList.add('active');

        // Simulate analysis
        let progress = 0;
        const progressBar = document.getElementById('progressFill');
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                showConsultoriaResults(results, processInput.value, peopleInput.value, timeInput.value);
            }
        }, 200);
    });
}

function showConsultoriaResults(container, process, people, time) {
    document.getElementById('step2').classList.add('completed');
    document.getElementById('step3').classList.add('active');

    const improvements = [
        "Automatizar recepción de pedidos con formulario web",
        "Implementar sistema de notificaciones automáticas",
        "Centralizar información en base de datos",
        "Crear dashboard de seguimiento en tiempo real"
    ];

    const timeSaved = Math.round(parseInt(people) * 30 + parseInt(time) || 50);

    container.innerHTML = `
        <div class="demo-result">
            <h3 class="result-title">Análisis Completado</h3>
            
            <div class="chart-container">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Impacto Esperado</h4>
                <div class="metric">
                    <span class="metric-label">Tiempo Ahorrado</span>
                    <span class="metric-value positive">${timeSaved}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Reducción de Errores</span>
                    <span class="metric-value positive">75%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Personal Liberado</span>
                    <span class="metric-value positive">${Math.max(1, parseInt(people) - 1)} personas</span>
                </div>
            </div>
            
            <div style="margin-top: 2rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Recomendaciones de Optimización:</h4>
                ${improvements.map((imp, i) => `
                    <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 0.5rem;">
                        <strong style="color: var(--accent-yellow);">${i + 1}.</strong> ${imp}
                    </div>
                `).join('')}
            </div>
            
            <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                Agendar Consultoría
            </button>
        </div>
    `;

    document.getElementById('step3').classList.add('completed');
}

// ===================================
// DEMO 2: DESARROLLO - Component Builder
// ===================================
function renderDesarrolloDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">⚙️ Desarrollo - Constructor de Sistemas</h2>
                <p class="demo-subtitle">Selecciona componentes y visualiza tu sistema personalizado</p>
                <div class="demo-disclaimer">
                    ✨ Demo Interactiva - Constructor visual con preview en vivo
                </div>
            </div>
            
            <div class="demo-workspace">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Selecciona los Componentes:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="dashboard"> Dashboard Ejecutivo
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="forms"> Formularios Dinámicos
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="reports"> Reportes y Analytics
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="users"> Gestión de Usuarios
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="api"> API RESTful
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="component-check" data-component="auth"> Autenticación
                    </label>
                </div>
                
                <button class="demo-btn" id="buildSystemBtn">Construir Sistema</button>
            </div>
            
            <div id="desarrolloResults"></div>
        </div>
    `;

    const buildBtn = document.getElementById('buildSystemBtn');
    const checkboxes = document.querySelectorAll('.component-check');

    buildBtn.addEventListener('click', () => {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.dataset.component);

        if (selected.length === 0) {
            alert('Selecciona al menos un componente');
            return;
        }

        showDesarrolloResults(selected);
    });
}

function showDesarrolloResults(components) {
    const results = document.getElementById('desarrolloResults');
    const componentNames = {
        dashboard: 'Dashboard Ejecutivo',
        forms: 'Formularios Dinámicos',
        reports: 'Reportes y Analytics',
        users: 'Gestión de Usuarios',
        api: 'API RESTful',
        auth: 'Autenticación'
    };

    const estimatedWeeks = Math.ceil(components.length * 1.5);

    results.innerHTML = `
        <div class="demo-result">
            <h3 class="result-title">Sistema Generado</h3>
            
            <div style="background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Vista Previa del Sistema:</h4>
                <div style="background: #1E293B; padding: 1.5rem; border-radius: 8px; border: 2px dashed var(--accent-yellow);">
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #EF4444;"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #F59E0B;"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #10B981;"></div>
                    </div>
                    ${components.map(comp => `
                        <div style="padding: 1rem; margin: 0.5rem 0; background: rgba(255,217,61,0.1); border-left: 3px solid var(--accent-yellow); border-radius: 4px;">
                            ✓ ${componentNames[comp]}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="chart-container">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Detalles del Proyecto:</h4>
                <div class="metric">
                    <span class="metric-label">Componentes Seleccionados</span>
                    <span class="metric-value">${components.length}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Tiempo Estimado</span>
                    <span class="metric-value">${estimatedWeeks} semanas</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Tecnología</span>
                    <span class="metric-value" style="font-size: 1rem;">React + Node.js</span>
                </div>
            </div>
            
            <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                Solicitar Cotización
            </button>
        </div>
    `;
}

// ===================================
// DEMO 3: INTEGRACIÓN - API Connector
// ===================================
function renderIntegracionDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">🔗 Integración - Conector de Sistemas</h2>
                <p class="demo-subtitle">Conecta múltiples plataformas y unifica tu información</p>
                <div class="demo-disclaimer">
                    ✨ Demo Interactiva - Simulación de conexión y sincronización
                </div>
            </div>
            
            <div class="demo-workspace">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Selecciona Sistemas a Integrar:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="sat"> SAT (CFDI)
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="bancos"> Bancos
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="mercadolibre"> Mercado Libre
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="amazon"> Amazon
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="erp"> ERP Existente
                    </label>
                    <label class="component-option">
                        <input type="checkbox" class="integration-check" data-system="crm"> CRM
                    </label>
                </div>
                
                <button class="demo-btn" id="connectSystemsBtn">Conectar Sistemas</button>
            </div>
            
            <div id="integracionResults"></div>
        </div>
    `;

    const connectBtn = document.getElementById('connectSystemsBtn');
    const checkboxes = document.querySelectorAll('.integration-check');

    connectBtn.addEventListener('click', () => {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.dataset.system);

        if (selected.length === 0) {
            alert('Selecciona al menos un sistema');
            return;
        }

        showIntegracionProcess(selected);
    });
}

function showIntegracionProcess(systems) {
    const workspace = document.querySelector('.demo-workspace');
    const systemNames = {
        sat: 'SAT (Facturación)',
        bancos: 'Banca Electrónica',
        mercadolibre: 'Mercado Libre',
        amazon: 'Amazon Marketplace',
        erp: 'ERP Corporativo',
        crm: 'CRM Clientes'
    };

    workspace.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p class="loading-text">Estableciendo conexiones seguras...</p>
            <div id="connectionStatus" style="margin-top: 2rem; text-align: left; width: 100%;"></div>
        </div>
    `;

    const statusDiv = document.getElementById('connectionStatus');
    let completed = 0;

    systems.forEach((system, index) => {
        setTimeout(() => {
            statusDiv.innerHTML += `
                <div style="padding: 0.75rem; background: rgba(16,185,129,0.1); border-left: 3px solid #10B981; margin-bottom: 0.5rem; border-radius: 4px;">
                    ✓ Conectado a ${systemNames[system]}
                </div>
            `;
            completed++;

            if (completed === systems.length) {
                setTimeout(() => showIntegracionResults(systems), 1000);
            }
        }, index * 1000);
    });
}

function showIntegracionResults(systems) {
    const results = document.getElementById('integracionResults');

    results.innerHTML = `
        <div class="demo-result">
            <h3 class="result-title">Integración Completada</h3>
            
            <div style="background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Dashboard Unificado:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="background: rgba(59,130,246,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                        <div style="font-size: 1.5rem; color: var(--accent-blue); font-weight: 700;">1,234</div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem;">Transacciones Hoy</div>
                    </div>
                    <div style="background: rgba(16,185,129,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💰</div>
                        <div style="font-size: 1.5rem; color: #10B981; font-weight: 700;">$45,678</div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem;">Ventas Totales</div>
                    </div>
                    <div style="background: rgba(255,217,61,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
                        <div style="font-size: 1.5rem; color: var(--accent-yellow); font-weight: 700;">89</div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem;">Pedidos Pendientes</div>
                    </div>
                </div>
            </div>
            
            <div class="chart-container">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Estado de Integraciones:</h4>
                ${systems.map(sys => `
                    <div class="metric">
                        <span class="metric-label">${sys.toUpperCase()}</span>
                        <span class="metric-value positive">Sincronizado ✓</span>
                    </div>
                `).join('')}
            </div>
            
            <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                Implementar Integración
            </button>
        </div>
    `;
}

// ===================================
// DEMO 4: SOPORTE - Monitoring Dashboard
// ===================================
function renderSoporteDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">🛡️ Soporte 24/7 - Dashboard de Monitoreo</h2>
                <p class="demo-subtitle">Monitoreo proactivo con alertas y resolución automática</p>
                <div class="demo-disclaimer">
                    ✨ Demo en Vivo - Datos actualizándose en tiempo real
                </div>
            </div>
            
            <div id="soporteDashboard"></div>
        </div>
    `;

    startSoporteMonitoring();
}

function startSoporteMonitoring() {
    const dashboard = document.getElementById('soporteDashboard');

    dashboard.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="metric" style="flex-direction: column; align-items: flex-start; padding: 1.5rem;">
                <span class="metric-label">Uptime</span>
                <span class="metric-value positive" id="uptime">99.9%</span>
            </div>
            <div class="metric" style="flex-direction: column; align-items: flex-start; padding: 1.5rem;">
                <span class="metric-label">Tiempo de Respuesta</span>
                <span class="metric-value" id="responseTime">45ms</span>
            </div>
            <div class="metric" style="flex-direction: column; align-items: flex-start; padding: 1.5rem;">
                <span class="metric-label">Alertas Activas</span>
                <span class="metric-value" id="activeAlerts">0</span>
            </div>
        </div>
        
        <div class="chart-container">
            <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Registro de Actividad:</h4>
            <div id="activityLog" style="max-height: 300px; overflow-y: auto;"></div>
        </div>
        
        <div style="margin-top: 2rem; text-align: center;">
            <p style="color: var(--text-secondary);">🔄 Dashboard actualizándose cada 3 segundos</p>
        </div>
    `;

    const activityLog = document.getElementById('activityLog');
    const activities = [
        { type: 'success', msg: 'Backup automático completado' },
        { type: 'info', msg: 'Actualización de seguridad aplicada' },
        { type: 'success', msg: 'Rendimiento optimizado automáticamente' },
        { type: 'info', msg: 'Certificado SSL renovado' }
    ];

    let logIndex = 0;
    setInterval(() => {
        const activity = activities[logIndex % activities.length];
        const time = new Date().toLocaleTimeString();
        const color = activity.type === 'success' ? '#10B981' : '#3B82F6';

        activityLog.innerHTML = `
            <div style="padding: 0.75rem; background: rgba(255,255,255,0.03); border-left: 3px solid ${color}; margin-bottom: 0.5rem; border-radius: 4px; animation: slideUp 0.3s ease;">
                <strong style="color: ${color};">[${time}]</strong> ${activity.msg}
            </div>
        ` + activityLog.innerHTML;

        logIndex++;

        // Update metrics randomly
        document.getElementById('responseTime').textContent = (40 + Math.random() * 20).toFixed(0) + 'ms';
    }, 3000);
}

// ===================================
// DEMO 5: AUTOMATIZACIÓN
// ===================================
function renderAutomatizacionDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">🤖  Automatización de Procesos</h2>
                <p class="demo-subtitle">Compara el antes y después de automatizar tareas</p>
                <div class="demo-disclaimer">
                    ✨ Demo Comparativa - Visualiza el impacto de la automatización
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div style="background: rgba(239,68,68,0.1); padding: 2rem; border-radius: 12px; border: 2px solid #EF4444;">
                    <h3 style="color: #EF4444; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ❌ Proceso Manual
                    </h3>
                    <div class="metric" style="margin-bottom: 1rem;">
                        <span style="color: var(--text-secondary);">Tiempo total:</span>
                        <span style="color: #EF4444; font-weight: 700;">4 horas</span>
                    </div>
                    <div class="metric" style="margin-bottom: 1rem;">
                        <span style="color: var(--text-secondary);">Personal necesario:</span>
                        <span style="color: #EF4444; font-weight: 700;">3 personas</span>
                    </div>
                    <div class="metric">
                        <span style="color: var(--text-secondary);">Tasa de errores:</span>
                        <span style="color: #EF4444; font-weight: 700;">15%</span>
                    </div>
                </div>
                
                <div style="background: rgba(16,185,129,0.1); padding: 2rem; border-radius: 12px; border: 2px solid #10B981;">
                    <h3 style="color: #10B981; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ✓ Proceso Automatizado
                    </h3>
                    <div class="metric" style="margin-bottom: 1rem;">
                        <span style="color: var(--text-secondary);">Tiempo total:</span>
                        <span style="color: #10B981; font-weight: 700;">15 minutos</span>
                    </div>
                    <div class="metric" style="margin-bottom: 1rem;">
                        <span style="color: var(--text-secondary);">Personal necesario:</span>
                        <span style="color: #10B981; font-weight: 700;">0 personas</span>
                    </div>
                    <div class="metric">
                        <span style="color: var(--text-secondary);">Tasa de errores:</span>
                        <span style="color: #10B981; font-weight: 700;">0.1%</span>
                    </div>
                </div>
            </div>
            
            <div class="demo-result">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Impacto de la Automatización:</h3>
                <div class="metric">
                    <span class="metric-label">Ahorro de Tiempo</span>
                    <span class="metric-value positive">93.75%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Reducción de Personal</span>
                    <span class="metric-value positive">100%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Reducción de Errores</span>
                    <span class="metric-value positive">99.3%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">ROI Estimado</span>
                    <span class="metric-value positive">6 meses</span>
                </div>
                
                <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                    Automatizar Mi Proceso
                </button>
            </div>
        </div>
    `;
}

// ===================================
// DEMO 6: MONITOREO - Analytics Dashboard
// ===================================
function renderMonitoreoDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">📊 Monitoreo en Tiempo Real</h2>
                <p class="demo-subtitle">Dashboard con métricas actualizándose en vivo</p>
                <div class="demo-disclaimer">
                    ✨ Demo en Vivo - Datos generados en tiempo real
                </div>
            </div>
            
            <div id="monit oregoDashboard"></div>
        </div>
    `;

    startMonitoreoDashboard();
}

function startMonitoreoDashboard() {
    const dashboard = document.getElementById('monitoreoDashboard');

    dashboard.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(59,130,246,0.1); padding: 1.5rem; border-radius: 12px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📈</div>
                <div style="font-size: 2rem; color: var(--accent-blue); font-weight: 700;" id="sales">$0</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">Ventas Hoy</div>
            </div>
            <div style="background: rgba(16,185,129,0.1); padding: 1.5rem; border-radius: 12px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
                <div style="font-size: 2rem; color: #10B981; font-weight: 700;" id="users">0</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">Usuarios Activos</div>
            </div>
            <div style="background: rgba(255,217,61,0.1); padding: 1.5rem; border-radius: 12px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
                <div style="font-size: 2rem; color: var(--accent-yellow); font-weight: 700;" id="orders">0</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">Pedidos</div>
            </div>
            <div style="background: rgba(139,92,246,0.1); padding: 1.5rem; border-radius: 12px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                <div style="font-size: 2rem; color: #8B5CF6; font-weight: 700;" id="inventory">0</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">Items en Stock</div>
            </div>
        </div>
        
        <div class="chart-container">
            <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Alertas del Sistema:</h4>
            <div id="alertsContainer"></div>
        </div>
        
        <div style="margin-top: 2rem; text-align: center;">
            <p style="color: var(--text-secondary);">🔄 Datos actualizándose cada 2 segundos</p>
        </div>
    `;

    let salesValue = 12450;
    let usersValue = 23;
    let ordersValue = 45;
    let inventoryValue = 1234;

    setInterval(() => {
        salesValue += Math.floor(Math.random() * 500);
        usersValue += Math.floor(Math.random() * 3) - 1;
        ordersValue += Math.floor(Math.random() * 2);
        inventoryValue -= Math.floor(Math.random() * 3);

        document.getElementById('sales').textContent = '$' + salesValue.toLocaleString();
        document.getElementById('users').textContent = Math.max(0, usersValue);
        document.getElementById('orders').textContent = ordersValue;
        document.getElementById('inventory').textContent = inventoryValue.toLocaleString();

        // Random alerts
        if (Math.random() > 0.7) {
            const alerts = document.getElementById('alertsContainer');
            const alertTypes = [
                { color: '#10B981', msg: 'Nuevo pedido recibido' },
                { color: '#3B82F6', msg: 'Inventario reabastecido' },
                { color: '#F59E0B', msg: 'Stock bajo en producto XYZ' }
            ];
            const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
            const time = new Date().toLocaleTimeString();

            alerts.innerHTML = `
                <div style="padding: 0.75rem; background: rgba(255,255,255,0.03); border-left: 3px solid ${alert.color}; margin-bottom: 0.5rem; border-radius: 4px; animation: slideUp 0.3s ease;">
                    <strong style="color: ${alert.color};">[${time}]</strong> ${alert.msg}
                </div>
            ` + alerts.innerHTML;
        }
    }, 2000);
}

// ===================================
// DEMO 7: E-COMMERCE
// ===================================
function renderEcommerceDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">🛒 E-Commerce - Constructor de Tienda</h2>
                <p class="demo-subtitle">Crea tu tienda online y simula el proceso de compra</p>
                <div class="demo-disclaimer">
                    ✨ Demo Interactiva - Tienda online simulada
                </div>
            </div>
            
            <div class="demo-workspace">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Tu Tienda Online:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid rgba(255,255,255,0.1);">
                        <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">📱</div>
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Smartphone Pro</h4>
                        <p style="color: var(--accent-yellow); font-size: 1.5rem; font-weight: 700;">$599</p>
                        <button class="demo-btn" style="width: 100%; padding: 0.5rem; font-size: 0.875rem;" onclick="alert('Producto agregado al carrito')">Agregar al Carrito</button>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid rgba(255,255,255,0.1);">
                        <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">💻</div>
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Laptop Ultra</h4>
                        <p style="color: var(--accent-yellow); font-size: 1.5rem; font-weight: 700;">$1,299</p>
                        <button class="demo-btn" style="width: 100%; padding: 0.5rem; font-size: 0.875rem;" onclick="alert('Producto agregado al carrito')">Agregar al Carrito</button>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid rgba(255,255,255,0.1);">
                        <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎧</div>
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Auriculares BT</h4>
                        <p style="color: var(--accent-yellow); font-size: 1.5rem; font-weight: 700;">$199</p>
                        <button class="demo-btn" style="width: 100%; padding: 0.5rem; font-size: 0.875rem;" onclick="alert('Producto agregado al carrito')">Agregar al Carrito</button>
                    </div>
                </div>
                
                <div class="demo-result">
                    <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Características de tu Tienda:</h3 >
                    <div class="metric">
                        <span class="metric-label">✓ Catálogo de Productos</span>
                        <span class="metric-value positive">Ilimitado</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">✓ Pasarela de Pagos</span>
                        <span class="metric-value positive">Integrada</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">✓ Gestión de Inventario</span>
                        <span class="metric-value positive">Automática</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">✓ Tracking de Envíos</span>
                        <span class="metric-value positive">En Tiempo Real</span>
                    </div>
                    
                    <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                        Crear Mi Tienda
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// DEMO 8: ERP/WMS
// ===================================
function renderERPDemo(container) {
    container.innerHTML = `
        <div class="demo-container">
            <div class="demo-header">
                <h2 class="demo-title">📦 ERP / WMS - Control de Operaciones</h2>
                <p class="demo-subtitle">Gestiona inventario, órdenes y recursos desde un solo lugar</p>
                <div class="demo-disclaimer">
                    ✨ Demo Interactiva - Panel de control empresarial
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="chart-container">
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">📊 Inventario:</h4>
                    <div class="metric">
                        <span>Productos en Stock</span>
                        <span style="color: var(--accent-yellow); font-weight: 700;">1,234</span>
                    </div>
                    <div class="metric">
                        <span>Valor Total</span>
                        <span style="color: #10B981; font-weight: 700;">$567,890</span>
                    </div>
                    <div class="metric">
                        <span>Alertas de Stock Bajo</span>
                        <span style="color: #F59E0B; font-weight: 700;">12 items</span>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">📋 Órdenes:</h4>
                    <div class="metric">
                        <span>En Proceso</span>
                        <span style="color: var(--accent-blue); font-weight: 700;">45</span>
                    </div>
                    <div class="metric">
                        <span>Completadas Hoy</span>
                        <span style="color: #10B981; font-weight: 700;">128</span>
                    </div>
                    <div class="metric">
                        <span>Pendientes</span>
                        <span style="color: #F59E0B; font-weight: 700;">23</span>
                    </div>
                </div>
            </div>
            
            <div class="demo-result">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">Capacidades del Sistema:</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                    <div style="padding: 1.5rem; background: rgba(59,130,246,0.1); border-radius: 8px; border-left: 4px solid var(--accent-blue);">
                        <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem;">Gestión de Inventario</h4>
                        <p style="color: var(--text-secondary); font-size: 0.875rem;">Control total de stock, ubicaciones y movimientos</p>
                    </div>
                    <div style="padding: 1.5rem; background: rgba(16,185,129,0.1); border-radius: 8px; border-left: 4px solid #10B981;">
                        <h4 style="color: #10B981; margin-bottom: 0.5rem;">Órdenes de Trabajo</h4>
                        <p style="color: var(--text-secondary); font-size: 0.875rem;">Creación, asignación y seguimiento automático</p>
                    </div>
                    <div style="padding: 1.5rem; background: rgba(255,217,61,0.1); border-radius: 8px; border-left: 4px solid var(--accent-yellow);">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 0.5rem;">Recursos Humanos</h4>
                        <p style="color: var(--text-secondary); font-size: 0.875rem;">Asistencia, nómina y asignación de tareas</p>
                    </div>
                    <div style="padding: 1.5rem; background: rgba(139,92,246,0.1); border-radius: 8px; border-left: 4px solid #8B5CF6;">
                        <h4 style="color: #8B5CF6; margin-bottom: 0.5rem;">Reportes Ejecutivos</h4>
                        <p style="color: var(--text-secondary); font-size: 0.875rem;">KPIs y analytics en tiempo real</p>
                    </div>
                </div>
                
                <button class="demo-btn" onclick="window.location.href='index.html#consultation'" style="margin-top: 2rem;">
                    Implementar ERP/WMS
                </button>
            </div>
        </div>
    `;
}

// Component Option Styling
const style = document.createElement('style');
style.textContent = `
    .component-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(255,255,255,0.03);
        border-radius: 8px;
        border: 2px solid rgba(255,255,255,0.1);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .component-option:hover {
        background: rgba(255,217,61,0.1);
        border-color: var(--accent-yellow);
    }
    
    .component-option input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
