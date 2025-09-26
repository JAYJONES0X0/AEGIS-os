import React, { useState, useEffect } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  DollarSign, TrendingUp, TrendingDown, PieChart, Receipt, CreditCard, 
  Wallet, Package, FileSpreadsheet, Package2, ShoppingCart, BarChart3 
} from "lucide-react";
import { getCurrentTheme } from "../../lib/theme-system";

interface FinanceOperationsDomainProps {
  activeTab?: string;
}

export const FinanceOperationsDomain = React.memo(function FinanceOperationsDomain({ activeTab = 'invoicing-billing' }: FinanceOperationsDomainProps) {
  const [localTab, setLocalTab] = useState(activeTab);
  const [currentTheme, setCurrentTheme] = useState('royal-gold');

  useEffect(() => {
    const theme = getCurrentTheme();
    setCurrentTheme(theme);
  }, []);

  // Get theme-specific stone texture and color
  const getThemeStoneTexture = () => {
    const themeColors = {
      'royal-gold': { primary: '#D4AF37', secondary: '#B8941F', texture: 'stone-gold' },
      'arctic-silver': { primary: '#64748B', secondary: '#475569', texture: 'stone-silver' },
      'ember-glass': { primary: '#EA580C', secondary: '#C2410C', texture: 'stone-ember' },
      'midnight-navy': { primary: '#1E40AF', secondary: '#1D4ED8', texture: 'stone-navy' },
      'verdant-jade': { primary: '#059669', secondary: '#047857', texture: 'stone-jade' },
      'obsidian-black': { primary: '#374151', secondary: '#1F2937', texture: 'stone-obsidian' },
      'marble-white': { primary: '#F3F4F6', secondary: '#E5E7EB', texture: 'stone-marble' },
      'crimson-ember': { primary: '#DC2626', secondary: '#B91C1C', texture: 'stone-crimson' },
      'sapphire-steel': { primary: '#0284C7', secondary: '#0369A1', texture: 'stone-sapphire' },
      'onyx-frost': { primary: '#4B5563', secondary: '#374151', texture: 'stone-onyx' },
      // Light themes
      'royal-gold-light': { primary: '#F59E0B', secondary: '#D97706', texture: 'stone-aurora' },
      'arctic-silver-light': { primary: '#64748B', secondary: '#475569', texture: 'stone-celeste' },
      'ember-glass-light': { primary: '#DC2626', secondary: '#B91C1C', texture: 'stone-ivory' },
      'midnight-navy-light': { primary: '#EA580C', secondary: '#C2410C', texture: 'stone-solstice' },
      'verdant-jade-light': { primary: '#64748B', secondary: '#475569', texture: 'stone-glacier' },
      'obsidian-black-light': { primary: '#8B5CF6', secondary: '#7C3AED', texture: 'stone-velour' },
      'marble-white-light': { primary: '#F59E0B', secondary: '#D97706', texture: 'stone-amberlight' },
      'crimson-ember-light': { primary: '#64748B', secondary: '#475569', texture: 'stone-titanium' },
      'sapphire-steel-light': { primary: '#F97316', secondary: '#EA580C', texture: 'stone-coral' },
      'onyx-frost-light': { primary: '#374151', secondary: '#1F2937', texture: 'stone-eclipse' }
    };
    
    return themeColors[currentTheme as keyof typeof themeColors] || themeColors['royal-gold'];
  };

  const themeTexture = getThemeStoneTexture();

  const financeKPIs = [
    { label: "Monthly Revenue", value: "£287K" },
    { label: "Operating Costs", value: "£234K" },
    { label: "Net Margin", value: "18.5%" },
    { label: "Budget Variance", value: "+£2.3K" },
    { label: "Outstanding Bills", value: "£12.4K" },
    { label: "Cash Flow", value: "£156K" }
  ];

  const budgetCategories = [
    { category: "Staffing", budgeted: 180000, actual: 175000, variance: -5000, percent: 97.2 },
    { category: "Clinical Supplies", budgeted: 25000, actual: 27500, variance: 2500, percent: 110.0 },
    { category: "Facilities", budgeted: 15000, actual: 14200, variance: -800, percent: 94.7 },
    { category: "Administration", budgeted: 8000, actual: 8500, variance: 500, percent: 106.3 },
    { category: "Catering", budgeted: 12000, actual: 11800, variance: -200, percent: 98.3 },
    { category: "Utilities", budgeted: 6000, actual: 6800, variance: 800, percent: 113.3 }
  ];

  const recentTransactions = [
    { date: "2024-01-15", description: "NHS Funding Payment", amount: 45000, type: "Income", status: "Completed" },
    { date: "2024-01-14", description: "Staff Payroll", amount: -38000, type: "Expense", status: "Completed" },
    { date: "2024-01-13", description: "Medical Supplies", amount: -2800, type: "Expense", status: "Completed" },
    { date: "2024-01-12", description: "Utilities Payment", amount: -1200, type: "Expense", status: "Pending" },
    { date: "2024-01-11", description: "Equipment Maintenance", amount: -850, type: "Expense", status: "Completed" }
  ];

  const outstandingInvoices = [
    { id: "INV-2024-001", client: "NHS Trust", amount: 8500, due: "2024-01-25", overdue: false },
    { id: "INV-2024-002", client: "Private Patient", amount: 1200, due: "2024-01-20", overdue: true },
    { id: "INV-2024-003", client: "Local Authority", amount: 2700, due: "2024-01-30", overdue: false }
  ];

  const expenseBreakdown = [
    { category: "Salaries & Benefits", amount: 175000, percentage: 74.7 },
    { category: "Clinical Supplies", amount: 27500, percentage: 11.7 },
    { category: "Facilities & Maintenance", amount: 14200, percentage: 6.1 },
    { category: "Administration", amount: 8500, percentage: 3.6 },
    { category: "Utilities", amount: 6800, percentage: 2.9 },
    { category: "Other", amount: 2000, percentage: 0.9 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-red-500";
    if (variance < 0) return "text-green-500";
    return "text-gray-500";
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (variance < 0) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-500";
      case "Pending": return "text-yellow-500";
      case "Overdue": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div 
      className="p-6 space-y-8 min-h-screen aegis-tab-home relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, ${themeTexture.primary}15 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${themeTexture.secondary}10 0%, transparent 50%),
          linear-gradient(135deg, ${themeTexture.primary}05 0%, transparent 50%, ${themeTexture.secondary}05 100%)
        `,
        backgroundSize: '100% 100%, 80% 80%, 100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Finance & Operations
          </h1>
          <p className="text-muted-foreground mt-1">
            Financial management, budgeting, and operational oversight
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Financial period: January 2024 • {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">Budget on track</span>
          </div>
        </div>
      </div>

      <Tabs value={localTab} onValueChange={setLocalTab} className="space-y-6">
        <TabsList 
          className="grid w-full grid-cols-8 text-xs" 
          style={{
            background: 'rgba(18, 22, 28, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            backdropFilter: 'none'
          }}
        >
          <TabsTrigger value="invoicing-billing" className="text-xs flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Invoicing
          </TabsTrigger>
          <TabsTrigger value="client-money" className="text-xs flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Client Money
          </TabsTrigger>
          <TabsTrigger value="funding-packages" className="text-xs flex items-center gap-2">
            <Package className="w-4 h-4" />
            Funding
          </TabsTrigger>
          <TabsTrigger value="payroll-exports" className="text-xs flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="budget-variance" className="text-xs flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="ae-inventory" className="text-xs flex items-center gap-2">
            <Package2 className="w-4 h-4" />
            AE Inventory
          </TabsTrigger>
          <TabsTrigger value="procurement" className="text-xs flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Procurement
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoicing-billing" className="space-y-6">
          <Section title="Financial Overview">
            <KpiGrid kpis={financeKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card 
              className="transition-all duration-500 ease-in-out aegis-ceremonial-hover"
              style={{
                background: 'rgba(18, 22, 28, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'none'
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-2"
                  style={{ color: themeTexture.primary, textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                >
                  <PieChart className="w-5 h-5 drop-shadow-sm" style={{ color: themeTexture.primary }} />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseBreakdown.slice(0, 4).map((expense, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{expense.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{formatCurrency(expense.amount)}</span>
                          <span className="text-xs text-muted-foreground">
                            ({expense.percentage}%)
                          </span>
                        </div>
                      </div>
                      <Progress value={expense.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card 
              className="transition-all duration-500 ease-in-out aegis-ceremonial-hover"
              style={{
                background: 'rgba(18, 22, 28, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'none'
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-2"
                  style={{ color: themeTexture.primary, textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                >
                  <Receipt className="w-5 h-5 drop-shadow-sm" style={{ color: themeTexture.primary }} />
                  Outstanding Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {outstandingInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{invoice.id}</div>
                        <div className="text-xs text-muted-foreground">{invoice.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(invoice.amount)}</div>
                        <div className={`text-xs ${invoice.overdue ? 'text-red-500' : 'text-muted-foreground'}`}>
                          Due: {invoice.due}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="client-money" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <Wallet className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Client Money Management</h3>
                <p className="text-sm text-muted-foreground">Service user financial management coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="funding-packages" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <Package className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Funding Packages</h3>
                <p className="text-sm text-muted-foreground">Funding and commissioning management coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payroll-exports" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Payroll Exports & Reports</h3>
                <p className="text-sm text-muted-foreground">Payroll management and export tools coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="budget-variance" className="space-y-6">
          <Section title="Budget vs Actual">
            <div className="grid gap-4">
              {budgetCategories.map((budget, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{budget.category}</div>
                          <div className="text-sm text-muted-foreground">
                            Budgeted: {formatCurrency(budget.budgeted)} • 
                            Actual: {formatCurrency(budget.actual)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            {getVarianceIcon(budget.variance)}
                            <span className={`font-bold ${getVarianceColor(budget.variance)}`}>
                              {formatCurrency(Math.abs(budget.variance))}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">Variance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{budget.percent}%</div>
                          <div className="text-xs text-muted-foreground">of Budget</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="ae-inventory" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <Package2 className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">AE Inventory System</h3>
                <p className="text-sm text-muted-foreground">Navigate to AE Inventory from the main tab for full inventory management</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Procurement</h3>
                <p className="text-sm text-muted-foreground">Purchase management and supplier relations coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Section title="Financial Analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Revenue Growth", value: "+5.2%", trend: "up" },
                      { metric: "Cost Control", value: "-2.1%", trend: "down" },
                      { metric: "Profit Margin", value: "18.5%", trend: "up" },
                      { metric: "Cash Flow", value: "+£12K", trend: "up" }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {metric.value}
                          </span>
                          {metric.trend === 'up' ? 
                            <TrendingUp className="w-4 h-4 text-green-500" /> : 
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { report: "Monthly P&L Statement", date: "January 2024", status: "Ready" },
                      { report: "Budget vs Actual", date: "Q4 2023", status: "Ready" },
                      { report: "Cash Flow Analysis", date: "December 2023", status: "Generating" },
                      { report: "Cost Center Report", date: "January 2024", status: "Pending" }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{report.report}</div>
                          <div className="text-xs text-muted-foreground">{report.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === "Ready" ? "default" : "outline"}>
                            {report.status}
                          </Badge>
                          {report.status === "Ready" && (
                            <Button variant="ghost" size="sm">Download</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
});