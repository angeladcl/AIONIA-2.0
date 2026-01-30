---
description: Workflow de agente autónomo con ciclo ReAct y auto-reparación
---

# Workflow: Agente Autónomo con Ciclo ReAct

Este workflow implementa un patrón de agente autónomo que monitorea eventos, ejecuta acciones y se auto-repara sin intervención humana.

## 1. Capa de Ingesta y Priorización

En lugar de esperar un comando humano, el sistema monitorea una fuente de eventos (un webhook, una base de datos, o un feed de logs).

### Paso 1.1: Configurar Fuente de Eventos

Definir la fuente de eventos que el agente monitoreará:
- **Webhook**: Endpoint HTTP que recibe notificaciones externas
- **Base de Datos**: Polling de tabla de eventos o triggers
- **Feed de Logs**: Monitoreo de archivos de log o stream de eventos

```javascript
// Ejemplo: Monitor de eventos
const eventSource = {
  type: 'webhook', // o 'database', 'logfeed'
  endpoint: '/api/events',
  pollInterval: 5000 // para polling
};
```

### Paso 1.2: Clasificación de Prioridad

Cuando se detecta un evento, el agente analiza el contexto y clasifica:

```javascript
// Trigger: Evento detectado
function onEventDetected(event) {
  // Análisis de contexto
  const priority = classifyPriority(event);
  const context = analyzeContext(event);
  
  // Encolar con prioridad
  taskQueue.enqueue({
    event,
    priority,
    context,
    timestamp: Date.now()
  });
}

function classifyPriority(event) {
  // Crítico: Afecta producción o usuarios
  if (event.severity === 'critical') return 1;
  // Alto: Requiere atención pronta
  if (event.severity === 'high') return 2;
  // Normal: Procesamiento estándar
  return 3;
}
```

## 2. Ciclo de Ejecución (Loop de Razonamiento - ReAct)

Implementar el patrón ReAct (Reasoning + Acting):

### Paso 2.1: Pensamiento (Reasoning)

```javascript
async function think(task) {
  // ¿Qué necesito para resolver esto?
  const analysis = {
    problem: task.event.description,
    requiredTools: identifyRequiredTools(task),
    strategy: determineStrategy(task),
    expectedOutcome: defineExpectedOutcome(task)
  };
  
  console.log(`[THINK] Analizando: ${analysis.problem}`);
  console.log(`[THINK] Herramientas necesarias: ${analysis.requiredTools.join(', ')}`);
  
  return analysis;
}
```

### Paso 2.2: Acción (Acting)

```javascript
async function act(analysis) {
  // Ejecutar herramienta (API, Script, SQL)
  const results = [];
  
  for (const tool of analysis.requiredTools) {
    console.log(`[ACT] Ejecutando: ${tool.name}`);
    
    const result = await executeTool(tool, {
      context: analysis,
      retries: 3
    });
    
    results.push(result);
  }
  
  return results;
}

async function executeTool(tool, options) {
  switch(tool.type) {
    case 'api':
      return await callAPI(tool.endpoint, tool.params);
    case 'script':
      return await runScript(tool.path, tool.args);
    case 'sql':
      return await executeQuery(tool.query);
    default:
      throw new Error(`Unknown tool type: ${tool.type}`);
  }
}
```

### Paso 2.3: Observación (Observation)

```javascript
function observe(results) {
  // Leer el resultado de la herramienta
  const observations = results.map(result => ({
    tool: result.tool,
    status: result.status,
    data: result.data,
    timestamp: Date.now()
  }));
  
  console.log(`[OBSERVE] Resultados obtenidos: ${observations.length}`);
  
  return observations;
}
```

### Paso 2.4: Validación (Validation)

```javascript
async function validate(observations, expectedOutcome) {
  // ¿El resultado es el esperado?
  const validation = {
    success: true,
    errors: [],
    warnings: []
  };
  
  for (const obs of observations) {
    if (!matchesExpectation(obs, expectedOutcome)) {
      validation.success = false;
      validation.errors.push({
        observation: obs,
        reason: 'No coincide con el resultado esperado'
      });
    }
  }
  
  console.log(`[VALIDATE] Validación: ${validation.success ? 'EXITOSA' : 'FALLIDA'}`);
  
  return validation;
}
```

### Paso 2.5: Loop Completo

```javascript
async function reactLoop(task, maxIterations = 5) {
  let iteration = 0;
  let success = false;
  
  while (!success && iteration < maxIterations) {
    iteration++;
    console.log(`\n[LOOP] Iteración ${iteration}/${maxIterations}`);
    
    // 1. Pensamiento
    const analysis = await think(task);
    
    // 2. Acción
    const results = await act(analysis);
    
    // 3. Observación
    const observations = observe(results);
    
    // 4. Validación
    const validation = await validate(observations, analysis.expectedOutcome);
    
    if (validation.success) {
      // Si sí: Pasar a la siguiente tarea
      console.log('[LOOP] ✓ Tarea completada exitosamente');
      success = true;
      await moveToNextTask(task);
    } else {
      // Si no: Re-intentar con una estrategia distinta
      console.log('[LOOP] ✗ Ajustando estrategia...');
      task = adjustStrategy(task, validation.errors);
    }
  }
  
  if (!success) {
    throw new Error(`Tarea falló después de ${maxIterations} iteraciones`);
  }
}
```

## 3. Manejo de Errores y "Self-Healing"

