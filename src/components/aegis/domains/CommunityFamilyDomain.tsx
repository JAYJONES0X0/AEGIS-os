import { SubTabKey } from "../HierarchicalNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { 
  Users, 
  MessageSquare, 
  Building, 
  FileText, 
  FileCheck,
  Send,
  Plus,
  Phone,
  Mail,
  Clock,
  CheckCircle
} from "lucide-react";

interface CommunityFamilyDomainProps {
  activeSubTab: SubTabKey;
}

export function CommunityFamilyDomain({ activeSubTab }: CommunityFamilyDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "family-portal":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Family Portal</h2>
                <p className="text-sm text-slate-600">Read-only access for families and loved ones</p>
              </div>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Family Member
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[
                  {
                    client: "John Smith",
                    familyMembers: [
                      { name: "Mary Smith", relationship: "Wife", access: "full", lastLogin: "2 hours ago" },
                      { name: "David Smith", relationship: "Son", access: "limited", lastLogin: "1 week ago" }
                    ],
                    recentUpdates: [
                      { date: "2024-09-17", type: "Care Note", content: "John enjoyed his afternoon walk in the garden..." },
                      { date: "2024-09-16", type: "Health Update", content: "Blood pressure check completed - all normal..." },
                      { date: "2024-09-15", type: "Activity", content: "Participated in art therapy session..." }
                    ]
                  },
                  {
                    client: "Emma Johnson",
                    familyMembers: [
                      { name: "Robert Johnson", relationship: "Father", access: "full", lastLogin: "3 days ago" },
                      { name: "Lisa Johnson", relationship: "Sister", access: "full", lastLogin: "1 day ago" }
                    ],
                    recentUpdates: [
                      { date: "2024-09-17", type: "Care Note", content: "Emma was in good spirits during lunch..." },
                      { date: "2024-09-16", type: "Medication", content: "Morning medications administered on time..." }
                    ]
                  }
                ].map((portal, index) => (
                  <Card key={index} className="border border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-900">{portal.client}</CardTitle>
                      <CardDescription>Family portal access and recent updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Family Members</h4>
                          <div className="space-y-2">
                            {portal.familyMembers.map((member, memberIndex) => (
                              <div key={memberIndex} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                <div>
                                  <span className="font-medium text-slate-900">{member.name}</span>
                                  <span className="text-sm text-slate-600 ml-2">({member.relationship})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant="outline" 
                                    className={member.access === 'full' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}
                                  >
                                    {member.access} access
                                  </Badge>
                                  <span className="text-xs text-slate-500">{member.lastLogin}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Recent Updates</h4>
                          <div className="space-y-2">
                            {portal.recentUpdates.map((update, updateIndex) => (
                              <div key={updateIndex} className="p-3 rounded bg-slate-50 border border-slate-100">
                                <div className="flex items-center justify-between mb-1">
                                  <Badge variant="outline" className="text-xs bg-violet-100 text-violet-800 border-violet-200">
                                    {update.type}
                                  </Badge>
                                  <span className="text-xs text-slate-500">{update.date}</span>
                                </div>
                                <p className="text-sm text-slate-700">{update.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Portal Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Active Portals</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Family Members</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">This Week Logins</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Updates Shared</span>
                      <span className="font-medium">156</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Access
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <FileText className="w-4 h-4 mr-2" />
                      Bulk Update
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Family Survey
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "messaging":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Secure Messaging</h2>
                <p className="text-sm text-slate-600">Compliant communication with families and commissioners</p>
              </div>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Recent Conversations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          contact: "Mary Smith (John's Wife)",
                          lastMessage: "Thank you for the update on John's physio session. Great to hear he's making progress!",
                          timestamp: "2 hours ago",
                          unread: false,
                          type: "family"
                        },
                        {
                          contact: "Dr. Sarah Williams (GP)",
                          lastMessage: "Please confirm John's medication review appointment for next week.",
                          timestamp: "4 hours ago",
                          unread: true,
                          type: "healthcare"
                        },
                        {
                          contact: "County Council Assessor",
                          lastMessage: "Care package review scheduled for October 15th. Please prepare current assessment.",
                          timestamp: "1 day ago",
                          unread: false,
                          type: "commissioner"
                        },
                        {
                          contact: "Lisa Johnson (Emma's Sister)",
                          lastMessage: "Could we arrange a visit this weekend? Emma mentioned wanting to see the family.",
                          timestamp: "2 days ago",
                          unread: true,
                          type: "family"
                        }
                      ].map((conversation, index) => (
                        <div key={index} className={`p-4 rounded-lg border transition-colors hover:bg-slate-50 cursor-pointer ${
                          conversation.unread ? 'bg-violet-50 border-violet-200' : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${conversation.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                                  {conversation.contact}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    conversation.type === 'family' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                    conversation.type === 'healthcare' ? 'bg-green-100 text-green-800 border-green-200' :
                                    'bg-purple-100 text-purple-800 border-purple-200'
                                  }`}
                                >
                                  {conversation.type}
                                </Badge>
                                {conversation.unread && (
                                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                )}
                              </div>
                              <p className={`text-sm ${conversation.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                                {conversation.lastMessage}
                              </p>
                            </div>
                            <span className="text-xs text-slate-500 ml-4">{conversation.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-slate-200 shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Compose Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700">To</label>
                          <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md bg-white">
                            <option>Select recipient...</option>
                            <option>Mary Smith (John's Wife)</option>
                            <option>Robert Johnson (Emma's Father)</option>
                            <option>Dr. Sarah Williams (GP)</option>
                            <option>County Council Assessor</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700">Subject</label>
                          <input 
                            type="text" 
                            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md"
                            placeholder="Message subject..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-slate-700">Message</label>
                        <Textarea 
                          className="mt-1 min-h-[120px] border-slate-200"
                          placeholder="Type your secure message here..."
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>End-to-end encrypted</span>
                        </div>
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Message Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Unread Messages</span>
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Today's Messages</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">This Week</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Response Time</span>
                      <span className="font-medium text-green-600">&lt; 2 hours</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Quick Contacts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Mail className="w-4 h-4 mr-2" />
                      GP Practices
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Building className="w-4 h-4 mr-2" />
                      Commissioners
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Community & Family</h2>
                <p className="text-sm text-slate-600">External engagement and family communication</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Active Portals</p>
                      <p className="text-2xl font-bold text-slate-900">12</p>
                    </div>
                    <Users className="w-8 h-8 text-violet-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Unread Messages</p>
                      <p className="text-2xl font-bold text-slate-900">5</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-violet-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Commissioner Reports</p>
                      <p className="text-2xl font-bold text-slate-900">3</p>
                    </div>
                    <Building className="w-8 h-8 text-violet-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Pending Consents</p>
                      <p className="text-2xl font-bold text-slate-900">2</p>
                    </div>
                    <FileCheck className="w-8 h-8 text-violet-500" />
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