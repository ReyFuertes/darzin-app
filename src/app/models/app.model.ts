
export interface IFormInfo {
  type: DialogType;
  valid: boolean;
  values: any;
}
export enum DialogType {
  customer = 1,
  product = 2,
  purchases = 3,
  purchase = 4
}