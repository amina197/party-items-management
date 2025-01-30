export enum StatusEnum {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export namespace StatusNamespace {

  export function mapStatusToClass(status: StatusEnum): string {
    switch (status) {
      case StatusEnum.PENDING:
        return 'badge-pending';
      case StatusEnum.ACCEPTED:
        return 'badge-accepted';
      case StatusEnum.REJECTED:
        return 'badge-rejected';
    }
  }
}