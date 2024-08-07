"use client";
import React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  dashboardBox: {
    width: "800px",
    padding: "40px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#1890ff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  searchField: {
    width: "70%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  sortField: {
    width: "25%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  leadTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  leadTableHead: {
    backgroundColor: "#1890ff",
    color: "#fff",
  },
  leadTableBody: {
    textAlign: "left",
    color: "#000", // Black text
  },
  leadTableCell: {
    padding: "12px 15px",
    border: "1px solid #ddd",
  },
};

const DashboardPage: React.FC = () => {
  const data = [
    {
      name: "Lead 1",
      email: "lead1@example.com",
      contact: "1234567890",
      product: "Product A",
      createdOn: "2024-08-07",
    },
    {
      name: "Lead 2",
      email: "lead2@example.com",
      contact: "0987654321",
      product: "Product B",
      createdOn: "2024-08-06",
    },
    {
      name: "Lead 3",
      email: "lead3@example.com",
      contact: "1231231231",
      product: "Product C",
      createdOn: "2024-08-05",
    },
    {
      name: "Lead 4",
      email: "lead4@example.com",
      contact: "3213213210",
      product: "Product D",
      createdOn: "2024-08-04",
    },
    {
      name: "Lead 5",
      email: "lead5@example.com",
      contact: "5556667777",
      product: "Product E",
      createdOn: "2024-08-03",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.dashboardBox}>
        <h2 style={styles.title}>Lead Management Dashboard</h2>
        <div style={styles.actions}>
          <button style={styles.button}>Create Lead</button>
          <button style={styles.button}>Update Lead</button>
          <button style={styles.button}>Delete Lead</button>
        </div>
        <div style={styles.filters}>
          <input
            type="text"
            style={styles.searchField}
            placeholder="Search leads..."
          />
          <select style={styles.sortField}>
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
        </div>
        <table style={styles.leadTable}>
          <thead style={styles.leadTableHead}>
            <tr>
              <th style={styles.leadTableCell}>Name</th>
              <th style={styles.leadTableCell}>Email</th>
              <th style={styles.leadTableCell}>Contact</th>
              <th style={styles.leadTableCell}>Product</th>
              <th style={styles.leadTableCell}>Created On</th>
            </tr>
          </thead>
          <tbody style={styles.leadTableBody}>
            {data.map((lead, index) => (
              <tr key={index}>
                <td style={styles.leadTableCell}>{lead.name}</td>
                <td style={styles.leadTableCell}>{lead.email}</td>
                <td style={styles.leadTableCell}>{lead.contact}</td>
                <td style={styles.leadTableCell}>{lead.product}</td>
                <td style={styles.leadTableCell}>{lead.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
