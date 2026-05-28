// Data static untuk website cinematic PAUD Ceria

export interface CoreValue {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "diklat" | "webinar";
  badge: string;
  benefits: string[];
}

export interface Partner {
  id: string;
  name: string;
  type: "Universitas" | "Kementerian" | "Asosiasi";
  location: string;
}

export interface Expert {
  id: string;
  name: string;
  role: "Praktisi" | "Akademisi" | "Pakar";
  affiliation: string;
  description: string;
  metrics: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  rating: number;
}

export const CORE_VALUES: CoreValue[] = [
  {
    id: "v1",
    title: "Diklat Interaktif Bermain Praktis",
    subtitle: "Peningkatan Kompetensi Pedagogik Profesional",
    description: "Pendekatan berbasis stimulasi sensorik dan motorik halus untuk anak usia dini dengan media di sekitar kelas.",
    category: "diklat",
    badge: "Kelas Unggulan",
    benefits: ["Metodologi bermain serba guna", "E-Certificate 32 JP", "Pendampingan langsung Fasilitator"]
  },
  {
    id: "v2",
    title: "Kurikulum Merdeka PAUD Kreatif",
    subtitle: "Merancang Pembelajaran Fleksibel & Bermakna",
    description: "Pelatihan penyusunan modul project profil pelajar pancasila (P5) yang adaptif dan inklusif.",
    category: "diklat",
    badge: "Sertifikasi",
    benefits: ["Template Modul Siap Pakai", "Coaching Clinic 1-on-1", "Akses Komunitas Guru Kreatif"]
  },
  {
    id: "v3",
    title: "Asesmen Otentik Tumbuh Kembang",
    subtitle: "Mendokumentasikan Perkembangan Anak Secara Realistis",
    description: "Webinar teknis menyusun ceklis perkembangan, catatan anekdot, dan portofolio anak tanpa membebani guru.",
    category: "webinar",
    badge: "Webinar Nasional",
    benefits: ["Sesi live tanya jawab pakar", "Bahan ajar & video rekaman", "Contoh format instrumen lengkap"]
  },
  {
    id: "v4",
    title: "Komunikasi Empati & Manajemen Kelas",
    subtitle: "Menghadapi Tantangan Perilaku Anak dengan Cinta",
    description: "Tips praktis menyikapi tantangan emosional anak usia dini (temper tantrum) berbasis ilmu neurosains.",
    category: "webinar",
    badge: "Webinar Premium",
    benefits: ["Panduan saku resolusi konflik kelas", "Sesi simulasi roleplay terpadu", "Akses jejaring guru se-Indonesia"]
  }
];

export const PARTNERS: Partner[] = [
  { id: "p1", name: "Kementerian Pendidikan dan Kebudayaan", type: "Kementerian", location: "Jakarta" },
  { id: "p2", name: "Universitas Negeri Jakarta (UNJ)", type: "Universitas", location: "Jakarta" },
  { id: "p3", name: "Universitas Pendidikan Indonesia (UPI)", type: "Universitas", location: "Bandung" },
  { id: "p4", name: "Asosiasi Guru PAUD Indonesia (APGUDI)", type: "Asosiasi", location: "Nasional" },
  { id: "p5", name: "Universitas Negeri Semarang (UNNES)", type: "Universitas", location: "Semarang" },
  { id: "p6", name: "Yayasan Cendekia Nusantara", type: "Asosiasi", location: "Yogyakarta" },
];

export const EXPERTS: Expert[] = [
  {
    id: "e1",
    name: "Dr. Farida Mayar, M.Pd.",
    role: "Akademisi",
    affiliation: "Dosen Senior PAUD & Peneliti Seni Musik Anak",
    description: "Berpengalaman lebih dari 20 tahun meneliti metode bermain kreatif dan neurosains pada tumbuh kembang anak.",
    metrics: "50+ Jurnal Internasional"
  },
  {
    id: "e2",
    name: "Bunda Anna Lestari, S.Psi., M.Psi.",
    role: "Pakar",
    affiliation: "Psikolog Perkembangan & Praktisi Terapi Bermain",
    description: "Pendiri pusat konsultasi keluarga, ahli dalam merancang program stimulasi emosional dan penanganan tantrum anak.",
    metrics: "15k+ Konsultasi Sukses"
  },
  {
    id: "e3",
    name: "Kak Setia Adi, S.Pd.",
    role: "Praktisi",
    affiliation: "Fasilitator Diklat Nasional & Kreator Media PAUD",
    description: "Dikenal dengan ribuan ice-breaking kreatif dan metode dongeng edukatif yang menyulut keceriaan ruang kelas.",
    metrics: "200+ Diklat Nasional"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Ibu Hartati, S.Pd.",
    role: "Guru Kelas Utama",
    institution: "TK Bintang Kecil, Malang",
    quote: "Diklat merancang media main edukatif dari PAUD Ceria sangat aplikatif. Saya bisa langsung menerapkannya di kelas esok harinya dengan barang bekas. Anak-anak sangat antusias!",
    rating: 5
  },
  {
    id: "t2",
    author: "Bapak Rian Hidayat, S.Sos.",
    role: "Kepala Sekolah",
    institution: "PAUD Mentari Pagi, Gowa",
    quote: "Materi asupan neurosains menyadarkan kami pentingnya stimulasi yang tepat sasaran. Terobosan luar biasa untuk guru-guru PAUD di daerah kami yang mendambakan ilmu premium.",
    rating: 5
  },
  {
    id: "t3",
    author: "Siti Rahma, S.Pd.Aud.",
    role: "Pendidik PAUD Non-Formal",
    institution: "KB Lavender, Banjarmasin",
    quote: "Format asesmen otentik PAUD Ceria memangkas administrasi saya hingga 50%! Akhirnya waktu saya bisa benar-benar dicurahkan untuk berinteraksi manis bersama si kecil.",
    rating: 5
  }
];
