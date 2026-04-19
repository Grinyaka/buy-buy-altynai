export type User = {
  id: number;
  name: string;
  login: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: Date;
  is_active: boolean;
};

export type ProductUnit = 'кг' | 'г' | 'уп' | 'шт' | 'л'

export type Product = {
  id: number;
  name: string;
  supplier_id: number;
  max_stock: number;
  unit: ProductUnit;
  is_active: boolean;
  created_at: Date;
};

export type PurchaseOrder = {
  id: number;
  supplier_id: number;
  date: Date;
  created_by: number;
  is_confirmed: boolean;
  confirmed_at: Date | null;
  created_at: Date;
  general_comment: string | null;
  order_type: 'kitchen' | 'bar';
  location: string;
  user_id: number | null;
};

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  created_at: Date;
}

export interface Schedule {
  id: number;
  user_id: number;
  date: Date;
  shift_type: string;
  created_at: Date;
}

export interface InventoryRecord {
  id: number;
  product_id: number;
  date: string;
  current_amount: number;
  created_by: number;
  created_at: Date;
}

export interface PurchaseOrderItem {
  id: number;
  purchase_order_id: number;
  product_id: number;
  current_amount: number;
  required_amount: number;
  comment: string | null;
  created_at: Date;
}

export interface Supplier {
  id: number;
  name: string;
  created_at: Date;
  is_active: boolean;
}

export interface Session {
  id: string;
  user_id: number;
  token: string;
  expires_at: Date;
  created_at: Date;
}

export type SessionWithUser = Session & Omit<User, 'id' | 'created_at'> & {
  user_id: string;  
  user_created_at: Date;
}


// Front-end types
export type UserPayload = {
  id: number;
  name: string;
  login: string;
  role: "admin" | "user";
  exp: number;
};

