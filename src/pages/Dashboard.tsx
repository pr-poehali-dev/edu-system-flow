import Icon from "@/components/ui/icon";

const certificates = [
  { name: "React Advanced", date: "12 апр 2026", score: 96 },
  { name: "Python Basics", date: "3 мар 2026", score: 88 },
  { name: "SQL & PostgreSQL", date: "15 янв 2026", score: 92 },
];

const recentActivity = [
  { text: "Завершил курс «TypeScript Pro»", time: "Сегодня, 11:20", icon: "BookOpen", color: "text-purple-400" },
  { text: "Получил сертификат «React Advanced»", time: "Вчера, 16:45", icon: "Award", color: "text-cyan-400" },
  { text: "Тест «JS Patterns» — 94%", time: "24 апр", icon: "ClipboardList", color: "text-green-400" },
  { text: "Новое задание от руководителя", time: "23 апр", icon: "CheckSquare", color: "text-orange-400" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile hero */}
      <div className="relative rounded-2xl overflow-hidden p-6 glass border border-border">
        <div className="absolute inset-0 opacity-10" style={{
          background: "linear-gradient(135deg, hsl(262 80% 55%) 0%, hsl(190 90% 45%) 100%)"
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full" style={{
          background: "radial-gradient(circle, hsl(262 80% 65%) 0%, transparent 70%)",
          transform: "translate(30%, -30%)"
        }} />
        <div className="relative flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-purple flex items-center justify-center text-2xl font-bold text-white neon-glow-purple flex-shrink-0">
            АК
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-2xl font-bold text-foreground">Алексей Козлов</h2>
            <p className="text-muted-foreground text-sm mt-0.5">Senior Frontend Developer · Команда «Продукт»</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-sm">
                <Icon name="Star" size={14} className="text-yellow-400" />
                <span className="text-foreground font-medium">Level 8</span>
                <span className="text-muted-foreground">· 2 340 XP</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon name="Award" size={14} className="text-cyan-400" />
                <span>{certificates.length} сертификата</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon name="Flame" size={14} className="text-orange-400" />
                <span>12-дневная серия</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="text-sm text-muted-foreground">Прогресс уровня</div>
            <div className="w-40">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>2 340 XP</span>
                <span>3 000 XP</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill gradient-purple" style={{ width: "78%" }} />
              </div>
            </div>
            <div className="text-xs text-primary">78% до Level 9</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Курсов завершено", value: "14", sub: "+2 в этом месяце", icon: "BookOpen", gradient: "gradient-purple", glow: "neon-glow-purple" },
          { label: "Тестов пройдено", value: "27", sub: "Средний балл 89%", icon: "ClipboardList", gradient: "gradient-cyan", glow: "neon-glow-cyan" },
          { label: "Задач выполнено", value: "38", sub: "3 активных", icon: "CheckSquare", gradient: "gradient-orange", glow: "" },
          { label: "Сертификатов", value: "3", sub: "Последний 12 апр", icon: "Award", gradient: "gradient-green", glow: "" },
        ].map((s) => (
          <div key={s.label} className="stat-card glass border border-border rounded-xl p-5 glass-hover">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-3 ${s.glow}`}>
              <Icon name={s.icon} size={18} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-primary mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificates */}
        <div className="glass border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Мои сертификаты</h3>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">Все →</button>
          </div>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div key={cert.name} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg gradient-cyan flex items-center justify-center flex-shrink-0 neon-glow-cyan">
                  <Icon name="Award" size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">{cert.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold neon-text-cyan">{cert.score}%</div>
                  <button className="text-xs text-muted-foreground group-hover:text-primary transition-colors mt-0.5 flex items-center gap-1">
                    <Icon name="Download" size={10} />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center justify-center gap-2">
            <Icon name="Plus" size={14} />
            Пройти курс для получения сертификата
          </button>
        </div>

        {/* Activity */}
        <div className="glass border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Последняя активность</h3>
            <Icon name="Activity" size={16} className="text-muted-foreground" />
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

      {/* Skills preview */}
      <div className="glass border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Навыки</h3>
          <span className="text-xs text-muted-foreground">Обновлено сегодня</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "React", level: 88, color: "gradient-cyan" },
            { name: "TypeScript", level: 76, color: "gradient-purple" },
            { name: "Python", level: 62, color: "gradient-green" },
            { name: "SQL", level: 71, color: "gradient-orange" },
          ].map((skill) => (
            <div key={skill.name} className="text-center p-4 rounded-xl bg-secondary/50">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke="url(#grad)"
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
