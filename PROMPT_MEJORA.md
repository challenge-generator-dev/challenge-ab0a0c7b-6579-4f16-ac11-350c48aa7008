# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order.service.ts` — La fase "Configuración inicial y creación de la API" se implementa aqui: este archivo es el ejercicio.
- `api/src/infrastructure/repositories/order.repository.impl.ts` — La fase "Integración con DynamoDB y pruebas unitarias" se implementa aqui: este archivo es el ejercicio.
- `api/src/test/unit/order.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **client/src/main.tsx** — Sin main.tsx no hay entry point que monte el arbol de React y el bundle no tiene raiz.

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz, Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de ordenes en DynamoDB
- Tiempo estimado: 1 semana

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de la API — objetivo: Establecer el entorno de trabajo y crear las rutas básicas de la API para las operaciones CRUD. — entregable (NO resolver): API funcional con rutas para CRUD de ordenes.
- Fase 2: Integración con DynamoDB y pruebas unitarias — objetivo: Integrar la API con DynamoDB y escribir pruebas unitarias para asegurar la funcionalidad. — entregable (NO resolver): API integrada con DynamoDB y pruebas unitarias funcionales.
- Fase 3: Optimización y manejo de errores — objetivo: Optimizar el rendimiento de la API y manejar adecuadamente los errores. — entregable (NO resolver): API optimizada y con manejo de errores robusto.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1169.0",
    "@aws-sdk/lib-dynamodb": "3.1169.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "@nestjs/testing": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "jest": "30.5.2",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { OrderItem } from './order-item.entity';

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: string;

  constructor(id: string, customerId: string, items: OrderItem[], status: string = 'pending') {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.status = status;
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }

  updateItems(newItems: OrderItem[]): void {
    this.items = newItems;
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

// === ARCHIVO: api/src/domain/repositories/order.repository.ts ===
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/application/services/order.service.ts ===
import { Injectable, Inject } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

interface CreateOrderDto {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

interface UpdateOrderDto {
  items?: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status?: string;
}

@Injectable()
export class OrderService {
  constructor(@Inject('OrderRepository') private readonly orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // TODO(reto): Implementar la lógica para crear una orden
    // 1. Validar que los items no estén vacíos
    // 2. Crear la entidad Order con los datos del DTO
    // 3. Persistir la orden usando el repositorio
    // 4. Retornar la orden creada
    throw new Error('Method not implemented');
  }

  async getOrder(id: string): Promise<Order> {
    // TODO(reto): Implementar la lógica para obtener una orden por ID
    // 1. Buscar la orden usando el repositorio
    // 2. Si no existe, lanzar una excepción NotFoundException
    // 3. Retornar la orden encontrada
    throw new Error('Method not implemented');
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // TODO(reto): Implementar la lógica para actualizar una orden
    // 1. Buscar la orden existente usando el repositorio
    // 2. Si no existe, lanzar una excepción NotFoundException
    // 3. Actualizar los campos permitidos (items o status)
    // 4. Persistir los cambios usando el repositorio
    // 5. Retornar la orden actualizada
    throw new Error('Method not implemented');
  }

  async deleteOrder(id: string): Promise<void> {
    // TODO(reto): Implementar la lógica para eliminar una orden
    // 1. Verificar que la orden existe usando el repositorio
    // 2. Si no existe, lanzar una excepción NotFoundException
    // 3. Eliminar la orden usando el repositorio
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { Order } from '../../domain/entities/order.entity';

interface CreateOrderDto {
  customerId: string;
  items: { productId: string; quantity: number; price: number }[];
}

interface UpdateOrderDto {
  items?: { productId: string; quantity: number; price: number }[];
  status?: string;
}

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const order = await this.orderService.getOrder(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderService.updateOrder(id, updateOrderDto);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/order.repository.impl.ts ===
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT,
    });
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.ORDERS_TABLE || 'orders';
  }

  async create(order: Order): Promise<Order> {
    // TODO(reto): Implementar la creación de una orden en DynamoDB
    // 1. Serializar el objeto Order a formato DynamoDB
    // 2. Usar PutCommand para guardar en la tabla
    // 3. Retornar la orden creada
    throw new Error('Method not implemented');
  }

  async findById(id: string): Promise<Order | null> {
    // TODO(reto): Implementar la búsqueda de una orden por ID en DynamoDB
    // 1. Usar GetCommand con la clave primaria (id)
    // 2. Deserializar el resultado de DynamoDB a Order
    // 3. Retornar null si no existe
    throw new Error('Method not implemented');
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    // TODO(reto): Implementar la actualización de una orden en DynamoDB
    // 1. Construir la expresión de actualización (UpdateExpression)
    // 2. Usar UpdateCommand para modificar los campos
    // 3. Retornar la orden actualizada
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de una orden en DynamoDB
    // 1. Usar DeleteCommand con la clave primaria (id)
    // 2. No retornar nada (void)
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Orders API')
    .setDescription('API para gestión de órdenes')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(`Documentación Swagger en http://localhost:${port}/docs`);
}

