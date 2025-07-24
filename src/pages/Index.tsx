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

            {/* Enhanced Tickets Table */}
            <TabsContent value="tickets" className="space-y-4">
              {/* Ticket Filters and Actions */}
              <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Input placeholder="Поиск тикетов, клиентов..." className="w-80" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="new">Новые</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="resolved">Решенные</SelectItem>
                        <SelectItem value="closed">Закрытые</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Приоритет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все приоритеты</SelectItem>
                        <SelectItem value="critical">Критический</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="low">Низкий</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Департамент" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все отделы</SelectItem>
                        <SelectItem value="support">Техподдержка</SelectItem>
                        <SelectItem value="sales">Продажи</SelectItem>
                        <SelectItem value="integrations">Интеграции</SelectItem>
                        <SelectItem value="development">Разработка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" className="w-4 h-4 mr-2" />
                      Экспорт
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Bookmark" className="w-4 h-4 mr-2" />
                      Сохр. фильтр
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Создать тикет
                    </Button>
                  </div>
                </div>
                
                {/* Saved Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-600">Быстрые фильтры:</span>
                  <Button variant="outline" size="sm" className="h-7">
                    <Icon name="Clock" className="w-3 h-3 mr-1" />
                    Просроченные SLA
                  </Button>
                  <Button variant="outline" size="sm" className="h-7">
                    <Icon name="AlertTriangle" className="w-3 h-3 mr-1" />
                    Мои тикеты
                  </Button>
                  <Button variant="outline" size="sm" className="h-7">
                    <Icon name="Users" className="w-3 h-3 mr-1" />
                    Без назначения
                  </Button>
                  <Button variant="outline" size="sm" className="h-7">
                    <Icon name="TrendingUp" className="w-3 h-3 mr-1" />
                    Высокий приоритет
                  </Button>
                </div>
              </Card>

              {/* Main Tickets Table */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900">Тикеты</h2>
                    <Badge variant="outline">{tickets.length + 47} активных</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Icon name="Columns" className="w-4 h-4 mr-2" />
                      Столбцы
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="ArrowUpDown" className="w-4 h-4 mr-2" />
                      Сортировка
                    </Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow>
                        <TableHead className="w-4">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            ID / Тема
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            Клиент
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            Статус
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            Приоритет
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold">Канал</TableHead>
                        <TableHead className="font-semibold">Ответственный</TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            SLA
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold cursor-pointer hover:bg-slate-100">
                          <div className="flex items-center gap-1">
                            Создан
                            <Icon name="ArrowUpDown" className="w-3 h-3" />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold">Последний ответ</TableHead>
                        <TableHead className="font-semibold w-20">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow 
                          key={ticket.id} 
                          className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${
                            selectedTicket === ticket.id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-500' : ''
                          }`}
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <TableCell>
                            <input type="checkbox" className="rounded border-slate-300" />
                          </TableCell>
                          <TableCell className="space-y-1">
                            <div className="font-medium text-slate-900">{ticket.id}</div>
                            <div className="text-sm text-slate-600 max-w-xs truncate">{ticket.subject}</div>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline" className="text-xs">{ticket.department}</Badge>
                              {ticket.status === 'in_progress' && (
                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 text-xs">
                                  В работе
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">{ticket.client.split(' ')[0][0]}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium">{ticket.client}</div>
                                <div className="text-xs text-slate-500">ID: CL-{Math.floor(Math.random() * 10000)}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select value={ticket.status}>
                              <SelectTrigger className={`w-32 h-8 ${getStatusColor(ticket.status)}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Новый</SelectItem>
                                <SelectItem value="in_progress">В работе</SelectItem>
                                <SelectItem value="pending">Ожидает</SelectItem>
                                <SelectItem value="resolved">Решен</SelectItem>
                                <SelectItem value="closed">Закрыт</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select value={ticket.priority}>
                              <SelectTrigger className={`w-28 h-8 ${getPriorityColor(ticket.priority)}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">Критический</SelectItem>
                                <SelectItem value="high">Высокий</SelectItem>
                                <SelectItem value="medium">Средний</SelectItem>
                                <SelectItem value="low">Низкий</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon name={getChannelIcon(ticket.channel) as any} className="w-4 h-4 text-slate-600" />
                              <span className="text-sm capitalize">{ticket.channel}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select value={ticket.assignee}>
                              <SelectTrigger className="w-36 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Иван Петров">Иван Петров</SelectItem>
                                <SelectItem value="Анна Иванова">Анна Иванова</SelectItem>
                                <SelectItem value="Михаил Козлов">Михаил Козлов</SelectItem>
                                <SelectItem value="Елена Сидорова">Елена Сидорова</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <span className={`text-sm font-medium ${
                                ticket.sla.includes('Просрочено') ? 'text-red-600' : 
                                ticket.sla.includes('В норме') ? 'text-green-600' : 'text-slate-600'
                              }`}>
                                {ticket.sla}
                              </span>
                              <div className="w-full bg-slate-200 rounded-full h-1">
                                <div className={`h-1 rounded-full ${
                                  ticket.sla.includes('Просрочено') ? 'bg-red-500' : 
                                  ticket.sla.includes('В норме') ? 'bg-green-500' : 'bg-amber-500'
                                }`} style={{ width: ticket.sla.includes('Просрочено') ? '100%' : '60%' }}></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-slate-600">{ticket.created}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">Клиент</div>
                              <div className="text-xs text-slate-500">35 мин назад</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" title="Просмотр">
                                <Icon name="Eye" className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Ответить">
                                <Icon name="MessageSquare" className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Ещё">
                                <Icon name="MoreHorizontal" className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Additional demo tickets */}
                      {[...Array(7)].map((_, idx) => (
                        <TableRow key={`demo-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell>
                            <input type="checkbox" className="rounded border-slate-300" />
                          </TableCell>
                          <TableCell className="space-y-1">
                            <div className="font-medium text-slate-900">#T-2024-{String(idx + 4).padStart(3, '0')}</div>
                            <div className="text-sm text-slate-600 max-w-xs truncate">
                              {[
                                'Ошибка в отправке уведомлений',
                                'Запрос на изменение тарифа',
                                'Проблема с авторизацией',
                                'Вопрос по интеграции API',
                                'Настройка webhook',
                                'Восстановление данных',
                                'Консультация по функционалу'
                              ][idx]}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {['Техподдержка', 'Продажи', 'Техподдержка', 'Разработка', 'Интеграции', 'Техподдержка', 'Продажи'][idx]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">{['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж'][idx]}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  {['Альфа Банк', 'ООО "Бета"', 'Компания "Вега"', 'Гамма Холдинг', 'Дельта Груп', 'Эпсилон Ко', 'Зета Лтд'][idx]}
                                </div>
                                <div className="text-xs text-slate-500">ID: CL-{1000 + idx}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={['new', 'in_progress', 'pending', 'resolved', 'new', 'in_progress', 'closed'][idx] === 'new' ? 'bg-blue-500/10 text-blue-600 border-blue-200' : 
                                            ['new', 'in_progress', 'pending', 'resolved', 'new', 'in_progress', 'closed'][idx] === 'in_progress' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                            ['new', 'in_progress', 'pending', 'resolved', 'new', 'in_progress', 'closed'][idx] === 'pending' ? 'bg-purple-500/10 text-purple-600 border-purple-200' :
                                            ['new', 'in_progress', 'pending', 'resolved', 'new', 'in_progress', 'closed'][idx] === 'resolved' ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-gray-500/10 text-gray-600 border-gray-200'}>
                              {['Новый', 'В работе', 'Ожидает', 'Решен', 'Новый', 'В работе', 'Закрыт'][idx]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={['high', 'medium', 'critical', 'low', 'medium', 'high', 'low'][idx] === 'critical' ? 'bg-red-600/10 text-red-700 border-red-300' :
                                            ['high', 'medium', 'critical', 'low', 'medium', 'high', 'low'][idx] === 'high' ? 'bg-red-500/10 text-red-600 border-red-200' :
                                            ['high', 'medium', 'critical', 'low', 'medium', 'high', 'low'][idx] === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-200' : 'bg-green-500/10 text-green-600 border-green-200'}>
                              {['Высокий', 'Средний', 'Критический', 'Низкий', 'Средний', 'Высокий', 'Низкий'][idx]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon name={['MessageCircle', 'Mail', 'Send', 'Smartphone', 'Users', 'MessageCircle', 'Mail'][idx] as any} className="w-4 h-4 text-slate-600" />
                              <span className="text-sm">
                                {['WhatsApp', 'Email', 'Telegram', 'SMS', 'ВК', 'WhatsApp', 'Email'][idx]}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {['Анна Иванова', 'Михаил Козлов', 'Иван Петров', 'Елена Сидорова', 'Анна Иванова', 'Иван Петров', 'Михаил Козлов'][idx]}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <span className={`text-sm font-medium ${
                                idx % 3 === 0 ? 'text-red-600' : idx % 3 === 1 ? 'text-green-600' : 'text-amber-600'
                              }`}>
                                {idx % 3 === 0 ? 'Просрочено' : idx % 3 === 1 ? 'В норме' : 'Осталось 2ч'}
                              </span>
                              <div className="w-full bg-slate-200 rounded-full h-1">
                                <div className={`h-1 rounded-full ${
                                  idx % 3 === 0 ? 'bg-red-500' : idx % 3 === 1 ? 'bg-green-500' : 'bg-amber-500'
                                }`} style={{ width: idx % 3 === 0 ? '100%' : idx % 3 === 1 ? '30%' : '80%' }}></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-slate-600">
                              {[
                                '3 часа назад',
                                'Вчера',
                                '2 дня назад',
                                'Сегодня',
                                '1 час назад',
                                '30 мин назад',
                                '2 недели назад'
                              ][idx]}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{idx % 2 === 0 ? 'Клиент' : 'Оператор'}</div>
                              <div className="text-xs text-slate-500">
                                {[
                                  '1 час назад',
                                  '20 мин назад',
                                  '2 часа назад',
                                  '45 мин назад',
                                  '15 мин назад',
                                  '5 мин назад',
                                  '3 дня назад'
                                ][idx]}
                              </div>
                            </div>
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

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">
                    Показано 10 из 89 тикетов
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <Icon name="ChevronLeft" className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-600">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <span className="text-slate-400">...</span>
                    <Button variant="outline" size="sm">9</Button>
                    <Button variant="outline" size="sm">
                      <Icon name="ChevronRight" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Ticket Detail Modal/Panel */}
              {selectedTicket && (
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60 border-l-4 border-l-indigo-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Детали тикета {selectedTicket}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                      <Icon name="X" className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <h4 className="font-medium mb-2">Проблема с интеграцией Telegram Bot</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Добрый день! При попытке настроить webhook для нашего бота получаем ошибку 403. 
                          Проверили все настройки, токен корректный. Подскажите, в чем может быть проблема?
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Icon name="Clock" className="w-3 h-3" />
                          Отправлено 2 часа назад
                        </div>
                      </div>

                      <div className="p-4 border border-slate-200 rounded-lg bg-blue-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="User" className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Иван Петров (Техподдержка)</span>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">
                          Здравствуйте! Проверил ваши настройки. Ошибка 403 обычно связана с неверным URL webhook. 
                          Убедитесь, что используете HTTPS и корректный домен. Также проверьте права бота в группе.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Icon name="Clock" className="w-3 h-3" />
                          Отправлено 1 час назад
                        </div>
                      </div>

                      {/* Reply Form */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Icon name="MessageSquare" className="w-3 h-3 mr-1" />
                            Клиенту
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 bg-amber-50 text-amber-700">
                            <Icon name="Users" className="w-3 h-3 mr-1" />
                            Внутренняя заметка
                          </Button>
                        </div>
                        <textarea 
                          className="w-full p-3 border border-slate-200 rounded-lg resize-none" 
                          rows={4} 
                          placeholder="Введите ответ клиенту..."
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Paperclip" className="w-4 h-4 mr-2" />
                              Прикрепить
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                              База знаний
                            </Button>
                          </div>
                          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Icon name="Send" className="w-4 h-4 mr-2" />
                            Отправить
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      {/* Ticket Info */}
                      <div className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <h5 className="font-medium">Информация о тикете</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Статус:</span>
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">В работе</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Приоритет:</span>
                            <Badge className="bg-red-500/10 text-red-600 border-red-200">Высокий</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Канал:</span>
                            <div className="flex items-center gap-1">
                              <Icon name="Send" className="w-3 h-3" />
                              Telegram
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">SLA:</span>
                            <span className="text-green-600 font-medium">В норме</span>
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <h5 className="font-medium">Клиент</h5>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">ТС</span>
                          </div>
                          <div>
                            <div className="font-medium">ООО "ТехСервис"</div>
                            <div className="text-sm text-slate-500">Клиент с 2023</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Всего тикетов:</span>
                            <span className="font-medium">23</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Решено:</span>
                            <span className="font-medium text-green-600">21</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Рейтинг:</span>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="font-medium">4.8</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                          Профиль клиента
                        </Button>
                      </div>

                      {/* Quick Actions */}
                      <div className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <h5 className="font-medium">Быстрые действия</h5>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                            Назначить сотрудника
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Icon name="Tags" className="w-4 h-4 mr-2" />
                            Добавить теги
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Icon name="Clock" className="w-4 h-4 mr-2" />
                            Изменить SLA
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Icon name="Archive" className="w-4 h-4 mr-2" />
                            Архивировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
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

            {/* Integrations */}
            <TabsContent value="integrations" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Управление интеграциями</h2>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Добавить интеграцию
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Telegram Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Icon name="Send" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Telegram Bot</h3>
                          <p className="text-sm text-slate-500">3 активных подключения</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-200">Активно</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Тикетов за день</span>
                        <span className="font-bold">47</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Время ответа</span>
                        <span className="font-bold text-green-600">1.2ч</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Последняя активность</span>
                        <span className="font-bold">2 мин назад</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 mb-2">Подключенные боты:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">@support_bot</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">@sales_bot</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="BarChart" className="w-4 h-4 mr-2" />
                        Статистика
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                  </Card>

                  {/* WhatsApp Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <Icon name="MessageCircle" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">WhatsApp</h3>
                          <p className="text-sm text-slate-500">Business + Web</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-200">Активно</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Тикетов за день</span>
                        <span className="font-bold">23</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Время ответа</span>
                        <span className="font-bold text-green-600">0.8ч</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">QR обновлен</span>
                        <span className="font-bold">1 час назад</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 mb-2">Подключения:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">Business API</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="ExternalLink" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">WhatsApp Web</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="QrCode" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="QrCode" className="w-4 h-4 mr-2" />
                        QR-код
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                  </Card>

                  {/* Email Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Icon name="Mail" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Email</h3>
                          <p className="text-sm text-slate-500">IMAP/SMTP</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-200">Активно</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Писем за день</span>
                        <span className="font-bold">156</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Время ответа</span>
                        <span className="font-bold text-amber-600">3.5ч</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Последняя синхронизация</span>
                        <span className="font-bold">1 мин назад</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 mb-2">Подключенные ящики:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">support@company.com</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">sales@company.com</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="TestTube" className="w-4 h-4 mr-2" />
                        Тест
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                  </Card>

                  {/* VK Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Icon name="Users" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">ВКонтакте</h3>
                          <p className="text-sm text-slate-500">Callback API</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Предупреждение</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Сообщений за день</span>
                        <span className="font-bold">12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Время ответа</span>
                        <span className="font-bold text-green-600">2.1ч</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Токен истекает</span>
                        <span className="font-bold text-amber-600">через 3 дня</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 mb-2">Подключенные сообщества:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">Техподдержка</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="RefreshCw" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                        Обновить
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                  </Card>

                  {/* SMS Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Icon name="Smartphone" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">SMS</h3>
                          <p className="text-sm text-slate-500">Twilio, SMS.RU</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-200">Активно</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">SMS за день</span>
                        <span className="font-bold">8</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Стоимость</span>
                        <span className="font-bold text-green-600">₽24</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Баланс</span>
                        <span className="font-bold">₽1,250</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 mb-2">Провайдеры:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">Twilio</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium">SMS.RU</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Button variant="ghost" size="sm">
                              <Icon name="Settings" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="CreditCard" className="w-4 h-4 mr-2" />
                        Пополнить
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                  </Card>

                  {/* Android App Integration */}
                  <Card className="p-6 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                          <Icon name="Smartphone" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Android App</h3>
                          <p className="text-sm text-slate-500">Мобильное приложение</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500/10 text-red-600 border-red-200">Не настроено</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Активных установок</span>
                        <span className="font-bold">0</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Версия API</span>
                        <span className="font-bold text-slate-400">-</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Статус</span>
                        <span className="font-bold text-red-600">Не подключено</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg mb-4">
                      <p className="text-sm text-slate-600 mb-2">Для подключения:</p>
                      <ul className="text-xs text-slate-500 space-y-1">
                        <li>• Настройте API ключи</li>
                        <li>• Скачайте SDK</li>
                        <li>• Интегрируйте в приложение</li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Download" className="w-4 h-4 mr-2" />
                        Скачать SDK
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="FileText" className="w-4 h-4 mr-2" />
                        Документация
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Integration Health Monitor */}
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60 mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Мониторинг состояния интеграций</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Общее здоровье</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">94%</p>
                      <p className="text-xs text-slate-500">5/6 интеграций активны</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Среднее время отклика</span>
                        <Icon name="Clock" className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">127ms</p>
                      <p className="text-xs text-slate-500">Последние 24 часа</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Обработано сообщений</span>
                        <Icon name="MessageSquare" className="w-4 h-4 text-purple-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">2,847</p>
                      <p className="text-xs text-slate-500">За сегодня</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Ошибки</span>
                        <Icon name="AlertTriangle" className="w-4 h-4 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold text-amber-600">3</p>
                      <p className="text-xs text-slate-500">За последний час</p>
                    </div>
                  </div>
                </Card>
              </Card>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Управление сотрудниками</h2>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Поиск сотрудников..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все роли</SelectItem>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="manager">Менеджер</SelectItem>
                        <SelectItem value="operator">Оператор</SelectItem>
                        <SelectItem value="viewer">Наблюдатель</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                      Добавить сотрудника
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      name: 'Иван Петров',
                      role: 'Администратор',
                      department: ['Техподдержка', 'Интеграции'],
                      email: 'ivan@company.com',
                      avatar: 'ИП',
                      status: 'online',
                      lastSeen: 'Сейчас онлайн',
                      ticketsTotal: 156,
                      ticketsActive: 8,
                      rating: 4.9,
                      permissions: ['all']
                    },
                    {
                      name: 'Анна Иванова',
                      role: 'Менеджер',
                      department: ['Продажи'],
                      email: 'anna@company.com',
                      avatar: 'АИ',
                      status: 'online',
                      lastSeen: '5 мин назад',
                      ticketsTotal: 89,
                      ticketsActive: 12,
                      rating: 4.7,
                      permissions: ['tickets_manage', 'clients_view']
                    },
                    {
                      name: 'Михаил Козлов',
                      role: 'Оператор',
                      department: ['Техподдержка'],
                      email: 'mikhail@company.com',
                      avatar: 'МК',
                      status: 'busy',
                      lastSeen: 'Занят',
                      ticketsTotal: 234,
                      ticketsActive: 15,
                      rating: 4.8,
                      permissions: ['tickets_reply', 'knowledge_view']
                    },
                    {
                      name: 'Елена Сидорова',
                      role: 'Оператор',
                      department: ['Интеграции', 'Разработка'],
                      email: 'elena@company.com',
                      avatar: 'ЕС',
                      status: 'offline',
                      lastSeen: '2 часа назад',
                      ticketsTotal: 67,
                      ticketsActive: 3,
                      rating: 4.6,
                      permissions: ['tickets_reply', 'integrations_manage']
                    }
                  ].map((user, idx) => (
                    <Card key={idx} className="p-4 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                              {user.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              user.status === 'online' ? 'bg-green-500' :
                              user.status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{user.name}</h3>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Роль:</span>
                          <Badge className={
                            user.role === 'Администратор' ? 'bg-red-500/10 text-red-600 border-red-200' :
                            user.role === 'Менеджер' ? 'bg-purple-500/10 text-purple-600 border-purple-200' :
                            'bg-blue-500/10 text-blue-600 border-blue-200'
                          }>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Статус:</span>
                          <span className={`font-medium ${
                            user.status === 'online' ? 'text-green-600' :
                            user.status === 'busy' ? 'text-amber-600' : 'text-gray-600'
                          }`}>
                            {user.lastSeen}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-xs text-slate-500 mb-1">Департаменты:</div>
                        <div className="flex flex-wrap gap-1">
                          {user.department.map((dept) => (
                            <Badge key={dept} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-slate-900">{user.ticketsTotal}</div>
                          <div className="text-xs text-slate-500">Всего</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-amber-600">{user.ticketsActive}</div>
                          <div className="text-xs text-slate-500">Активных</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">{user.rating}</div>
                          <div className="text-xs text-slate-500">Рейтинг</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Edit" className="w-3 h-3 mr-1" />
                          Изменить
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Shield" className="w-3 h-3 mr-1" />
                          Права
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Roles and Permissions Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Roles */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Роли</h3>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Создать роль
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Администратор', users: 1, color: 'red', permissions: 'Полный доступ' },
                        { name: 'Менеджер', users: 3, color: 'purple', permissions: 'Управление тикетами, клиентами' },
                        { name: 'Оператор', users: 8, color: 'blue', permissions: 'Ответы на тикеты, база знаний' },
                        { name: 'Наблюдатель', users: 2, color: 'gray', permissions: 'Только просмотр' }
                      ].map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-${role.color}-500`}></div>
                            <div>
                              <div className="font-medium">{role.name}</div>
                              <div className="text-sm text-slate-500">{role.permissions}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{role.users} польз.</Badge>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Permissions */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Права доступа</h3>
                      <Button variant="outline" size="sm">
                        <Icon name="Shield" className="w-4 h-4 mr-2" />
                        Настроить
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          category: 'Тикеты',
                          permissions: [
                            { name: 'Просмотр тикетов', enabled: true },
                            { name: 'Создание тикетов', enabled: true },
                            { name: 'Редактирование тикетов', enabled: false },
                            { name: 'Удаление тикетов', enabled: false }
                          ]
                        },
                        {
                          category: 'Клиенты',
                          permissions: [
                            { name: 'Просмотр клиентов', enabled: true },
                            { name: 'Редактирование профилей', enabled: false },
                            { name: 'Удаление клиентов', enabled: false }
                          ]
                        },
                        {
                          category: 'Система',
                          permissions: [
                            { name: 'Управление пользователями', enabled: false },
                            { name: 'Настройка интеграций', enabled: false },
                            { name: 'Просмотр аналитики', enabled: true }
                          ]
                        }
                      ].map((group, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="font-medium text-slate-700">{group.category}</h4>
                          <div className="space-y-1">
                            {group.permissions.map((permission, permIdx) => (
                              <div key={permIdx} className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">{permission.name}</span>
                                <div className={`w-8 h-4 rounded-full transition-colors ${
                                  permission.enabled ? 'bg-green-500' : 'bg-slate-300'
                                }`}>
                                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                                    permission.enabled ? 'translate-x-4' : 'translate-x-0.5'
                                  } mt-0.5`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* Clients Database */}
            <TabsContent value="clients" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">База клиентов</h2>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Поиск клиентов..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Сегмент" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все сегменты</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="individual">Физ. лица</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                      Добавить клиента
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      name: 'ООО "ТехСервис"',
                      email: 'contact@techservice.ru',
                      phone: '+7 (495) 123-45-67',
                      segment: 'Enterprise',
                      tickets: 23,
                      resolved: 21,
                      rating: 4.8,
                      lastActivity: '2 часа назад',
                      totalSpent: '₽125,000',
                      customFields: { industry: 'IT', employees: '500+', region: 'Москва' }
                    },
                    {
                      name: 'ИП Сидоров А.В.',
                      email: 'sidorov@example.com',
                      phone: '+7 (915) 234-56-78',
                      segment: 'Business',
                      tickets: 8,
                      resolved: 7,
                      rating: 4.5,
                      lastActivity: '1 день назад',
                      totalSpent: '₽45,000',
                      customFields: { industry: 'Торговля', employees: '5-10', region: 'СПб' }
                    },
                    {
                      name: 'StartupTech Ltd',
                      email: 'hello@startuptech.io',
                      phone: '+7 (812) 345-67-89',
                      segment: 'Startup',
                      tickets: 15,
                      resolved: 13,
                      rating: 4.7,
                      lastActivity: '30 мин назад',
                      totalSpent: '₽78,500',
                      customFields: { industry: 'Fintech', employees: '20-50', region: 'СПб' }
                    }
                  ].map((client, idx) => (
                    <Card key={idx} className="p-4 bg-white/50 border-slate-200/60 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{client.name.split(' ')[0][0]}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{client.name}</h3>
                            <p className="text-sm text-slate-500">{client.email}</p>
                          </div>
                        </div>
                        <Badge className={
                          client.segment === 'Enterprise' ? 'bg-purple-500/10 text-purple-600 border-purple-200' :
                          client.segment === 'Business' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                          client.segment === 'Startup' ? 'bg-green-500/10 text-green-600 border-green-200' :
                          'bg-gray-500/10 text-gray-600 border-gray-200'
                        }>
                          {client.segment}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-slate-900">{client.tickets}</div>
                            <div className="text-xs text-slate-500">Тикетов</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{client.resolved}</div>
                            <div className="text-xs text-slate-500">Решено</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-amber-600">{client.rating}</div>
                            <div className="text-xs text-slate-500">Рейтинг</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Телефон:</span>
                          <span className="font-medium">{client.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Потрачено:</span>
                          <span className="font-medium text-green-600">{client.totalSpent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Активность:</span>
                          <span className="font-medium">{client.lastActivity}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-xs text-slate-500">Дополнительные поля:</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">{client.customFields.industry}</Badge>
                          <Badge variant="outline" className="text-xs">{client.customFields.employees}</Badge>
                          <Badge variant="outline" className="text-xs">{client.customFields.region}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Eye" className="w-3 h-3 mr-1" />
                          Профиль
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="MessageSquare" className="w-3 h-3 mr-1" />
                          Тикеты
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Client Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <Card className="p-4 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Всего клиентов</span>
                      <Icon name="Users" className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">1,247</p>
                    <p className="text-xs text-green-600">+12% за месяц</p>
                  </Card>
                  <Card className="p-4 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Активные</span>
                      <Icon name="TrendingUp" className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">892</p>
                    <p className="text-xs text-green-600">+5% за неделю</p>
                  </Card>
                  <Card className="p-4 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Средний рейтинг</span>
                      <Icon name="Star" className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">4.6</p>
                    <p className="text-xs text-amber-600">+0.2 за месяц</p>
                  </Card>
                  <Card className="p-4 bg-white/50 border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Доход</span>
                      <Icon name="DollarSign" className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">₽2.4M</p>
                    <p className="text-xs text-green-600">+18% за месяц</p>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* Knowledge Base */}
            <TabsContent value="knowledge" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">База знаний</h2>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Поиск статей..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="integration">Интеграции</SelectItem>
                        <SelectItem value="troubleshooting">Устранение проблем</SelectItem>
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="billing">Биллинг</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Создать статью
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Категории</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Интеграции', count: 45, icon: 'Zap', color: 'blue' },
                        { name: 'Устранение проблем', count: 67, icon: 'AlertCircle', color: 'red' },
                        { name: 'API документация', count: 23, icon: 'Code', color: 'purple' },
                        { name: 'Биллинг', count: 12, icon: 'CreditCard', color: 'green' },
                        { name: 'Настройка', count: 34, icon: 'Settings', color: 'amber' },
                        { name: 'FAQ', count: 28, icon: 'HelpCircle', color: 'gray' }
                      ].map((category, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Icon name={category.icon as any} className={`w-4 h-4 text-${category.color}-500`} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Articles */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Статьи</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="ArrowUpDown" className="w-4 h-4 mr-2" />
                          Сортировка
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Filter" className="w-4 h-4 mr-2" />
                          Фильтры
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          title: 'Настройка Telegram Bot webhook',
                          category: 'Интеграции',
                          author: 'Иван Петров',
                          updated: '2 дня назад',
                          views: 234,
                          helpful: 89,
                          description: 'Пошаговая инструкция по настройке webhook для Telegram Bot с решением типичных проблем.'
                        },
                        {
                          title: 'Ошибка 403 при подключении WhatsApp API',
                          category: 'Устранение проблем',
                          author: 'Анна Иванова',
                          updated: '1 день назад',
                          views: 156,
                          helpful: 67,
                          description: 'Решение проблемы с авторизацией при подключении к WhatsApp Business API.'
                        },
                        {
                          title: 'REST API: Создание и управление тикетами',
                          category: 'API документация',
                          author: 'Михаил Козлов',
                          updated: '3 дня назад',
                          views: 445,
                          helpful: 156,
                          description: 'Полное руководство по работе с API для создания, обновления и управления тикетами.'
                        },
                        {
                          title: 'Настройка тарифных планов и биллинга',
                          category: 'Биллинг',
                          author: 'Елена Сидорова',
                          updated: '5 дней назад',
                          views: 78,
                          helpful: 23,
                          description: 'Информация о тарифных планах, настройке автоплатежей и управлении биллингом.'
                        }
                      ].map((article, idx) => (
                        <Card key={idx} className="p-4 bg-white/50 border-slate-200/60 hover:shadow-md transition-all duration-200 cursor-pointer">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-1">{article.title}</h4>
                              <p className="text-sm text-slate-600 mb-2">{article.description}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>Автор: {article.author}</span>
                                <span>Обновлено: {article.updated}</span>
                                <div className="flex items-center gap-1">
                                  <Icon name="Eye" className="w-3 h-3" />
                                  {article.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="ThumbsUp" className="w-3 h-3" />
                                  {article.helpful}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                              <Button variant="ghost" size="sm">
                                <Icon name="MoreHorizontal" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <Card className="p-4 bg-white/50 border-slate-200/60">
                      <h4 className="font-medium mb-3">Быстрые действия</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button variant="outline" size="sm">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Новая статья
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="FolderPlus" className="w-4 h-4 mr-2" />
                          Новая категория
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Upload" className="w-4 h-4 mr-2" />
                          Импорт
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" className="w-4 h-4 mr-2" />
                          Экспорт
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Analytics and Reports */}
            <TabsContent value="analytics" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Аналитика и отчеты</h2>
                  <div className="flex items-center gap-3">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Сегодня</SelectItem>
                        <SelectItem value="week">За неделю</SelectItem>
                        <SelectItem value="month">За месяц</SelectItem>
                        <SelectItem value="quarter">За квартал</SelectItem>
                        <SelectItem value="year">За год</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Icon name="Download" className="w-4 h-4 mr-2" />
                      Экспорт
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="BarChart" className="w-4 h-4 mr-2" />
                      Создать отчет
                    </Button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { 
                      title: 'Время первого ответа',
                      value: '2.4ч',
                      change: '-15%',
                      trend: 'down',
                      target: '< 4ч',
                      status: 'good'
                    },
                    {
                      title: 'Время решения',
                      value: '18.5ч',
                      change: '+8%',
                      trend: 'up',
                      target: '< 24ч',
                      status: 'good'
                    },
                    {
                      title: 'Соблюдение SLA',
                      value: '94.2%',
                      change: '+2%',
                      trend: 'up',
                      target: '> 90%',
                      status: 'excellent'
                    },
                    {
                      title: 'Удовлетворенность',
                      value: '4.8/5',
                      change: '+0.1',
                      trend: 'up',
                      target: '> 4.5',
                      status: 'excellent'
                    }
                  ].map((metric, idx) => (
                    <Card key={idx} className="p-4 bg-white/50 border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">{metric.title}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          metric.status === 'excellent' ? 'bg-green-500' :
                          metric.status === 'good' ? 'bg-blue-500' : 'bg-amber-500'
                        }`}></div>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                        <span className="text-slate-500">Цель: {metric.target}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Charts and Reports */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Ticket Volume Chart */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <h3 className="text-lg font-semibold mb-4">Объем тикетов</h3>
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="BarChart3" className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500">График объема тикетов по дням</p>
                        <p className="text-xs text-slate-400 mt-1">Здесь будет отображаться интерактивный график</p>
                      </div>
                    </div>
                  </Card>

                  {/* SLA Performance */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <h3 className="text-lg font-semibold mb-4">Производительность SLA</h3>
                    <div className="space-y-4">
                      {departments.map((dept, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium">{dept.name}</span>
                            <span className="text-slate-600">{[96, 89, 92][idx]}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                [96, 89, 92][idx] >= 95 ? 'bg-green-500' :
                                [96, 89, 92][idx] >= 90 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${[96, 89, 92][idx]}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Detailed Reports */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Operator Performance */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <h3 className="text-lg font-semibold mb-4">Производительность операторов</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Иван Петров', tickets: 24, rating: 4.9, responseTime: '1.2ч' },
                        { name: 'Анна Иванова', tickets: 18, rating: 4.7, responseTime: '2.1ч' },
                        { name: 'Михаил Козлов', tickets: 31, rating: 4.8, responseTime: '1.8ч' },
                        { name: 'Елена Сидорова', tickets: 15, rating: 4.6, responseTime: '2.5ч' }
                      ].map((operator, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{operator.name}</div>
                            <div className="text-xs text-slate-500">{operator.tickets} тикетов</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">⭐ {operator.rating}</div>
                            <div className="text-xs text-slate-500">{operator.responseTime}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Channel Performance */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <h3 className="text-lg font-semibold mb-4">Производительность каналов</h3>
                    <div className="space-y-3">
                      {[
                        { channel: 'Email', volume: 156, avgTime: '3.5ч', satisfaction: 4.6 },
                        { channel: 'Telegram', volume: 89, avgTime: '1.2ч', satisfaction: 4.8 },
                        { channel: 'WhatsApp', volume: 67, avgTime: '0.8ч', satisfaction: 4.9 },
                        { channel: 'ВКонтакте', volume: 23, avgTime: '2.1ч', satisfaction: 4.5 }
                      ].map((channel, idx) => (
                        <div key={idx} className="p-3 border border-slate-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{channel.channel}</span>
                            <Badge variant="outline" className="text-xs">{channel.volume} тикетов</Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Время ответа: {channel.avgTime}</span>
                            <span>Рейтинг: {channel.satisfaction}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Quick Reports */}
                  <Card className="p-6 bg-white/50 border-slate-200/60">
                    <h3 className="text-lg font-semibold mb-4">Быстрые отчеты</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Ежедневный отчет', description: 'Сводка за сегодня' },
                        { name: 'SLA отчет', description: 'Соблюдение SLA' },
                        { name: 'Отчет по клиентам', description: 'Активность клиентов' },
                        { name: 'Производительность', description: 'Метрики операторов' },
                        { name: 'Финансовый отчет', description: 'Доходы и расходы' }
                      ].map((report, idx) => (
                        <Button key={idx} variant="outline" className="w-full justify-start h-auto p-3">
                          <div className="text-left">
                            <div className="font-medium text-sm">{report.name}</div>
                            <div className="text-xs text-slate-500">{report.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* API Documentation */}
            <TabsContent value="api" className="space-y-4">
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">API документация</h2>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500/10 text-green-600 border-green-200">
                      v2.1.0
                    </Badge>
                    <Button variant="outline">
                      <Icon name="Download" className="w-4 h-4 mr-2" />
                      Скачать OpenAPI
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Icon name="Key" className="w-4 h-4 mr-2" />
                      Получить API ключ
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* API Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Разделы API</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Аутентификация', icon: 'Key', color: 'purple' },
                        { name: 'Тикеты', icon: 'Ticket', color: 'blue' },
                        { name: 'Клиенты', icon: 'Users', color: 'green' },
                        { name: 'Сотрудники', icon: 'UserCheck', color: 'amber' },
                        { name: 'Интеграции', icon: 'Zap', color: 'red' },
                        { name: 'Webhooks', icon: 'Webhook', color: 'indigo' }
                      ].map((section, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <Icon name={section.icon as any} className={`w-4 h-4 text-${section.color}-500`} />
                          <span className="font-medium">{section.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* API Endpoints */}
                  <div className="lg:col-span-3 space-y-4">
                    <h3 className="font-semibold text-slate-900">Основные эндпоинты</h3>
                    
                    <div className="space-y-3">
                      {[
                        {
                          method: 'GET',
                          endpoint: '/api/v2/tickets',
                          description: 'Получить список тикетов',
                          params: 'status, limit, offset'
                        },
                        {
                          method: 'POST',
                          endpoint: '/api/v2/tickets',
                          description: 'Создать новый тикет',
                          params: 'subject, message, priority'
                        },
                        {
                          method: 'GET',
                          endpoint: '/api/v2/tickets/{id}',
                          description: 'Получить тикет по ID',
                          params: 'include_messages'
                        },
                        {
                          method: 'PUT',
                          endpoint: '/api/v2/tickets/{id}',
                          description: 'Обновить тикет',
                          params: 'status, assignee, priority'
                        },
                        {
                          method: 'POST',
                          endpoint: '/api/v2/tickets/{id}/messages',
                          description: 'Добавить сообщение к тикету',
                          params: 'message, is_internal'
                        }
                      ].map((endpoint, idx) => (
                        <Card key={idx} className="p-4 bg-white/50 border-slate-200/60 hover:shadow-md transition-all duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge className={
                                endpoint.method === 'GET' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                                endpoint.method === 'POST' ? 'bg-green-500/10 text-green-600 border-green-200' :
                                endpoint.method === 'PUT' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                'bg-red-500/10 text-red-600 border-red-200'
                              }>
                                {endpoint.method}
                              </Badge>
                              <code className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{endpoint.endpoint}</code>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Icon name="ExternalLink" className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{endpoint.description}</p>
                          <p className="text-xs text-slate-500">
                            <strong>Параметры:</strong> {endpoint.params}
                          </p>
                        </Card>
                      ))}
                    </div>

                    {/* Code Example */}
                    <Card className="p-6 bg-white/50 border-slate-200/60">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Пример запроса</h4>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">JavaScript</Button>
                          <Button variant="ghost" size="sm">Python</Button>
                          <Button variant="ghost" size="sm">PHP</Button>
                        </div>
                      </div>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <div className="text-slate-400">// Создание нового тикета</div>
                        <div>const response = await fetch('/api/v2/tickets', {`{`}</div>
                        <div className="ml-4">method: 'POST',</div>
                        <div className="ml-4">headers: {`{`}</div>
                        <div className="ml-8">'Authorization': 'Bearer YOUR_API_KEY',</div>
                        <div className="ml-8">'Content-Type': 'application/json'</div>
                        <div className="ml-4">{`}`},</div>
                        <div className="ml-4">body: JSON.stringify({`{`}</div>
                        <div className="ml-8">subject: 'Проблема с интеграцией',</div>
                        <div className="ml-8">message: 'Описание проблемы...',</div>
                        <div className="ml-8">priority: 'high',</div>
                        <div className="ml-8">client_id: 'CLIENT_123'</div>
                        <div className="ml-4">{`}`})</div>
                        <div>{`}`});</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}