import { useState } from "react";
import Icon from "@/components/ui/icon";

const teamMembers = [
  { name: "Алексей Козлов", role: "Senior Frontend Dev", progress: 88, courses: 14, tests: 27, score: 89, status: "excellent" },
  { name: "Марина Петрова", role: "UX Designer", progress: 72, courses: 9, tests: 18, score: 84, status: "good" },
  { name: "Дмитрий Сидоров", role: "Backend Developer", progress: 45, courses: 6, tests: 11, score: 71, status: "behind" },
  { name: "Елена Новикова", role: "QA Engineer", progress: 91, courses: 12, tests: 24, score: 93, status: "excellent" },
  { name: "Иван Морозов", role: "DevOps Engineer", progress: 38, courses: 4, tests: 8, score: 65, status: "behind" },
  { name: "Ольга Смирнова", role: "Product Manager", progress: 67, courses: 8, tests: 15, score: 79, status: "good" },
];

const statusConfig = {
  excellent: { label: "Отлично", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  good: { label: "Хорошо", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  behind: { label: "Отстаёт", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const skillGaps = [
  { skill: "Docker & K8s", employees: 4, urgency: "high" },
  { skill: "TypeScript", employees: 3, urgency: "medium" },
  { skill: "GraphQL", employees: 5, urgency: "medium" },
  { skill: "Архитектура", employees: 2, urgency: "high" },
];

export default function Reports() {
  const [period, setPeriod] = useState("month");

  const behind = teamMembers.filter((m) => m.status === "behind");
  const avgScore = Math.round(teamMembers.reduce((a, b) => a + b.score, 0) / teamMembers.length);
  const avgProgress = Math.round(teamMembers.reduce((a, b) => a + b.progress, 0) / teamMembers.length);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with period filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Аналитика команды</h2>
          <p className="text-sm text-muted-foreground">6 сотрудников · Обновлено сегодня</p>
        </div>
        <div className="flex gap-2">
          {["week", "month", "quarter"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${period === p ? "gradient-purple text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {p === "week" ? "Неделя" : p === "month" ? "Месяц" : "Квартал"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Средний балл тестов", value: `${avgScore}%`, icon: "Target", gradient: "gradient-cyan", sub: "↑ 4% за период" },
          { label: "Средний прогресс", value: `${avgProgress}%`, icon: "TrendingUp", gradient: "gradient-purple", sub: "↑ 8% за период" },
          { label: "Сертификатов выдано", value: "12", icon: "Award", gradient: "gradient-green", sub: "+3 в этом месяце" },
          { label: "Отстающих", value: `${behind.length}`, icon: "AlertTriangle", gradient: "gradient-orange", sub: "Требуют внимания" },
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

      {/* Alerts: behind */}
      {behind.length > 0 && (
        <div className="glass border border-red-500/20 rounded-xl p-5 bg-red-500/5">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="AlertTriangle" size={16} className="text-red-400" />
            <span className="font-semibold text-sm text-red-400">Сотрудники, отстающие от плана</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {behind.map((m) => (
              <div key={m.name} className="flex items-center gap-3 bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center text-sm font-bold text-red-400">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">{m.progress}%</div>
                  <div className="text-xs text-muted-foreground">прогресс</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team table */}
        <div className="lg:col-span-2 glass border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground">Статус сотрудников</h3>
            <button className="text-xs flex items-center gap-1.5 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors">
              <Icon name="Download" size={12} />
              Экспорт отчёта
            </button>
          </div>
          <div className="divide-y divide-border">
            {teamMembers.map((m) => {
              const st = statusConfig[m.status as keyof typeof statusConfig];
              return (
                <div key={m.name} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                  <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${st.bg} ${st.color}`}>{st.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${m.progress}%`,
                            background: m.progress >= 80 ? "hsl(142 76% 45%)" : m.progress >= 60 ? "hsl(190 90% 45%)" : "hsl(0 80% 60%)"
                          }}
                        />
                      </div>
                      <span className="text-xs text-foreground font-medium min-w-[30px] text-right">{m.progress}%</span>
                    </div>
                  </div>
                  <div className="hidden md:flex gap-4 text-xs text-muted-foreground flex-shrink-0">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{m.courses}</div>
                      <div>курсов</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{m.score}%</div>
                      <div>тесты</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill gaps */}
        <div className="space-y-4">
          <div className="glass border border-border rounded-xl p-5">
            <h4 className="font-semibold text-sm text-foreground mb-4">Дефицит навыков</h4>
            <div className="space-y-3">
              {skillGaps.map((g) => (
                <div key={g.skill} className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground font-medium">{g.skill}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      g.urgency === "high" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
                    }`}>
                      {g.urgency === "high" ? "Срочно" : "Важно"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Users" size={11} />
                    {g.employees} сотрудников нуждаются в обучении
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution chart */}
          <div className="glass border border-border rounded-xl p-5">
            <h4 className="font-semibold text-sm text-foreground mb-4">Распределение результатов</h4>
            <div className="space-y-2">
              {[
                { label: "Отличники (90%+)", count: 2, max: 6, color: "gradient-green" },
                { label: "Хорошо (70–89%)", count: 2, max: 6, color: "gradient-cyan" },
                { label: "Отстают (<70%)", count: 2, max: 6, color: "gradient-orange" },
              ].map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{d.label}</span>
                    <span>{d.count} чел.</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${d.color}`} style={{ width: `${(d.count / d.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