bootstrap();

// === ARCHIVO: api/src/test/unit/order.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../application/services/order.service';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let repository: jest.Mocked<OrderRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get('OrderRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('TODO(reto): implementar prueba para crear una orden exitosamente', async () => {
      // Arrange
      const createOrderDto = {
        customerId: 'cust-123',
        items: [
          { productId: 'prod-1', quantity: 2, price: 10.00 },
        ],
      };
      
      const expectedOrder = new Order(
        'order-123',
        'cust-123',
        createOrderDto.items,
        'pending'
      );

      repository.create.mockResolvedValue(expectedOrder);

      // Act
      // TODO(reto): llamar a service.createOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.create fue llamado con los datos correctos
    });

    it('TODO(reto): implementar prueba para manejar error al crear orden con datos inválidos', async () => {
      // Arrange
      const invalidOrderDto = {
        customerId: '',
        items: [],
      };

      // Act & Assert
      // TODO(reto): verificar que se lanza excepción cuando los datos son inválidos
    });
  });

  describe('getOrder', () => {
    it('TODO(reto): implementar prueba para obtener una orden por ID', async () => {
      // Arrange
      const orderId = 'order-123';
      const expectedOrder = new Order(
        orderId,
        'cust-123',
        [{ productId: 'prod-1', quantity: 1, price: 10.00 }],
        'pending'
      );

      repository.findById.mockResolvedValue(expectedOrder);

      // Act
      // TODO(reto): llamar a service.getOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.findById fue llamado con el ID correcto
    });

    it('TODO(reto): implementar prueba para manejar orden no encontrada', async () => {
      // Arrange
      repository.findById.mockResolvedValue(null);

      // Act & Assert
      // TODO(reto): verificar que se lanza excepción cuando la orden no existe
    });
  });

  describe('updateOrder', () => {
    it('TODO(reto): implementar prueba para actualizar una orden exitosamente', async () => {
      // Arrange
      const orderId = 'order-123';
      const updateOrderDto = { status: 'completed' };
      
      const existingOrder = new Order(
        orderId,
        'cust-123',
        [{ productId: 'prod-1', quantity: 1, price: 10.00 }],
        'pending'
      );

      const updatedOrder = new Order(
        orderId,
        'cust-123',
        existingOrder.items,
        'completed'
      );

      repository.update.mockResolvedValue(updatedOrder);

      // Act
      // TODO(reto): llamar a service.updateOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.update fue llamado con los datos correctos
    });
  });

  describe('deleteOrder', () => {
    it('TODO(reto): implementar prueba para eliminar una orden exitosamente', async () => {
      // Arrange
      const orderId = 'order-123';
      repository.delete.mockResolvedValue();

      // Act
      // TODO(reto): llamar a service.deleteOrder

      // Assert
      // TODO(reto): verificar que repository.delete fue llamado con el ID correcto
    });
  });
});

// === ARCHIVO: api/src/domain/entities/order-item.entity.ts ===
export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "7.18.5"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/services/order.service.ts ===
import axios from 'axios';
import { Order, OrderItem, CreateOrderDto, UpdateOrderDto } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

export class OrderService {
    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        try {
            const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderDto);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error creating order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error creating order: Unknown error');
        }
    }

    async getOrder(id: string): Promise<Order> {
        try {
            const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error fetching order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error fetching order: Unknown error');
        }
    }

    async updateOrder(id: string, updateDto: UpdateOrderDto): Promise<Order> {
        try {
            const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, updateDto);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error updating order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error updating order: Unknown error');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/orders/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error deleting order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error deleting order: Unknown error');
        }
    }
}

// === ARCHIVO: client/src/hooks/useOrders.ts ===
import { useState, useCallback } from 'react';
import { OrderService } from '../services/order.service';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';

