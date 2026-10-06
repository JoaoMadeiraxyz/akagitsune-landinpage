import type { Locale } from '../config'
import { en, type Dictionary } from './en'
import { ptBR } from './pt-BR'
import { es } from './es'

export type { Dictionary }

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  'pt-BR': ptBR,
  es,
}
