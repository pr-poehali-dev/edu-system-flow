import { useState } from "react";
import Icon from "@/components/ui/icon";

const recommended = [
  { id: 1, title: "Архитектура микросервисов", category: "Backend", level: "Продвинутый", duration: "18 ч", match: 98, progress: 0, gradient: "gradient-purple", tag: "Автоподбор" },
  { id: 2, title: "Docker & Kubernetes", category: "DevOps", level: "Средний", duration: "12 ч", match: 94, progress: 70, gradient: "gradient-cyan", tag: "В процессе" },
  { id: 3, title: "GraphQL Pro", category: "Frontend", level: "Средний", duration: "8 ч", match: 91, progress: 0, gradient: "gradient-green", tag: "Автоподбор" },
  { id: 4, title: "Системное проектирование", category: "Архитектура", level: "Продвинутый", duration: "24 ч", match: 87, progress: 0, gradient: "gradient-orange", tag: "Рекомендовано" },
];

const allCourses = [
  { id: 5, title: "React Advanced Patterns", category: "Frontend", level: "Продвинутый", duration: "10 ч", rating: 4.9, students: "2.1k", completed: true },
  { id: 6, title: "TypeScript Deep Dive", category: "Frontend", level: "Средний", duration: "8 ч", rating: 4.8, students: "3.4k", completed: false },
  { id: 7, title: "PostgreSQL Performance", category: "Database", level: "Продвинутый", duration: "14 ч", rating: 4.7, students: "1.2k", completed: false },
  { id: 8, title: "Python Basics", category: "Backend", level: "Начальный", duration: "6 ч", rating: 4.6, students: "5.8k", completed: true },
  { id: 9, title: "Node.js Microservices", category: "Backend", level: "Средний", duration: "16 ч", rating: 4.8, students: "1.8k", completed: false },
  { id: 10, title: "CI/CD Pipelines", category: "DevOps", level: "Средний", duration: "9 ч", rating: 4.5, students: "970", completed: false },
];

const categories = ["Все", "Frontend", "Backend", "DevOps", "Database", "Архитектура"];

export default function Learning() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? allCourses : allCourses.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Auto-recommend banner */}
      <div className="bg-white border border-primary/30 rounded-xl p-5 bg-primary/5 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
            <Icon name="Sparkles" size={15} className="text-white" />
          </div>
          <span className="font-semibold text-foreground">Автоподбор курсов</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">ИИ</span>
        </div>
        <p className="text-sm text-muted-foreground ml-11">
          На основе вашей должности <span className="text-foreground">«Senior Frontend Developer»</span> и текущего уровня навыков подобрано 4 курса
        </p>
      </div>

      {/* Recommended */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">Рекомендовано для вас</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {recommended.map((course) => (
            <div key={course.id} className="bg-white border border-border rounded-xl overflow-hidden glass-hover cursor-pointer group shadow-sm">
              <div className={`h-2 ${course.gradient}`} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{course.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    course.tag === "В процессе" ? "bg-emerald-500/20 text-emerald-600"
                    : course.tag === "Автоподбор" ? "bg-primary/20 text-primary"
                    : "bg-orange-500/20 text-orange-500"
                  }`}>
                    {course.tag}
                  </span>
                </div>
                <h4 className="font-medium text-foreground text-sm leading-snug mb-3">{course.title}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{course.duration}</span>
                  <span className="flex items-center gap-1"><Icon name="BarChart" size={11} />{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Icon name="Target" size={11} className="text-green-600" />
                    <span className="text-green-600 font-medium">{course.match}% совпадение</span>
                  </div>
                </div>
                {course.progress > 0 && (
                  <div className="mt-3">
                    <div className="progress-bar">
                      <div className={`progress-fill ${course.gradient}`} style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{course.progress}% пройдено</div>
                  </div>
                )}
                {course.progress === 0 && (
                  <button className="mt-3 w-full py-2 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    Начать курс
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All courses */}
      <div>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h3 className="font-heading font-semibold text-foreground">Все курсы</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  activeCategory === cat
                    ? "gradient-purple text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div key={course.id} className="bg-white border border-border rounded-xl p-4 glass-hover cursor-pointer group shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{course.category}</span>
                  {course.completed && (
                    <span className="ml-2 text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">Пройден</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{course.level}</span>
              </div>
              <h4 className="font-medium text-foreground text-sm leading-snug mb-3">{course.title}</h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{course.duration}</span>
                  <span className="flex items-center gap-1"><Icon name="Users" size={11} />{course.students}</span>
                </div>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Icon name="Star" size={11} />
                  {course.rating}
                </span>
              </div>
              {!course.completed && (
                <button className="mt-3 w-full py-2 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors group-hover:bg-primary/20">
                  Записаться
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
