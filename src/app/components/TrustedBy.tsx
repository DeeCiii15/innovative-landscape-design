const companies = [
  { name: "Raldex Hospitality Inc.", src: "/images/trusted/raldex.png", variant: "mark" },
  { name: "Hilton Hotels", src: "/images/trusted/hilton.svg", variant: "stacked" },
  { name: "Jiffy Lube", src: "/images/trusted/jiffy-lube.png", variant: "jiffy" },
  { name: "Lifetime Hearing Services", src: "/images/trusted/lifetime-hearing.png", variant: "stacked" },
  { name: "CVS", src: "/images/trusted/cvs.svg", variant: "wide" },
  { name: "Chick-fil-A", src: "/images/trusted/chick-fil-a.svg", variant: "stacked" },
  { name: "First Bank", src: "/images/trusted/first-bank.png", variant: "stacked" },
] as const;

function LogoItem({
  company,
  clone = false,
}: {
  company: (typeof companies)[number];
  clone?: boolean;
}) {
  return (
    <li
      className={`trusted-by__item${clone ? " trusted-by__item--clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      <img
        src={company.src}
        alt={clone ? "" : company.name}
        className={`trusted-by__logo trusted-by__logo--${company.variant}`}
      />
    </li>
  );
}

export function TrustedBy() {
  return (
    <div className="trusted-by__banner">
      <h2 className="trusted-by__title">Companies that trust us</h2>
      <div className="trusted-by__viewport">
        <ul className="trusted-by__row">
          {companies.map((company) => (
            <LogoItem key={company.name} company={company} />
          ))}
          {companies.map((company) => (
            <LogoItem key={`${company.name}-clone`} company={company} clone />
          ))}
        </ul>
      </div>
    </div>
  );
}
