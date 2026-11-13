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