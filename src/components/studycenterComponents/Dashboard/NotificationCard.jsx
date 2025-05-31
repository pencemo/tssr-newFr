import { Bell, CheckCircle, AlertCircle, MessageSquare, UserPlus, Settings } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NotificationCard() {
  const notifications = [
    {
      id: 1,
      type: "message",
      icon: MessageSquare,
      title: "New message from Sarah",
      description: "Hey! Can we schedule a meeting for tomorrow?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "success",
      icon: CheckCircle,
      title: "Deployment successful",
      description: "Your application has been deployed to production",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "user",
      icon: UserPlus,
      title: "New team member joined",
      description: "Alex Johnson has joined your workspace",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      title: "Server maintenance scheduled",
      description: "Maintenance window: Tonight 11 PM - 2 AM EST",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 5,
      type: "settings",
      icon: Settings,
      title: "Security settings updated",
      description: "Two-factor authentication has been enabled",
      time: "1 day ago",
      unread: false,
    },
  ]

  const getIconColor = (type) => {
    switch (type) {
      case "message":
        return "text-blue-500"
      case "success":
        return "text-green-500"
      case "user":
        return "text-purple-500"
      case "alert":
        return "text-orange-500"
      case "settings":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Notifications</CardTitle>
          <CardDescription>Stay updated with your latest activities</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = notification.icon
          return (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                notification.unread ? "bg-muted/30" : ""
              }`}
            >
              <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                  {notification.unread && <Badge variant="secondary" className="ml-2 h-2 w-2 p-0 bg-blue-500" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>
            </div>
          )
        })}
        <div className="pt-2 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
