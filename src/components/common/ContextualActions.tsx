import React, { useState, ReactNode } from "react";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Download, 
  Share, 
  Copy, 
  Trash2, 
  Settings, 
  ExternalLink, 
  RefreshCw,
  Filter,
  Search,
  Calendar,
  Bell,
  Flag,
  Archive,
  Star,
  Bookmark,
  Tag,
  User,
  Users,
  Lock,
  Unlock,
  Zap,
  BarChart3,
  FileText,
  Mail,
  Phone,
  MessageCircle,
  Video,
  Upload,
  Printer
} from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel } from "../ui/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, ContextMenuGroup, ContextMenuLabel } from "../ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ContextualAction {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'secondary';
  disabled?: boolean;
  keyboard?: string;
  group?: string;
  confirmation?: boolean;
  premium?: boolean;
}

interface ContextualActionsProps {
  actions: ContextualAction[];
  trigger?: ReactNode;
  triggerType?: 'button' | 'context';
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function ContextualActions({
  actions,
  trigger,
  triggerType = 'button',
  children,
  className = "",
  disabled = false
}: ContextualActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ContextualAction | null>(null);

  const handleActionClick = (action: ContextualAction) => {
    if (action.confirmation) {
      setConfirmAction(action);
    } else {
      action.onClick();
      setIsOpen(false);
    }
  };

  const groupedActions = actions.reduce((groups, action) => {
    const group = action.group || 'default';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(action);
    return groups;
  }, {} as Record<string, ContextualAction[]>);

  const ActionItems = () => (
    <>
      {Object.entries(groupedActions).map(([groupName, groupActions], groupIndex) => (
        <React.Fragment key={groupName}>
          {groupIndex > 0 && <DropdownMenuSeparator />}
          {groupName !== 'default' && (
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
              {groupName}
            </DropdownMenuLabel>
          )}
          <DropdownMenuGroup>
            {groupActions.map((action) => (
              <DropdownMenuItem
                key={action.id}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled || disabled}
                className={`
                  flex items-center gap-3 cursor-pointer
                  ${action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                  ${action.premium ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10' : ''}
                `}
              >
                <div className="flex items-center gap-3 flex-grow">
                  {action.icon && (
                    <span className="flex-shrink-0">
                      {action.icon}
                    </span>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      {action.label}
                      {action.premium && (
                        <Badge variant="secondary" className="text-xs">
                          Pro
                        </Badge>
                      )}
                    </div>
                    {action.description && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </div>
                    )}
                  </div>
                  {action.keyboard && (
                    <Badge variant="outline" className="text-xs">
                      {action.keyboard}
                    </Badge>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </React.Fragment>
      ))}
    </>
  );

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      disabled={disabled}
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );

  if (triggerType === 'context') {
    return (
      <>
        <ContextMenu>
          <ContextMenuTrigger className={className}>
            {children}
          </ContextMenuTrigger>
          <ContextMenuContent className="aegis-card-glass min-w-48">
            {Object.entries(groupedActions).map(([groupName, groupActions], groupIndex) => (
              <React.Fragment key={groupName}>
                {groupIndex > 0 && <ContextMenuSeparator />}
                {groupName !== 'default' && (
                  <ContextMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                    {groupName}
                  </ContextMenuLabel>
                )}
                <ContextMenuGroup>
                  {groupActions.map((action) => (
                    <ContextMenuItem
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      disabled={action.disabled || disabled}
                      className={`
                        flex items-center gap-3 cursor-pointer
                        ${action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                      `}
                    >
                      {action.icon && (
                        <span className="flex-shrink-0">
                          {action.icon}
                        </span>
                      )}
                      <span className="flex-grow">{action.label}</span>
                      {action.keyboard && (
                        <Badge variant="outline" className="text-xs">
                          {action.keyboard}
                        </Badge>
                      )}
                    </ContextMenuItem>
                  ))}
                </ContextMenuGroup>
              </React.Fragment>
            ))}
          </ContextMenuContent>
        </ContextMenu>

        {/* Confirmation Dialog */}
        {confirmAction && (
          <Dialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
            <DialogContent className="aegis-card-glass">
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to {confirmAction.label.toLowerCase()}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setConfirmAction(null)}>
                  Cancel
                </Button>
                <Button
                  variant={confirmAction.variant === 'destructive' ? 'destructive' : 'default'}
                  onClick={() => {
                    confirmAction.onClick();
                    setConfirmAction(null);
                  }}
                >
                  {confirmAction.label}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className={className}>
          {trigger || defaultTrigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="aegis-card-glass min-w-48">
          <ActionItems />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      {confirmAction && (
        <Dialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
          <DialogContent className="aegis-card-glass">
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to {confirmAction.label.toLowerCase()}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setConfirmAction(null)}>
                Cancel
              </Button>
              <Button
                variant={confirmAction.variant === 'destructive' ? 'destructive' : 'default'}
                onClick={() => {
                  confirmAction.onClick();
                  setConfirmAction(null);
                }}
              >
                {confirmAction.label}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// Predefined action sets for common use cases
export const getStandardActions = (context: string): ContextualAction[] => {
  const actions = {
    view: [
      { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => {}, group: 'View' },
      { id: 'external', label: 'Open in New Tab', icon: <ExternalLink size={16} />, onClick: () => {}, group: 'View' },
      { id: 'refresh', label: 'Refresh', icon: <RefreshCw size={16} />, onClick: () => {}, keyboard: 'F5', group: 'View' }
    ],
    edit: [
      { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => {}, keyboard: 'E', group: 'Edit' },
      { id: 'duplicate', label: 'Duplicate', icon: <Copy size={16} />, onClick: () => {}, group: 'Edit' },
      { id: 'settings', label: 'Settings', icon: <Settings size={16} />, onClick: () => {}, group: 'Edit' }
    ],
    share: [
      { id: 'share', label: 'Share', icon: <Share size={16} />, onClick: () => {}, group: 'Share' },
      { id: 'export', label: 'Export', icon: <Download size={16} />, onClick: () => {}, keyboard: 'Ctrl+E', group: 'Share' },
      { id: 'print', label: 'Print', icon: <Printer size={16} />, onClick: () => {}, keyboard: 'Ctrl+P', group: 'Share' }
    ],
    organize: [
      { id: 'star', label: 'Add to Favorites', icon: <Star size={16} />, onClick: () => {}, group: 'Organize' },
      { id: 'bookmark', label: 'Bookmark', icon: <Bookmark size={16} />, onClick: () => {}, group: 'Organize' },
      { id: 'tag', label: 'Add Tags', icon: <Tag size={16} />, onClick: () => {}, group: 'Organize' },
      { id: 'archive', label: 'Archive', icon: <Archive size={16} />, onClick: () => {}, group: 'Organize' }
    ],
    communication: [
      { id: 'email', label: 'Send Email', icon: <Mail size={16} />, onClick: () => {}, group: 'Contact' },
      { id: 'call', label: 'Call', icon: <Phone size={16} />, onClick: () => {}, group: 'Contact' },
      { id: 'message', label: 'Message', icon: <MessageCircle size={16} />, onClick: () => {}, group: 'Contact' },
      { id: 'video', label: 'Video Call', icon: <Video size={16} />, onClick: () => {}, group: 'Contact' }
    ],
    advanced: [
      { id: 'analytics', label: 'View Analytics', icon: <BarChart3 size={16} />, onClick: () => {}, premium: true, group: 'Advanced' },
      { id: 'automate', label: 'Automate', icon: <Zap size={16} />, onClick: () => {}, premium: true, group: 'Advanced' },
      { id: 'permissions', label: 'Permissions', icon: <Lock size={16} />, onClick: () => {}, group: 'Advanced' }
    ],
    danger: [
      { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => {}, variant: 'destructive' as const, confirmation: true, group: 'Danger' }
    ]
  };

  switch (context) {
    case 'kpi':
      return [...actions.view, ...actions.share, ...actions.advanced];
    case 'client':
      return [...actions.view, ...actions.edit, ...actions.communication, ...actions.organize, ...actions.danger];
    case 'staff':
      return [...actions.view, ...actions.edit, ...actions.communication, ...actions.organize];
    case 'document':
      return [...actions.view, ...actions.edit, ...actions.share, ...actions.organize, ...actions.danger];
    case 'data':
      return [...actions.view, ...actions.share, ...actions.advanced];
    default:
      return [...actions.view, ...actions.edit, ...actions.share];
  }
};

// Quick Actions Toolbar Component
interface QuickActionsToolbarProps {
  actions: ContextualAction[];
  maxVisible?: number;
  className?: string;
}

export function QuickActionsToolbar({ 
  actions, 
  maxVisible = 3, 
  className = "" 
}: QuickActionsToolbarProps) {
  const visibleActions = actions.slice(0, maxVisible);
  const hiddenActions = actions.slice(maxVisible);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Visible Actions */}
      {visibleActions.map((action) => (
        <Tooltip key={action.id}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled}
              className={`
                h-8 px-3 
                ${action.variant === 'destructive' ? 'hover:bg-destructive/10 hover:text-destructive' : ''}
              `}
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              {action.label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {action.description || action.label}
            {action.keyboard && (
              <div className="text-xs text-muted-foreground mt-1">
                {action.keyboard}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      ))}

      {/* More Actions Dropdown */}
      {hiddenActions.length > 0 && (
        <ContextualActions
          actions={hiddenActions}
          trigger={
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />
      )}
    </div>
  );
}