import Icon from "@/components/ui/icon";

const certificates = [
  { name: "React Advanced", date: "12 апр 2026", score: 96 },
  { name: "Python Basics", date: "3 мар 2026", score: 88 },
  { name: "SQL & PostgreSQL", date: "15 янв 2026", score: 92 },
];

const recentActivity = [
  { text: "Завершил курс «TypeScript Pro»", time: "Сегодня, 11:20", icon: "BookOpen", color: "text-primary" },
  { text: "Получил сертификат «React Advanced»", time: "Вчера, 16:45", icon: "Award", color: "text-emerald-600" },
  { text: "Тест «JS Patterns» — 94%", time: "24 апр", icon: "ClipboardList", color: "text-green-600" },
  { text: "Новое задание от руководителя", time: "23 апр", icon: "CheckSquare", color: "text-orange-500" },
];

export default function Dashboard() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Profile hero */}
      <div className="relative rounded-xl overflow-hidden p-6 shadow-sm" style={{
        background: "linear-gradient(135deg, hsl(162 60% 20%) 0%, hsl(162 52% 30%) 100%)"
      }}>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-xl font-bold text-white flex-shrink-0 border border-white/30">
            АК
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-bold text-white">Алексей Козлов</h2>
            <p className="text-white/70 text-sm mt-0.5">Senior Frontend Developer · Команда «Продукт»</p>
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-1.5 text-sm">
                <Icon name="Star" size={14} className="text-yellow-300" />
                <span className="text-white font-medium">Level 8</span>
                <span className="text-white/60">· 2 340 XP</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <Icon name="Award" size={14} className="text-white/80" />
                <span>{certificates.length} сертификата</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <Icon name="Flame" size={14} className="text-orange-300" />
                <span>12-дневная серия</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="text-sm text-white/70">Прогресс уровня</div>
            <div className="w-40">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>2 340 XP</span>
                <span>3 000 XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: "78%" }} />
              </div>
            </div>
            <div className="text-xs text-white/80 font-medium">78% до Level 9</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Курсов завершено", value: "14", sub: "+2 в этом месяце", icon: "BookOpen", gradient: "gradient-purple" },
          { label: "Тестов пройдено", value: "27", sub: "Средний балл 89%", icon: "ClipboardList", gradient: "gradient-cyan" },
          { label: "Задач выполнено", value: "38", sub: "3 активных", icon: "CheckSquare", gradient: "gradient-orange" },
          { label: "Сертификатов", value: "3", sub: "Последний 12 апр", icon: "Award", gradient: "gradient-green" },
        ].map((s) => (
          <div key={s.label} className="stat-card bg-white border border-border rounded-xl p-5 shadow-sm glass-hover">
            <div className={`w-10 h-10 rounded-lg ${s.gradient} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={18} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-primary font-medium mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Certificates */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm">Мои сертификаты</h3>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Все →</button>
          </div>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div key={cert.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-muted transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">{cert.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{cert.score}%</div>
                  <button className="text-xs text-muted-foreground group-hover:text-primary transition-colors mt-0.5 flex items-center gap-1">
                    <Icon name="Download" size={10} />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-2">
            <Icon name="Plus" size={14} />
            Пройти курс для получения сертификата
          </button>
        </div>

        {/* Activity */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm">Последняя активность</h3>
            <Icon name="Activity" size={15} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <Icon name={item.icon} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground text-sm">Навыки</h3>
          <span className="text-xs text-muted-foreground">Обновлено сегодня</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "React", level: 88 },
            { name: "TypeScript", level: 76 },
            { name: "Python", level: 62 },
            { name: "SQL", level: 71 },
          ].map((skill) => (
            <div key={skill.name} className="text-center p-4 rounded-xl bg-secondary">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(160 15% 88%)" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke="hsl(162 60% 22%)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${skill.level * 1.634} 163.4`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                  {skill.level}%
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
