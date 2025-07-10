import Link from "next/link";

export default function Home() {
  return (
    <main className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
      {/* — Hero — */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557426274-62a5bea4353e?auto=format&fit=crop&w=1470&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-xl px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Empower Your Finances, Simplify Your Life
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            FinanceFlow helps you track expenses, visualize spending, and plan for the future.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-transparent border border-white hover:bg-white hover:text-gray-900 rounded transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* — Features — */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
          {[
            {
              title: "🧾 Expense Tracking",
              desc: "Log your expenses quickly and categorize them for better insights.",
            },
            {
              title: "📊 Insights & Charts",
              desc: "Visualize your spending trends and cash flow with powerful charts.",
            },
            {
              title: "🔐 Secure Auth",
              desc: "Secure login, protected data, and reliable backend built with next-gen tech.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* — Testimonials — */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah",
                text: "FinanceFlow helped me save more than ₹50K this year — the charts give great clarity!",
              },
              {
                name: "Raj",
                text: "I love the monthly filters and clean dashboard — makes budget planning easy.",
              },
            ].map((t, i) => (
              <blockquote
                key={i}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow"
              >
                <p className="italic mb-4">"{t.text}"</p>
                <footer className="font-semibold">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* — Footer — */}
      <footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} FinanceFlow. All rights reserved.</p>
        <p>
          Built with ❤️ •{" "}
          <a href="#" className="underline hover:text-blue-600">
            Terms
          </a>{" "}
          •{" "}
          <a href="#" className="underline hover:text-blue-600">
            Privacy
          </a>
        </p>
      </footer>
    </main>
  );
}
