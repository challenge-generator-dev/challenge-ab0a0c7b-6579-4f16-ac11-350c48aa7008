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