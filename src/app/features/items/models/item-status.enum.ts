export enum ItemStatusEnum {
  ACTION_REQUIRED = 'Action required',
  WAITING_FOR_OTHERS = 'Waiting for others',
  ACCEPTED = 'Accepted',
  NO_ACTIVE_PROPOSAL = 'No active proposal'
}

export namespace ItemStatusNamespace {

  export function mapStatusToClass(status: ItemStatusEnum): string {
    switch (status) {
      case ItemStatusEnum.ACTION_REQUIRED:
        return 'badge-action-required';
      case ItemStatusEnum.WAITING_FOR_OTHERS:
        return 'badge-waiting';
      case ItemStatusEnum.ACCEPTED:
        return 'badge-accepted';
      default:
        return 'badge-none';
    }
  }
}