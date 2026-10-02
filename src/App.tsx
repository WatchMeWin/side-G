import { useRef, useState } from "react";
import type { ClipboardEvent, FormEvent, KeyboardEvent, ReactNode } from "react";
import {
  ArrowRight,
  Bitcoin,
  CalendarDays,
  Check,
  Eye,
  EyeOff,
  FolderLock,
  Gift,
  KeyRound,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================================================
   TYPES
========================================================= */

type PaymentMethod = "bitcoin" | "giftcard" | null;

type Creator = {
  name: string;
  handle: string;
  image: string;
};

type CreatorAvatarProps = {
  size?: "large" | "small";
};

type PreviewCardProps = {
  number: string;
  title: string;
  category: string;
  videoCount: string;
  price: string;
  description: string;
  accent: string;
  onClick: () => void;
};

type PaymentOptionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

/* =========================================================
   CONFIGURATION
========================================================= */

/*
  CHANGE ONLY THIS VALUE TO YOUR TELEGRAM USERNAME.

  Example:
  https://t.me/yourusername
*/

const TELEGRAM_PROFILE_URL =
  "https://t.me/Ava_Robert0";

/* =========================================================
   LOGIN CREDENTIALS
========================================================= */

const LOGIN_CREDENTIALS = {
  id: "0987654321",
  password: "ava.priv20",
};

/* =========================================================
   CREATOR
========================================================= */

const creator: Creator = {
  name: "Ava Robert",
  handle: "@ava_robert0",
  image: "/ava.png",
};

/* =========================================================
   TELEGRAM CHECKOUT
========================================================= */

function openTelegramCheckout(
  card: PreviewCardProps,
  paymentMethod: Exclude<PaymentMethod, null>,
): void {
  const paymentName =
    paymentMethod === "bitcoin"
      ? "Bitcoin"
      : "Apple Gift Card";

  const message = [
    "Hi, I'd like to unlock a private collection.",
    "",
    `Collection: ${card.title}`,
    `Category: ${card.category}`,
    `Videos: ${card.videoCount}`,
    `Price: ${card.price}`,
    `Payment method: ${paymentName}`,
    "",
    "Please send me the payment instructions.",
  ].join("\n");

  const separator = TELEGRAM_PROFILE_URL.includes("?")
    ? "&"
    : "?";

  const telegramUrl =
    `${TELEGRAM_PROFILE_URL}${separator}text=${encodeURIComponent(message)}`;

  window.location.href = telegramUrl;
}

/* =========================================================
   APP
========================================================= */

export default function App(): ReactNode {
  const location = useLocation();

  if (location.pathname === "/unlock") {
    return <UnlockPage />;
  }

  return <LoginPage />;
}

/* =========================================================
   BACKGROUND
========================================================= */

function Background(): ReactNode {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute -left-40 -top-40 h-115 w-115 rounded-full bg-fuchsia-500/5.5 blur-[130px]" />

      <div className="absolute -right-40 top-[12%] h-130 w-130 rounded-full bg-violet-500/5 blur-[140px]" />

      <div className="absolute -bottom-55 left-[20%] h-125 w-125 rounded-full bg-blue-500/[0.035] blur-[140px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_38%)]" />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
}

/* =========================================================
   SITE HEADER
========================================================= */

function SiteHeader(): ReactNode {
  return (
    <header className="relative z-20 flex items-center justify-between">
      <div className="group flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5.5 shadow-[0_10px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/8">
          <div className="absolute inset-0 bg-linear-to-br from-white/12 to-transparent" />

          <Sparkles
            className="relative h-4 w-4 text-white"
            strokeWidth={1.7}
          />
        </div>

        <div>
          <h1 className="text-sm font-bold tracking-[0.16em] text-white">
            Ava Robert
          </h1>

          <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.28em] text-white/30">
            Private Collection
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 backdrop-blur-xl">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
        </span>

        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:block">
          Private space
        </span>
      </div>
    </header>
  );
}

/* =========================================================
   SITE FOOTER
========================================================= */

