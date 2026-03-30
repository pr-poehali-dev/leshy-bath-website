import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/8ed836fa-bf72-4b56-8529-43138398c3cc/files/3891cd63-de78-44be-9742-899349ea73e6.jpg";
const HERBS_IMG = "https://cdn.poehali.dev/projects/8ed836fa-bf72-4b56-8529-43138398c3cc/files/07e01304-ca87-4a88-ae3e-83a1105b0af7.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/8ed836fa-bf72-4b56-8529-43138398c3cc/files/ba85d80d-3ea9-4f87-b0a6-345cae66c8e7.jpg";

const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"];

const NAV_ITEMS = [
  { id: "hero", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "rooms", label: "Помещения" },
  { id: "schedule", label: "Расписание" },
  { id: "herbs", label: "Травы" },
  { id: "legends", label: "Легенды" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Flame", title: "Баня медовая", desc: "Жар берёзовых дров, каменная печь-каменка. Температура до 75°С. Веники из берёзы, дуба и можжевельника.", price: "от 2000 ₽/час · заказ от 3 часов" },
  { icon: "Droplets", title: "Купель с ключевой водой", desc: "Ледяная купель из родниковой воды. Закаляет дух и тело, пробуждает силу предков.", price: "включено" },
  { icon: "Wind", title: "Пар-мастер", desc: "Опытный парильщик проведёт старинный обряд парения. Травяные масла, целебный пар.", price: "от 3000 ₽/час" },
  { icon: "Star", title: "Программа парения", desc: "Фирменная программа 5–6 часов: несколько сеансов парения, отдых с травяными сборами, домашним квасом и морсами ручного приготовления, восстановительный сон с ароматерапией.", price: "от 12 000 ₽" },
  { icon: "CircleDot", title: "Чан на дровах", desc: "Купание в чане, с отваром целебных трав и фруктов, нагретом на живом огне. Расслабляет тело и согревает душу.", price: "5 000 ₽ · на время аренды бани" },
  { icon: "Trees", title: "Открытая зона", desc: "Беседка и мангальная зона. Отдых на свежем воздухе, шашлык, огонь — всё для компании.", price: "от 2 000 ₽ · на время аренды бани" },
  { icon: "Leaf", title: "Напитки", desc: "Морс, чай с самоваром, домашний квас — всё приготовлено вручную из натуральных ингредиентов.", price: "" },
  { icon: "Moon", title: "Ночная баня", desc: "Особая баня под звёздами. Тишина, звук леса, огонь в темноте. Только для двоих.", price: "от 5000 ₽" },
];

const ROOMS = [
  {
    name: "Изба Лешего",
    desc: "Просторная рубленая баня на 8 человек. Предбанник с дубовыми столами, купель, мангал.",
    features: ["до 8 чел.", "парная 90°С", "купель", "предбанник", "мангал"],
    price: "4000 ₽/час",
    img: INTERIOR_IMG,
  },
  {
    name: "Сердце бани",
    desc: "Современная печь с плавной подачей пара. Лежанки из кедра с покрытием из свежего сена. Предбанник с дубовыми столами.",
    features: ["до 6 чел.", "парная 75°С", "кедровые лежанки", "предбанник"],
    price: "3000 ₽/час",
    img: INTERIOR_IMG,
  },
  {
    name: "Берегиня",
    desc: "Уютная баня для малых компаний. Мягкий жар, лежанки из кедра с покрытием из свежего сена.",
    features: ["до 4 чел.", "парная 75°С", "бочка", "чайная зона"],
    price: "2500 ₽/час",
    img: HERO_IMG,
  },
];

const SCHEDULE = [
  { day: "Понедельник — Пятница", time: "09:00 — 23:00", note: "Будние дни" },
  { day: "Суббота", time: "08:00 — 02:00", note: "Продлённый день" },
  { day: "Воскресенье", time: "08:00 — 00:00", note: "Семейный день" },
  { day: "Праздники", time: "08:00 — 03:00", note: "По предварительной записи" },
];

const HERBS = [
  { name: "Полынь", rune: "ᛈ", props: "Очищает пространство от злых духов. Облегчает боли, успокаивает нервы, изгоняет бессонницу.", slavic: "Трава Мораны — богини смерти и перерождения" },
  { name: "Берёза", rune: "ᛒ", props: "Листья берёзы — главный банный оберег. Очищают кожу, снимают воспаления, дарят молодость.", slavic: "Священное дерево Берегини, хранительницы рода" },
  { name: "Можжевельник", rune: "ᛇ", props: "Мощный антисептик. Дым очищает воздух, укрепляет иммунитет, прогоняет хворь.", slavic: "Дерево Перуна — громовержца и защитника" },
  { name: "Мята", rune: "ᛗ", props: "Охлаждает в жару, снимает головную боль, успокаивает сердце и разум.", slavic: "Трава Живы — богини жизни и весны" },
  { name: "Чабрец", rune: "ᚦ", props: "Лечит кашель и простуду. Наполняет баню ароматом летнего луга, дарит бодрость.", slavic: "Трава силы — носили воины в походах" },
  { name: "Ромашка", rune: "ᚱ", props: "Снимает воспаления, нежно очищает кожу. Незаменима для детского пара.", slavic: "Цветок Лады — богини любви и красоты" },
  { name: "Дубовый лист", rune: "ᛞ", props: "Укрепляет кожу, останавливает кровь, дубит и закаляет тело.", slavic: "Дуб — Мировое Древо, ось мироздания" },
  { name: "Липа", rune: "ᛚ", props: "Лечит простуды и жар. Медовый аромат успокаивает и наполняет нежностью.", slavic: "Дерево Лады, место народных собраний" },
];

const LEGENDS = [
  {
    title: "Леший и банник",
    text: "Говорили в старину: в каждой бане живёт Банник — дух огня и пара. Злобен он к тем, кто входит в баню с гордыней, добр — к смиренным и чистым сердцем. Поэтому наши предки всегда оставляли ему угощение: хлеб да соль у порога, веник на полке. А Леший — хозяин леса — давал берёзы для веников только тем, кто чтил природу.",
    rune: "ᛒᚨᚾᛁᚲ",
  },
  {
    title: "Обряд очищения перед битвой",
    text: "Перед каждым великим делом — сватовством, битвой, путешествием — славянский воин шёл в баню. Там он смывал с себя не только грязь, но и страх, сомнения, злые помыслы. Пар открывал путь к предкам, а берёзовый веник бил по плечам — разгонял кровь и будил дух. Вышедший из бани был чист телом и душой.",
    rune: "ᛟᚲᚱᛖᛊᛏ",
  },
  {
    title: "Руны на стенах бани",
    text: "Мудрые знахари вырезали руны на брёвнах бани — не ради красоты, а для защиты. Руна Уруз давала силу, Альгиз — оберегала от злых духов, Соулу — дарила здоровье и свет. Считалось, что дерево, помеченное рунами, впитывает силу и передаёт её тому, кто парится в этой бане.",
    rune: "ᚢᛉᛊᛟᛚ",
  },
];

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8C060", marginBottom: "0.5rem", letterSpacing: "0.12em" }}>
        {children}
      </h2>
      {sub && (
        <p style={{ fontFamily: "'Merriweather', serif", color: "#8B6020", fontSize: "0.85rem", fontStyle: "italic" }}>{sub}</p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: "200px", margin: "1rem auto 0" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6), transparent)" }} />
        <span style={{ color: "#C8860A", fontSize: "1.2rem" }}>᛭</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6), transparent)" }} />
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", room: "", date: "", time: "" });
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(200,134,10,0.06)",
    border: "1px solid rgba(200,134,10,0.3)",
    borderRadius: "2px",
    padding: "12px 16px",
    color: "#F0D890",
    fontFamily: "'Merriweather', serif",
    fontSize: "0.85rem",
    outline: "none",
    colorScheme: "dark",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A06", color: "#F0D890", overflowX: "hidden" }}>

      {/* ── НАВИГАЦИЯ ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(15,10,6,0.93)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(200,134,10,0.2)", height: 56,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("hero")} style={{ fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "1.1rem", letterSpacing: "0.15em", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src="https://cdn.poehali.dev/files/942fb2ff-290e-4289-980c-8e5d967e89e9.jpg" alt="Леший" style={{ height: 38, width: 38, objectFit: "contain", filter: "sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)" }} />
            БАНИ ЛЕШЕГО
          </button>
          <div className="hidden md:flex" style={{ gap: "1.5rem" }}>
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  color: activeSection === id ? "#F0C060" : "rgba(200,160,80,0.6)",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#C8860A", background: "none", border: "none", cursor: "pointer" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div style={{
            position: "absolute", top: 56, left: 0, right: 0,
            background: "#0F0A06", borderBottom: "1px solid rgba(200,134,10,0.2)",
            padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem",
          }}>
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ fontFamily: "'Cormorant SC', serif", fontSize: "0.85rem", letterSpacing: "0.12em", color: "rgba(240,192,96,0.7)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,10,6,0.45) 0%, rgba(15,10,6,0.2) 40%, rgba(15,10,6,0.75) 80%, #0F0A06 100%)" }} />

        {/* Фоновые руны */}
        {RUNES.slice(0, 14).map((r, i) => (
          <span key={i} style={{
            position: "absolute",
            fontFamily: "'Cormorant SC', serif",
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            color: "#C8860A",
            opacity: 0.04 + (i % 4) * 0.02,
            top: `${8 + (i * 7) % 80}%`,
            left: `${4 + (i * 13) % 92}%`,
            pointerEvents: "none",
            userSelect: "none",
          }}>{r}</span>
        ))}

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", letterSpacing: "0.5em", opacity: 0.65, marginBottom: "1.5rem", animation: "flicker 4s ease-in-out infinite" }}>
            ᛒᚨᚾᛁ · ᛚᛖᛊᛖᚷᛟ
          </div>

          <h1 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: "clamp(5rem, 18vw, 13rem)",
            lineHeight: 0.9,
            letterSpacing: "0.05em",
            marginBottom: "0.3em",
            textShadow: "0 0 60px rgba(200,134,10,0.7), 0 0 120px rgba(200,134,10,0.25)",
            animation: "flicker 5s ease-in-out infinite",
          }}>
            <span style={{ color: "#E8C060", display: "block" }}>Бани</span>
            <span style={{ color: "#C8860A", display: "block" }}>Лешего</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: 280, margin: "1.5rem auto" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.7))" }} />
            <span style={{ color: "#C8860A", fontSize: "1.5rem" }}>᛭</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(200,134,10,0.7), transparent)" }} />
          </div>

          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(240,210,150,0.8)", fontStyle: "italic", lineHeight: 1.7, marginBottom: "0.5rem" }}>
            Очищение тела и духа по заветам предков
          </p>
          <p style={{ fontFamily: "'Cormorant SC', serif", color: "#7A5010", fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "3rem" }}>
            ТРАДИЦИИ СЛАВЯНСКОГО РОДА · С ДРЕВНИХ ВРЕМЁН
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("booking")} className="btn-amber" style={{ padding: "1rem 2.5rem", fontSize: "0.95rem", borderRadius: 2 }}>
              Забронировать баню
            </button>
            <button onClick={() => scrollTo("services")} style={{
              padding: "1rem 2.5rem", fontSize: "0.95rem", fontFamily: "'Cormorant SC', serif",
              fontWeight: 600, letterSpacing: "0.1em", color: "#C8860A",
              border: "1px solid rgba(200,134,10,0.4)", borderRadius: 2,
              background: "none", cursor: "pointer", transition: "all 0.3s",
            }}>
              Наши услуги
            </button>
          </div>
        </div>

        <button onClick={() => scrollTo("services")} style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", color: "#C8860A", opacity: 0.5, background: "none", border: "none", cursor: "pointer", animation: "bounce 2s infinite" }}>
          <Icon name="ChevronDown" size={32} />
        </button>
      </section>

      {/* ══ УСЛУГИ ══ */}
      <section id="services" style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap", gap: "4rem", opacity: 0.015, pointerEvents: "none", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} style={{ fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "3rem" }}>{RUNES[i % RUNES.length]}</span>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionTitle sub="Всё, что нужно душе и телу">Наши услуги</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="slavic-card" style={{ borderRadius: 2, padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "linear-gradient(135deg, #3D2B1A, #5A3D1F)", border: "1px solid rgba(200,134,10,0.3)" }}>
                    <Icon name={s.icon} size={22} style={{ color: "#C8860A" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.2rem", color: "#E8C060", letterSpacing: "0.08em" }}>{s.title}</h3>
                    <span style={{ fontFamily: "'Merriweather', serif", color: "#8B6020", fontSize: "0.78rem", fontStyle: "italic" }}>{s.price}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(240,210,150,0.55)", fontSize: "0.83rem", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ПОМЕЩЕНИЯ ══ */}
      <section id="rooms" style={{ padding: "6rem 1.5rem", background: "#0A0805" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle sub="Три пространства для разных нужд">Помещения</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {ROOMS.map((r, i) => (
              <div key={i} className="slavic-card" style={{ borderRadius: 2, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(15,10,6,0.92) 100%)" }} />
                  <h3 style={{ position: "absolute", bottom: "0.75rem", left: "1rem", fontFamily: "'Cormorant SC', serif", fontSize: "1.5rem", color: "#E8C060", letterSpacing: "0.08em" }}>{r.name}</h3>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(240,210,150,0.55)", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "1rem" }}>{r.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {r.features.map((f, fi) => (
                      <span key={fi} style={{ fontFamily: "'Cormorant SC', serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "#C8860A", padding: "3px 8px", border: "1px solid rgba(200,134,10,0.2)", background: "rgba(200,134,10,0.05)" }}>{f}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.3rem", color: "#E8C060" }}>{r.price}</span>
                    <button
                      onClick={() => { setBookingForm(p => ({ ...p, room: r.name })); scrollTo("booking"); }}
                      className="btn-amber"
                      style={{ padding: "0.5rem 1.25rem", fontSize: "0.82rem", borderRadius: 2 }}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ РАСПИСАНИЕ ══ */}
      <section id="schedule" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionTitle sub="Двери открыты почти всегда">Расписание</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {SCHEDULE.map((s, i) => (
              <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderRadius: 2, background: "linear-gradient(135deg, rgba(61,43,26,0.35), rgba(26,18,8,0.55))", border: "1px solid rgba(200,134,10,0.18)" }}>
                <div>
                  <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.1rem", color: "#E8C060", letterSpacing: "0.08em", display: "block" }}>{s.day}</span>
                  <span style={{ fontFamily: "'Merriweather', serif", color: "#7A5010", fontSize: "0.78rem", fontStyle: "italic" }}>{s.note}</span>
                </div>
                <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.5rem", color: "#C8860A", textShadow: "0 0 20px rgba(200,134,10,0.4)" }}>{s.time}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderRadius: 2, background: "rgba(200,134,10,0.05)", border: "1px solid rgba(200,134,10,0.15)" }}>
            <Icon name="Phone" size={18} style={{ color: "#C8860A", display: "block", margin: "0 auto 0.5rem" }} />
            <p style={{ fontFamily: "'Cormorant SC', serif", color: "#E8C060", fontSize: "1.2rem" }}>+7 (XXX) XXX-XX-XX</p>
            <p style={{ fontFamily: "'Merriweather', serif", color: "#7A5010", fontSize: "0.8rem", fontStyle: "italic", marginTop: "0.25rem" }}>Бронирование и вопросы — с 8:00 до 22:00</p>
          </div>
        </div>
      </section>

      {/* ══ ТРАВЫ ══ */}
      <section id="herbs" style={{ padding: "6rem 1.5rem", background: "#080605" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle sub="Каталог целебных трав и их свойства">Знахарский Травник</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", border: "1px solid rgba(200,134,10,0.12)", background: "rgba(200,134,10,0.03)" }}>
            {HERBS.map((h, i) => (
              <div key={i} style={{ padding: "1.5rem", borderRight: (i % 2 === 0) ? "1px solid rgba(200,134,10,0.1)" : "none", borderBottom: "1px solid rgba(200,134,10,0.1)", transition: "background 0.3s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,134,10,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "2.2rem", color: "#C8860A", opacity: 0.55, flexShrink: 0, lineHeight: 1 }}>{h.rune}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.2rem", color: "#E8C060", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{h.name}</h3>
                    <p style={{ fontFamily: "'Merriweather', serif", color: "#7A5010", fontSize: "0.72rem", fontStyle: "italic", marginBottom: "0.6rem" }}>{h.slavic}</p>
                    <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(240,210,150,0.5)", fontSize: "0.8rem", lineHeight: 1.8 }}>{h.props}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", position: "relative", borderRadius: 2, overflow: "hidden", height: 300 }}>
            <img src={HERBS_IMG} alt="Травы" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,6,5,0.88) 0%, transparent 55%)", display: "flex", alignItems: "flex-end", padding: "2rem" }}>
              <div>
                <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(1.3rem, 3vw, 2rem)", color: "#E8C060", marginBottom: "0.5rem" }}>«Каждая трава — слово предков»</p>
                <p style={{ fontFamily: "'Merriweather', serif", color: "#7A5010", fontSize: "0.82rem", fontStyle: "italic" }}>Из сборника знахарских рецептов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ЛЕГЕНДЫ ══ */}
      <section id="legends" style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "blur(6px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0F0A06 0%, rgba(15,10,6,0.65) 50%, #0F0A06 100%)" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionTitle sub="Сказания, дошедшие до нас из глубины веков">Легенды</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {LEGENDS.map((l, i) => (
              <div key={i} style={{ padding: "2rem 2.5rem", borderRadius: 2, background: "linear-gradient(135deg, rgba(20,16,8,0.96), rgba(30,20,10,0.92))", border: "1px solid rgba(200,134,10,0.2)" }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.8rem", color: "#C8860A", opacity: 0.3, letterSpacing: "0.25em", flexShrink: 0, paddingTop: "0.25rem" }}>{l.rune}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#E8C060", letterSpacing: "0.08em", marginBottom: "1rem" }}>{l.title}</h3>
                    <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(240,210,150,0.6)", lineHeight: 2, fontSize: "0.9rem", fontStyle: "italic" }}>{l.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ БРОНИРОВАНИЕ ══ */}
      <section id="booking" style={{ padding: "6rem 1.5rem", background: "#080605" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SectionTitle sub="Занять место у огня">Бронирование</SectionTitle>
          <div style={{ padding: "2.5rem", borderRadius: 2, background: "linear-gradient(135deg, #141008, #1C1408)", border: "1px solid rgba(200,134,10,0.25)", position: "relative" }}>
            <span style={{ position: "absolute", top: "0.75rem", left: "1rem", fontFamily: "'Cormorant SC', serif", color: "#C8860A", opacity: 0.3, fontSize: "1.3rem" }}>ᛒ</span>
            <span style={{ position: "absolute", top: "0.75rem", right: "1rem", fontFamily: "'Cormorant SC', serif", color: "#C8860A", opacity: 0.3, fontSize: "1.3rem" }}>ᚱ</span>
            <span style={{ position: "absolute", bottom: "0.75rem", left: "1rem", fontFamily: "'Cormorant SC', serif", color: "#C8860A", opacity: 0.3, fontSize: "1.3rem" }}>ᛟ</span>
            <span style={{ position: "absolute", bottom: "0.75rem", right: "1rem", fontFamily: "'Cormorant SC', serif", color: "#C8860A", opacity: 0.3, fontSize: "1.3rem" }}>ᛜ</span>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>ИМЯ</label>
                  <input type="text" placeholder="Как вас зовут" value={bookingForm.name} onChange={e => setBookingForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>ТЕЛЕФОН</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={bookingForm.phone} onChange={e => setBookingForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>ПОМЕЩЕНИЕ</label>
                <select value={bookingForm.room} onChange={e => setBookingForm(p => ({ ...p, room: e.target.value }))} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="">Выберите баню</option>
                  {ROOMS.map(r => <option key={r.name} value={r.name}>{r.name} — {r.price}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>ДАТА</label>
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm(p => ({ ...p, date: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>ВРЕМЯ</label>
                  <input type="time" value={bookingForm.time} onChange={e => setBookingForm(p => ({ ...p, time: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              <button className="btn-amber" style={{ width: "100%", padding: "1rem", fontSize: "0.95rem", borderRadius: 2, marginTop: "0.5rem" }}>
                Отправить заявку на бронирование
              </button>
              <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(120,80,16,0.6)", fontSize: "0.75rem", textAlign: "center", fontStyle: "italic" }}>
                Мы свяжемся с вами в течение часа для подтверждения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ КОНТАКТЫ ══ */}
      <section id="contacts" style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://cdn.poehali.dev/projects/8ed836fa-bf72-4b56-8529-43138398c3cc/files/08f1dae3-1890-4841-b763-48e2d180e585.jpg)", backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.45, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,8,4,0.6) 30%, rgba(10,8,4,0.25))", zIndex: 1 }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionTitle sub="Найдите нас в лесу">Контакты</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: "MapPin", title: "Адрес", text: "Владимирская область, округ Муром, деревня Макаровка, д. 3 · 10 минут езды от центра города" },
                { icon: "Phone", title: "Телефон", text: "+7 (XXX) XXX-XX-XX" },
                { icon: "Clock", title: "Режим работы", text: "Ежедневно с 8:00 до 03:00" },
                { icon: "MessageCircle", title: "Telegram", text: "@bani_leshego" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(200,134,10,0.08)", border: "1px solid rgba(200,134,10,0.22)" }}>
                    <Icon name={c.icon} size={17} style={{ color: "#C8860A" }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "0.72rem", letterSpacing: "0.2em", display: "block" }}>{c.title}</span>
                    <span style={{ fontFamily: "'Merriweather', serif", color: "rgba(240,210,150,0.65)", fontSize: "0.85rem" }}>{c.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "1.75rem", borderRadius: 2, background: "linear-gradient(135deg, #141008, #1C1408)", border: "1px solid rgba(200,134,10,0.2)" }}>
              <h3 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "1.3rem", color: "#E8C060", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>Написать нам</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input type="text" placeholder="Ваше имя" value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
                <input type="tel" placeholder="Телефон" value={contactForm.phone} onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} />
                <textarea placeholder="Ваш вопрос или пожелание" rows={3} value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} style={{ ...inputStyle, resize: "none" }} />
                <button className="btn-amber" style={{ width: "100%", padding: "0.85rem", fontSize: "0.88rem", borderRadius: 2 }}>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding: "2.5rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(200,134,10,0.12)", background: "#080605" }}>
        <img src="https://cdn.poehali.dev/files/2da304c4-6104-4f0a-b592-4e79859b9677.jpg" alt="Бани Лешего" style={{ height: 80, width: 80, objectFit: "contain", filter: "sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.7)", opacity: 0.7, marginBottom: "1rem" }} />
        <div style={{ fontFamily: "'Cormorant SC', serif", color: "#C8860A", fontSize: "2rem", letterSpacing: "0.3em", opacity: 0.35, marginBottom: "0.75rem" }}>
          ᛒᚨᚾᛁ · ᛚᛖᛊᛖᚷᛟ
        </div>
        <p style={{ fontFamily: "'Cormorant SC', serif", color: "#7A5010", fontSize: "0.75rem", letterSpacing: "0.25em", opacity: 0.55 }}>
          БАНИ ЛЕШЕГО · СЛАВА ПРЕДКАМ · {new Date().getFullYear()}
        </p>
        <p style={{ fontFamily: "'Merriweather', serif", color: "rgba(120,80,16,0.35)", fontSize: "0.72rem", marginTop: "0.5rem", fontStyle: "italic" }}>
          Традиции славянского рода живут в каждом пару
        </p>
      </footer>
    </div>
  );
}