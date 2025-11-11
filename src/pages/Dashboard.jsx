import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api/axios";
import { GlobalContext } from "../context/GlobalContext";
import { BarChart2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(GlobalContext);
  const [stats, setStats] = useState([]);
  const [summary, setSummary] = useState({
    totalTasks: 0,
    completed: 0,
    onTime: 0,
    late: 0,
    pending: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/todos/stats`);
        setStats(res.data.stats || []);
        setSummary({
          totalTasks: res.data.totalTasks ?? 0,
          completed: res.data.completed ?? 0,
          onTime: res.data.onTime ?? 0,
          late: res.data.late ?? 0,
          pending: res.data.pending ?? 0,
          accuracy: res.data.accuracy ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, [user]);

  const data = {
    labels: stats.map((s) => s.month),
    datasets: [
      {
        label: "On Time",
        data: stats.map((s) => Number(s.on_time) || 0),
        backgroundColor: "#4caf50",
        borderRadius: 6,
        barThickness: 25,
      },
      {
        label: "Late",
        data: stats.map((s) => Number(s.late) || 0),
        backgroundColor: "#f44336",
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Task Completion Overview",
        font: { size: 18 },
      },
      legend: { position: "bottom" },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg text-light p-4"
        style={{ backgroundColor: "#fe0b0b78" }}
      >
        <div className="d-flex align-items-center mb-4">
          <BarChart2 size={28} className="me-2" />
          <h2>Your Productivity Overview</h2>
        </div>

        {/* Summary Cards */}
        <div className="row text-center mb-4">
          {[
            { label: "Total Tasks", value: summary.totalTasks },
            {
              label: "Completed (On-time / Late)",
              value: `${summary.completed} (${summary.onTime} / ${summary.late})`,
            },
            { label: "Pending", value: summary.pending },
            { label: "Accuracy", value: `${summary.accuracy}%` },
          ].map((card, idx) => (
            <div key={idx} className="col-md-3 mb-3">
              <div className="card  text-light h-100 p-3 shadow-sm" style={{background:"black"}}>
                <h5>{card.label}</h5>
                <p className="fs-4 fw-bold text-info">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="card  text-light p-3" style={{background:"black"}}>
          <div style={{ height: "400px" }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
