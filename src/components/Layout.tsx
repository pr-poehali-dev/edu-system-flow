import { useState } from "react";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "dashboard", label: "Кабинет", icon: "User" },
  { id: "tasks", label: "Задачи", icon: "CheckSquare" },
  { id: "calendar", label: "Календарь", icon: "Calendar" },
  { id: "learning", label: "Обучение", icon: "BookOpen" },
  { id: "tests", label: "Тесты", icon: "ClipboardList" },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "reports", label: "Отчёты", icon: "BarChart2" },
  { id: "management", label: "Управление", icon: "Users" },
];

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Дедлайн по курсу «React Pro» через 2 дня", time: "10 мин назад", color: "text-orange-500" },
    { id: 2, text: "Результат теста «JavaScript Advanced» — 94%", time: "1 час назад", color: "text-emerald-600" },
    { id: 3, text: "Новое задание: «Архитектура микросервисов»", time: "3 часа назад", color: "text-primary" },
    { id: 4, text: "Сертификат «Python Basics» готов к загрузке", time: "вчера", color: "text-emerald-500" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar — тёмно-изумрудный */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
              <Icon name="GraduationCap" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">LearnOS</div>
              <div className="text-xs text-white/50">Платформа обучения</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "active bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
                {item.id === "tasks" && (
                  <span className="ml-auto text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-semibold">3</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">АК</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Алексей Козлов</div>
              <div className="text-xs text-white/50">Разработчик</div>
            </div>
            <button className="text-white/40 hover:text-white transition-colors">
              <Icon name="Settings" size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-white flex-shrink-0 shadow-sm">
          <div>
            <h1 className="font-heading font-semibold text-foreground text-base">
              {navItems.find((n) => n.id === currentPage)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">Понедельник, 27 апреля 2026</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Icon name="Search" size={14} className="absolute left-3 text-muted-foreground" />
              <input
                className="bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-52 transition-all focus:w-64"
                placeholder="Поиск..."
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Icon name="Bell" size={18} />
                <span className="notification-dot" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-border rounded-xl shadow-xl z-50 animate-fade-in">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">Уведомления</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">4 новых</span>
                  </div>
                  <div className="divide-y divide-border max-h-72 overflow-y-auto scrollbar-hide">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 hover:bg-secondary transition-colors cursor-pointer">
                        <p className="text-sm text-foreground leading-snug">{n.text}</p>
                        <p className={`text-xs mt-1 font-medium ${n.color}`}>{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                      Показать все уведомления
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-grid p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
