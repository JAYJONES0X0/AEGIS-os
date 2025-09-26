import { useState } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart3, TrendingUp, PieChart, Activity, Brain, Target } from "lucide-react";

export function AnalyticsInsightsDomain() {
  const [activeTab, setActiveTab] = useState("overview");

  const analyticsKPIs = [
    { label: "Data Points", value: "2.4M" },
    { label: "Active Dashboards", value: "23" },
    { label: "Insights Generated", value: "147" },
    { label: "Prediction Accuracy", value: "94.2%" },
    { label: "Reports Generated", value: "89" },
    { label: "Trend Analysis", value: "12 Active" }
  ];

  const keyInsights = [
    {
      id: 1,
      title: "Medication Adherence Improvement",
      description: "Residents with structured medication schedules show 15% better adherence rates",
      impact: "High",
      confidence: 92,
      category: "Clinical"
    },
    {
      id: 2,
      title: "Staffing Optimization Opportunity",
      description: "Night shift patterns suggest potential for 12% efficiency improvement",
      impact: "Medium",
      confidence: 87,
      category: "Operations"
    },
    {
      id: 3,
      title: "Quality Score Correlation",
      description: "Family visit frequency strongly correlates with resident satisfaction scores",
      impact: "High",
      confidence: 94,
      category: "Quality"
    }
  ];

  const performanceMetrics = [
    { metric: "Patient Outcomes", current: 94, target: 95, trend: "+2.3%" },
    { metric: "Operational Efficiency", current: 87, target: 90, trend: "+5.1%" },
    { metric: "Staff Satisfaction", current: 82, target: 85, trend: "-1.2%" },
    { metric: "Cost Optimization", current: 91, target: 88, trend: "+3.8%" },
    { metric: "Quality Compliance", current: 96, target: 95, trend: "+1.5%" },
    { metric: "Technology Adoption", current: 78, target: 85, trend: "+8.2%" }
  ];

  const predictiveModels = [
    {
      model: "Resident Health Risk Assessment",
      accuracy: 94.2,
      lastTrained: "2 days ago",
      predictions: 156,
      status: "Active"
    },
    {
      model: "Staff Turnover Prediction",
      accuracy: 87.5,
      lastTrained: "1 week ago",
      predictions: 23,
      status: "Active"
    },
    {
      model: "Resource Demand Forecasting",
      accuracy: 91.8,
      lastTrained: "3 days ago",
      predictions: 78,
      status: "Active"
    },
    {
      model: "Quality Score Prediction",
      accuracy: 89.3,
      lastTrained: "5 days ago",
      predictions: 45,
      status: "Training"
    }
  ];

  const dashboards = [
    { name: "Executive Dashboard", users: 8, lastViewed: "2 hours ago", status: "Active" },
    { name: "Clinical Outcomes", users: 15, lastViewed: "30 minutes ago", status: "Active" },
    { name: "Operational Metrics", users: 12, lastViewed: "1 hour ago", status: "Active" },
    { name: "Financial Analytics", users: 6, lastViewed: "4 hours ago", status: "Active" },
    { name: "Quality Assurance", users: 9, lastViewed: "1 hour ago", status: "Active" },
    { name: "Workforce Analytics", users: 7, lastViewed: "3 hours ago", status: "Active" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? "text-green-500" : "text-red-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-500";
      case "Training": return "text-yellow-500";
      case "Inactive": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Data analytics, predictive insights, and performance intelligence
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Last data refresh: {new Date().toLocaleTimeString()} • Real-time
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">All models active</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="insights" className="text-sm">AI Insights</TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
          <TabsTrigger value="dashboards" className="text-sm">Dashboards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Section title="Analytics Overview">
            <KpiGrid kpis={analyticsKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keyInsights.slice(0, 3).map((insight) => (
                    <div key={insight.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-sm">{insight.title}</div>
                        <Badge variant={getImpactColor(insight.impact) as any}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {insight.description}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{insight.category}</span>
                        <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Predictive Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictiveModels.slice(0, 3).map((model, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{model.model}</div>
                        <div className={`text-xs ${getStatusColor(model.status)}`}>
                          {model.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {model.predictions} predictions
                        </span>
                        <span className="text-xs font-medium">
                          {model.accuracy}% accuracy
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Section title="AI-Generated Insights">
            <div className="grid gap-4">
              {keyInsights.map((insight) => (
                <Card key={insight.id} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{insight.title}</div>
                          <div className="text-muted-foreground mt-1">{insight.description}</div>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-sm text-muted-foreground">
                              Category: {insight.category}
                            </span>
                            <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                              Confidence: {insight.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getImpactColor(insight.impact) as any} className="text-sm">
                          {insight.impact} Impact
                        </Badge>
                        <Button variant="default" size="sm">
                          Explore
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Section title="Performance Analytics">
            <div className="grid gap-4">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{metric.metric}</div>
                          <div className="text-sm text-muted-foreground">
                            Target: {metric.target}% • Trend: {metric.trend}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{metric.current}%</div>
                          <div className="text-xs text-muted-foreground">Current</div>
                        </div>
                        <div className="w-24">
                          <Progress value={metric.current} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-6">
          <Section title="Dashboard Management">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Dashboards</CardTitle>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Create Dashboard
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dashboards.map((dashboard, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{dashboard.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {dashboard.users} active users
                          </div>
                        </div>
                        <Badge variant="outline">{dashboard.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Last viewed: {dashboard.lastViewed}
                        </span>
                        <Button variant="ghost" size="sm">Open</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}