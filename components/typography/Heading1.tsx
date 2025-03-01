import clsx from "clsx";

type Heading1Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Heading1({
  children,
  className,
  ...props
}: Heading1Props) {
  return (
    <h1 className={clsx("text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
}
