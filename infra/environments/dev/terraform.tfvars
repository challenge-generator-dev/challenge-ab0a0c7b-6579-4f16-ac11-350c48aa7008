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