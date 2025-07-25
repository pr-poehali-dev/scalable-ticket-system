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
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  managerId?: string;
  managerName?: string;
  employeeCount: number;
  slaHours: number;
  isActive: boolean;
  autoAssignment: boolean;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    workDays: string[];
  };
  emailTemplate?: string;
  customFields: Record<string, any>;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

interface DepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department;
  employees: Employee[];
  onSave: (department: Omit<Department, 'id' | 'employeeCount' | 'createdAt'>) => void;
}

const departmentColors = [
  { value: 'blue', label: 'Синий', class: 'bg-blue-500' },
  { value: 'green', label: 'Зеленый', class: 'bg-green-500' },
  { value: 'purple', label: 'Фиолетовый', class: 'bg-purple-500' },
  { value: 'red', label: 'Красный', class: 'bg-red-500' },
  { value: 'amber', label: 'Янтарный', class: 'bg-amber-500' },
  { value: 'indigo', label: 'Индиго', class: 'bg-indigo-500' },
  { value: 'pink', label: 'Розовый', class: 'bg-pink-500' },
  { value: 'teal', label: 'Бирюзовый', class: 'bg-teal-500' }
];

const workDays = [
  { value: 'monday', label: 'Пн' },
  { value: 'tuesday', label: 'Вт' },
  { value: 'wednesday', label: 'Ср' },
  { value: 'thursday', label: 'Чт' },
  { value: 'friday', label: 'Пт' },
  { value: 'saturday', label: 'Сб' },
  { value: 'sunday', label: 'Вс' }
];

export default function DepartmentDialog({ 
  open, 
  onOpenChange, 
  department, 
  employees,
  onSave 
}: DepartmentDialogProps) {
  const [formData, setFormData] = useState({
    name: department?.name || '',
    description: department?.description || '',
    color: department?.color || 'blue',
    managerId: department?.managerId || '',
    slaHours: department?.slaHours || 24,
    isActive: department?.isActive !== false,
    autoAssignment: department?.autoAssignment !== false,
    workingHours: department?.workingHours || {
      start: '09:00',
      end: '18:00',
      timezone: 'Europe/Moscow',
      workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    emailTemplate: department?.emailTemplate || '',
    customFields: department?.customFields || {}
  });

  const handleSave = () => {
    const manager = employees.find(e => e.id === formData.managerId);
    
    onSave({
      name: formData.name,
      description: formData.description,
      color: formData.color,
      managerId: formData.managerId,
      managerName: manager?.name,
      slaHours: formData.slaHours,
      isActive: formData.isActive,
      autoAssignment: formData.autoAssignment,
      workingHours: formData.workingHours,
      emailTemplate: formData.emailTemplate,
      customFields: formData.customFields
    });
    onOpenChange(false);
  };

  const toggleWorkDay = (day: string) => {
    const currentDays = formData.workingHours.workDays;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        workDays: newDays
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {department ? 'Редактировать департамент' : 'Создать департамент'}
          </DialogTitle>
          <DialogDescription>
            Настройте параметры департамента для организации работы с тикетами
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Название департамента</Label>
                <Input
                  id="name"
                  placeholder="Техническая поддержка"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="color">Цвет</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData({ ...formData, color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Описание деятельности департамента..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="manager">Руководитель</Label>
              <Select
                value={formData.managerId}
                onValueChange={(value) => setFormData({ ...formData, managerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите руководителя" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-slate-500">{employee.email}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SLA Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Настройки SLA</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slaHours">Время SLA (часы)</Label>
                <Input
                  id="slaHours"
                  type="number"
                  min="1"
                  max="168"
                  value={formData.slaHours}
                  onChange={(e) => setFormData({ ...formData, slaHours: parseInt(e.target.value) || 24 })}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Максимальное время на решение тикета
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoAssignment">Автоматическое назначение</Label>
                <Switch
                  id="autoAssignment"
                  checked={formData.autoAssignment}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoAssignment: checked })}
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Рабочие часы</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startTime">Начало работы</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.workingHours.start}
                  onChange={(e) => setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours, start: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">Конец работы</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.workingHours.end}
                  onChange={(e) => setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours, end: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select
                  value={formData.workingHours.timezone}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours, timezone: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Moscow">Europe/Moscow (UTC+3)</SelectItem>
                    <SelectItem value="Europe/Kiev">Europe/Kiev (UTC+2)</SelectItem>
                    <SelectItem value="Asia/Almaty">Asia/Almaty (UTC+6)</SelectItem>
                    <SelectItem value="Asia/Yekaterinburg">Asia/Yekaterinburg (UTC+5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Рабочие дни</Label>
              <div className="flex gap-2 mt-2">
                {workDays.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={formData.workingHours.workDays.includes(day.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleWorkDay(day.value)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Email Template */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Шаблон email-уведомлений</h3>
            <div>
              <Label htmlFor="emailTemplate">Шаблон сообщения</Label>
              <Textarea
                id="emailTemplate"
                placeholder="Здравствуйте! Ваш тикет был получен и передан в департамент {{department_name}}..."
                rows={4}
                value={formData.emailTemplate}
                onChange={(e) => setFormData({ ...formData, emailTemplate: e.target.value })}
              />
              <p className="text-xs text-slate-500 mt-1">
                Доступны переменные: {'{'}{'{'} department_name {'}'}{'}'},  {'{'}{'{'} client_name {'}'}{'}'},  {'{'}{'{'} ticket_id {'}'}{'}'}
              </p>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Дополнительные настройки</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Приоритет по умолчанию</Label>
                <Select
                  value={formData.customFields.defaultPriority || 'medium'}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    customFields: { ...formData.customFields, defaultPriority: value }
                  })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="maxTickets">Макс. тикетов на сотрудника</Label>
                <Input
                  id="maxTickets"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.customFields.maxTicketsPerEmployee || 10}
                  onChange={(e) => setFormData({
                    ...formData,
                    customFields: { 
                      ...formData.customFields, 
                      maxTicketsPerEmployee: parseInt(e.target.value) || 10 
                    }
                  })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Департамент активен</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          {/* Department Preview */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-medium mb-2">Предварительный просмотр</h4>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-${formData.color}-500`}></div>
              <div>
                <div className="font-medium">{formData.name || 'Название департамента'}</div>
                <div className="text-sm text-slate-500">{formData.description || 'Описание департамента'}</div>
              </div>
              <div className="ml-auto">
                <Badge className={formData.isActive ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'}>
                  {formData.isActive ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={!formData.name}>
            {department ? 'Сохранить' : 'Создать департамент'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}