import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data
  const tickets = [
    {
      id: '#T-2024-001',
      subject: 'Проблема с интеграцией Telegram Bot',
      client: 'ООО "ТехСервис"',
      status: 'in_progress',
      priority: 'high',
      channel: 'telegram',
      assignee: 'Иван Петров',
      created: '2 часа назад',
      sla: 'В норме (осталось 4ч)',
      department: 'Техподдержка'
    },
    {
      id: '#T-2024-002',
      subject: 'Настройка WhatsApp Business API',
      client: 'ИП Сидоров А.В.',
      status: 'new',
      priority: 'medium',
      channel: 'whatsapp',
      assignee: 'Анна Иванова',
      created: '45 минут назад',
      sla: 'Просрочено (2ч 15м)',
      department: 'Интеграции'
    },
    {
      id: '#T-2024-003',
      subject: 'Вопрос по API документации',
      client: 'StartupTech Ltd',
      status: 'resolved',
      priority: 'low',
      channel: 'email',
      assignee: 'Михаил Козлов',
      created: '1 день назад',
      sla: 'Выполнено в срок',
      department: 'Разработка'
    }
  ];

  const departments = [
    { name: 'Техподдержка', tickets: 45, active: 12, integrations: ['telegram', 'whatsapp', 'email'] },
    { name: 'Продажи', tickets: 23, active: 8, integrations: ['whatsapp', 'vk', 'sms'] },
    { name: 'Интеграции', tickets: 17, active: 5, integrations: ['telegram', 'whatsapp', 'email', 'sms'] }
  ];

  const stats = {
    totalTickets: 1247,
    activeTickets: 89,
    resolvedToday: 156,
    avgResponseTime: '2.4ч',
    slaCompliance: 94.2,
    customerSatisfaction: 4.8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'in_progress': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'resolved': return 'bg-green-500/10 text-green-600 border-green-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'telegram': return 'Send';
      case 'whatsapp': return 'MessageCircle';
      case 'email': return 'Mail';
      case 'vk': return 'Users';
      case 'sms': return 'Smartphone';
      default: return 'MessageSquare';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon name="Ticket" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Enterprise Ticket System</h1>
                  <p className="text-sm text-slate-500">Масштабируемая система управления обращениями</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">Все системы работают</span>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                Настройки
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Создать тикет
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white/60 backdrop-blur-xl border-r border-slate-200/60 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
              { id: 'tickets', label: 'Тикеты', icon: 'Ticket', badge: '89' },
              { id: 'departments', label: 'Департаменты', icon: 'Building2' },
              { id: 'users', label: 'Сотрудники', icon: 'Users' },
              { id: 'clients', label: 'Клиенты', icon: 'UserCheck' },
              { id: 'knowledge', label: 'База знаний', icon: 'BookOpen' },
              { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
              { id: 'integrations', label: 'Интеграции', icon: 'Zap' },
              { id: 'api', label: 'API', icon: 'Code' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon as any} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge className={`text-xs ${activeSection === item.id ? 'bg-white/20 text-white' : 'bg-slate-100'}`}>
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          <Separator className="my-6" />

          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Быстрая статистика</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Активные тикеты</span>
                <span className="font-bold text-slate-900">{stats.activeTickets}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">SLA соответствие</span>
                <span className="font-bold text-green-600">{stats.slaCompliance}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Среднее время ответа</span>
                <span className="font-bold text-slate-900">{stats.avgResponseTime}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { label: 'Всего тикетов', value: stats.totalTickets, icon: 'Ticket', change: '+12%', color: 'indigo' },
              { label: 'Активные', value: stats.activeTickets, icon: 'Clock', change: '-3%', color: 'amber' },
              { label: 'Решено сегодня', value: stats.resolvedToday, icon: 'CheckCircle', change: '+18%', color: 'green' },
              { label: 'Время ответа', value: stats.avgResponseTime, icon: 'Timer', change: '-8%', color: 'blue' },
              { label: 'SLA %', value: `${stats.slaCompliance}%`, icon: 'Target', change: '+2%', color: 'purple' },
              { label: 'Рейтинг', value: stats.customerSatisfaction, icon: 'Star', change: '+0.2', color: 'orange' }
            ].map((stat, idx) => (
              <Card key={idx} className="p-4 bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={stat.icon as any} className={`w-5 h-5 text-${stat.color}-600`} />
                  <Badge variant="outline" className={`text-xs text-${stat.change.startsWith('+') ? 'green' : 'red'}-600`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
              <TabsTrigger value="tickets">Тикеты</TabsTrigger>
              <TabsTrigger value="departments">Департаменты</TabsTrigger>
              <TabsTrigger value="users">Сотрудники</TabsTrigger>
              <TabsTrigger value="clients">Клиенты</TabsTrigger>
              <TabsTrigger value="knowledge">База знаний</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              <TabsTrigger value="integrations">Интеграции</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            {/* Tickets Table */}
            <TabsContent value="tickets" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Управление тикетами</h2>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Поиск тикетов..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="new">Новые</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="resolved">Решенные</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="Filter" className="w-4 h-4 mr-2" />
                      Фильтры
                    </Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow>
                        <TableHead className="font-semibold">ID / Тема</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Приоритет</TableHead>
                        <TableHead>Канал</TableHead>
                        <TableHead>Ответственный</TableHead>
                        <TableHead>SLA</TableHead>
                        <TableHead>Создан</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="space-y-1">
                            <div className="font-medium text-slate-900">{ticket.id}</div>
                            <div className="text-sm text-slate-600">{ticket.subject}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full"></div>
                              <span className="text-sm font-medium">{ticket.client}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status === 'new' && 'Новый'}
                              {ticket.status === 'in_progress' && 'В работе'}
                              {ticket.status === 'resolved' && 'Решен'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority === 'high' && 'Высокий'}
                              {ticket.priority === 'medium' && 'Средний'}
                              {ticket.priority === 'low' && 'Низкий'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon name={getChannelIcon(ticket.channel) as any} className="w-4 h-4 text-slate-600" />
                              <span className="text-sm capitalize">{ticket.channel}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{ticket.assignee}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm font-medium ${
                              ticket.sla.includes('Просрочено') ? 'text-red-600' : 
                              ticket.sla.includes('В норме') ? 'text-green-600' : 'text-slate-600'
                            }`}>
                              {ticket.sla}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-slate-600">{ticket.created}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="MessageSquare" className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="MoreHorizontal" className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>

            {/* Departments */}
            <TabsContent value="departments" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Управление департаментами</h2>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Добавить департамент
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept, idx) => (
                    <Card key={idx} className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">{dept.name}</h3>
                        <Button variant="ghost" size="sm">
                          <Icon name="Settings" className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Всего тикетов</span>
                          <span className="font-bold">{dept.tickets}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Активные</span>
                          <span className="font-bold text-amber-600">{dept.active}</span>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-slate-600 mb-2">Интеграции:</p>
                          <div className="flex flex-wrap gap-2">
                            {dept.integrations.map((integration) => (
                              <Badge key={integration} variant="outline" className="text-xs">
                                <Icon name={getChannelIcon(integration) as any} className="w-3 h-3 mr-1" />
                                {integration}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Последняя активность</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Создан новый тикет', details: '#T-2024-004 от ООО "НовТех"', time: '2 мин назад', type: 'create' },
                      { action: 'Тикет решен', details: '#T-2024-001 - Интеграция Telegram', time: '15 мин назад', type: 'resolve' },
                      { action: 'SLA нарушен', details: '#T-2024-002 - превышено время ответа', time: '1 час назад', type: 'sla' },
                      { action: 'Новый сотрудник', details: 'Добавлен Петр Иванов в отдел продаж', time: '2 часа назад', type: 'user' }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50/50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'create' ? 'bg-blue-500' :
                          activity.type === 'resolve' ? 'bg-green-500' :
                          activity.type === 'sla' ? 'bg-red-500' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-xs text-slate-600">{activity.details}</p>
                          <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* SLA Performance */}
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Производительность SLA</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Техподдержка</span>
                        <span className="font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Продажи</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Интеграции</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Integration Status */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Статус интеграций</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'Telegram', status: 'active', count: 3 },
                    { name: 'WhatsApp', status: 'active', count: 2 },
                    { name: 'Email', status: 'active', count: 5 },
                    { name: 'ВКонтакте', status: 'warning', count: 1 },
                    { name: 'SMS', status: 'active', count: 2 },
                    { name: 'Android App', status: 'inactive', count: 0 }
                  ].map((integration, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                          integration.status === 'active' ? 'bg-green-500' :
                          integration.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium">{integration.name}</span>
                      </div>
                      <p className="text-xs text-slate-600">{integration.count} подключений</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Other sections placeholder */}
            {['users', 'clients', 'knowledge', 'analytics', 'integrations', 'api'].map((section) => (
              <TabsContent key={section} value={section}>
                <Card className="p-12 bg-white/70 backdrop-blur-sm border-slate-200/60 text-center">
                  <Icon name="Construction" className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {section === 'users' && 'Управление сотрудниками'}
                    {section === 'clients' && 'База клиентов'}
                    {section === 'knowledge' && 'База знаний'}
                    {section === 'analytics' && 'Аналитика и отчеты'}
                    {section === 'integrations' && 'Настройка интеграций'}
                    {section === 'api' && 'API документация'}
                  </h2>
                  <p className="text-slate-600 mb-6">Этот раздел находится в разработке</p>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    Начать разработку
                  </Button>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}