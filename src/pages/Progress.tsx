import Icon from "@/components/ui/icon";

const skills = [
  { name: "React", level: 88, prev: 72, category: "Frontend", color: "gradient-cyan", trend: "+16%" },
  { name: "TypeScript", level: 76, prev: 58, category: "Frontend", color: "gradient-purple", trend: "+18%" },
  { name: "Node.js", level: 65, prev: 60, category: "Backend", color: "gradient-green", trend: "+5%" },
  { name: "Python", level: 62, prev: 42, category: "Backend", color: "gradient-orange", trend: "+20%" },
  { name: "SQL", level: 71, prev: 65, category: "Database", color: "gradient-purple", trend: "+6%" },
  { name: "Docker", level: 48, prev: 30, category: "DevOps", color: "gradient-cyan", trend: "+18%" },
  { name: "GraphQL", level: 34, prev: 10, category: "Frontend", color: "gradient-green", trend: "+24%" },
  { name: "CI/CD", level: 41, prev: 35, category: "DevOps", color: "gradient-orange", trend: "+6%" },
];

const monthlyData = [
  { month: "Янв", xp: 180 },
  { month: "Фев", xp: 240 },
  { month: "Мар", xp: 320 },
  { month: "Апр", xp: 410 },
  { month: "Май", xp: 0 },
];

const maxXp = 500;

const achievements = [
  { title: "Быстрый старт", desc: "Завершил первый курс", icon: "Zap", color: "text-yellow-400 bg-yellow-400/10", earned: true },
  { title: "Отличник", desc: "Тест на 95%+", icon: "Star", color: "text-purple-400 bg-purple-400/10", earned: true },
  { title: "Серийный", desc: "7 дней подряд", icon: "Flame", color: "text-orange-400 bg-orange-400/10", earned: true },
  { title: "Мастер курсов", desc: "10 курсов завершено", icon: "Award", color: "text-cyan-400 bg-cyan-400/10", earned: true },
  { title: "Топ-1%", desc: "Лучший результат команды", icon: "Trophy", color: "text-yellow-400 bg-yellow-400/10", earned: false },
  { title: "Полиглот", desc: "5 технологий изучены", icon: "Globe", color: "text-green-400 bg-green-400/10", earned: false },
];

export default function Progress() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Общий прогресс", value: "68%", icon: "TrendingUp", gradient: "gradient-purple", sub: "↑ 12% за месяц" },
          { label: "Часов обучения", value: "142", icon: "Clock", gradient: "gradient-cyan", sub: "Этот месяц: 28 ч" },
          { label: "Активных дней", value: "18", icon: "Flame", gradient: "gradient-orange", sub: "Серия: 12 дней" },
          { label: "XP этот месяц", value: "410", icon: "Star", gradient: "gradient-green", sub: "Рекорд: 520 XP" },
        ].map((s) => (
          <div key={s.label} className="stat-card glass border border-border rounded-xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={18} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-primary mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills */}
        <div className="lg:col-span-2 glass border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-foreground">Детальная аналитика навыков</h3>
            <span className="text-xs text-muted-foreground">vs. прошлый квартал</span>
          </div>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">{skill.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-green-400 font-medium">{skill.trend}</span>
                    <span className="text-sm font-bold text-foreground">{skill.level}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${skill.color}`} style={{ width: `${skill.level}%` }} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Было: {skill.prev}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* XP chart + Achievements */}
        <div className="space-y-4">
          {/* XP chart */}
          <div className="glass border border-border rounded-xl p-5">
            <h4 className="font-semibold text-sm text-foreground mb-4">XP по месяцам</h4>
            <div className="flex items-end gap-2 h-32">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{d.xp > 0 ? d.xp : ""}</span>
                  <div
                    className="w-full rounded-t-md gradient-purple transition-all duration-700"
                    style={{ height: d.xp > 0 ? `${(d.xp / maxXp) * 100}%` : "4px", opacity: d.xp > 0 ? 1 : 0.2 }}
                  />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass border border-border rounded-xl p-5">
            <h4 className="font-semibold text-sm text-foreground mb-4">Достижения</h4>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`p-3 rounded-xl border transition-all ${
                    ach.earned ? "border-border bg-secondary/30" : "border-dashed border-border opacity-40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${ach.earned ? ach.color : "bg-secondary text-muted-foreground"} flex items-center justify-center mb-2`}>
                    <Icon name={ach.icon} size={15} />
                  </div>
                  <div className="text-xs font-medium text-foreground leading-tight">{ach.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{ach.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning curve */}
      <div className="glass border border-border rounded-xl p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">Динамика обучения по неделям</h3>
        <div className="flex items-end gap-1 h-24">
          {[30, 45, 20, 60, 80, 40, 75, 90, 55, 70, 85, 95, 60, 40, 80, 100, 65, 75, 85, 90, 70, 55, 88, 72, 95, 85, 78].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-500"
              style={{
                height: `${v}%`,
                background: v >= 80
                  ? "hsl(262 80% 65%)"
                  : v >= 60
                  ? "hsl(190 90% 50%)"
                  : "rgba(255,255,255,0.1)",
                opacity: 0.8
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Ноябрь 2025</span>
          <span>Апрель 2026</span>
        </div>
      </div>
    </div>
  );
}
