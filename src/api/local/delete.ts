export function remove<T>(property: keyof T, value: any, elementList: T[]): T[] {
  return elementList.filter((el) => el[property] !== value);
}
export function removeById<T>(elementId: string, elementList: T[]): T[] {
  return elementList.filter((el) => el["id"] !== elementId);
}
