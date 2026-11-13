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