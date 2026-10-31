export interface RfqItem {
  id: string;
  name: string;
  category: string;
  price: string;
}

export interface CartItem extends RfqItem {
  quantity: number;
}

export const QUOTE_ON_APPLICATION = "Quote on Application";

export type AddToRfq = (item: RfqItem) => void;
