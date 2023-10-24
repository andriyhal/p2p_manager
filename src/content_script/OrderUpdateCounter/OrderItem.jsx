import React from "react";

const styles = {
  container: {
    margin: "10px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
  },
  asset: {
    margin: "0 0 5px",
    color: "dodgerblue",
  },
  price: {
    margin: "0 0 5px",
    color: "darkorange",
  },
  countUpdatePositive: {
    margin: "0",
    color: "green",
  },
  countUpdateNegative: {
    margin: "0",
    color: "red",
  },
};

export const OrderItem = ({ order, countUpdate }) => (
  <div style={styles.container}>
    <p style={styles.asset}>Asset: {order.pair.asset}</p>
    <p style={styles.price}>Limit Price: {order.percentLimit}</p>
    <p
      style={
        countUpdate > 0
          ? styles.countUpdatePositive
          : styles.countUpdateNegative
      }
    >
      Count Update: {countUpdate || 0}
    </p>
  </div>
);
