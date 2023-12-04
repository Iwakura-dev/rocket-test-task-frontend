import type { IStatus } from './Status'
import type { IContact } from './Contact'

export interface ILead {
  id: bigint
  name: string
  price: bigint
  status: IStatus
  responsible_user: string
  created_at: string
  contacts: IContact[]
}
