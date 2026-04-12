type Props = {
  question?: string;
  children: React.ReactNode;
};

export function AnswerBox({ question, children }: Props) {
  return (
    <aside
      className="my-6 rounded-xl border border-neutral-200 bg-neutral-50 p-5"
      aria-label={question ? `Réponse à : ${question}` : "Réponse courte"}
    >
      <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-neutral-500">
        Réponse courte
      </div>
      {question && (
        <div className="mb-2 text-[14px] font-semibold text-neutral-900">{question}</div>
      )}
      <div className="text-[15px] leading-relaxed text-neutral-800">{children}</div>
    </aside>
  );
}
