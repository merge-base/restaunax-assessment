import { Order, OrderStatus, CreateOrderRequest, ApiError as ApiErrorType } from '../../../shared/types';

const API_BASE_URL = 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public error?: ApiErrorType
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const apiError = data as ApiErrorType;
    throw new ApiError(
      apiError.message || apiError.error || 'An error occurred',
      response.status,
      apiError
    );
  }

  return data as T;
}

export const ordersApi = {
  async getOrders(status?: OrderStatus): Promise<Order[]> {
    try {
      const url = status
        ? `${API_BASE_URL}/orders?status=${status}`
        : `${API_BASE_URL}/orders`;

      const response = await fetch(url);
      return handleResponse<Order[]>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to fetch orders. Please check your network connection.',
        0
      );
    }
  },

  async getOrderById(id: string): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      return handleResponse<Order>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to fetch order. Please check your network connection.',
        0
      );
    }
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      return handleResponse<Order>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to update order status. Please check your network connection.',
        0
      );
    }
  },

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      return handleResponse<Order>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to create order. Please check your network connection.',
        0
      );
    }
  },
};
