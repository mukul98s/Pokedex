import clsx from "clsx";

type Heading2Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Heading2({
  children,
  className,
  ...props
}: Heading2Props) {
  return (
    <h2 className={clsx("text-2xl font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}
