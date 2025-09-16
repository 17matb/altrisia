import { Camera } from 'lucide-react';

const Annonce = ({
  type_demande,
  title,
  description,
  city,
  date,
  imageSrc,
  imageAlt,
}) => {
  const showFancyDate = (uglyDate) => {
    const dateTime = new Date(uglyDate);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const dateTimeDay = new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
    );

    const padTime = (number) => {
      return number.toString().padStart(2, '0');
    };
    const time = `${padTime(dateTime.getHours())}:${padTime(dateTime.getMinutes())}`;
    console.log(dateTime.getTime());

    if (dateTimeDay.getTime() === today.getTime()) {
      return `aujourd'hui à ${time}`;
    }
    if (dateTimeDay.getTime() === yesterday.getTime()) {
      return `hier à ${time}`;
    }

    return (
      dateTime.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) + ` à ${time}`
    );
  };

  showFancyDate(date);
  return (
    <article
      className={`group bg-foreground/0 hover:bg-foreground/5 border-foreground/10 duration-100 border flex flex-col md:flex-row gap-4 p-4 rounded-3xl max-w-3xl cursor-pointer`}
    >
      <div
        className={`${type_demande === true && 'bg-primary/80'} ${type_demande === false && 'bg-secondary/80'} absolute px-1 py-0.5 text-background m-1 rounded-sm text-sm`}
      >
        {type_demande ? 'Demande' : 'Proposition'}
      </div>
      <div
        className={`bg-foreground/50 shrink-0 aspect-[4/3] w-full md:w-64 rounded-lg flex items-center justify-center overflow-hidden`}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover w-full h-full"
          />
        )}
        <Camera size={50} className={`text-foreground/50`} />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p
            className={`group-hover:text-primary duration-100 font-semibold text-lg first-letter:capitalize`}
          >
            {title}
          </p>
          <p className="line-clamp-2 text-foreground/80">{description}</p>
        </div>
        <p className="first-letter:capitalize mt-2 text-sm text-foreground/50">
          {city} · {showFancyDate(date)}
        </p>
      </div>
    </article>
  );
};

export default Annonce;
