import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BarChart3, Users, Calendar, Clock, FileText, Download, 
  Activity, CheckSquare, Pill, MapPin, TrendingUp, AlertTriangle,
  ArrowRight, Search, Filter, Plus, Eye, Settings, Share2
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface ReportsDomainProps {
  activeTab: string;
}

export function ReportsDomain({ activeTab }: ReportsDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Reports sections organized like Nourish but enhanced for AEGIS
  const reportSections = {
    carerReports: {
      title: "Staff & Carer Reports",
      icon: <Users className="w-5 h-5" />,
      color: "success",
      items: [
        { id: "carer-roster", name: "Staff Roster Report", icon: <Calendar className="w-4 h-4" />, description: "Staff scheduling and roster analysis", format: "PDF", lastRun: "2 hours ago", size: "2.4 MB" },
        { id: "time-off", name: "Time Off Analysis", icon: <Clock className="w-4 h-4" />, description: "Staff time off patterns", format: "PDF", lastRun: "4 hours ago", size: "956 KB" },
        { id: "training-matrix", name: "Training Matrix", icon: <CheckSquare className="w-4 h-4" />, description: "Staff training requirements", format: "Excel", lastRun: "2 hours ago", size: "2.8 MB" }
      ]
    },
    clientReports: {
      title: "Client Reports",
      icon: <FileText className="w-5 h-5" />,
      color: "cyan",
      items: [
        { id: "client-roster", name: "Client Roster Report", icon: <Calendar className="w-4 h-4" />, description: "Client scheduling overview", format: "PDF", lastRun: "1 hour ago", size: "2.7 MB" },
        { id: "client-outcomes", name: "Client Outcomes", icon: <TrendingUp className="w-4 h-4" />, description: "Client care outcomes", format: "Excel", lastRun: "4 hours ago", size: "2.3 MB" },
        { id: "medication-record", name: "Medication Record", icon: <Pill className="w-4 h-4" />, description: "AE medication administration", format: "PDF", lastRun: "2 hours ago", size: "2.8 MB" }
      ]
    },
    exports: {
      title: "Data Exports & Analytics",
      icon: <Download className="w-5 h-5" />,
      color: "primary",
      items: [
        { id: "activity-logs", name: "Activity Analytics", icon: <BarChart3 className="w-4 h-4" />, description: "System usage analytics", format: "Excel", lastRun: "6 hours ago", size: "5.7 MB" },
        { id: "financial-export", name: "Financial Export", icon: <Download className="w-4 h-4" />, description: "Financial data export", format: "CSV", lastRun: "1 day ago", size: "8.9 MB" }
      ]
    }
  };

  const renderReportsOverview = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search and Controls */}
      <Card className="aegis-glass-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80"
            />
            <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
              <Settings className="w-4 h-4 mr-2" />
              Schedule Reports
            </Button>
            <Button size="sm" className="aegis-ceremonial-hover">
              <Plus className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Reports Sections */}
      <div className="space-y-8">
        {Object.entries(reportSections).map(([sectionKey, section]) => (
          <motion.div
            key={sectionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Object.keys(reportSections).indexOf(sectionKey) * 0.1 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-${section.color}/10 border border-${section.color}/20`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.items.length} available reports
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items
                  .filter(item => 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="group relative"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedReport(item.id)}
                    >
                      <Card className="p-4 cursor-pointer aegis-ceremonial-hover border-border/50 hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-primary/10 text-primary">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </h4>
                              <Badge variant="outline" size="sm" className="mt-1">
                                {item.format}
                              </Badge>
                            </div>
                          </div>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ x: 2 }}
                          >
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </motion.div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div>Last run: {item.lastRun}</div>
                          <div>{item.size}</div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="aegis-glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Report Activity</h3>
        <div className="space-y-3">
          {[
            { report: "Staff Roster Report", action: "Generated", time: "2 hours ago", user: "Sarah Mitchell AE" },
            { report: "Medication Administration Record", action: "Downloaded", time: "3 hours ago", user: "James Patterson AE" },
            { report: "Client Outcomes", action: "Shared", time: "4 hours ago", user: "Emma Thompson AE" },
            { report: "Training Matrix", action: "Scheduled", time: "6 hours ago", user: "System" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium text-sm">{activity.report}</div>
                  <div className="text-xs text-muted-foreground">{activity.action} by {activity.user}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );

  const renderDetailView = () => {
    const currentReport = Object.values(reportSections)
      .flatMap(section => section.items)
      .find(item => item.id === selectedReport);

    if (!currentReport) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedReport(null)}
            className="aegis-ceremonial-hover"
          >
            ← Back to Reports
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-primary/10 text-primary">
              {currentReport.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentReport.name}</h2>
              <p className="text-sm text-muted-foreground">{currentReport.description}</p>
            </div>
          </div>
        </div>

        <Card className="aegis-glass-panel p-8">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 inline-block">
              {currentReport.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{currentReport.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Advanced reporting interface for {currentReport.name.toLowerCase()}. 
                Configure parameters, schedule automatic generation, and share with stakeholders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-primary">{currentReport.format}</div>
                <div className="text-sm text-muted-foreground">Format</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-success">{currentReport.size}</div>
                <div className="text-sm text-muted-foreground">File Size</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-warning">{currentReport.lastRun}</div>
                <div className="text-sm text-muted-foreground">Last Generated</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button className="aegis-ceremonial-hover">
                <Eye className="w-4 h-4 mr-2" />
                Preview Report
              </Button>
              <Button variant="outline" className="aegis-ceremonial-hover">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="aegis-ceremonial-hover">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="p-6 min-h-screen aegis-tab-home">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          AEGIS Reports & Analytics
        </h1>
        <p className="text-muted-foreground">
          Comprehensive reporting system with advanced analytics and data export capabilities
        </p>
      </motion.div>

      {selectedReport ? renderDetailView() : renderReportsOverview()}
    </div>
  );
}