import { useState } from "react";
import { MessageSquare, X, Send, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockChatContacts,
  mockChatMessages,
  type ChatContact,
  type ChatMessage,
} from "@/data/mockData";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const totalUnread = mockChatContacts.reduce(
    (acc, c) => acc + c.unreadCount,
    0
  );

  const handleSelectContact = (contact: ChatContact) => {
    setSelectedContact(contact);
    setMessages(mockChatMessages[contact.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: "1",
      senderName: "Вы",
      content: newMessage,
      timestamp: new Date(),
      read: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleBack = () => {
    setSelectedContact(null);
    setMessages([]);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 z-50"
      >
        <MessageSquare className="h-6 w-6" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs flex items-center justify-center font-bold">
            {totalUnread}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
        {selectedContact ? (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-8 w-8 p-0"
            >
              ←
            </Button>
            <div>
              <p className="font-medium text-sm text-foreground">
                {selectedContact.name}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Circle
                  className={`h-2 w-2 ${
                    selectedContact.online
                      ? "fill-success text-success"
                      : "fill-muted-foreground text-muted-foreground"
                  }`}
                />
                {selectedContact.online ? "В сети" : "Не в сети"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Сообщения
            </h3>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      {selectedContact ? (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-gold">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.senderId === "1" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.senderId === "1"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {format(msg.timestamp, "HH:mm", { locale: ru })}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Написать сообщение..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        /* Contacts list */
        <div className="flex-1 overflow-y-auto scrollbar-gold">
          {mockChatContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className="flex items-center gap-3 p-4 border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {contact.name}
                  </p>
                  {contact.unreadCount > 0 && (
                    <Badge
                      variant="default"
                      className="h-5 min-w-5 flex items-center justify-center text-xs"
                    >
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
