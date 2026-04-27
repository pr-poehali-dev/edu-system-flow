import { useState } from "react";
import Icon from "@/components/ui/icon";

const events = [
  { day: 28, title: "Вебинар: React 19 новинки", time: "14:00", type: "webinar", color: "bg-purple-500/20 border-purple-500/40 text-purple-600" },
  { day: 29, title: "Дедлайн: Микросервисы", time: "23:59", type: "deadline", color: "bg-red-500/20 border-red-500/40 text-red-500" },
  { day: 1, title: "Тест: TypeScript Advanced", time: "10:00", type: "test", color: "bg-orange-500/20 border-orange-500/40 text-orange-500" },
  { day: 3, title: "Встреча с ментором", time: "15:30", type: "meeting", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-600" },
  { day: 5, title: "Дедлайн: Docker & K8s", time: "23:59", type: "deadline", color: "bg-red-500/20 border-red-500/40 text-red-500" },
  { day: 7, title: "Групповой проект: презентация", time: "12:00", type: "meeting", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-600" },
  { day: 10, title: "Дедлайн: тест по React", time: "23:59", type: "deadline", color: "bg-red-500/20 border-red-500/40 text-red-500" },
  { day: 15, title: "Мастер-класс: GraphQL", time: "17:00", type: "webinar", color: "bg-purple-500/20 border-purple-500/40 text-purple-600" },
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const today = 27;
const month = "Апрель – Май 2026";

const upcomingEvents = [
  { title: "Вебинар: React 19 новинки", date: "28 апр", time: "14:00", icon: "Video", color: "text-primary" },
  { title: "Дедлайн: Архитектура микросервисов", date: "29 апр", time: "23:59", icon: "AlertCircle", color: "text-red-500" },
  { title: "Тест: TypeScript Advanced", date: "1 май", time: "10:00", icon: "ClipboardList", color: "text-orange-500" },
  { title: "Встреча с ментором", date: "3 май", time: "15:30", icon: "Users", color: "text-emerald-600" },
];

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(today);

  const days = Array.from({ length: 35 }, (_, i) => {
    const d = i - 0;
    return d >= 1 && d <= 30 ? d : null;
  });

  const dayEvents = events.filter((e) => e.day === selectedDay);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-foreground">{month}</h3>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground py-2 font-medium">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (!day) return <div key={i} />;
              const hasEvent = events.some((e) => e.day === day);
              const isToday = day === today;
              const isSelected = day === selectedDay;
              const hasDeadline = events.some((e) => e.day === day && e.type === "deadline");
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all ${
                    isSelected
                      ? "gradient-purple text-white"
                      : isToday
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  {day}
                  {hasEvent && !isSelected && (
                    <div className={`w-1 h-1 rounded-full mt-0.5 ${hasDeadline ? "bg-red-500" : "bg-emerald-500"}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-border">
            {[
              { color: "bg-purple-500", label: "Вебинары" },
              { color: "bg-red-500", label: "Дедлайны" },
              { color: "bg-orange-500", label: "Тесты" },
              { color: "bg-emerald-500", label: "Встречи" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Side: upcoming + selected day */}
        <div className="space-y-4">
          {/* Selected day events */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-sm text-foreground mb-3">
              {selectedDay} {selectedDay <= 30 ? "апреля" : "мая"} — события
            </h4>
            {dayEvents.length > 0 ? (
              <div className="space-y-2">
                {dayEvents.map((e, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${e.color}`}>
                    <div className="text-xs font-medium min-w-[40px]">{e.time}</div>
                    <div className="text-sm">{e.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                <Icon name="Calendar" size={24} className="mx-auto mb-2 opacity-40" />
                Событий нет
              </div>
            )}
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-sm text-foreground mb-3">Ближайшие события</h4>
            <div className="space-y-3">
              {upcomingEvents.map((e, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                  <div className={`mt-0.5 ${e.color}`}>
                    <Icon name={e.icon} size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground leading-snug">{e.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.date} · {e.time}</p>
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
