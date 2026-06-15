-- Adiciona o campo ativo na tabela consertos:
ALTER TABLE consertos ADD COLUMN ativo boolean;

-- Marca todos os registros existentes como ativos:
UPDATE consertos SET ativo = true;