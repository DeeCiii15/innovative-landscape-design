const companies = [
  { name: "Raldex Hospitality Inc.", src: "/images/trusted/raldex.png", variant: "mark" },
  { name: "Hilton Hotels", src: "/images/trusted/hilton.svg", variant: "stacked" },
  { name: "Jiffy Lube", src: "/images/trusted/jiffy-lube.png", variant: "jiffy" },
  { name: "Olive Garden", src: "/images/trusted/olive-garden.svg", variant: "stacked" },
  { name: "CVS", src: "/images/trusted/cvs.svg", variant: "wide" },
  { name: "Chick-fil-A", src: "/images/trusted/chick-fil-a.svg", variant: "stacked" },
  { name: "First Bank", src: "/images/trusted/first-bank.png", variant: "stacked" },
] as const;

export function TrustedBy() {
  return (
    <div className="trusted-by__banner">
      <h2 className="trusted-by__title">Companies that trust us</h2>
      <ul className="trusted-by__row">
        {companies.map((company) => (
          <li key={company.name} className="trusted-by__item">
            <img
              src={company.src}
              alt={company.name}
              className={`trusted-by__logo trusted-by__logo--${company.variant}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
