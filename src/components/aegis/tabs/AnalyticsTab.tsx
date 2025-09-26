import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ChartPlaceholder } from "../ChartPlaceholder";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Button } from "../../ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Target,
  Activity,
  Users,
  AlertTriangle
} from "lucide-react";
import { mockAnalytics } from "../../../lib/mock-data";

export function AnalyticsTab() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
          <p className="text-muted-foreground">
            Performance metrics, trends and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" />
              MAR Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.mar_compliance.current}%</div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-sm text-green-600">
                vs {mockAnalytics.mar_compliance.target}% target
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Incident Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.incident_rate.current}</div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingDown className="h-3 w-3 text-red-600" />
              <span className="text-sm text-muted-foreground">
                per 1000 care hours
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Training Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.training_compliance.current}%</div>
            <div className="flex items-center gap-2 mt-1">
              <Target className="h-3 w-3 text-amber-600" />
              <span className="text-sm text-amber-600">
                {mockAnalytics.training_compliance.target - mockAnalytics.training_compliance.current}% to target
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Audit Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.audit_scores.current}%</div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-sm text-green-600">
                +{mockAnalytics.audit_scores.current - mockAnalytics.audit_scores.target}% vs target
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Compliance Trends"
              type="line"
              trend="up"
              trendValue="+2.4%"
              data={[
                { label: "MAR", value: 94 },
                { label: "Training", value: 87 },
                { label: "Audits", value: 92 },
                { label: "Policies", value: 89 }
              ]}
            />
            
            <ChartPlaceholder
              title="Incident Distribution"
              type="pie"
              data={[
                { label: "Falls", value: 45 },
                { label: "Medication", value: 20 },
                { label: "Behavioral", value: 25 },
                { label: "Other", value: 10 }
              ]}
            />
            
            <ChartPlaceholder
              title="Staff Utilization"
              type="bar"
              trend="stable"
              trendValue="0.2%"
              data={[
                { label: "Day Shift", value: 92 },
                { label: "Evening", value: 87 },
                { label: "Night", value: 78 },
                { label: "Weekend", value: 85 }
              ]}
            />
            
            <ChartPlaceholder
              title="Care Plan Outcomes"
              type="area"
              trend="up"
              trendValue="+5.1%"
              data={[
                { label: "Achieved", value: 78 },
                { label: "Progress", value: 15 },
                { label: "Not Met", value: 7 }
              ]}
            />
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">Strengths</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Audit scores exceed targets</li>
                    <li>• MAR compliance improving</li>
                    <li>• Incident response times good</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-600">Areas for Improvement</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Training compliance below target</li>
                    <li>• Night shift utilization low</li>
                    <li>• Policy acknowledgment gaps</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-600">Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Schedule training refreshers</li>
                    <li>• Review night shift patterns</li>
                    <li>• Automated policy reminders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Medication Administration"
              type="line"
              trend="up"
              trendValue="+1.2%"
              data={[
                { label: "Given", value: 94 },
                { label: "Refused", value: 3 },
                { label: "Omitted", value: 2 },
                { label: "Withheld", value: 1 }
              ]}
            />
            
            <ChartPlaceholder
              title="Clinical Indicators"
              type="bar"
              data={[
                { label: "Falls Rate", value: 2.1 },
                { label: "Pressure Ulcers", value: 0.3 },
                { label: "Infections", value: 1.2 },
                { label: "UTI Rate", value: 0.8 }
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Resource Utilization"
              type="area"
              trend="stable"
              trendValue="+0.1%"
              data={[
                { label: "Staff Hours", value: 87 },
                { label: "Overtime", value: 12 },
                { label: "Agency Use", value: 8 },
                { label: "Sickness", value: 4 }
              ]}
            />
            
            <ChartPlaceholder
              title="Cost Analysis"
              type="bar"
              data={[
                { label: "Staffing", value: 68 },
                { label: "Supplies", value: 15 },
                { label: "Transport", value: 8 },
                { label: "Training", value: 9 }
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Audit Scores by Domain"
              type="bar"
              trend="up"
              trendValue="+3.2%"
              data={[
                { label: "Safe", value: 94 },
                { label: "Effective", value: 89 },
                { label: "Caring", value: 96 },
                { label: "Responsive", value: 87 },
                { label: "Well-led", value: 91 }
              ]}
            />
            
            <ChartPlaceholder
              title="Improvement Actions"
              type="pie"
              data={[
                { label: "Completed", value: 12 },
                { label: "In Progress", value: 8 },
                { label: "Overdue", value: 3 },
                { label: "Scheduled", value: 15 }
              ]}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quality Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-sm text-muted-foreground">Care Plan Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">89%</div>
                  <div className="text-sm text-muted-foreground">Family Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-muted-foreground">CQC Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">2.3</div>
                  <div className="text-sm text-muted-foreground">Days Incident Resolution</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}