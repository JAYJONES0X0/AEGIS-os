import { SubTabKey } from "../HierarchicalNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  Receipt, 
  CreditCard, 
  DollarSign, 
  Download, 
  BarChart3,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";

interface FinanceOperationsDomainProps {
  activeSubTab: SubTabKey;
}

export function FinanceOperationsDomain({ activeSubTab }: FinanceOperationsDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "invoicing":
        return (
          <div className="p-6 space-y-6 aegis-tab-finance min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Invoicing</h2>
                <p className="text-sm text-muted-foreground">Package grid - client billing and revenue management</p>
              </div>
              <Button className="bg-success hover:bg-success/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="aegis-ceremonial-card border border-success/20">
                  <CardHeader>
                    <CardTitle className="text-foreground">Current Month Invoices</CardTitle>
                    <CardDescription>September 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aegis-data-grid">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Invoice #</th>
                            <th className="text-left p-3">Client</th>
                            <th className="text-left p-3">Commissioner</th>
                            <th className="text-right p-3">Amount</th>
                            <th className="text-center p-3">Due Date</th>
                            <th className="text-center p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { invoice: "INV-2024-0892", client: "John Smith", commissioner: "County Council", amount: 2450.00, due: "2024-09-30", status: "sent", overdue: false },
                            { invoice: "INV-2024-0893", client: "Emma Johnson", commissioner: "NHS Trust", amount: 3200.50, due: "2024-10-05", status: "draft", overdue: false },
                            { invoice: "INV-2024-0894", client: "Michael Brown", commissioner: "County Council", amount: 1875.25, due: "2024-09-28", status: "paid", overdue: false },
                            { invoice: "INV-2024-0895", client: "Sarah Davis", commissioner: "Clinical CCG", amount: 2890.75, due: "2024-09-15", status: "overdue", overdue: true },
                            { invoice: "INV-2024-0896", client: "Robert Wilson", commissioner: "NHS Trust", amount: 4125.00, due: "2024-10-01", status: "sent", overdue: false }
                          ].map((invoice, index) => (
                            <tr key={index} className={`border-b border-border/50 hover:bg-muted/20 ${invoice.overdue ? 'bg-destructive/5' : ''}`}>
                              <td className="p-3 font-mono font-medium">{invoice.invoice}</td>
                              <td className="p-3">{invoice.client}</td>
                              <td className="p-3 text-muted-foreground">{invoice.commissioner}</td>
                              <td className="p-3 text-right font-medium text-success">£{invoice.amount.toFixed(2)}</td>
                              <td className="p-3 text-center font-mono text-sm">{invoice.due}</td>
                              <td className="p-3 text-center">
                                <Badge 
                                  variant={invoice.status === 'paid' ? 'default' : 
                                          invoice.status === 'sent' ? 'secondary' : 
                                          invoice.status === 'overdue' ? 'destructive' : 'outline'}
                                  className={
                                    invoice.status === 'paid' ? 'bg-success/20 text-success border-success/30' :
                                    invoice.status === 'sent' ? 'bg-primary/20 text-primary border-primary/30' :
                                    invoice.status === 'overdue' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                                    'bg-muted/50'
                                  }
                                >
                                  {invoice.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Invoiced</span>
                      <span className="font-medium text-success">£14,541.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Paid</span>
                      <span className="font-medium text-success">£8,325.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Outstanding</span>
                      <span className="font-medium text-warning">£6,216.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Overdue</span>
                      <span className="font-medium text-destructive">£2,890.75</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start aegis-finance-hover">
                      <Receipt className="w-4 h-4 mr-2" />
                      Bulk Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start aegis-finance-hover">
                      <Download className="w-4 h-4 mr-2" />
                      Export Invoices
                    </Button>
                    <Button variant="outline" className="w-full justify-start aegis-finance-hover">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Chase Overdue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "funding":
        return (
          <div className="p-6 space-y-6 aegis-tab-finance min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Funding Packages</h2>
                <p className="text-sm text-muted-foreground">LA/CCG schedules and package management</p>
              </div>
              <Button className="bg-success hover:bg-success/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Package
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  client: "John Smith",
                  commissioner: "Northshire County Council",
                  package: "Residential Care",
                  weeklyRate: 875.00,
                  startDate: "2024-01-15",
                  reviewDate: "2024-12-15",
                  status: "active",
                  riskLevel: "low"
                },
                {
                  client: "Emma Johnson",
                  commissioner: "NHS Greater Manchester",
                  package: "Supported Living + Health",
                  weeklyRate: 1250.50,
                  startDate: "2024-03-20",
                  reviewDate: "2024-10-20",
                  status: "review",
                  riskLevel: "medium"
                },
                {
                  client: "Michael Brown",
                  commissioner: "Southend Clinical CCG",
                  package: "Day Services",
                  weeklyRate: 435.25,
                  startDate: "2023-09-10",
                  reviewDate: "2024-09-30",
                  status: "pending",
                  riskLevel: "high"
                },
                {
                  client: "Sarah Davis",
                  commissioner: "West Sussex County Council",
                  package: "Residential Care + Nursing",
                  weeklyRate: 1125.75,
                  startDate: "2024-06-01",
                  reviewDate: "2025-06-01",
                  status: "active",
                  riskLevel: "low"
                }
              ].map((package_item, index) => (
                <Card key={index} className={`
                  aegis-ceremonial-card border-l-4 
                  ${package_item.riskLevel === 'high' ? 'border-l-destructive bg-destructive/5' :
                    package_item.riskLevel === 'medium' ? 'border-l-warning bg-warning/5' :
                    'border-l-success bg-success/5'}
                `}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">{package_item.client}</CardTitle>
                      <Badge 
                        variant={package_item.status === 'active' ? 'default' : 
                                package_item.status === 'review' ? 'secondary' : 'outline'}
                        className={
                          package_item.status === 'active' ? 'bg-success/20 text-success border-success/30' :
                          package_item.status === 'review' ? 'bg-warning/20 text-warning border-warning/30' :
                          'bg-muted/50'
                        }
                      >
                        {package_item.status}
                      </Badge>
                    </div>
                    <CardDescription>{package_item.commissioner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{package_item.package}</h4>
                        <div className="text-2xl font-bold text-success">
                          £{package_item.weeklyRate.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/week</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Start Date:</span>
                          <div className="font-mono">{package_item.startDate}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Review Due:</span>
                          <div className="font-mono">{package_item.reviewDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="aegis-finance-hover">
                          <CreditCard className="w-4 h-4 mr-2" />
                          View Package
                        </Button>
                        <Button size="sm" variant="outline" className="aegis-finance-hover">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Usage Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "reports":
        return (
          <div className="p-6 space-y-6 aegis-tab-finance min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Financial Reports</h2>
                <p className="text-sm text-muted-foreground">Profit/loss and financial analytics</p>
              </div>
              <Button className="bg-success hover:bg-success/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly P&L Summary</CardTitle>
                  <CardDescription>September 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Revenue</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="font-medium text-success">£45,325.50</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Staff Costs</span>
                      <span className="font-medium text-destructive">£28,450.25</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Operating Expenses</span>
                      <span className="font-medium text-destructive">£8,725.80</span>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Net Profit</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="font-bold text-success">£8,149.45</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">+12.5% vs last month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Cash Flow</CardTitle>
                  <CardDescription>Current financial position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cash at Bank</span>
                      <span className="font-medium text-success">£24,567.85</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Outstanding Invoices</span>
                      <span className="font-medium text-warning">£18,432.50</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pending Payments</span>
                      <span className="font-medium text-destructive">£12,890.30</span>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Projected Cash</span>
                        <span className="font-bold text-success">£30,110.05</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">End of month forecast</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-6 space-y-6 aegis-tab-finance min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Finance & Operations</h2>
                <p className="text-sm text-muted-foreground">Bloomberg-terminal style financial management</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="aegis-ceremonial-card border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-success">£45,325</p>
                    </div>
                    <Receipt className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="aegis-ceremonial-card border-destructive/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Staff Costs</p>
                      <p className="text-2xl font-bold text-destructive">£28,450</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="aegis-ceremonial-card border-warning/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Outstanding</p>
                      <p className="text-2xl font-bold text-warning">£18,432</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="aegis-ceremonial-card border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Profit</p>
                      <p className="text-2xl font-bold text-success">£8,149</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}