const orderService = new OrderService();

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = useCallback(async (orderDto: CreateOrderDto) => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await orderService.createOrder(orderDto);
            setOrders(prev => [...prev, newOrder]);
            return newOrder;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOrder = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const order = await orderService.getOrder(id);
            setOrders(prev => prev.some(o => o.id === id) ? prev.map(o => o.id === id ? order : o) : [...prev, order]);
            return order;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateOrder = useCallback(async (id: string, updateDto: UpdateOrderDto) => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrder = await orderService.updateOrder(id, updateDto);
            setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
            return updatedOrder;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteOrder = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await orderService.deleteOrder(id);
            setOrders(prev => prev.filter(order => order.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        orders,
        loading,
        error,
        createOrder,
        fetchOrder,
        updateOrder,
        deleteOrder
    };
};

// === ARCHIVO: client/src/types/order.ts ===
export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    total: number;
    status: string;
}

export interface CreateOrderDto {
    customerId: string;
    items: OrderItem[];
}

export interface UpdateOrderDto {
    items?: OrderItem[];
    status?: string;
}

// === ARCHIVO: client/src/features/orders/OrderList.tsx ===
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import type { Order } from '../../types/order';

export function OrderList() {
  const navigate = useNavigate();
  const { orders, loading, error, deleteOrder, fetchOrder } = useOrders();

  useEffect(() => {
    fetchOrder('');
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      try {
        await deleteOrder(id);
        await fetchOrder('');
      } catch (err) {
        console.error('Error al eliminar la orden:', err);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/orders/${id}`);
  };

  const handleCreate = () => {
    navigate('/orders/new');
  };

  const handleRefresh = async () => {
    await fetchOrder('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando órdenes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-600">Error: {error}</div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Órdenes</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Nueva Orden
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay órdenes registradas.</p>
          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Crear primera orden
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void | Promise<void>;
}

function OrderCard({ order, onEdit, onDelete }: OrderCardProps) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusClass = statusColors[order.status.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Orden #{order.id.slice(0, 8)}</h2>
          <p className="text-sm text-gray-500">Cliente: {order.customerId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Items:</h3>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
              <span className="text-gray-700">Producto: {item.productId}</span>
              <span className="text-gray-600">
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-lg font-bold text-gray-800">
          Total: ${order.total.toFixed(2)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(order.id)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

// === ARCHIVO: client/src/features/orders/OrderForm.tsx ===
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import type { OrderItem, CreateOrderDto, UpdateOrderDto } from '../../types/order';

export function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id && id !== 'new');

  const { createOrder, updateOrder, fetchOrder, loading, error } = useOrders();

  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      loadOrder(id);
    }
  }, [id, isEditMode]);

  const loadOrder = async (orderId: string) => {
    try {
      const order = await fetchOrder(orderId);
      if (order) {
        setCustomerId(order.customerId);
        setItems(order.items);
        setStatus(order.status);
      }
    } catch (err) {
      console.error('Error al cargar la orden:', err);
      setFormError('No se pudo cargar la orden.');
    }
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const validateForm = (): boolean => {
    if (!customerId.trim()) {
      setFormError('El ID del cliente es requerido.');
      return false;
    }
    if (items.length === 0) {
      setFormError('Debe agregar al menos un item.');
      return false;
    }
    for (const item of items) {
      if (!item.productId.trim()) {
        setFormError('Todos los items deben tener un ID de producto.');
        return false;
      }
      if (item.quantity <= 0) {
        setFormError('La cantidad debe ser mayor a 0.');
        return false;
      }
      if (item.price < 0) {
        setFormError('El precio no puede ser negativo.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && id) {
        const updateDto: UpdateOrderDto = {
          items,
          status,
        };
        await updateOrder(id, updateDto);
      } else {
        const createDto: CreateOrderDto = {
          customerId: customerId.trim(),
          items,
        };
        await createOrder(createDto);
      }
      navigate('/orders');
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setFormError('Error al guardar la orden. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/orders');
  };

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando orden...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Editar Orden' : 'Nueva Orden'}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {formError && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
            ID del Cliente
          </label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled={isEditMode}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Ingrese el ID del cliente"
          />
        </div>

        {isEditMode && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Items</label>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              + Agregar Item
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No hay items agregados.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      placeholder="ID Producto"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      placeholder="Cant"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      placeholder="Precio"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-xl font-bold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables para el entorno de desarrollo
environment = "dev"
project_name = "order-management"
table_name = "orders"
billing_mode = "PAY_PER_REQUEST"
hash_key = "orderId"
range_key = "userId"
read_capacity = 5
write_capacity = 5
enable_stream = true
stream_view_type = "NEW_AND_OLD_IMAGES"
tags = {
  Environment = "dev"
  Project     = "order-management"
  ManagedBy   = "Terraform"
}

# Configuración de índices secundarios
global_secondary_indexes = [
  {
    name            = "UserIndex"
    hash_key        = "userId"
    range_key       = "orderDate"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  },
  {
    name            = "StatusIndex"
    hash_key        = "status"
    range_key       = "orderDate"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }
]

# Configuración de atributos
attributes = [
  {
    name = "orderId"
    type = "S"
  },
  {
    name = "userId"
    type = "S"
  },
  {
    name = "orderDate"
    type = "S"
  },
  {
    name = "status"
    type = "S"
  },
  {
    name = "totalAmount"
    type = "N"
  }
]

# Configuración de TTL
ttl_attribute = {
  name = "expirationTime"
  enabled = true
}

# Configuración de políticas de acceso
enable_point_in_time_recovery = true
enable_encryption = true
encryption_type = "KMS"

// === ARCHIVO: infra/environments/dev/main.tf ===
# Configuración principal para el entorno de desarrollo
terraform {
  backend "s3" {
    bucket = "tf-state-order-management-dev"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  table_name             = var.table_name
  billing_mode           = var.billing_mode
  hash_key               = var.hash_key
  range_key              = var.range_key
  read_capacity          = var.read_capacity
  write_capacity         = var.write_capacity
  enable_stream          = var.enable_stream
  stream_view_type       = var.stream_view_type
  global_secondary_indexes = var.global_secondary_indexes
  attributes             = var.attributes
  ttl_attribute          = var.ttl_attribute
  enable_point_in_time_recovery = var.enable_point_in_time_recovery
  enable_encryption      = var.enable_encryption
  encryption_type        = var.encryption_type
  tags                   = var.tags
}

# Outputs para el entorno de desarrollo



// === ARCHIVO: infra/environments/dev/variables.tf ===
# Variables para el entorno de desarrollo
variable "environment" {
  description = "Nombre del entorno (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación de DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "hash_key" {
  description = "Clave hash de la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango de la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada"
  type        = number
  default     = 5
}

variable "enable_stream" {
  description = "Habilitar stream en la tabla DynamoDB"
  type        = bool
  default     = true
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = []
}

variable "attributes" {
  description = "Lista de atributos de la tabla"
  type = list(object({
    name = string
    type = string
  }))
}

variable "ttl_attribute" {
  description = "Configuración del atributo TTL"
  type = object({
    name    = string
    enabled = bool
  })
  default = {
    name    = "expirationTime"
    enabled = false
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación en un punto en el tiempo"
  type        = bool
  default     = true
}

variable "enable_encryption" {
  description = "Habilitar encriptación en la tabla"
  type        = bool
  default     = true
}

variable "encryption_type" {
  description = "Tipo de encriptación (KMS o AWS_OWNED)"
  type        = string
  default     = "KMS"
}

variable "tags" {
  description = "Tags para los recursos"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Configuración principal del módulo DynamoDB
resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key
  range_key      = var.range_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = global_secondary_index.value.read_capacity
      write_capacity  = global_secondary_index.value.write_capacity
    }
  }

  ttl {
    attribute_name = var.ttl_attribute.enabled ? var.ttl_attribute.name : ""
    enabled        = var.ttl_attribute.enabled
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  server_side_encryption {
    enabled     = var.enable_encryption
    kms_key_arn = var.encryption_type == "KMS" ? aws_kms_key.dynamodb[0].arn : null
  }

  stream_enabled   = var.enable_stream
  stream_view_type = var.enable_stream ? var.stream_view_type : null

  tags = var.tags
}

resource "aws_kms_key" "dynamodb" {
  count       = var.enable_encryption && var.encryption_type == "KMS" ? 1 : 0
  description = "KMS key para encriptación de DynamoDB"
  tags        = var.tags
}

resource "aws_kms_alias" "dynamodb" {
  count         = var.enable_encryption && var.encryption_type == "KMS" ? 1 : 0
  name          = "alias/dynamodb-${var.table_name}"
  target_key_id = aws_kms_key.dynamodb[0].key_id
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables para el módulo DynamoDB
variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación de DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "hash_key" {
  description = "Clave hash de la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango de la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada"
  type        = number
  default     = 5
}

variable "enable_stream" {
  description = "Habilitar stream en la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = []
}

variable "attributes" {
  description = "Lista de atributos de la tabla"
  type = list(object({
    name = string
    type = string
  }))
}

variable "ttl_attribute" {
  description = "Configuración del atributo TTL"
  type = object({
    name    = string
    enabled = bool
  })
  default = {
    name    = "expirationTime"
    enabled = false
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación en un punto en el tiempo"
  type        = bool
  default     = false
}

variable "enable_encryption" {
  description = "Habilitar encriptación en la tabla"
  type        = bool
  default     = false
}

variable "encryption_type" {
  description = "Tipo de encriptación (KMS o AWS_OWNED)"
  type        = string
  default     = "AWS_OWNED"
}

variable "tags" {
  description = "Tags para los recursos"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
# Outputs del módulo DynamoDB
output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

output "table_id" {
  description = "ID de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

output "table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.stream_arn
}

output "kms_key_arn" {
  description = "ARN de la KMS key usada para encriptación"
  value       = var.enable_encryption && var.encryption_type == "KMS" ? aws_kms_key.dynamodb[0].arn : null
}

output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

// === ARCHIVO: infra/README.md ===
# Infraestructura Terraform - Módulo DynamoDB

## Descripción General

Este componente contiene la infraestructura como código (IaC) para desplegar recursos de AWS utilizando Terraform. El enfoque principal es la creación de tablas de DynamoDB con configuraciones flexibles y reutilizables.

## Requisitos Previos

- **Terraform** >= 1.9.0 y < 2.0.0
- **Proveedor AWS** = 5.100.0
- Credenciales de AWS configuradas en el entorno (variables de entorno, perfil AWS CLI o role de IAM)
- Acceso a Terraform Cloud o bucket S3 para estado remoto (recomendado para producción)

## Estructura del Proyecto

```
infra/
├── environments/
│   └── dev/
│       ├── main.tf         # Definición de recursos del entorno
│       ├── outputs.tf      # Outputs del entorno
│       ├── variables.tf    # Variables del entorno
│       └── terraform.tfvars # Valores de variables
├── modules/
│   └── dynamodb/
│       ├── main.tf         # Recurso principal de DynamoDB
│       ├── outputs.tf      # Outputs del módulo
│       └── variables.tf    # Variables configurables
├── providers.tf            # Configuración del proveedor AWS
├── versions.tf             # Versiones de Terraform y proveedores
└── README.md               # Este archivo
```

## Uso Básico

### Inicialización del entorno

```bash
cd infra/environments/dev
terraform init
```

### Validar la configuración

```bash
terraform validate
```

### Planificar los cambios

```bash
terraform plan -var-file="terraform.tfvars"
```

### Aplicar la infraestructura

```bash
terraform apply -var-file="terraform.tfvars"
```

### Destruir los recursos

```bash
terraform destroy -var-file="terraform.tfvars"
```

## Configuración de Variables

Las variables se configuran en el archivo `terraform.tfvars` del entorno correspondiente. Ejemplo:

```hcl
environment           = "dev"
project_name          = "orders-api"
table_name            = "orders"
billing_mode          = "PAY_PER_REQUEST"
hash_key              = "orderId"
range_key             = "createdAt"
read_capacity         = 5
write_capacity        = 5
enable_stream         = true
stream_view_type      = "NEW_AND_OLD_IMAGES"
enable_point_in_time_recovery = true
enable_encryption     = true
encryption_type       = "KMS"
tags = {
  Environment = "dev"
  Project     = "orders-api"
  ManagedBy   = "terraform"
}
```

## Módulo DynamoDB

El módulo `dynamodb` proporciona una tabla de DynamoDB configurable con las siguientes características:

- **Modo de facturación**: PROVISIONED o PAY_PER_REQUEST
- **Claves**: Soporte para clave hash y clave de rango
- **Índices secundarios globales**: Hasta 5 GSI por tabla
- **Streams**: Habilitación de streams para captura de cambios
- **TTL**: Configuración de Time-To-Live en atributos
- **Encriptación**: AWS_OWNED o KMS con clave personalizada
- **Point-in-Time Recovery**: Recuperación automática hasta 35 días

### Ejemplo de Uso del Módulo

```hcl
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  table_name        = "orders"
  billing_mode      = "PAY_PER_REQUEST"
  hash_key          = "orderId"
  range_key         = "createdAt"
  enable_stream     = true
  stream_view_type  = "NEW_AND_OLD_IMAGES"

  attributes = [
    { name = "orderId", type = "S" },
    { name = "createdAt", type = "S" },
    { name = "customerId", type = "S" }
  ]

  global_secondary_indexes = [
    {
      name            = "customerId-createdAt-index"
      hash_key        = "customerId"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]

  enable_point_in_time_recovery = true
  enable_encryption             = true
  encryption_type               = "KMS"

  tags = {
    Environment = "dev"
    Project     = "orders-api"
  }
}
```

## Outputs Disponibles

Después de aplicar la infraestructura, Terraform expondrá los siguientes valores:

- `dynamodb_table_arn`: ARN de la tabla creada
- `dynamodb_table_name`: Nombre de la tabla
- `dynamodb_table_stream_arn`: ARN del stream (si está habilitado)
- `dynamodb_kms_key_arn`: ARN de la clave KMS (si aplica)

## Consideraciones de Seguridad

1. **Encriptación**: Habilitar siempre encriptación en producción
2. **Acceso**: Usar IAM roles en lugar de credenciales estáticas
3. **Estado Remoto**: Almacenar el estado en S3 con versioning habilitado
4. **Secrets**: No almacenar claves KMS en código, usar AWS Secrets Manager
5. **Tags**: Mantener etiquetas consistentes para identificación y costos

## Manejo de Errores Comunes

### Error: Provider not initialized

```bash
# Solución: Ejecutar terraform init
terraform init
```

### Error: Invalid AWS region

```bash
# Verificar credenciales
aws configure
# O exportar variables
export AWS_REGION="us-east-1"
```

### Error: Resource already exists

```bash
# Importar recurso existente
terraform import aws_dynamodb_table.this nombre-tabla
```

### Error: State lock

```bash
# Forzar desbloqueo (solo si es seguro)
terraform force-unlock <lock-id>
```

## Buenas Prácticas

1. **Estado Remoto**: Usar Terraform Cloud o S3 con bloqueo
2. **Workspaces**: Separar entornos (dev, staging, prod)
3. **Módulos**: Reutilizar módulos para recursos similares
4. **Versionado**: Fijar versiones de proveedores
5. **Documentación**: Documentar variables y outputs
6. **Testing**: Usar terraform plan antes de apply
7. **CI/CD**: Integrar en pipeline de despliegue

## Recursos Adicionales

- [Documentación de Terraform](https://www.terraform.io/docs)
- [Proveedor AWS de Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Best Practices de DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [Terraform Cloud](https://www.terraform.io/cloud)

// === ARCHIVO: infra/environments/dev/outputs.tf ===
# Outputs del entorno de desarrollo
# Este archivo expone los valores de los recursos creados para consumo externo

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_id
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_name
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_stream_arn
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS utilizada para encriptar la tabla"
  value       = module.dynamodb_orders.kms_key_arn
}

output "environment_info" {
  description = "Información general del entorno"
  value = {
    environment     = var.environment
    project_name    = var.project_name
    table_name      = var.table_name
    billing_mode    = var.billing_mode
    region          = "us-east-1"
    dynamodb_arn    = module.dynamodb_orders.table_arn
    dynamodb_stream = var.enable_stream ? module.dynamodb_orders.table_stream_arn : null
  }
}

output "dynamodb_endpoint" {
  description = "Endpoint de la tabla DynamoDB para configuración de aplicaciones"
  value       = "https://dynamodb.us-east-1.amazonaws.com"
  sensitive   = false
}

output "table_configuration" {
  description = "Configuración detallada de la tabla DynamoDB"
  value = {
    table_name                  = var.table_name
    hash_key                    = var.hash_key
    range_key                   = var.range_key
    billing_mode                = var.billing_mode
    read_capacity               = var.read_capacity
    write_capacity              = var.write_capacity
    enable_stream               = var.enable_stream
    stream_view_type            = var.stream_view_type
    enable_point_in_time_recovery = var.enable_point_in_time_recovery
    enable_encryption           = var.enable_encryption
    encryption_type             = var.encryption_type
    global_secondary_indexes_count = length(var.global_secondary_indexes)
    attributes                  = var.attributes
    ttl_attribute               = var.ttl_attribute
  }
}

output "resources_summary" {
  description = "Resumen de recursos creados en el entorno"
  value = {
    dynamodb_table   = "1"
    kms_key          = var.enable_encryption && var.encryption_type == "KMS" ? "1" : "0"
    total_resources  = var.enable_encryption && var.encryption_type == "KMS" ? "2" : "1"
  }
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
