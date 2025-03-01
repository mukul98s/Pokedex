import clsx from "clsx";

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({
  children,
  className,
  ...props
}: ParagraphProps) {
  return (
    <p className={clsx("text-gray-600", className)} {...props}>
      {children}
    </p>
  );
}
