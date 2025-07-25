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
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'manager' | 'agent' | 'viewer';
  departmentId: string;
  departmentName: string;
  isActive: boolean;
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    workDays: string[];
  };
  permissions: string[];
  maxTickets: number;
  currentTickets: number;
  bio: string;
  skills: string[];
  languages: string[];
  customFields: Record<string, any>;
  stats: {
    totalTickets: number;
    avgResponseTime: number;
    satisfactionRating: number;
    resolvedTickets: number;
  };
}

export interface Department {
  id: string;
  name: string;
  color: string;
}

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  departments: Department[];
  onSave: (employee: Omit<Employee, 'id' | 'currentTickets' | 'stats' | 'joinDate' | 'lastLogin'>) => void;
}

const roles = [
  { value: 'admin', label: 'Администратор', color: 'bg-red-500/10 text-red-600' },
  { value: 'manager', label: 'Менеджер', color: 'bg-purple-500/10 text-purple-600' },
  { value: 'agent', label: 'Агент', color: 'bg-blue-500/10 text-blue-600' },
  { value: 'viewer', label: 'Наблюдатель', color: 'bg-gray-500/10 text-gray-600' }
];

const allPermissions = [
  { id: 'tickets_view', name: 'Просмотр тикетов', category: 'Тикеты' },
  { id: 'tickets_create', name: 'Создание тикетов', category: 'Тикеты' },
  { id: 'tickets_edit', name: 'Редактирование тикетов', category: 'Тикеты' },
  { id: 'tickets_delete', name: 'Удаление тикетов', category: 'Тикеты' },
  { id: 'tickets_assign', name: 'Назначение тикетов', category: 'Тикеты' },
  
  { id: 'clients_view', name: 'Просмотр клиентов', category: 'Клиенты' },
  { id: 'clients_edit', name: 'Редактирование клиентов', category: 'Клиенты' },
  { id: 'clients_delete', name: 'Удаление клиентов', category: 'Клиенты' },
  
  { id: 'users_view', name: 'Просмотр пользователей', category: 'Сотрудники' },
  { id: 'users_edit', name: 'Редактирование пользователей', category: 'Сотрудники' },
  { id: 'users_delete', name: 'Удаление пользователей', category: 'Сотрудники' },
  
  { id: 'integrations_view', name: 'Просмотр интеграций', category: 'Интеграции' },
  { id: 'integrations_manage', name: 'Управление интеграциями', category: 'Интеграции' },
  
  { id: 'reports_view', name: 'Просмотр отчетов', category: 'Аналитика' },
  { id: 'reports_export', name: 'Экспорт отчетов', category: 'Аналитика' },
  
  { id: 'settings_view', name: 'Просмотр настроек', category: 'Система' },
  { id: 'settings_edit', name: 'Изменение настроек', category: 'Система' }
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

const commonSkills = [
  'Техническая поддержка',
  'API интеграции',
  'Базы данных',
  'JavaScript',
  'Python',
  'Менеджмент',
  'Продажи',
  'Дизайн',
  'DevOps',
  'Тестирование'
];

const commonLanguages = [
  'Русский',
  'Английский',
  'Украинский',
  'Казахский',
  'Немецкий',
  'Французский',
  'Испанский',
  'Китайский'
];

export default function EmployeeDialog({ 
  open, 
  onOpenChange, 
  employee, 
  departments,
  onSave 
}: EmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    role: employee?.role || 'agent' as const,
    departmentId: employee?.departmentId || '',
    isActive: employee?.isActive !== false,
    avatar: employee?.avatar || '',
    workingHours: employee?.workingHours || {
      start: '09:00',
      end: '18:00',
      timezone: 'Europe/Moscow',
      workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    permissions: employee?.permissions || [],
    maxTickets: employee?.maxTickets || 10,
    bio: employee?.bio || '',
    skills: employee?.skills || [],
    languages: employee?.languages || ['Русский'],
    customFields: employee?.customFields || {}
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleSave = () => {
    const department = departments.find(d => d.id === formData.departmentId);
    
    onSave({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      departmentId: formData.departmentId,
      departmentName: department?.name || '',
      isActive: formData.isActive,
      avatar: formData.avatar,
      workingHours: formData.workingHours,
      permissions: formData.permissions,
      maxTickets: formData.maxTickets,
      bio: formData.bio,
      skills: formData.skills,
      languages: formData.languages,
      customFields: formData.customFields
    });
    onOpenChange(false);
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter(p => p !== permissionId)
      : [...formData.permissions, permissionId];
    
    setFormData({ ...formData, permissions: newPermissions });
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

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const addLanguage = (language: string) => {
    if (language && !formData.languages.includes(language)) {
      setFormData({ ...formData, languages: [...formData.languages, language] });
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({ ...formData, languages: formData.languages.filter(l => l !== language) });
  };

  const setRolePermissions = (role: string) => {
    let permissions: string[] = [];
    
    switch (role) {
      case 'admin':
        permissions = allPermissions.map(p => p.id);
        break;
      case 'manager':
        permissions = [
          'tickets_view', 'tickets_create', 'tickets_edit', 'tickets_assign',
          'clients_view', 'clients_edit',
          'users_view',
          'integrations_view',
          'reports_view', 'reports_export'
        ];
        break;
      case 'agent':
        permissions = [
          'tickets_view', 'tickets_create', 'tickets_edit',
          'clients_view',
          'integrations_view'
        ];
        break;
      case 'viewer':
        permissions = ['tickets_view', 'clients_view', 'reports_view'];
        break;
    }
    
    setFormData({ ...formData, role: role as any, permissions });
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof allPermissions>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
          </DialogTitle>
          <DialogDescription>
            Настройте профиль сотрудника и его права доступа в системе
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Основная информация</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Полное имя</Label>
                <Input
                  id="name"
                  placeholder="Иван Петров"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="avatar">Аватар (URL)</Label>
                <Input
                  id="avatar"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">О сотруднике</Label>
              <Textarea
                id="bio"
                placeholder="Краткая информация о сотруднике..."
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>

          {/* Role and Department */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Роль и департамент</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Роль</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setRolePermissions(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={role.color}>
                            {role.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${dept.color}-500`}></div>
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxTickets">Макс. активных тикетов</Label>
                <Input
                  id="maxTickets"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxTickets}
                  onChange={(e) => setFormData({ ...formData, maxTickets: parseInt(e.target.value) || 10 })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Активен</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
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

          {/* Skills and Languages */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Навыки</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="cursor-pointer">
                    {skill}
                    <Icon 
                      name="X" 
                      className="w-3 h-3 ml-1 hover:text-red-500" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => addSkill(newSkill)}>
                  <Icon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {commonSkills.map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => addSkill(skill)}
                  >
                    + {skill}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Языки</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.languages.map((language) => (
                  <Badge key={language} variant="outline" className="cursor-pointer">
                    {language}
                    <Icon 
                      name="X" 
                      className="w-3 h-3 ml-1 hover:text-red-500" 
                      onClick={() => removeLanguage(language)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить язык"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage(newLanguage)}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => addLanguage(newLanguage)}>
                  <Icon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {commonLanguages.map((language) => (
                  <Button
                    key={language}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => addLanguage(language)}
                  >
                    + {language}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Права доступа</h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <Card key={category} className="p-4">
                  <h4 className="font-medium mb-3">{category}</h4>
                  <div className="space-y-2">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between">
                        <Label htmlFor={permission.id} className="text-sm font-normal">
                          {permission.name}
                        </Label>
                        <Switch
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Employee Preview */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-medium mb-3">Предварительный просмотр</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {formData.name.split(' ').map(n => n[0]).join('') || 'NN'}
              </div>
              <div className="flex-1">
                <div className="font-medium">{formData.name || 'Имя сотрудника'}</div>
                <div className="text-sm text-slate-500">{formData.email || 'email@company.com'}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={roles.find(r => r.value === formData.role)?.color}>
                    {roles.find(r => r.value === formData.role)?.label}
                  </Badge>
                  <Badge variant="outline">
                    {departments.find(d => d.id === formData.departmentId)?.name || 'Департамент'}
                  </Badge>
                  <Badge className={formData.isActive ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'}>
                    {formData.isActive ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={!formData.name || !formData.email}>
            {employee ? 'Сохранить' : 'Добавить сотрудника'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}