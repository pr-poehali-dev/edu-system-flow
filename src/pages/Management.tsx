import { useState } from "react";
import Icon from "@/components/ui/icon";

const employees = [
  { id: 1, name: "Алексей Козлов", role: "Senior Frontend Dev", dept: "Продукт", level: 8, progress: 88, courses: 14, avatar: "АК", gradient: "gradient-purple" },
  { id: 2, name: "Марина Петрова", role: "UX Designer", dept: "Дизайн", level: 6, progress: 72, courses: 9, avatar: "МП", gradient: "gradient-cyan" },
  { id: 3, name: "Дмитрий Сидоров", role: "Backend Developer", dept: "Продукт", level: 5, progress: 45, courses: 6, avatar: "ДС", gradient: "gradient-orange" },
  { id: 4, name: "Елена Новикова", role: "QA Engineer", dept: "Качество", level: 7, progress: 91, courses: 12, avatar: "ЕН", gradient: "gradient-green" },
  { id: 5, name: "Иван Морозов", role: "DevOps Engineer", dept: "Инфра", level: 4, progress: 38, courses: 4, avatar: "ИМ", gradient: "gradient-purple" },
  { id: 6, name: "Ольга Смирнова", role: "Product Manager", dept: "Продукт", level: 6, progress: 67, courses: 8, avatar: "ОС", gradient: "gradient-cyan" },
];

const trackTemplates = [
  { title: "Frontend Developer Track", courses: 8, duration: "3 мес", icon: "Monitor", color: "gradient-purple" },
  { title: "Backend Developer Track", courses: 7, duration: "3 мес", icon: "Server", color: "gradient-cyan" },
  { title: "Team Lead Track", courses: 5, duration: "2 мес", icon: "Users", color: "gradient-green" },
  { title: "DevOps Engineer Track", courses: 6, duration: "2.5 мес", icon: "GitBranch", color: "gradient-orange" },
];

const depts = ["Все", "Продукт", "Дизайн", "Качество", "Инфра"];

export default function Management() {
  const [activeDept, setActiveDept] = useState("Все");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = activeDept === "Все" ? employees : employees.filter((e) => e.dept === activeDept);

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Сотрудников", value: "6", icon: "Users", gradient: "gradient-purple" },
          { label: "Активных треков", value: "4", icon: "BookOpen", gradient: "gradient-cyan" },
          { label: "Ср. прогресс", value: "67%", icon: "TrendingUp", gradient: "gradient-green" },
          { label: "Назначено курсов", value: "18", icon: "ClipboardList", gradient: "gradient-orange" },
        ].map((s) => (
          <div key={s.label} className="stat-card bg-white border border-border rounded-xl p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-lg ${s.gradient} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={16} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Team */}
        <div className="xl:col-span-2 bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-heading font-semibold text-foreground">Команда</h3>
              <div className="flex gap-1.5 flex-wrap">
                {depts.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDept(d)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-all ${activeDept === d ? "gradient-purple text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {selected.length > 0 && (
                <button className="text-xs flex items-center gap-1.5 text-orange-500 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-lg transition-colors">
                  <Icon name="BookOpen" size={12} />
                  Назначить курс ({selected.length})
                </button>
              )}
              <button className="text-xs flex items-center gap-1.5 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors">
                <Icon name="UserPlus" size={12} />
                Добавить
              </button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((emp) => (
              <div
                key={emp.id}
                className={`p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors cursor-pointer ${selected.includes(emp.id) ? "bg-primary/5" : ""}`}
                onClick={() => toggleSelect(emp.id)}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${selected.includes(emp.id) ? "bg-primary" : "bg-border"}`} />
                <div className={`w-10 h-10 rounded-xl ${emp.gradient} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                  {emp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{emp.name}</p>
                    <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">{emp.dept}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{emp.role}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${emp.progress}%`,
                          background: emp.progress >= 80 ? "hsl(142 76% 45%)" : emp.progress >= 60 ? "hsl(190 90% 45%)" : "hsl(30 90% 55%)"
                        }}
                      />
                    </div>
                    <span className="text-xs text-foreground font-medium min-w-[30px]">{emp.progress}%</span>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs">
                    <Icon name="Star" size={11} className="text-yellow-400" />
                    <span className="text-foreground font-medium">Lv {emp.level}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{emp.courses} курсов</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning tracks */}
        <div className="space-y-4">
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-foreground">Треки обучения</h4>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                <Icon name="Plus" size={12} />
                Создать
              </button>
            </div>
            <div className="space-y-3">
              {trackTemplates.map((track) => (
                <div key={track.title} className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${track.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={track.icon} size={15} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{track.title}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{track.courses} курсов</span>
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-2 w-full text-xs text-primary bg-primary/10 hover:bg-primary/20 py-1.5 rounded-lg transition-colors">
                    Назначить команде
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-sm text-foreground mb-3">Быстрые действия</h4>
            <div className="space-y-2">
              {[
                { icon: "Send", label: "Отправить уведомление", color: "text-primary" },
                { icon: "FileText", label: "Выгрузить отчёт", color: "text-emerald-600" },
                { icon: "Award", label: "Выдать сертификат", color: "text-yellow-400" },
                { icon: "BarChart2", label: "Аналитика по отделу", color: "text-green-600" },
              ].map((a) => (
                <button key={a.label} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left">
                  <Icon name={a.icon} size={16} className={a.color} />
                  <span className="text-sm text-foreground">{a.label}</span>
                  <Icon name="ChevronRight" size={14} className="ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
