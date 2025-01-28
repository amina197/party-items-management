import { StatusEnum } from '../../../shared/enums/status.enum';

export type AcceptanceRecord = {
  [ownerId: number]: StatusEnum
}
