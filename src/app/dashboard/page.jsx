"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ month: "all", type: "all" });
  const [insight, setInsight] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/auth/me");
        setUser(userRes.data);

        const txRes = await axios.get("/transactions");
        setTransactions(txRes.data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (transactions.length === 0) return; 
  
    const fetchInsights = async () => {
      try {
        const res = await axios.post("/ai/smart-insights", {
          transactions,
        });
        setInsight(res.data.summary);
      } catch (err) {
        console.error("AI Error:", err.response?.data || err.message);
        setInsight("Unable to load insights.");
      }
    };
  
    fetchInsights();
  }, [transactions]); 
  
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/transactions", data);
      setTransactions([res.data, ...transactions]);
      reset();
    } catch {
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch {
      alert("Failed to delete transaction");
    }
  };

  const filteredTx = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const matchesMonth =
      filters.month === "all" || txDate.getMonth() + 1 === Number(filters.month);
    const matchesType =
      filters.type === "all" || tx.type === filters.type;
    return matchesMonth && matchesType;
  });

  const getSummary = (txs) => {
    let income = 0,
      expense = 0;
    txs.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  };

  const getCategoryData = (txs) => {
    const map = {};
    txs.forEach((tx) => {
      if (tx.type === "expense") {
        map[tx.category] = (map[tx.category] || 0) + tx.amount;
      }
    });
    return Object.entries(map).map(([category, amount]) => ({ category, amount }));
  };

  const summary = getSummary(filteredTx);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white dark:bg-gray-900 dark:text-white transition-colors">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.username} 👋</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: e.target.value })}
        >
          <option value="all">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
          <h3 className="text-sm text-gray-700 dark:text-gray-200">Income</h3>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">₹{summary.income}</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
          <h3 className="text-sm text-gray-700 dark:text-gray-200">Expense</h3>
          <p className="text-xl font-bold text-red-700 dark:text-red-300">₹{summary.expense}</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
          <h3 className="text-sm text-gray-700 dark:text-gray-200">Balance</h3>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">₹{summary.balance}</p>
        </div>
      </div>

      {/* Add Transaction */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div className="flex gap-4">
          <select
            {...register("type", { required: true })}
            className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
            {...register("amount", { required: true, valueAsNumber: true })}
          />
        </div>
        <input
          placeholder="Category"
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          {...register("category", { required: true })}
        />
        <input
          placeholder="Description (optional)"
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          {...register("description")}
        />
        <input
          type="date"
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
          {...register("date", { required: true })}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
          Add Transaction
        </button>
        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 text-sm">Please fill all required fields.</p>
        )}
      </form>

      {/* Transaction List */}
      <h2 className="text-xl font-semibold mb-2">Your Transactions</h2>
      {filteredTx.length === 0 ? (
        <p className="text-gray-500">No matching transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTx.map((tx) => (
            <li
              key={tx._id}
              className="border p-3 rounded flex justify-between items-center dark:border-gray-700"
            >
              <div>
                <p className="font-medium">
                  {tx.category} - ₹{tx.amount}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tx.description || "No description"} |{" "}
                  {new Date(tx.date).toDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(tx._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      
        

      {/* Charts */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded p-4 shadow">
          <h3 className="text-lg font-bold mb-2">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Income", value: summary.income },
                  { name: "Expense", value: summary.expense },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#4ade80" />
                <Cell fill="#f87171" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded p-4 shadow">
          <h3 className="text-lg font-bold mb-2">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getCategoryData(filteredTx)}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Smart AI Insights */}
<h2 className="text-xl font-semibold mt-10 mb-4">🧠 Smart Spending Insight</h2>
<div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-gray-800 dark:text-yellow-100 p-4 rounded shadow whitespace-pre-wrap">
  {insight || "Analyzing your transactions..."}
</div>

    </div>
  );
}
