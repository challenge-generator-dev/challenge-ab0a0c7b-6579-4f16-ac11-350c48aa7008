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