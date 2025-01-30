export enum ItemStatusEnum {
  ACTION_REQUIRED = 'Rewiew proposal',
  WAITING_FOR_OTHERS = 'Wait for approval',
  ACCEPTED = 'Accepted',
  NO_ACTIVE_PROPOSAL = 'Create proposal'
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