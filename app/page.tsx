"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import IntroAnimation from "./components/IntroAnimation";

const EMAILJS_SERVICE_ID = "service_mzw4iao";
const EMAILJS_TEMPLATE_ID = "template_x62vvc9";
const EMAILJS_PUBLIC_KEY = "NNtbOXztqEGCH6mtQ";

const roles = ["Frontend Developer", "Fullstack Developer", "Web Designer", "UI/UX Enthusiast"];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-cyan-300">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-zinc-500">Your Name</label>
          <input name="from_name" type="text" placeholder="Sine Sensu" required
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-400/50 transition" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-zinc-500">Your Email</label>
          <input name="from_email" type="email" placeholder="sinesnsu@example.com" required
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-400/50 transition" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-zinc-500">Subject</label>
        <input name="subject" type="text" defaultValue="Project Collaboration" required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 transition" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
        <textarea name="message" rows={5} placeholder="Tell me about your project..." required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-400/50 transition resize-none" />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-zinc-200 disabled:opacity-60">
        {status === "sending" ? "SENDING..." : <>SEND <span className="text-yellow-500">M</span>ESSAGE ➤</>}
      </button>
      {status === "success" && <p className="text-center text-sm text-cyan-400">✓ Message sent successfully!</p>}
      {status === "error" && <p className="text-center text-sm text-red-400">✗ Failed to send. Please try again.</p>}
    </form>
  );
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}

      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        {/* Background Glow */}
        <div className="absolute left-[-150px] top-[100px] h-[420px] w-[420px] animate-pulse rounded-full bg-purple-600/30 blur-[120px]"></div>
        <div className="absolute right-[-120px] top-[150px] h-[420px] w-[420px] animate-pulse rounded-full bg-cyan-400/25 blur-[120px]"></div>
        <div className="absolute bottom-[-100px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 animate-pulse rounded-full bg-purple-500/15 blur-[100px]"></div>

        {/* Decorative dots grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>

        <div className="relative z-10 flex min-h-screen flex-col px-6 sm:px-16 lg:px-32">
          {/* Navbar */}
          <nav className="sticky top-0 z-50 flex items-center justify-center py-4">
            <div className="absolute left-0 h-[80px] w-[200px] rounded-full bg-purple-600/20 blur-[80px]"></div>
            <div className="absolute right-0 h-[80px] w-[200px] rounded-full bg-cyan-400/20 blur-[80px]"></div>

            <div className="relative flex w-full items-center justify-between overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md sm:w-auto sm:gap-10 sm:px-14 sm:py-2">
              <span className="absolute inset-y-0 left-[-20%] w-[50%] animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
              <h1 className="relative z-10 text-lg font-semibold tracking-tight text-white sm:text-2xl">
                Portfolio
              </h1>
              <ul className="relative z-10 flex gap-5 text-sm text-zinc-300 sm:gap-10">
                <li><a href="#about" className="cursor-pointer transition hover:text-cyan-300">About</a></li>
                <li><a href="#project" className="cursor-pointer transition hover:text-cyan-300">Project</a></li>
                
                <li><a href="#contact" className="cursor-pointer transition hover:text-cyan-300">Contact</a></li>
              </ul>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="flex flex-1 flex-col items-center justify-center gap-12 py-12 pt-20 lg:flex-row lg:gap-20 mx-auto w-full max-w-6xl lg:pt-28">

            {/* LEFT — Text */}
            <div className="flex-1 max-w-xl text-center lg:text-left">
              <p className="mb-3 text-sm uppercase tracking-widest text-zinc-400">
                Welcome to my portfolio
              </p>

              <h2 className="text-4xl font-semibold sm:text-5xl">
                Hello, my name is{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  Natan
                </span>
              </h2>

              <h3 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                I&apos;m a <TypingText />
              </h3>

              <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                I am currently learning fullstack development and building
                projects to improve my skills in frontend, backend, and
                deployment.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:opacity-80"
                >
                  Curriculum Vitae
                </a>
              </div>
            </div>

            {/* RIGHT — Photo */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/50 to-cyan-400/50 blur-[60px]"></div>
              <div className="relative animate-[floatGlow_4s_ease-in-out_infinite]">
                <div className="absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-purple-400"></div>
                <div className="relative h-[320px] w-[250px] overflow-hidden rounded-2xl border border-white/10 sm:h-[400px] sm:w-[300px] lg:h-[460px] lg:w-[350px]">
                  <Image src="/photo.jpg" alt="Natan" fill className="object-cover object-top" />
                </div>
              </div>
            </div>
          </section>

          {/* Marquee Running Text */}
          <div className="mt-16 mb-24 overflow-hidden border-y border-purple-900/40 py-4 sm:mt-20 sm:mb-32">
            <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {Array(3).fill(["Frontend Developer", "Fullstack Developer", "Web Designer", "UI/UX Enthusiast", "JavaScript", "PHP", "Node.js", "MySQL", "Still Learning & Growing"]).flat().map((item, i) => (
                <span key={i} className="mx-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
                  <span className="mr-6 text-purple-500/60">✦</span>{item}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <section id="about" className="mx-auto w-full max-w-6xl py-16 sm:py-20">
            <h2 className="mb-8 text-4xl font-black uppercase tracking-tight sm:text-5xl">About Me</h2>

            {/* Row 1: Bio + Photo */}
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg">👋</div>
                <h3 className="mb-4 text-2xl font-black uppercase sm:text-3xl">Hi, I&apos;m Natan.</h3>
                <p className="mb-3 text-sm leading-7 text-zinc-400">
                  Seorang mahasiswa Teknik Informatika yang sedang belajar fullstack development. Saya fokus membangun aplikasi web dari frontend hingga backend dengan teknologi modern.
                </p>
                <p className="mb-6 text-sm leading-7 text-cyan-400/80">
                  Tertarik pada pengembangan produk web secara menyeluruh — dari desain UI hingga implementasi sistem yang nyata dan mudah diakses.
                </p>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-purple-300">
                  ↓ Curriculum Vitae
                </a>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image src="/photo.jpg" alt="Natan" fill className="object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/70 px-4 py-3 backdrop-blur-sm">
                  <div>
                    <p className="text-sm font-semibold text-white">@natan_dev</p>
                    <p className="text-xs text-cyan-400">ONLINE</p>
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black">HIRE ME</button>
                </div>
              </div>
            </div>

            {/* Row 2: Pendidikan + Tech Stack */}
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg">🎓</div>
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold uppercase">2023 – Sekarang</span>
                </div>
                <p className="mb-1 text-xs uppercase tracking-widest text-zinc-500">Universitas Duta Bangsa Surakarta</p>
                <h4 className="mb-4 text-xl font-black uppercase">Teknik Informatika</h4>
                <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">Mata Kuliah:</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {["Web Programming", "Database Systems", "Software Engineering", "OOP", "System Analysis"].map(c => (
                    <span key={c} className="rounded border border-white/10 px-2 py-1 text-xs text-zinc-300">{c}</span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500">Perkiraan lulus <span className="text-white font-bold">2027</span></p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 font-mono text-sm font-bold">&gt;_</div>
                  <h4 className="text-xl font-black uppercase">Tech Stack</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Languages", items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "PHP", "Python"] },
                    { label: "Frameworks & Runtime", items: ["Next.js", "Node.js", "Tailwind CSS"] },
                    { label: "Database & Tools", items: ["MySQL", "Git", "GitHub", "Figma", "VS Code"] },
                  ].map(({ label, items }) => (
                    <div key={label}>
                      <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">{label}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map(item => (
                          <span key={item} className="rounded border border-white/10 px-3 py-1 text-xs text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-300 transition">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: Workflow Philosophy */}
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl">⚙️</div>
                  <h4 className="text-2xl font-black uppercase leading-tight">Workflow<br />Philosophy</h4>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <p className="mb-6 text-base leading-8 text-cyan-400/90">
                    Saya tidak hanya menulis kode — saya merancang sistem. Mulai dari memahami kebutuhan pengguna, menyusun alur fitur, hingga mengimplementasikan solusi yang bersih dan dapat di-maintain. Fokus saya adalah membangun produk yang benar-benar berfungsi dan mudah digunakan.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase text-black">Clean Code</span>
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase text-white">User-Centered Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: My Focus */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-900 to-[#050816] p-8 border border-purple-500/30">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <h4 className="mb-3 text-2xl font-black uppercase text-white">My Focus</h4>
                  <p className="text-sm leading-7 text-zinc-400">
                    Menggabungkan desain UI yang baik dengan implementasi teknis yang solid. Saya fokus membangun solusi web yang efisien, dari database design hingga deployment akhir.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold whitespace-nowrap">🖥️ Full-Stack Dev</span>
                  <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold whitespace-nowrap">🎨 UI/UX Design</span>
                </div>
              </div>
            </div>
          </section>

          {/* Project */}
          <section id="project" className="mx-auto w-full max-w-6xl pb-20 pt-4">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">My Work</p>
                <h2 className="text-4xl font-black uppercase leading-tight sm:text-5xl">Selected<br />Works</h2>
              </div>
              <p className="max-w-xs text-sm text-zinc-400">A showcase of web projects focused on clean code, performance, and real-world use.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  badge: "Full-Stack Web App",
                  title: "Mamamatcha",
                  desc: "Website kedai minuman matcha di Karanganyar dengan landing page, menu, dan backend Node.js + Express + MySQL + JWT authentication.",
                  tags: ["HTML", "CSS", "Node.js", "Express", "MySQL"],
                  number: "01",
                  color: "from-green-500/20 to-cyan-500/10",
                  accent: "text-green-400",
                  border: "hover:border-green-400/40",
                },
                {
                  badge: "Frontend",
                  title: "Portfolio Website",
                  desc: "Personal portfolio website dengan animasi smooth, responsive layout, dark theme, dan contact form terintegrasi EmailJS.",
                  tags: ["Next.js", "Tailwind", "TypeScript"],
                  number: "02",
                  color: "from-purple-500/20 to-cyan-500/10",
                  accent: "text-purple-400",
                  border: "hover:border-purple-400/40",
                },
                {
                  badge: "Full-Stack Web App",
                  title: "Pendaftaran Pasien",
                  desc: "Sistem informasi pendaftaran pasien rumah sakit dengan manajemen data pasien, dokter, poli, dan pendaftaran. Dilengkapi autentikasi login, CRUD lengkap, dan fitur cetak pendaftaran.",
                  tags: ["PHP", "MySQL", "HTML", "CSS"],
                  number: "03",
                  color: "from-blue-500/20 to-cyan-500/10",
                  accent: "text-blue-400",
                  border: "hover:border-blue-400/40",
                },
                {
                  badge: "Publikasi Ilmiah · SENATIB 2024",
                  title: "IoT Soil Monitor",
                  desc: "Rancang bangun alat pemantau suhu, kelembaban udara, dan kelembaban tanah berbasis IoT menggunakan NodeMCU ESP8266 & sensor DHT11. Data dikirim real-time ke aplikasi Blynk untuk pemantauan jarak jauh kondisi tanah dan lingkungan.",
                  tags: ["IoT", "NodeMCU ESP8266", "DHT11", "Blynk", "Automation"],
                  number: "04",
                  color: "from-yellow-500/20 to-orange-500/10",
                  accent: "text-yellow-400",
                  border: "hover:border-yellow-400/40",
                },
              ].map((p, i) => (
                <div key={i} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ${p.border} hover:bg-white/8`}>
                  {/* Number watermark */}
                  <span className="absolute right-4 top-2 text-7xl font-black text-white/5 select-none">{p.number}</span>

                  {/* Top */}
                  <div className="mb-4 flex items-start justify-between">
                    <span className={`rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest ${p.accent}`}>{p.badge}</span>
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.color} border border-white/10`}></div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">{p.title}</h3>

                  {/* Desc */}
                  <p className="mb-5 text-sm leading-6 text-zinc-400">{p.desc}</p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">{t}</span>
                    ))}
                  </div>

                  {/* Bottom line */}
                  <div className={`h-px w-full bg-gradient-to-r ${p.color} opacity-50`}></div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mx-auto w-full max-w-6xl pb-32 pt-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">

              {/* Left */}
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <h2 className="text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
                    LET&apos;S START<br />A PROJECT
                  </h2>
                  <p className="mt-6 text-sm leading-7 text-zinc-400">
                    Interested in working together?{" "}
                    <span className="text-cyan-400">Fill out the form</span> or drop me a{" "}
                    <span className="text-cyan-400">direct email</span>. I&apos;m available for freelance &amp;{" "}
                    <span className="text-cyan-400">full-time roles</span>.
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">Direct Email</p>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 w-fit">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-sm">✉</span>
                    <span className="font-bold text-white">natansetyoa@gmail.com</span>
                    <button
                      onClick={() => navigator.clipboard.writeText("natansetyoa@gmail.com")}
                      className="ml-1 text-zinc-500 hover:text-white transition"
                      title="Copy email"
                    >
                      ⧉
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">Social Presence</p>
                  <div className="flex gap-3">
                    {[
                      { href: "https://www.linkedin.com/in/natan-setyo-agung-6a3763377/", label: "in" },
                      { href: "https://github.com/nathanstya", label: "gh" },
                      { href: "https://www.instagram.com/_nathansty.a?igsh=MWRkNmwxNWt1YWpzYQ%3D%3D&utm_source=qr", label: "ig" },
                    ].map(({ href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold uppercase text-white transition hover:border-cyan-400 hover:text-cyan-300"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-16 lg:px-32">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} <span className="text-white">Natan</span>. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-xs text-zinc-500">
              <span>Based in Surakarta, ID</span>
              <span className="text-cyan-400">Available for Remote Work</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