function SiteFooter(): ReactNode {
  return (
    <footer className="relative z-10 mt-auto pt-10">
      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/4">
            <Sparkles
              className="h-3.5 w-3.5 text-white/70"
              strokeWidth={1.6}
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/75">
              Ava Robert
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/25">
              A private space curated by Ava Robert
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
          <Lock className="h-3 w-3" />
          Private & protected
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   CREATOR AVATAR
========================================================= */

function CreatorAvatar({
  size = "small",
}: CreatorAvatarProps): ReactNode {
  const dimensions =
    size === "large"
      ? "h-20 w-20 rounded-[24px]"
      : "h-11 w-11 rounded-2xl";

  return (
    <div
      className={`overflow-hidden border border-white/10 bg-white/6 shadow-[0_10px_35px_rgba(0,0,0,0.3)] ${dimensions}`}
    >
      <img
        src={creator.image}
        alt={creator.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage(): ReactNode {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const isValid =
      id.trim() === LOGIN_CREDENTIALS.id &&
      password === LOGIN_CREDENTIALS.password;

    if (!isValid) {
      setError(
        "The ID or password you entered is incorrect.",
      );
      return;
    }

    setError("");
    navigate("/unlock");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Background />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <SiteHeader />

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <CreatorAvatar size="large" />

                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#050505] bg-white text-black shadow-lg">
                    <Check
                      className="h-4 w-4"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Ava Robert
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Welcome back.
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
                Sign in to continue to your VIP
                experience.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-7"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="creator-id"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40"
                  >
                    Private ID
                  </label>

                  <input
                    id="creator-id"
                    type="text"
                    autoComplete="username"
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your private ID"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/25 focus:bg-white/4.5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="creator-password"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="creator-password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/25 focus:bg-white/4.5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-white/30 transition-colors hover:bg-white/6 hover:text-white/70"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-400/10 bg-red-400/6 px-4 py-3 text-xs leading-5 text-red-200/70">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.99]"
                >
                  Continue

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
                <ShieldCheck className="h-3.5 w-3.5" />
                Private & secure access
              </div>
            </form>
          </div>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}

/* =========================================================
   UNLOCK PAGE
========================================================= */

function UnlockPage(): ReactNode {
  const [unlockStep, setUnlockStep] = useState<"dob" | "code">("dob");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [dobError, setDobError] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string[]>(["", "", "", ""]);
  const [codeError, setCodeError] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(`${birthDate}T00:00:00`);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age -= 1;
    }

    return age;
  };

  const handleDobContinue = (): void => {
    if (!dateOfBirth) {
      setDobError("Please enter your date of birth.");
      return;
    }

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);
    if (Number.isNaN(birthDate.getTime())) {
      setDobError("Please enter a valid date of birth.");
      return;
    }

    if (birthDate > new Date()) {
      setDobError("Date of birth cannot be in the future.");
      return;
    }

    if (calculateAge(dateOfBirth) < 18) {
      setDobError("You must be 18 or older to continue.");
      return;
    }

    setDobError("");
    setUnlockStep("code");
    window.setTimeout(() => codeInputRefs.current[0]?.focus(), 50);
  };

  const handleCodeChange = (index: number, value: string): void => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...accessCode];
    nextCode[index] = digit;
    setAccessCode(nextCode);
    setCodeError("");

    if (digit && index < 3) {
      codeInputRefs.current[index + 1]?.focus();
    }

    if (nextCode.every(Boolean)) {
      const enteredCode = nextCode.join("");
      if (enteredCode === "2505") {
        setIsVerified(true);
        setCodeError("");
      } else {
        setCodeError("Incorrect access code. Please try again.");
      }
    }
  };

  const handleCodeKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Backspace" && !accessCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;

    const nextCode = ["", "", "", ""];
    pasted.split("").forEach((digit, index) => {
      nextCode[index] = digit;
    });
    setAccessCode(nextCode);
    setCodeError("");

    if (pasted.length === 4) {
      if (pasted === "2505") {
        setIsVerified(true);
      } else {
        setCodeError("Incorrect access code. Please try again.");
        codeInputRefs.current[0]?.focus();
      }
    } else {
      codeInputRefs.current[pasted.length]?.focus();
    }
  };

  const [selectedCard, setSelectedCard] =
    useState<PreviewCardProps | null>(null);

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>(null);

  const openCheckout = (
    card: PreviewCardProps,
  ): void => {
    setSelectedCard(card);
    setSelectedPayment(null);
  };

  const closeCheckout = (): void => {
    setSelectedCard(null);
    setSelectedPayment(null);
  };

  const handlePaymentSelection = (
    paymentMethod: Exclude<PaymentMethod, null>,
  ): void => {
    if (!selectedCard) {
      return;
    }

    setSelectedPayment(paymentMethod);

    openTelegramCheckout(
      selectedCard,
      paymentMethod,
    );
  };

  const cards: PreviewCardProps[] = [
    {
      number: "01",
      title: "Exclusive Sets",
      category: "Premium Collection",
      videoCount: "50+ Videos",
      price: "$150",
      description:
        "A private collection of exclusive videos carefully curated for members.",
      accent:
        "from-fuchsia-500/[0.14] via-purple-500/[0.06] to-transparent",
      onClick: () => undefined,
    },
    {
      number: "02",
      title: "Private Updates",
      category: "Members Archive",
      videoCount: "75+ Videos",
      price: "$250",
      description:
        "An extended private archive featuring members-only updates and exclusive content.",
      accent:
        "from-blue-500/[0.14] via-cyan-500/[0.06] to-transparent",
      onClick: () => undefined,
    },
    {
      number: "03",
      title: "Premium Drops",
      category: "New Release",
      videoCount: "100+ Videos",
      price: "$500",
      description:
        "The largest private collection featuring premium drops and exclusive releases.",
      accent:
        "from-amber-500/[0.14] via-orange-500/[0.06] to-transparent",
      onClick: () => undefined,
    },
  ];

  const cardsWithHandlers: PreviewCardProps[] =
    cards.map((card) => ({
      ...card,
      onClick: () => openCheckout(card),
    }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Background />
      {!isVerified ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl sm:p-6">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_140px_rgba(0,0,0,0.7)]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/8 blur-[80px]" />

            <div className="relative p-6 sm:p-8">
              {unlockStep === "dob" ? (
                <>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5.5">
                    <span className="text-2xl" aria-hidden="true">🔞</span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">Age verification</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">Unlock link with your date of birth</h2>
                  <p className="mt-4 text-sm leading-6 text-white/45">18+ access required this section contains age-restricted content intended exclusively for adults aged18 and over. A secure password is required to verify authorized access and help protect the privacy of the content and its members, Please keep your password private and do not share with anyone.</p>

                  <div className="mt-7">
                    <label htmlFor="date-of-birth" className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      <CalendarDays className="h-3.5 w-3.5" /> Date of birth
                    </label>
                    <input
                      id="date-of-birth"
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={dateOfBirth}
                      onChange={(event) => { setDateOfBirth(event.target.value); setDobError(""); }}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition-all scheme-dark focus:border-white/25 focus:bg-white/4.5"
                    />
                    {dobError ? <p className="mt-3 rounded-xl border border-red-400/10 bg-red-400/5 px-3.5 py-3 text-xs leading-5 text-red-200/75">{dobError}</p> : null}
                  </div>

                  <button type="button" onClick={handleDobContinue} disabled={!dateOfBirth} className="group mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25">
                    Continue <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5.5"><KeyRound className="h-6 w-6 text-white/80" strokeWidth={1.7} /></div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">Access verification</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">Unlock link with a code</h2>
                  <p className="mt-4 text-sm leading-6 text-white/45">Kindly provide access code</p>

                  <div className="mt-7 flex justify-center gap-2.5 sm:gap-3">
                    {accessCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(element) => { codeInputRefs.current[index] = element; }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        onChange={(event) => handleCodeChange(index, event.target.value)}
                        onKeyDown={(event) => handleCodeKeyDown(index, event)}
                        onPaste={handleCodePaste}
                        aria-label={`Access code digit ${index + 1}`}
                        className="h-16 w-14 rounded-2xl border border-white/10 bg-black/25 text-center text-2xl font-semibold text-white outline-none transition-all focus:border-white/30 focus:bg-white/4.5 focus:ring-4 focus:ring-white/[0.035] sm:h-17 sm:w-15.5"
                      />
                    ))}
                  </div>
                  {codeError ? <p className="mt-4 rounded-xl border border-red-400/10 bg-red-400/5 px-3.5 py-3 text-center text-xs leading-5 text-red-200/75">{codeError}</p> : null}
                  <div className="mt-7 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.17em] text-white/25"><Lock className="h-3.5 w-3.5" /> Protected access</div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}


      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <SiteHeader />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="mx-auto max-w-4xl pb-12 pt-16 text-center sm:pb-16 sm:pt-20">
          <div className="mb-6 flex items-center justify-center gap-3">
            <CreatorAvatar />

            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                {creator.name}
              </p>

              <p className="text-xs text-white/35">
                {creator.handle}
              </p>
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 backdrop-blur-xl">
            <FolderLock className="h-3.5 w-3.5" />
            Private video library
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">
            Unlock your
            <span className="block text-white/40">
              private collection.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Congratulations, you're one step away from
            accessing exclusive content curated just for you.
            Choose a private collection below to continue.
          </p>
        </section>

        {/* =====================================================
            COLLECTIONS
        ===================================================== */}

        <section className="mx-auto w-full max-w-6xl pb-20">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Available collections
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                Private libraries
              </h3>
            </div>

            <div className="hidden items-center gap-2 text-xs text-white/25 sm:flex">
              <Video className="h-3.5 w-3.5" />
              Exclusive video content
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {cardsWithHandlers.map((card) => (
              <PreviewCard
                key={card.number}
                number={card.number}
                title={card.title}
                category={card.category}
                videoCount={card.videoCount}
                price={card.price}
                description={card.description}
                accent={card.accent}
                onClick={card.onClick}
              />
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>

      {/* =====================================================
          CHECKOUT MODAL
      ===================================================== */}

      {selectedCard ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          onClick={closeCheckout}
        >
          <div
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-fuchsia-500/8 blur-[80px]" />

            <div className="relative p-5 sm:p-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                    <FolderLock className="h-5 w-5 text-white/80" />
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Unlock collection
                  </p>

                  <h3
                    id="checkout-title"
                    className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white"
                  >
                    {selectedCard.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {selectedCard.category} ·{" "}
                    {selectedCard.videoCount}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCheckout}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/40 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  aria-label="Close checkout"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Collection summary */}
              <div className="mt-7 rounded-[22px] border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                      <Video className="h-5 w-5 text-white/65" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/80">
                        Private video library
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {selectedCard.videoCount} available after unlock
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-semibold text-white">
                    {selectedCard.price}
                  </p>
                </div>
              </div>

              {/* Payment methods */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    Choose payment method
                  </p>

                  <ShieldCheck className="h-4 w-4 text-white/25" />
                </div>

                <div className="space-y-3">
                  <PaymentOption
                    icon={<Bitcoin className="h-5 w-5" />}
                    title="Bitcoin"
                    description="Continue securely through Telegram"
                    selected={
                      selectedPayment === "bitcoin"
                    }
                    onClick={() =>
                      handlePaymentSelection("bitcoin")
                    }
                  />

                  <PaymentOption
                    icon={<Gift className="h-5 w-5" />}
                    title="Apple Gift Card"
                    description="Continue securely through Telegram"
                    selected={
                      selectedPayment === "giftcard"
                    }
                    onClick={() =>
                      handlePaymentSelection("giftcard")
                    }
                  />
                </div>
              </div>

              {/* Telegram information */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/2.5 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />

                <p className="text-xs leading-5 text-white/35">
                  Select a payment method above to continue
                  on Telegram. Your selected collection,
                  video count, price and payment method will
                  be included automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

/* =========================================================
   PREMIUM VIDEO FOLDER CARD
========================================================= */

function PreviewCard({
  number,
  title,
  category,
  videoCount,
  price,
  description,
  accent,
  onClick,
}: PreviewCardProps): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] text-left shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/5.5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.42)] focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {/* Ambient gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

      {/* Folder header */}
      <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Folder icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-inner shadow-white/5 transition-transform duration-500 group-hover:scale-105">
              <FolderLock
                className="h-6 w-6 text-white/80"
                strokeWidth={1.6}
              />

              {/* Play indicator */}
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-black/60 bg-[#151515]">
                <Play
                  className="h-2.5 w-2.5 fill-white text-white"
                  strokeWidth={0}
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Private library
              </p>

              <p className="mt-1 text-xs font-medium text-white/50">
                Collection {number}
              </p>
            </div>
          </div>

          {/* Locked badge */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white/20 group-hover:text-white">
            <Lock className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative px-5 pb-6 pt-7 sm:px-6 sm:pb-7">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium text-white/35">
              {category}
            </p>

            <h3 className="truncate text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[27px]">
              {title}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
              Access
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {price}
            </p>
          </div>
        </div>

        <p className="mt-4 min-h-12 max-w-136 text-sm leading-6 text-white/40">
          {description}
        </p>

        {/* Video metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4.5 px-3 py-2">
            <Video className="h-4 w-4 text-white/65" />

            <span className="text-xs font-medium text-white/65">
              {videoCount}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4.5 px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-white/45" />

            <span className="text-xs font-medium text-white/45">
              Members only
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
          <span className="text-xs font-medium text-white/30 transition-colors duration-300 group-hover:text-white/65">
            Unlock collection
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/4.5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <ArrowRight className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
          </span>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-white/2.5 blur-3xl transition-all duration-500 group-hover:bg-white/5" />
    </button>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  icon,
  title,
  description,
  selected,
  onClick,
}: PaymentOptionProps): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-[20px] border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-white/25 bg-white/8"
          : "border-white/10 bg-white/2.5 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
          selected
            ? "border-white/20 bg-white text-black"
            : "border-white/10 bg-white/5 text-white/65 group-hover:bg-white/8 group-hover:text-white"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-white/30">
          {description}
        </p>
      </div>

      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          selected
            ? "border-white bg-white text-black"
            : "border-white/15 text-transparent"
        }`}
      >
        <Check
          className="h-3.5 w-3.5"
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}