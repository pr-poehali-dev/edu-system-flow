import { useState } from "react";
import Icon from "@/components/ui/icon";

const allTasks = [
  { id: 1, title: "Изучить архитектуру микросервисов", course: "Backend Pro", deadline: "29 апр 2026", priority: "high", status: "in_progress", progress: 45 },
  { id: 2, title: "Пройти тест по TypeScript Advanced", course: "TS Deep Dive", deadline: "1 май 2026", priority: "high", status: "pending", progress: 0 },
  { id: 3, title: "Завершить модуль «Docker & K8s»", course: "DevOps Start", deadline: "5 май 2026", priority: "medium", status: "in_progress", progress: 70 },
  { id: 4, title: "Практика: REST API дизайн", course: "Backend Pro", deadline: "8 май 2026", priority: "medium", status: "pending", progress: 0 },
  { id: 5, title: "Сдать финальный тест по React", course: "React Advanced", deadline: "10 май 2026", priority: "low", status: "completed", progress: 100 },
  { id: 6, title: "Прочитать документацию по GraphQL", course: "GraphQL Pro", deadline: "12 май 2026", priority: "low", status: "pending", progress: 0 },
];

const priorityConfig = {
  high: { label: "Высокий", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
  medium: { label: "Средний", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
  low: { label: "Низкий", color: "text-green-600", bg: "bg-green-500/10 border-green-500/20" },
};

const statusConfig = {
  pending: { label: "Не начато", color: "text-muted-foreground", icon: "Circle" },
  in_progress: { label: "В процессе", color: "text-blue-500", icon: "Clock" },
  completed: { label: "Завершено", color: "text-green-600", icon: "CheckCircle" },
};

export default function Tasks() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? allTasks : allTasks.filter((t) => t.status === filter);

  const counts = {
    all: allTasks.length,
    pending: allTasks.filter((t) => t.status === "pending").length,
    in_progress: allTasks.filter((t) => t.status === "in_progress").length,
    completed: allTasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: "all", label: "Всего задач", icon: "List", color: "gradient-purple" },
          { key: "pending", label: "Не начато", icon: "Circle", color: "gradient-orange" },
          { key: "in_progress", label: "В процессе", icon: "Clock", color: "gradient-cyan" },
          { key: "completed", label: "Выполнено", icon: "CheckCircle", color: "gradient-green" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`stat-card bg-white border rounded-xl p-4 text-left transition-all glass-hover shadow-sm ${
              filter === s.key ? "border-primary/50 bg-primary/5" : "border-border"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={16} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{counts[s.key as keyof typeof counts]}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Urgent */}
      <div className="bg-white border border-orange-500/20 rounded-xl p-4 bg-orange-500/5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-orange-500" />
          <span className="text-sm font-semibold text-orange-500">Срочные дедлайны</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {allTasks.filter((t) => t.priority === "high" && t.status !== "completed").map((t) => (
            <div key={t.id} className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
              <Icon name="Clock" size={13} className="text-orange-500" />
              <span className="text-sm text-foreground">{t.title}</span>
              <span className="text-xs text-orange-500 ml-1">· {t.deadline}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">
            {filter === "all" ? "Все задачи" : statusConfig[filter as keyof typeof statusConfig]?.label ?? "Задачи"}
          </h3>
          <button className="flex items-center gap-2 text-sm text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors">
            <Icon name="Plus" size={14} />
            Добавить задачу
          </button>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((task) => {
            const p = priorityConfig[task.priority as keyof typeof priorityConfig];
            const s = statusConfig[task.status as keyof typeof statusConfig];
            return (
              <div key={task.id} className="p-5 hover:bg-secondary/30 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 ${s.color}`}>
                    <Icon name={s.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{task.course}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${p.bg} ${p.color}`}>{p.label}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Calendar" size={11} />
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                    {task.progress > 0 && task.status !== "completed" && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Прогресс</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill gradient-cyan" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    )}
                    {task.status === "completed" && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <Icon name="CheckCircle" size={11} />
                        Задача выполнена
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
