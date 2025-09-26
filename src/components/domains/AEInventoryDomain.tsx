import React, { useState, useEffect } from "react";
import { Section } from "../common/Section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { 
  Package, Package2, ShoppingCart, TrendingUp, TrendingDown, AlertTriangle,
  Search, Filter, Plus, Minus, Edit, Trash2, Eye, BarChart3, 
  Truck, Calendar, CheckCircle, XCircle, Clock, Zap, Target,
  DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight, Settings
} from "lucide-react";

interface AEInventoryDomainProps {
  activeTab?: string;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  lastRestock: string;
  nextReorder: string;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  totalValue: number;
}

export const AEInventoryDomain = React.memo(function AEInventoryDomain({ activeTab = 'overview' }: AEInventoryDomainProps) {
  const [localTab, setLocalTab] = useState(activeTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [autoReorder, setAutoReorder] = useState(true);

  // Mock inventory data
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "INV-001",
      name: "Disposable Gloves (Nitrile)",
      category: "PPE",
      sku: "PPE-GLV-001",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unit: "boxes",
      unitCost: 12.50,
      supplier: "MedSupply Ltd",
      location: "Store Room A",
      status: "in-stock",
      lastRestock: "2024-01-10",
      nextReorder: "2024-02-01"
    },
    {
      id: "INV-002",
      name: "Surgical Masks",
      category: "PPE",
      sku: "PPE-MSK-001",
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      unit: "boxes",
      unitCost: 8.75,
      supplier: "Healthcare Direct",
      location: "Store Room A",
      status: "low-stock",
      lastRestock: "2024-01-05",
      nextReorder: "2024-01-20"
    },
    {
      id: "INV-003",
      name: "Hand Sanitizer 500ml",
      category: "Hygiene",
      sku: "HYG-SAN-001",
      currentStock: 0,
      minStock: 20,
      maxStock: 100,
      unit: "bottles",
      unitCost: 4.50,
      supplier: "CleanCare Solutions",
      location: "Store Room B",
      status: "out-of-stock",
      lastRestock: "2023-12-28",
      nextReorder: "2024-01-18"
    },
    {
      id: "INV-004",
      name: "Bed Sheets (Cotton)",
      category: "Linen",
      sku: "LIN-SHT-001",
      currentStock: 75,
      minStock: 40,
      maxStock: 120,
      unit: "pieces",
      unitCost: 18.00,
      supplier: "Comfort Textiles",
      location: "Linen Store",
      status: "in-stock",
      lastRestock: "2024-01-12",
      nextReorder: "2024-02-10"
    },
    {
      id: "INV-005",
      name: "Cleaning Supplies Kit",
      category: "Cleaning",
      sku: "CLN-KIT-001",
      currentStock: 45,
      minStock: 30,
      maxStock: 80,
      unit: "kits",
      unitCost: 25.00,
      supplier: "Professional Clean",
      location: "Cleaning Store",
      status: "on-order",
      lastRestock: "2024-01-08",
      nextReorder: "2024-01-25"
    }
  ]);

  // Mock purchase orders
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: "PO-2024-001",
      supplier: "MedSupply Ltd",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-22",
      status: "confirmed",
      items: 5,
      totalValue: 1250.00
    },
    {
      id: "PO-2024-002",
      supplier: "Healthcare Direct",
      orderDate: "2024-01-14",
      expectedDelivery: "2024-01-20",
      status: "shipped",
      items: 3,
      totalValue: 875.50
    },
    {
      id: "PO-2024-003",
      supplier: "CleanCare Solutions",
      orderDate: "2024-01-16",
      expectedDelivery: "2024-01-24",
      status: "pending",
      items: 8,
      totalValue: 2100.00
    }
  ]);

  // Calculate inventory metrics
  const inventoryMetrics = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0),
    lowStockItems: inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length,
    reorderAlerts: inventoryItems.filter(item => item.currentStock <= item.minStock).length
  };

  const categories = ["all", ...Array.from(new Set(inventoryItems.map(item => item.category)))];

  // Filter items based on search and category
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-500';
      case 'low-stock': return 'text-yellow-500';
      case 'out-of-stock': return 'text-red-500';
      case 'on-order': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock': return 'default';
      case 'low-stock': return 'secondary';
      case 'out-of-stock': return 'destructive';
      case 'on-order': return 'outline';
      default: return 'outline';
    }
  };

  const getPOStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-500';
      case 'shipped': return 'text-blue-500';
      case 'confirmed': return 'text-purple-500';
      case 'pending': return 'text-yellow-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleStockAdjustment = (itemId: string, adjustment: number) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.currentStock + adjustment);
        let newStatus = item.status;
        
        if (newStock === 0) newStatus = 'out-of-stock';
        else if (newStock <= item.minStock) newStatus = 'low-stock';
        else if (newStock >= item.minStock) newStatus = 'in-stock';
        
        return { ...item, currentStock: newStock, status: newStatus };
      }
      return item;
    }));
  };

  const handleReorder = (itemId: string) => {
    // Simulate reorder process
    setInventoryItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, status: 'on-order' };
      }
      return item;
    }));
    
    // Add new purchase order
    const item = inventoryItems.find(i => i.id === itemId);
    if (item) {
      const newPO: PurchaseOrder = {
        id: `PO-2024-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        supplier: item.supplier,
        orderDate: new Date().toISOString().split('T')[0],
        expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        items: 1,
        totalValue: item.unitCost * (item.maxStock - item.currentStock)
      };
      setPurchaseOrders(prev => [newPO, ...prev]);
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            AE Inventory Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete inventory control with AI-powered optimization
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Last sync: {new Date().toLocaleTimeString()} • Auto-reorder: {autoReorder ? 'ON' : 'OFF'}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">System Active</span>
          </div>
        </div>
      </div>

      <Tabs value={localTab} onValueChange={setLocalTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 bg-card/50 backdrop-blur-sm text-xs">
          <TabsTrigger value="overview" className="text-xs flex items-center gap-2">
            <Package className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs flex items-center gap-2">
            <Package2 className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="purchase-orders" className="text-xs flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="text-xs flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{inventoryMetrics.totalItems}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-500">+5% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="aegis-ceremonial-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold">£{inventoryMetrics.totalValue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-500">+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="aegis-ceremonial-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                    <p className="text-2xl font-bold text-yellow-500">{inventoryMetrics.lowStockItems}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="mt-2">
                  <span className="text-xs text-red-500">Requires attention</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="aegis-ceremonial-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Orders</p>
                    <p className="text-2xl font-bold">{purchaseOrders.filter(po => po.status !== 'delivered').length}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-2">
                  <span className="text-xs text-blue-500">2 arriving today</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                      <div>
                        <div className="font-medium text-sm">Stock Used: Surgical Masks</div>
                        <div className="text-xs text-muted-foreground">25 boxes consumed</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="font-medium text-sm">Restock: Disposable Gloves</div>
                        <div className="text-xs text-muted-foreground">100 boxes added</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="font-medium text-sm">Order Placed: Hand Sanitizer</div>
                        <div className="text-xs text-muted-foreground">PO-2024-003 created</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-16 flex flex-col gap-2" variant="outline">
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">Add Item</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2" variant="outline">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-sm">Create Order</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2" variant="outline">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm">View Report</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2" variant="outline">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm">Check Alerts</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          {/* Search and Filter Controls */}
          <Card className="aegis-ceremonial-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search items by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Items Grid */}
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="aegis-ceremonial-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          SKU: {item.sku} • {item.category} • {item.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Supplier: {item.supplier}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {/* Stock Level */}
                      <div className="text-center">
                        <div className="text-2xl font-bold">{item.currentStock}</div>
                        <div className="text-xs text-muted-foreground">{item.unit}</div>
                        <Progress 
                          value={(item.currentStock / item.maxStock) * 100} 
                          className="w-20 h-2 mt-1"
                        />
                      </div>
                      
                      {/* Status */}
                      <div className="text-center">
                        <Badge variant={getStatusBadge(item.status) as any}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Min: {item.minStock} • Max: {item.maxStock}
                        </div>
                      </div>
                      
                      {/* Value */}
                      <div className="text-center">
                        <div className="text-lg font-bold">£{(item.currentStock * item.unitCost).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">
                          £{item.unitCost.toFixed(2)} per {item.unit.slice(0, -1)}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStockAdjustment(item.id, -1)}
                          disabled={item.currentStock === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStockAdjustment(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        {(item.status === 'low-stock' || item.status === 'out-of-stock') && (
                          <Button
                            size="sm"
                            onClick={() => handleReorder(item.id)}
                            disabled={item.status === 'on-order'}
                          >
                            Reorder
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Purchase Orders</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          </div>
          
          <div className="grid gap-4">
            {purchaseOrders.map((order) => (
              <Card key={order.id} className="aegis-ceremonial-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.supplier} • {order.items} items
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ordered: {order.orderDate} • Expected: {order.expectedDelivery}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">£{order.totalValue.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">Total Value</div>
                      </div>
                      
                      <Badge variant={order.status === 'delivered' ? 'default' : 'outline'}>
                        {order.status}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <Truck className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Supplier Management</h3>
                <p className="text-sm text-muted-foreground">Comprehensive supplier database and performance tracking</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Inventory Analytics</h3>
                <p className="text-sm text-muted-foreground">Advanced analytics and reporting dashboard</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems
                  .filter(item => item.currentStock <= item.minStock)
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Current: {item.currentStock} {item.unit} • Minimum: {item.minStock} {item.unit}
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleReorder(item.id)}>
                        Reorder Now
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle>Inventory Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-Reorder</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically create purchase orders when stock reaches minimum level
                  </div>
                </div>
                <Switch checked={autoReorder} onCheckedChange={setAutoReorder} />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low stock alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order delivery notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Supplier performance alerts</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});