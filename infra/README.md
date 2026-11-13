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