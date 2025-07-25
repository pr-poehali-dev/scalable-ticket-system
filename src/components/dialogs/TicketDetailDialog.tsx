import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Ticket, Employee } from './TicketDialog';

interface TicketMessage {
  id: string;
  ticketId: string;
  message: string;
  authorId: string;
  authorName: string;
  authorType: 'client' | 'agent' | 'system';
  isInternal: boolean;
  createdAt: string;
  attachments?: Array<{
    id: string;
    filename: string;
    url: string;
    size: number;
  }>;
}

interface TicketDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket;
  messages: TicketMessage[];
  employees: Employee[];
  onSendMessage: (message: string, isInternal: boolean, attachments?: File[]) => void;
  onUpdateStatus: (status: Ticket['status']) => void;
  onUpdatePriority: (priority: Ticket['priority']) => void;
  onAssignTicket: (employeeId: string) => void;
}

const statusColors = {
  new: 'bg-blue-500/10 text-blue-600 border-blue-200',
  open: 'bg-green-500/10 text-green-600 border-green-200',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-200',
  resolved: 'bg-purple-500/10 text-purple-600 border-purple-200',
  closed: 'bg-gray-500/10 text-gray-600 border-gray-200'
};

const priorityColors = {
  low: 'bg-gray-500/10 text-gray-600 border-gray-200',
  medium: 'bg-blue-500/10 text-blue-600 border-blue-200',
  high: 'bg-amber-500/10 text-amber-600 border-amber-200',
  urgent: 'bg-red-500/10 text-red-600 border-red-200'
};

export default function TicketDetailDialog({
  open,
  onOpenChange,
  ticket,
  messages,
  employees,
  onSendMessage,
  onUpdateStatus,
  onUpdatePriority,
  onAssignTicket
}: TicketDetailDialogProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, isInternal, attachments);
      setNewMessage('');
      setAttachments([]);
      setIsInternal(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  const calculateSLAStatus = () => {
    if (!ticket.slaDeadline) return null;
    
    const deadline = new Date(ticket.slaDeadline);
    const now = new Date();
    const hoursLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursLeft <= 0) return { status: 'overdue', text: 'Просрочен' };
    if (hoursLeft <= 2) return { status: 'critical', text: `${hoursLeft}ч осталось` };
    if (hoursLeft <= 8) return { status: 'warning', text: `${hoursLeft}ч осталось` };
    return { status: 'ok', text: `${hoursLeft}ч осталось` };
  };

  const slaStatus = calculateSLAStatus();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">
                Тикет #{ticket.id.slice(-8)}
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {ticket.subject}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[ticket.status]}>
                {ticket.status === 'new' && 'Новый'}
                {ticket.status === 'open' && 'Открыт'}
                {ticket.status === 'pending' && 'Ожидание'}
                {ticket.status === 'resolved' && 'Решен'}
                {ticket.status === 'closed' && 'Закрыт'}
              </Badge>
              <Badge className={priorityColors[ticket.priority]}>
                {ticket.priority === 'low' && 'Низкий'}
                {ticket.priority === 'medium' && 'Средний'}
                {ticket.priority === 'high' && 'Высокий'}
                {ticket.priority === 'urgent' && 'Срочный'}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex gap-6">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`p-4 ${
                    message.authorType === 'client' 
                      ? 'bg-blue-50 border-blue-200' 
                      : message.isInternal
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        message.authorType === 'client' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {message.authorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{message.authorName}</div>
                        <div className="text-xs text-slate-500">
                          {formatDate(message.createdAt)}
                          {message.isInternal && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Внутреннее
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {message.authorType === 'client' && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Icon name="MessageCircle" className="w-3 h-3" />
                        {ticket.channelType}
                      </div>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap text-sm">
                    {message.message}
                  </div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/50 rounded border">
                          <Icon name="Paperclip" className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium">{attachment.filename}</span>
                          <span className="text-xs text-slate-500">
                            ({Math.round(attachment.size / 1024)} KB)
                          </span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Icon name="Download" className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Reply Form */}
            <div className="flex-shrink-0 mt-4 border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Label className="font-medium">Ответ клиенту:</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="internal"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="internal" className="text-sm">
                      Внутреннее сообщение
                    </Label>
                  </div>
                </div>
                
                <Textarea
                  placeholder={isInternal ? "Внутреннее сообщение для команды..." : "Ваш ответ клиенту..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Paperclip" className="w-4 h-4 mr-2" />
                      Прикрепить файл
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Image" className="w-4 h-4 mr-2" />
                      Изображение
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={isInternal ? 'bg-amber-600 hover:bg-amber-700' : ''}
                  >
                    <Icon name="Send" className="w-4 h-4 mr-2" />
                    {isInternal ? 'Отправить внутреннее' : 'Ответить клиенту'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 space-y-4">
            {/* Client Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Информация о клиенте</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="User" className="w-4 h-4 text-slate-500" />
                  <span className="font-medium">{ticket.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="w-4 h-4 text-slate-500" />
                  <span>{ticket.channelType}</span>
                  {ticket.channelId && (
                    <code className="text-xs bg-slate-100 px-1 rounded">{ticket.channelId}</code>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" className="w-4 h-4 text-slate-500" />
                  <span>{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            </Card>

            {/* SLA Status */}
            {slaStatus && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">SLA статус</h3>
                  <Badge className={
                    slaStatus.status === 'overdue' ? 'bg-red-500/10 text-red-600 border-red-200' :
                    slaStatus.status === 'critical' ? 'bg-red-500/10 text-red-600 border-red-200' :
                    slaStatus.status === 'warning' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                    'bg-green-500/10 text-green-600 border-green-200'
                  }>
                    {slaStatus.text}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500">
                  Дедлайн: {formatDate(ticket.slaDeadline!)}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Быстрые действия</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Статус</Label>
                  <Select value={ticket.status} onValueChange={onUpdateStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="open">Открыт</SelectItem>
                      <SelectItem value="pending">Ожидание</SelectItem>
                      <SelectItem value="resolved">Решен</SelectItem>
                      <SelectItem value="closed">Закрыт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Приоритет</Label>
                  <Select value={ticket.priority} onValueChange={onUpdatePriority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="urgent">Срочный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Назначить</Label>
                  <Select value={ticket.assigneeId || ''} onValueChange={onAssignTicket}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите сотрудника" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Tags */}
            {ticket.tags.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Теги</h3>
                <div className="flex flex-wrap gap-1">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Department */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Департамент</h3>
              <div className="flex items-center gap-2">
                <Icon name="Building" className="w-4 h-4 text-slate-500" />
                <span className="text-sm">{ticket.departmentName}</span>
              </div>
              {ticket.assigneeName && (
                <div className="flex items-center gap-2 mt-2">
                  <Icon name="UserCheck" className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{ticket.assigneeName}</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}