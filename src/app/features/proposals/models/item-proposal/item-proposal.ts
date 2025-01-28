import { StatusEnum } from "../../../../shared/enums/status.enum";
import { User } from "../../../users/users/user";
import { AcceptanceRecord } from "../acceptance-record";
import { PaymentRatio } from "../payment-ratio";
import { Proposal } from "../proposal";


export class ItemProposal implements Proposal {
  id: number;
  itemId: number;
  createdAt: Date;
  createdByParty: number;
  createdByUser: User;
  comment?: string;
  paymentRatios: PaymentRatio;
  status: StatusEnum;
  acceptanceRecord: AcceptanceRecord;

  constructor(
    itemId: number,
    createdAt: Date,
    createdByParty: number,
    createdByUser: User,
    paymentRatios: PaymentRatio,
    status: StatusEnum,
    acceptanceRecord: AcceptanceRecord,
    comment: string
  ) {
    this.id = Date.now() + itemId;
    this.itemId = itemId;
    this.createdAt = createdAt;
    this.createdByParty = createdByParty;
    this.createdByUser = createdByUser;
    this.paymentRatios = paymentRatios;
    this.status = status;
    this.acceptanceRecord = acceptanceRecord;
    this.comment = comment
  }
}
