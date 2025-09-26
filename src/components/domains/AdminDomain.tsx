import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Settings, Users, Smartphone, Pill, FileText, Calendar, MessageSquare, 
  Lock, Shield, Calendar as CalendarIcon, Mail, Building, Award, Clock, 
  BookOpen, GraduationCap, UserCheck, ClipboardList, Activity, Eye,
  BarChart3, Phone, Ban, MapPin, Database, Zap, ArrowRight, ChevronRight,
  Search, Filter, Plus, AlertTriangle, Palette
} from "lucide-react";
import { AegisLogoExporter } from "../aegis/AegisLogoExporter";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface AdminDomainProps {
  activeTab: string;
}

export function AdminDomain({ activeTab }: AdminDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Admin sections organized like Nourish but with AEGIS enhancements
  const adminSections = {
    general: {
      title: "General Administration",
      icon: <Settings className="w-5 h-5" />,
      color: "primary",
      items: [
        { id: "users", name: "User Management", icon: <Users className="w-4 h-4" />, description: "Manage user roles and permissions", count: 142, status: "active" },
        { id: "mobile-app", name: "AE Mobile App", icon: <Smartphone className="w-4 h-4" />, description: "Configure settings for the care mobile app", status: "configured" },
        { id: "emar", name: "AE eMAR System", icon: <Pill className="w-4 h-4" />, description: "Electronic medication administration", count: 89, status: "active" },
        { id: "contacts", name: "Contact Management", icon: <FileText className="w-4 h-4" />, description: "Add, edit or remove contacts", count: 256, status: "active" },
        { id: "settings", name: "System Settings", icon: <Settings className="w-4 h-4" />, description: "Configure display options and system settings", status: "configured" },
        { id: "logo-system", name: "AEGIS Logo System", icon: <Palette className="w-4 h-4" />, description: "Theme-aware logo management and export system", count: 20, status: "active" }
      ]
    },
    carers: {
      title: "Staff & Carer Management", 
      icon: <UserCheck className="w-5 h-5" />,
      color: "success",
      items: [
        { id: "skills", name: "Skills & Attributes", icon: <Award className="w-4 h-4" />, description: "Configure skills and attributes", count: 45, status: "active" },
        { id: "training", name: "Training Management", icon: <BookOpen className="w-4 h-4" />, description: "Configure training types", count: 156, status: "active" }
      ]
    },
    clients: {
      title: "Client Management",
      icon: <Users className="w-5 h-5" />,
      color: "cyan", 
      items: [
        { id: "care-plans", name: "Care Plans", icon: <ClipboardList className="w-4 h-4" />, description: "Manage care plans", count: 89, status: "active" },
        { id: "people", name: "Client Directory", icon: <Users className="w-4 h-4" />, description: "Add, manage clients", count: 245, status: "active" }
      ]
    }
  };

  const renderSectionOverview = () => (
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
              placeholder="Search admin sections..."
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
            <Badge variant="success" className="healthcare-heartbeat heartbeat-vital">
              System Online
            </Badge>
            <Button size="sm" className="aegis-ceremonial-hover">
              <Plus className="w-4 h-4 mr-2" />
              Quick Setup
            </Button>
          </div>
        </div>
      </Card>

      {/* Admin Sections Grid */}
      <div className="space-y-8">
        {Object.entries(adminSections).map(([sectionKey, section]) => (
          <motion.div
            key={sectionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Object.keys(adminSections).indexOf(sectionKey) * 0.1 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-${section.color}/10 border border-${section.color}/20`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.items.length} configuration areas
                  </p>
                </div>
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
                      onClick={() => setSelectedSection(item.id)}
                    >
                      <Card className="p-4 cursor-pointer aegis-ceremonial-hover border-border/50 hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-primary/10 text-primary">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </h4>
                              {item.count && (
                                <div className="text-xs text-muted-foreground">
                                  {item.count} items
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                item.status === 'active' ? 'success' :
                                item.status === 'configured' ? 'default' :
                                item.status === 'enabled' ? 'success' :
                                item.status === 'secured' ? 'destructive' :
                                'secondary'
                              }
                              size="sm"
                            >
                              {item.status}
                            </Badge>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ x: 2 }}
                            >
                              <ArrowRight className="w-4 h-4 text-primary" />
                            </motion.div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Last updated: Today
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="aegis-glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-success/5 border border-success/10">
            <div className="text-2xl font-bold text-success">98%</div>
            <div className="text-sm text-muted-foreground">System Health</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Active Configs</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/10">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">Pending Updates</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-cyan/5 border border-cyan/10">
            <div className="text-2xl font-bold text-cyan">1,247</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderDetailView = () => {
    const currentSection = Object.values(adminSections)
      .flatMap(section => section.items)
      .find(item => item.id === selectedSection);

    if (!currentSection) return null;

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
            onClick={() => setSelectedSection(null)}
            className="aegis-ceremonial-hover"
          >
            ← Back to Admin
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-primary/10 text-primary">
              {currentSection.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentSection.name}</h2>
              <p className="text-sm text-muted-foreground">{currentSection.description}</p>
            </div>
          </div>
        </div>

        {selectedSection === 'logo-system' ? (
          <AegisLogoExporter />
        ) : (
          <Card className="aegis-glass-panel p-8">
            <div className="text-center space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 inline-block">
                {currentSection.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentSection.name} Configuration</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Advanced configuration panel for {currentSection.name.toLowerCase()}. 
                  This section provides comprehensive management capabilities with AEGIS integration.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button className="aegis-ceremonial-hover">
                  Configure Settings
                </Button>
                <Button variant="outline" className="aegis-ceremonial-hover">
                  View Documentation
                </Button>
              </div>
            </div>
          </Card>
        )}
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
          AEGIS Administration
        </h1>
        <p className="text-muted-foreground">
          Comprehensive system administration and configuration management
        </p>
      </motion.div>

      {selectedSection ? renderDetailView() : renderSectionOverview()}
    </div>
  );
}