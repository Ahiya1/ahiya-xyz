interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="display-lg text-white mb-4">{title}</h2>
      {description && (
        <p className="body-xl text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
