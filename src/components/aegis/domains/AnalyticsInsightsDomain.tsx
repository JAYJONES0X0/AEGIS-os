import { SubTabKey } from "../HierarchicalNavigation";
import { AnalyticsTab } from "../tabs/AnalyticsTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Eye, 
  FileText,
  Plus,
  Download,
  Calendar
} from "lucide-react";

interface AnalyticsInsightsDomainProps {
  activeSubTab: SubTabKey;
}

export function AnalyticsInsightsDomain({ activeSubTab }: AnalyticsInsightsDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "kpis":
        return <AnalyticsTab />;
        
      case "dashboards":
        return (
          <div className="p-6 space-y-6 aegis-tab-analytics min-h-screen relative">
            {/* Cosmic background effect */}
            <div className="absolute inset-0 aegis-analytics-gradient opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Dashboards</h2>
                  <p className="text-sm text-muted-foreground">Chart sets and visual analytics</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Dashboard
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    title: "Care Quality Dashboard",
                    description: "Incident rates, satisfaction scores, and quality metrics",
                    charts: 6,
                    lastUpdated: "2 hours ago",
                    viewers: 12,
                    category: "Quality"
                  },
                  {
                    title: "Financial Performance",
                    description: "Revenue, costs, and profitability analysis",
                    charts: 8,
                    lastUpdated: "1 hour ago",
                    viewers: 8,
                    category: "Finance"
                  },
                  {
                    title: "Workforce Analytics",
                    description: "Staff utilization, training completion, and retention",
                    charts: 10,
                    lastUpdated: "30 mins ago",
                    viewers: 15,
                    category: "HR"
                  },
                  {
                    title: "Client Outcomes",
                    description: "Goal achievement, progress tracking, and satisfaction",
                    charts: 7,
                    lastUpdated: "4 hours ago",
                    viewers: 9,
                    category: "Care"
                  },
                  {
                    title: "Operational Efficiency",
                    description: "Resource utilization and process optimization",
                    charts: 5,
                    lastUpdated: "6 hours ago",
                    viewers: 6,
                    category: "Operations"
                  },
                  {
                    title: "Compliance Monitoring",
                    description: "Audit scores, policy adherence, and risk indicators",
                    charts: 9,
                    lastUpdated: "1 hour ago",
                    viewers: 11,
                    category: "Compliance"
                  }
                ].map((dashboard, index) => (
                  <Card key={index} className="aegis-ceremonial-card hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {dashboard.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{dashboard.viewers} viewers</span>
                      </div>
                      <CardTitle className="text-foreground">{dashboard.title}</CardTitle>
                      <CardDescription>{dashboard.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{dashboard.charts} charts</span>
                          <span className="text-muted-foreground">Updated {dashboard.lastUpdated}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-muted/30 hover:bg-purple-500/20">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="bg-muted/30 hover:bg-purple-500/20">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "trends":
        return (
          <div className="p-6 space-y-6 aegis-tab-analytics min-h-screen relative">
            <div className="absolute inset-0 aegis-analytics-gradient opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Trends Analysis</h2>
                  <p className="text-sm text-muted-foreground">Line charts and heatmaps for pattern identification</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    title: "Incident Trends",
                    period: "Last 12 months",
                    trend: "down",
                    change: "-15%",
                    description: "Significant reduction in safety incidents",
                    dataPoints: "Monthly aggregates",
                    chartType: "Line Chart"
                  },
                  {
                    title: "Staff Satisfaction",
                    period: "Quarterly surveys",
                    trend: "up",
                    change: "+8%",
                    description: "Improving employee engagement scores",
                    dataPoints: "Survey responses",
                    chartType: "Trend Line"
                  },
                  {
                    title: "Training Completion",
                    period: "Rolling 6 months",
                    trend: "up",
                    change: "+22%",
                    description: "Enhanced compliance with training requirements",
                    dataPoints: "Course completions",
                    chartType: "Progress Chart"
                  },
                  {
                    title: "Client Satisfaction",
                    period: "Monthly surveys",
                    trend: "stable",
                    change: "+2%",
                    description: "Consistently high satisfaction ratings",
                    dataPoints: "Survey scores",
                    chartType: "Satisfaction Index"
                  },
                  {
                    title: "Financial Performance",
                    period: "Monthly P&L",
                    trend: "up",
                    change: "+12%",
                    description: "Strong revenue growth and cost control",
                    dataPoints: "Financial metrics",
                    chartType: "Financial Trend"
                  },
                  {
                    title: "Medication Errors",
                    period: "Weekly reporting",
                    trend: "down",
                    change: "-45%",
                    description: "eMAR system showing significant impact",
                    dataPoints: "Error incidents",
                    chartType: "Error Rate Chart"
                  }
                ].map((trend, index) => (
                  <Card key={index} className={`
                    aegis-ceremonial-card border-l-4 
                    ${trend.trend === 'up' ? 'border-l-success bg-success/5' :
                      trend.trend === 'down' ? 'border-l-primary bg-primary/5' :
                      'border-l-warning bg-warning/5'}
                  `}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">{trend.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          {trend.trend === 'up' ? (
                            <TrendingUp className="w-5 h-5 text-success" />
                          ) : trend.trend === 'down' ? (
                            <TrendingDown className="w-5 h-5 text-primary" />
                          ) : (
                            <BarChart3 className="w-5 h-5 text-warning" />
                          )}
                          <Badge 
                            variant="outline" 
                            className={`
                              ${trend.trend === 'up' ? 'bg-success/20 text-success border-success/30' :
                                trend.trend === 'down' ? 'bg-primary/20 text-primary border-primary/30' :
                                'bg-warning/20 text-warning border-warning/30'}
                            `}
                          >
                            {trend.change}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{trend.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-foreground">{trend.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Data Source:</span>
                            <div className="font-medium">{trend.dataPoints}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Visualization:</span>
                            <div className="font-medium">{trend.chartType}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-muted/30 hover:bg-purple-500/20">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Chart
                          </Button>
                          <Button size="sm" variant="outline" className="bg-muted/30 hover:bg-purple-500/20">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "outcomes":
        return (
          <div className="p-6 space-y-6 aegis-tab-analytics min-h-screen relative">
            <div className="absolute inset-0 aegis-analytics-gradient opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Outcomes Analysis</h2>
                  <p className="text-sm text-muted-foreground">Client vs organizational performance metrics</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="aegis-ceremonial-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Client Outcome Metrics</CardTitle>
                      <CardDescription>Individual progress and goal achievement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { client: "John Smith", goals: 8, achieved: 6, progress: 75, outcome: "positive" },
                          { client: "Emma Johnson", goals: 12, achieved: 8, progress: 67, outcome: "positive" },
                          { client: "Michael Brown", goals: 6, achieved: 5, progress: 83, outcome: "excellent" },
                          { client: "Sarah Davis", goals: 10, achieved: 7, progress: 70, outcome: "positive" },
                          { client: "Robert Wilson", goals: 9, achieved: 4, progress: 44, outcome: "needs_support" }
                        ].map((client, index) => (
                          <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-foreground">{client.client}</h4>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${client.outcome === 'excellent' ? 'bg-success/20 text-success border-success/30' :
                                    client.outcome === 'positive' ? 'bg-primary/20 text-primary border-primary/30' :
                                    'bg-warning/20 text-warning border-warning/30'}
                                `}
                              >
                                {client.outcome === 'excellent' ? 'Excellent' :
                                 client.outcome === 'positive' ? 'Positive' :
                                 'Needs Support'}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">
                                {client.achieved}/{client.goals} goals achieved
                              </span>
                              <span className="text-sm font-medium">{client.progress}%</span>
                            </div>
                            
                            <div className="w-full bg-border rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  client.progress >= 80 ? 'bg-success' :
                                  client.progress >= 60 ? 'bg-primary' :
                                  'bg-warning'
                                }`}
                                style={{ width: `${client.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card className="aegis-ceremonial-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Organizational KPIs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Overall Satisfaction</span>
                        <span className="font-medium text-success">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Goal Achievement</span>
                        <span className="font-medium text-primary">73%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quality Score</span>
                        <span className="font-medium text-success">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Staff Retention</span>
                        <span className="font-medium text-primary">89%</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="aegis-ceremonial-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="font-medium text-success">Above Target</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Client satisfaction metrics</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span className="font-medium text-primary">On Target</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Goal achievement rates</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <div className="flex items-center gap-2 mb-1">
                          <PieChart className="w-4 h-4 text-warning" />
                          <span className="font-medium text-warning">Monitor</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Training completion</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <AnalyticsTab />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}

// Import for TrendingDown icon
import { TrendingDown } from "lucide-react";