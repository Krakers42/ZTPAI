import React from "react";
import DashboardLayout from "./PageLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 style={styles.header}>DASHBOARD</h1>

      <section style={styles.section}>
        <div style={styles.card}>
          <h3>Longest ride:</h3>
          <p>120 km</p>
        </div>

        <div style={styles.card}>
          <h3>Trips:</h3>
          <p>25</p>
        </div>

        <div style={styles.card}>
          <h3>Distance:</h3>
          <p>540 km</p>
        </div>

        <div style={styles.card}>
          <h3>Photos:</h3>
          <p>18</p>
        </div>

        <div style={styles.card}>
          <h3>Biggest elevation:</h3>
          <p>230 m</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

const styles = {
  header: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    fontSize: "36px",
  },
  section: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    justifyItems: "center",
    paddingBottom: "10px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "20px",
    textAlign: "center",
    width: "300px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;