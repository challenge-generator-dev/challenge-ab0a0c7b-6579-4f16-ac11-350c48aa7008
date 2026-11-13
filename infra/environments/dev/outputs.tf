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