import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  LocalShipping as DeliveryIcon,
  Store as PickupIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { Order, OrderStatus } from '../../shared/types';
import { ordersApi, ApiError } from './services/api';

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          order.customerPhone.includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  }, [selectedStatus, searchQuery, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await ordersApi.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to fetch orders. Please try again.';
      setError(errorMessage);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setError(null);
      const updatedOrder = await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to update order status. Please try again.';
      setError(errorMessage);
      console.error('Error updating order status:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusColor = (status: OrderStatus): 'default' | 'primary' | 'warning' | 'success' => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'preparing':
        return 'primary';
      case 'ready':
        return 'warning';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
    };
  };

  const getOrderStatistics = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const deliveryCount = orders.filter((o) => o.orderType === 'delivery').length;
    const pickupCount = orders.filter((o) => o.orderType === 'pickup').length;
    const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

    return {
      totalRevenue,
      averageOrderValue,
      deliveryCount,
      pickupCount,
      totalItems,
    };
  };

  const statusCounts = getStatusCounts();
  const statistics = getOrderStatistics();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }} id="dashboard-title">
            Restaunax Order Dashboard
          </Typography>
          <Tooltip title="Refresh orders" aria-label="Refresh orders list">
            <IconButton 
              onClick={fetchOrders} 
              disabled={loading} 
              color="primary"
              aria-label="Refresh orders"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage and track restaurant orders in real-time
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}
            role="region"
            aria-label="Total revenue statistic"
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                    ${statistics.totalRevenue.toFixed(2)}
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}
            role="region"
            aria-label="Average order value statistic"
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Avg Order Value
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                    ${statistics.averageOrderValue.toFixed(2)}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}
            role="region"
            aria-label="Total orders statistic"
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Orders
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                    {orders.length}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}
            role="region"
            aria-label="Total items statistic"
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Items
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                    {statistics.totalItems}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Search orders by ID, customer name, email, phone, or item name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            aria-label="Search orders"
            role="search"
          />

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              Filter by Status:
            </Typography>
            <ButtonGroup variant="outlined" size="small" role="group" aria-label="Order status filters">
              <Button
                variant={selectedStatus === 'all' ? 'contained' : 'outlined'}
                onClick={() => setSelectedStatus('all')}
                aria-pressed={selectedStatus === 'all'}
                aria-label="Show all orders"
              >
                All ({statusCounts.all})
              </Button>
              <Button
                variant={selectedStatus === 'pending' ? 'contained' : 'outlined'}
                onClick={() => setSelectedStatus('pending')}
                aria-pressed={selectedStatus === 'pending'}
                aria-label="Show pending orders"
              >
                Pending ({statusCounts.pending})
              </Button>
              <Button
                variant={selectedStatus === 'preparing' ? 'contained' : 'outlined'}
                onClick={() => setSelectedStatus('preparing')}
                aria-pressed={selectedStatus === 'preparing'}
                aria-label="Show preparing orders"
              >
                Preparing ({statusCounts.preparing})
              </Button>
              <Button
                variant={selectedStatus === 'ready' ? 'contained' : 'outlined'}
                onClick={() => setSelectedStatus('ready')}
                aria-pressed={selectedStatus === 'ready'}
                aria-label="Show ready orders"
              >
                Ready ({statusCounts.ready})
              </Button>
              <Button
                variant={selectedStatus === 'delivered' ? 'contained' : 'outlined'}
                onClick={() => setSelectedStatus('delivered')}
                aria-pressed={selectedStatus === 'delivered'}
                aria-label="Show delivered orders"
              >
                Delivered ({statusCounts.delivered})
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Paper>

      {loading && (
        <Box 
          sx={{ display: 'flex', justifyContent: 'center', py: 8 }}
          role="status"
          aria-live="polite"
          aria-label="Loading orders"
        >
          <CircularProgress size={60} aria-label="Loading" />
        </Box>
      )}

      {!loading && filteredOrders.length === 0 && (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
          role="status"
          aria-live="polite"
        >
          <Typography variant="h6" color="text.secondary">
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchQuery.trim()
              ? `No orders match "${searchQuery}". Try a different search term.`
              : selectedStatus === 'all'
              ? 'There are no orders in the system.'
              : `There are no orders with status "${selectedStatus}".`}
          </Typography>
        </Paper>
      )}

      {!loading && filteredOrders.length > 0 && (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: 8,
                  },
                }}
                role="article"
                aria-label={`Order ${order.id} for ${order.customerName}`}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {order.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.createdAt)}
                      </Typography>
                    </Box>
                    <Chip
                      label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      color={getStatusColor(order.status)}
                      size="small"
                      aria-label={`Order status: ${order.status}`}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Customer Information
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2">{order.customerName || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                          {order.customerEmail}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2">{order.customerPhone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {order.customerRewardPoints} reward points
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={order.orderType === 'delivery' ? <DeliveryIcon /> : <PickupIcon />}
                      label={order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Items ({order.items.length})
                    </Typography>
                    <Box sx={{ maxHeight: 120, overflowY: 'auto' }}>
                      {order.items.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: 0.5,
                          }}
                        >
                          <Typography variant="body2">
                            {item.quantity}x {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Box>

                  <FormControl fullWidth size="small">
                    <InputLabel id={`status-select-label-${order.id}`}>Update Status</InputLabel>
                    <Select
                      value={order.status}
                      label="Update Status"
                      labelId={`status-select-label-${order.id}`}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value as OrderStatus)
                      }
                      disabled={updatingOrderId === order.id}
                      aria-label={`Update status for order ${order.id}`}
                      aria-describedby={`status-help-${order.id}`}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="preparing">Preparing</MenuItem>
                      <MenuItem value="ready">Ready</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                    </Select>
                    {updatingOrderId === order.id && (
                      <Typography 
                        variant="caption" 
                        id={`status-help-${order.id}`}
                        sx={{ mt: 0.5, display: 'block' }}
                        aria-live="polite"
                      >
                        Updating...
                      </Typography>
                    )}
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
