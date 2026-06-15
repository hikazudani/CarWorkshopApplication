-- Adiciona o campo ativo na tabela consertos:
ALTER TABLE consertos ADD ativo tinyint;

-- Atualização para tornar todos os registros existentes anteriormente para "ativos"
UPDATE consertos SET ativo = 1;
