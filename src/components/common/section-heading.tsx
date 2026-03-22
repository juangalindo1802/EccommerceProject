import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <Badge className="mb-4">{label}</Badge>
      <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
    </div>
  );
}

