// Contratos espelhando os DTOs do backend (com.lhjundi.car_workshop.model).

export interface Credenciais {
  login: string
  senha: string
}

export interface TokenJWT {
  token: string
}

export interface Mecanico {
  nome: string
  experiencia?: string
}

export interface Veiculo {
  marca: string
  modelo: string
  cor?: string
  ano: string // 4 digitos
}

// Payload de POST /consertos (ConsertoDTO).
export interface NovoConserto {
  entrada: string // dd/MM/yyyy
  saida: string // dd/MM/yyyy
  mecanico: Mecanico
  veiculo: Veiculo
}

// Retorno de GET /consertos/{id} e POST /consertos (DetalhamentoConsertoDTO).
export interface Conserto {
  id: number
  entrada: string
  saida: string
  mecanico: Mecanico
  veiculo: Veiculo
}

// Retorno de GET /consertos/relatorios (ListagemConsertoDTO).
export interface ConsertoResumo {
  id: number
  entrada: string
  saida: string
  nome: string
  marca: string
  modelo: string
}

// Payload de PUT /consertos (AtualizacaoConsertoDTO).
export interface AtualizacaoConserto {
  id: number
  saida?: string
  nome?: string
  experiencia?: string
}
