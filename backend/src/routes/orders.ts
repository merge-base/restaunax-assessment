import { Router, Request, Response } from 'express';
import { Order, OrderStatus, CreateOrderRequest, UpdateOrderStatusRequest } from '../../../shared/types';
import { mockOrders } from '../data/mockOrders';

const router = Router();

let orders: Order[] = [...mockOrders];

router.get('/', (req: Request, res: Response) => {
  try {
    const status = req.query.status as OrderStatus | undefined;

    let filteredOrders = orders;

    if (status) {
      const validStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'delivered'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: 'Invalid status',
          message: `Status must be one of: ${validStatuses.join(', ')}`,
        });
      }
      filteredOrders = orders.filter((order) => order.status === status);
    }

    filteredOrders = [...filteredOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return res.json(filteredOrders);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = orders.find((o) => o.id === id);

    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        message: `Order with ID ${id} does not exist`,
      });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body as CreateOrderRequest;

    if (!body.customerName || !body.customerEmail || !body.customerPhone || !body.orderType || !body.items) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Missing required fields: customerName, customerEmail, customerPhone, orderType, items',
      });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Items must be a non-empty array',
      });
    }

    for (const item of body.items) {
      if (!item.name || item.quantity <= 0 || item.price < 0) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Each item must have a name, positive quantity, and non-negative price',
        });
      }
    }

    const newId = `ord_${String(orders.length + 1).padStart(3, '0')}`;

    const itemsWithIds = body.items.map((item, index) => ({
      id: `item_${String(orders.length * 10 + index + 1).padStart(3, '0')}`,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const total = itemsWithIds.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      id: newId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      customerRewardPoints: 0,
      orderType: body.orderType,
      status: 'pending',
      items: itemsWithIds,
      total: Math.round(total * 100) / 100,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.patch('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body as UpdateOrderStatusRequest;

    if (!body.status) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Status is required',
      });
    }

    const validStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'delivered'];
    if (!validStatuses.includes(body.status)) {
      return res.status(400).json({
        error: 'Validation error',
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return res.status(404).json({
        error: 'Order not found',
        message: `Order with ID ${id} does not exist`,
      });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status: body.status,
    };

    return res.json(orders[orderIndex]);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
