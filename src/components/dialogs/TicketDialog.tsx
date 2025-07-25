import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  clientId: string;
  clientName: string;
  assigneeId?: string;
  assigneeName?: string;
  departmentId: string;
  departmentName: string;
  channelType: 'telegram' | 'whatsapp' | 'email' | 'vk' | 'sms' | 'manual';
  channelId?: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline?: string;
  tags: string[];
  customFields: Record<string, any>;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
}

export interface Department {
  id: string;
  name: string;
}

interface TicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: Ticket;
  clients: Client[];
  employees: Employee[];
  departments: Department[];
  onSave: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const priorityColors = {
  low: 'bg-gray-500/10 text-gray-600 border-gray-200',
  medium: 'bg-blue-500/10 text-blue-600 border-blue-200',
  high: 'bg-amber-500/10 text-amber-600 border-amber-200',
  urgent: 'bg-red-500/10 text-red-600 border-red-200'
};

const statusColors = {
  new: 'bg-blue-500/10 text-blue-600 border-blue-200',
  open: 'bg-green-500/10 text-green-600 border-green-200',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-200',
  resolved: 'bg-purple-500/10 text-purple-600 border-purple-200',
  closed: 'bg-gray-500/10 text-gray-600 border-gray-200'
};

export default function TicketDialog({ 
  open, 
  onOpenChange, 
  ticket, 
  clients, 
  employees, 
  departments,
  onSave 
}: TicketDialogProps) {
  const [formData, setFormData] = useState({
    subject: ticket?.subject || '',
    message: ticket?.message || '',
    status: ticket?.status || 'new' as const,
    priority: ticket?.priority || 'medium' as const,
    clientId: ticket?.clientId || '',
    assigneeId: ticket?.assigneeId || '',
    departmentId: ticket?.departmentId || '',
    channelType: ticket?.channelType || 'manual' as const,
    channelId: ticket?.channelId || '',
    tags: ticket?.tags || [],
    customFields: ticket?.customFields || {}
  });

  const [newTag, setNewTag] = useState('');

  const selectedClient = clients.find(c => c.id === formData.clientId);
  const selectedAssignee = employees.find(e => e.id === formData.assigneeId);
  const selectedDepartment = departments.find(d => d.id === formData.departmentId);

  const handleSave = () => {
    const clientName = selectedClient?.name || '';
    const assigneeName = selectedAssignee?.name || '';
    const departmentName = selectedDepartment?.name || '';

    onSave({
      subject: formData.subject,
      message: formData.message,
      status: formData.status,
      priority: formData.priority,
      clientId: formData.clientId,
      clientName,
      assigneeId: formData.assigneeId,
      assigneeName,
      departmentId: formData.departmentId,
      departmentName,
      channelType: formData.channelType,
      channelId: formData.channelId,
      tags: formData.tags,
      customFields: formData.customFields,
      slaDeadline: ticket?.slaDeadline
    });
    onOpenChange(false);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ticket ? 'Редактировать тикет' : 'Создать тикет'}
          </DialogTitle>
          <DialogDescription>
            {ticket ? 'Измените параметры тикета' : 'Создайте новый тикет для клиента'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Тема тикета</Label>
              <Input
                id="subject"
                placeholder="Проблема с интеграцией"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="client">Клиент</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-slate-500">{client.email}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              placeholder="Опишите проблему или вопрос клиента..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Новый
                    </div>
                  </SelectItem>
                  <SelectItem value="open">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Открыт
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      Ожидание
                    </div>
                  </SelectItem>
                  <SelectItem value="resolved">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Решен
                    </div>
                  </SelectItem>
                  <SelectItem value="closed">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                      Закрыт
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowDown" className="w-4 h-4 text-gray-500" />
                      Низкий
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Icon name="Minus" className="w-4 h-4 text-blue-500" />
                      Средний
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowUp" className="w-4 h-4 text-amber-500" />
                      Высокий
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <Icon name="AlertTriangle" className="w-4 h-4 text-red-500" />
                      Срочный
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Департамент</Label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) => setFormData({ ...formData, departmentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите департамент" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignee">Исполнитель</Label>
              <Select
                value={formData.assigneeId}
                onValueChange={(value) => setFormData({ ...formData, assigneeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Назначить сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  {employees
                    .filter(emp => !formData.departmentId || emp.department === selectedDepartment?.name)
                    .map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-slate-500">{employee.department}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Channel Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="channelType">Канал</Label>
              <Select
                value={formData.channelType}
                onValueChange={(value: any) => setFormData({ ...formData, channelType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">
                    <div className="flex items-center gap-2">
                      <Icon name="Edit" className="w-4 h-4" />
                      Ручное создание
                    </div>
                  </SelectItem>
                  <SelectItem value="telegram">
                    <div className="flex items-center gap-2">
                      <Icon name="MessageCircle" className="w-4 h-4" />
                      Telegram
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <Icon name="MessageSquare" className="w-4 h-4" />
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" className="w-4 h-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="vk">
                    <div className="flex items-center gap-2">
                      <Icon name="Users" className="w-4 h-4" />
                      ВКонтакте
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.channelType !== 'manual' && (
              <div>
                <Label htmlFor="channelId">ID канала</Label>
                <Input
                  id="channelId"
                  placeholder="@username или chat_id"
                  value={formData.channelId}
                  onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label>Теги</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer">
                  {tag}
                  <Icon 
                    name="X" 
                    className="w-3 h-3 ml-1 hover:text-red-500" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Добавить тег"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                <Icon name="Plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Custom Fields */}
          <div>
            <Label>Дополнительные поля</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="customerType">Тип клиента</Label>
                <Select
                  value={formData.customFields.customerType || ''}
                  onValueChange={(value) => 
                    setFormData({ 
                      ...formData, 
                      customFields: { ...formData.customFields, customerType: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Физическое лицо</SelectItem>
                    <SelectItem value="business">Бизнес</SelectItem>
                    <SelectItem value="enterprise">Корпоративный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="source">Источник</Label>
                <Input
                  id="source"
                  placeholder="Откуда узнал о нас"
                  value={formData.customFields.source || ''}
                  onChange={(e) => 
                    setFormData({ 
                      ...formData, 
                      customFields: { ...formData.customFields, source: e.target.value }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!formData.subject || !formData.message || !formData.clientId}
          >
            {ticket ? 'Сохранить' : 'Создать тикет'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}