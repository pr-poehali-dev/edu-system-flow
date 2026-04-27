import { useState } from "react";
import Icon from "@/components/ui/icon";

const testsList = [
  { id: 1, title: "TypeScript Advanced", course: "TS Deep Dive", questions: 30, duration: "40 мин", deadline: "1 май 2026", status: "pending", attempts: 0 },
  { id: 2, title: "React Patterns", course: "React Advanced", questions: 25, duration: "30 мин", deadline: "Завершён", status: "passed", score: 94, attempts: 1 },
  { id: 3, title: "JavaScript Advanced", course: "JS Pro", questions: 35, duration: "45 мин", deadline: "Завершён", status: "passed", score: 88, attempts: 2 },
  { id: 4, title: "SQL & PostgreSQL", course: "Database Basics", questions: 20, duration: "25 мин", deadline: "Завершён", status: "passed", score: 76, attempts: 1 },
  { id: 5, title: "Docker Essentials", course: "DevOps Start", questions: 22, duration: "30 мин", deadline: "10 май 2026", status: "pending", attempts: 0 },
];

const sampleQuestions = [
  {
    id: 1,
    text: "Какой метод используется для создания иммутабельного объекта в TypeScript?",
    options: ["Object.seal()", "Object.freeze()", "Object.lock()", "const {}"],
    correct: 1,
  },
  {
    id: 2,
    text: "Что такое Generic типы в TypeScript?",
    options: [
      "Типы для работы с массивами",
      "Параметризованные типы для повторного использования",
      "Глобальные переменные типов",
      "Встроенные примитивные типы",
    ],
    correct: 1,
  },
  {
    id: 3,
    text: "Что делает оператор keyof в TypeScript?",
    options: [
      "Получает значения объекта",
      "Удаляет ключ из объекта",
      "Получает объединение ключей типа",
      "Создаёт новый тип",
    ],
    correct: 2,
  },
];

export default function Tests() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const startTest = (id: number) => {
    setActiveTest(id);
    setCurrentQ(0);
    setAnswers({});
    setFinished(false);
  };

  const answerQ = (optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIdx }));
  };

  const next = () => {
    if (currentQ < sampleQuestions.length - 1) setCurrentQ((q) => q + 1);
    else setFinished(true);
  };

  const score = finished
    ? Math.round((sampleQuestions.filter((q, i) => answers[i] === q.correct).length / sampleQuestions.length) * 100)
    : 0;

  if (activeTest !== null) {
    const test = testsList.find((t) => t.id === activeTest)!;
    if (finished) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="glass border border-border rounded-2xl p-8 max-w-md w-full text-center">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-heading font-bold text-white ${score >= 80 ? "gradient-green" : score >= 60 ? "gradient-orange" : "bg-red-500/80"}`}>
              {score}%
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              {score >= 80 ? "Отлично!" : score >= 60 ? "Хороший результат" : "Попробуй ещё раз"}
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              {test.title} — {sampleQuestions.filter((q, i) => answers[i] === q.correct).length} из {sampleQuestions.length} правильно
            </p>
            {score >= 80 && (
              <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-400 flex items-center gap-2 justify-center">
                <Icon name="Award" size={16} />
                Сертификат будет выдан автоматически
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveTest(null)} className="flex-1 py-2.5 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                К списку тестов
              </button>
              <button onClick={() => startTest(activeTest)} className="flex-1 py-2.5 rounded-lg gradient-purple text-white text-sm font-medium">
                Пройти снова
              </button>
            </div>
          </div>
        </div>
      );
    }

    const q = sampleQuestions[currentQ];
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveTest(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <Icon name="ArrowLeft" size={18} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">{test.title}</span>
              <span className="text-xs text-muted-foreground">Вопрос {currentQ + 1} из {sampleQuestions.length}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill gradient-purple" style={{ width: `${((currentQ + 1) / sampleQuestions.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="glass border border-border rounded-2xl p-6">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-6">{q.text}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answerQ(i)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                  answers[currentQ] === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/40 hover:bg-secondary text-muted-foreground"
                }`}
              >
                <span className={`inline-flex w-6 h-6 rounded-full border items-center justify-center text-xs mr-3 ${
                  answers[currentQ] === i ? "border-primary bg-primary text-white" : "border-border"
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={next}
            disabled={answers[currentQ] === undefined}
            className="mt-6 w-full py-3 rounded-xl gradient-purple text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {currentQ < sampleQuestions.length - 1 ? "Следующий вопрос" : "Завершить тест"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Пройдено тестов", value: "27", icon: "CheckCircle", gradient: "gradient-green" },
          { label: "Средний балл", value: "89%", icon: "Target", gradient: "gradient-cyan" },
          { label: "Лучший результат", value: "96%", icon: "Trophy", gradient: "gradient-purple" },
          { label: "Ожидают прохождения", value: "2", icon: "Clock", gradient: "gradient-orange" },
        ].map((s) => (
          <div key={s.label} className="stat-card glass border border-border rounded-xl p-4">
            <div className={`w-9 h-9 rounded-lg ${s.gradient} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={16} className="text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tests list */}
      <div className="glass border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-heading font-semibold text-foreground">Доступные тесты</h3>
        </div>
        <div className="divide-y divide-border">
          {testsList.map((test) => (
            <div key={test.id} className="p-5 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                test.status === "passed" ? "gradient-green" : "gradient-purple"
              }`}>
                <Icon name={test.status === "passed" ? "CheckCircle" : "ClipboardList"} size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{test.title}</p>
                  {test.status === "passed" && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Сдан</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{test.course}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="HelpCircle" size={11} />{test.questions} вопросов</span>
                  <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{test.duration}</span>
                  {test.status === "pending" && (
                    <span className="flex items-center gap-1 text-orange-400"><Icon name="Calendar" size={11} />до {test.deadline}</span>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {test.status === "passed" && test.score && (
                  <div className={`text-lg font-heading font-bold mb-1 ${test.score >= 90 ? "neon-text-cyan" : "text-foreground"}`}>
                    {test.score}%
                  </div>
                )}
                <button
                  onClick={() => startTest(test.id)}
                  className={`text-xs px-4 py-2 rounded-lg font-medium transition-colors ${
                    test.status === "passed"
                      ? "bg-secondary text-muted-foreground hover:text-foreground"
                      : "gradient-purple text-white"
                  }`}
                >
                  {test.status === "passed" ? "Пройти снова" : "Начать тест"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