Para eliminar la aprobación humana, definir políticas de contingencia:

### Paso 3.1: Retries Exponenciales

```javascript
async function executeWithRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`[RETRY] Intento ${attempt + 1}/${maxRetries}`);
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        // Calcular delay exponencial
        const delay = Math.min(
          baseDelay * Math.pow(backoffFactor, attempt),
          maxDelay
        );
        
        console.log(`[RETRY] Error: ${error.message}. Reintentando en ${delay}ms...`);
        await sleep(delay);
      }
    }
  }
  
  throw new Error(`Falló después de ${maxRetries} intentos: ${lastError.message}`);
}
```

### Paso 3.2: Fallback Paths

```javascript
async function executeWithFallback(toolChain) {
  // toolChain = [ToolA, ToolB, ToolC]
  const errors = [];
  
  for (const tool of toolChain) {
    try {
      console.log(`[FALLBACK] Intentando con: ${tool.name}`);
      
      const result = await executeWithRetry(
        () => executeTool(tool),
        { maxRetries: 3 }
      );
      
      console.log(`[FALLBACK] ✓ Éxito con ${tool.name}`);
      return result;
      
    } catch (error) {
      errors.push({
        tool: tool.name,
        error: error.message
      });
      
      console.log(`[FALLBACK] ✗ ${tool.name} falló. Probando siguiente...`);
    }
  }
  
  throw new Error(`Todos los fallbacks fallaron: ${JSON.stringify(errors)}`);
}
```

### Paso 3.3: Logging Silencioso

```javascript
class SilentLogger {
  constructor(options = {}) {
    this.logFile = options.logFile || './logs/agent.log';
    this.continueOnError = options.continueOnError !== false;
  }
  
  async logError(error, context) {
    // Registrar el error pero continuar
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message: error.message,
      stack: error.stack,
      context,
      recovered: this.continueOnError
    };
    
    // Escribir a archivo (no consola)
    await this.writeToFile(logEntry);
    
    // NO lanzar el error si continueOnError está activado
    if (!this.continueOnError) {
      throw error;
    }
  }
  
  async logRecovery(action, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'RECOVERY',
      action,
      context
    };
    
    await this.writeToFile(logEntry);
  }
}

// Uso:
const logger = new SilentLogger({ continueOnError: true });

async function processTaskQueue() {
  while (taskQueue.hasNext()) {
    const task = taskQueue.dequeue();
    
    try {
      await reactLoop(task);
    } catch (error) {
      // Registrar pero continuar con la siguiente tarea
      await logger.logError(error, { task });
      console.log('[QUEUE] Error registrado. Continuando con siguiente tarea...');
    }
  }
}
```

## 4. Sistema Completo Integrado

```javascript
// Inicialización del agente autónomo
class AutonomousAgent {
  constructor(config) {
    this.eventSource = config.eventSource;
    this.taskQueue = new PriorityQueue();
    this.logger = new SilentLogger({ continueOnError: true });
    this.running = false;
  }
  
  async start() {
    this.running = true;
    console.log('[AGENT] Agente autónomo iniciado');
    
    // Iniciar monitoreo de eventos
    this.startEventMonitoring();
    
    // Iniciar procesamiento de cola
    this.startTaskProcessing();
  }
  
  startEventMonitoring() {
    // Monitorear eventos según el tipo de fuente
    if (this.eventSource.type === 'webhook') {
      this.setupWebhookListener();
    } else if (this.eventSource.type === 'database') {
      this.startDatabasePolling();
    } else if (this.eventSource.type === 'logfeed') {
      this.startLogMonitoring();
    }
  }
  
  async startTaskProcessing() {
    while (this.running) {
      if (this.taskQueue.hasNext()) {
        const task = this.taskQueue.dequeue();
        
        try {
          await reactLoop(task);
        } catch (error) {
          await this.handleFailure(task, error);
        }
      } else {
        // Esperar antes de verificar nuevamente
        await sleep(1000);
      }
    }
  }
  
  async handleFailure(task, error) {
    await this.logger.logError(error, { task });
    
    // Intentar recuperación automática
    if (this.canRecover(error)) {
      const recoveryAction = this.determineRecoveryAction(error);
      await this.logger.logRecovery(recoveryAction, { task });
      
      // Re-encolar con estrategia modificada
      this.taskQueue.enqueue({
        ...task,
        recoveryAttempt: (task.recoveryAttempt || 0) + 1,
        strategy: recoveryAction
      });
    } else {
      // Error no recuperable - registrar y continuar
      console.log('[AGENT] Error no recuperable. Continuando...');
    }
  }
  
  stop() {
    this.running = false;
    console.log('[AGENT] Agente autónomo detenido');
  }
}

// Iniciar el agente
const agent = new AutonomousAgent({
  eventSource: {
    type: 'webhook',
    endpoint: '/api/events'
  }
});

agent.start();
```

## Notas de Implementación

1. **Seguridad**: Implementar autenticación y autorización para webhooks
2. **Escalabilidad**: Considerar usar colas de mensajes (Redis, RabbitMQ) para alto volumen
3. **Monitoreo**: Configurar métricas y alertas para detectar fallos sistemáticos
4. **Límites**: Establecer límites de recursos (CPU, memoria, tiempo) para prevenir loops infinitos
5. **Auditoría**: Mantener logs detallados de todas las acciones para debugging y compliance
