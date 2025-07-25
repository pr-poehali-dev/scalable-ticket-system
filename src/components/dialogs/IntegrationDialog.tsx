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

export type IntegrationType = 'telegram' | 'whatsapp' | 'email' | 'vk' | 'sms';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  createdAt: string;
  lastSync: string;
  messagesCount: number;
}

interface IntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration?: Integration;
  onSave: (integration: Omit<Integration, 'id' | 'createdAt' | 'lastSync' | 'messagesCount'>) => void;
}

const integrationTypes = [
  { value: 'telegram', label: 'Telegram Bot', icon: 'MessageCircle' },
  { value: 'whatsapp', label: 'WhatsApp Business', icon: 'MessageSquare' },
  { value: 'email', label: 'Email SMTP', icon: 'Mail' },
  { value: 'vk', label: 'ВКонтакте', icon: 'Users' },
  { value: 'sms', label: 'SMS провайдер', icon: 'Smartphone' }
];

export default function IntegrationDialog({ open, onOpenChange, integration, onSave }: IntegrationDialogProps) {
  const [formData, setFormData] = useState({
    name: integration?.name || '',
    type: integration?.type || 'telegram' as IntegrationType,
    status: integration?.status || 'inactive' as const,
    config: integration?.config || {}
  });

  const [configForm, setConfigForm] = useState(() => {
    if (integration?.config) return integration.config;
    
    switch (formData.type) {
      case 'telegram':
        return { botToken: '', webhookUrl: '', allowGroups: false };
      case 'whatsapp':
        return { accessToken: '', phoneNumberId: '', webhookVerifyToken: '' };
      case 'email':
        return { smtpHost: '', smtpPort: 587, username: '', password: '', ssl: true };
      case 'vk':
        return { accessToken: '', groupId: '', confirmationToken: '' };
      case 'sms':
        return { apiKey: '', provider: 'sms.ru', sender: '' };
      default:
        return {};
    }
  });

  const handleSave = () => {
    onSave({
      name: formData.name,
      type: formData.type,
      status: formData.status,
      config: configForm
    });
    onOpenChange(false);
  };

  const renderConfigForm = () => {
    switch (formData.type) {
      case 'telegram':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="botToken">Bot Token</Label>
              <Input
                id="botToken"
                placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                value={configForm.botToken || ''}
                onChange={(e) => setConfigForm({ ...configForm, botToken: e.target.value })}
              />
              <p className="text-xs text-slate-500 mt-1">
                Получите токен у @BotFather в Telegram
              </p>
            </div>
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://yourdomain.com/webhook/telegram"
                value={configForm.webhookUrl || ''}
                onChange={(e) => setConfigForm({ ...configForm, webhookUrl: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allowGroups">Разрешить работу в группах</Label>
              <Switch
                id="allowGroups"
                checked={configForm.allowGroups || false}
                onCheckedChange={(checked) => setConfigForm({ ...configForm, allowGroups: checked })}
              />
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                placeholder="EAAXXXXXXXXXXXXXXXXXXXxx"
                value={configForm.accessToken || ''}
                onChange={(e) => setConfigForm({ ...configForm, accessToken: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumberId">Phone Number ID</Label>
              <Input
                id="phoneNumberId"
                placeholder="1234567890123456"
                value={configForm.phoneNumberId || ''}
                onChange={(e) => setConfigForm({ ...configForm, phoneNumberId: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="webhookVerifyToken">Webhook Verify Token</Label>
              <Input
                id="webhookVerifyToken"
                placeholder="your_verify_token"
                value={configForm.webhookVerifyToken || ''}
                onChange={(e) => setConfigForm({ ...configForm, webhookVerifyToken: e.target.value })}
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  placeholder="smtp.gmail.com"
                  value={configForm.smtpHost || ''}
                  onChange={(e) => setConfigForm({ ...configForm, smtpHost: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  placeholder="587"
                  value={configForm.smtpPort || 587}
                  onChange={(e) => setConfigForm({ ...configForm, smtpPort: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                placeholder="your-email@gmail.com"
                value={configForm.username || ''}
                onChange={(e) => setConfigForm({ ...configForm, username: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={configForm.password || ''}
                onChange={(e) => setConfigForm({ ...configForm, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ssl">Использовать SSL</Label>
              <Switch
                id="ssl"
                checked={configForm.ssl !== false}
                onCheckedChange={(checked) => setConfigForm({ ...configForm, ssl: checked })}
              />
            </div>
          </div>
        );

      case 'vk':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                placeholder="vk1.a.XXXXXXXXXXXXXXXX"
                value={configForm.accessToken || ''}
                onChange={(e) => setConfigForm({ ...configForm, accessToken: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="groupId">ID группы</Label>
              <Input
                id="groupId"
                placeholder="123456789"
                value={configForm.groupId || ''}
                onChange={(e) => setConfigForm({ ...configForm, groupId: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirmationToken">Confirmation Token</Label>
              <Input
                id="confirmationToken"
                placeholder="confirmation_token"
                value={configForm.confirmationToken || ''}
                onChange={(e) => setConfigForm({ ...configForm, confirmationToken: e.target.value })}
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="provider">SMS Провайдер</Label>
              <Select
                value={configForm.provider || 'sms.ru'}
                onValueChange={(value) => setConfigForm({ ...configForm, provider: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms.ru">SMS.ru</SelectItem>
                  <SelectItem value="smsc.ru">SMSC.ru</SelectItem>
                  <SelectItem value="smsaero.ru">SMS Aero</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="your_api_key"
                value={configForm.apiKey || ''}
                onChange={(e) => setConfigForm({ ...configForm, apiKey: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sender">Отправитель</Label>
              <Input
                id="sender"
                placeholder="Your Company"
                value={configForm.sender || ''}
                onChange={(e) => setConfigForm({ ...configForm, sender: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return <div>Конфигурация не требуется</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {integration ? 'Редактировать интеграцию' : 'Создать интеграцию'}
          </DialogTitle>
          <DialogDescription>
            Настройте подключение к внешнему сервису для приема сообщений от клиентов
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Название интеграции</Label>
              <Input
                id="name"
                placeholder="Основной Telegram Bot"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="type">Тип интеграции</Label>
              <Select
                value={formData.type}
                onValueChange={(value: IntegrationType) => {
                  setFormData({ ...formData, type: value });
                  // Reset config when type changes
                  switch (value) {
                    case 'telegram':
                      setConfigForm({ botToken: '', webhookUrl: '', allowGroups: false });
                      break;
                    case 'whatsapp':
                      setConfigForm({ accessToken: '', phoneNumberId: '', webhookVerifyToken: '' });
                      break;
                    case 'email':
                      setConfigForm({ smtpHost: '', smtpPort: 587, username: '', password: '', ssl: true });
                      break;
                    case 'vk':
                      setConfigForm({ accessToken: '', groupId: '', confirmationToken: '' });
                      break;
                    case 'sms':
                      setConfigForm({ apiKey: '', provider: 'sms.ru', sender: '' });
                      break;
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {integrationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon name={type.icon as any} className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status">Активна</Label>
              <Switch
                id="status"
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, status: checked ? 'active' : 'inactive' })
                }
              />
            </div>
          </div>

          {/* Configuration */}
          <div>
            <Label className="text-base font-medium">Конфигурация</Label>
            <div className="mt-3 p-4 border border-slate-200 rounded-lg">
              {renderConfigForm()}
            </div>
          </div>

          {/* Testing */}
          {formData.type === 'telegram' && configForm.botToken && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Info" className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Тестирование бота</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                После сохранения вы можете протестировать бота, отправив команду /start
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                <Icon name="TestTube" className="w-4 h-4 mr-2" />
                Тестировать подключение
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={!formData.name || !formData.type}>
            {integration ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}