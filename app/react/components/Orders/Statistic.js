import React, { useEffect, useState } from "react";

const Statistic = ({ user, onClose }) => {
  const [statistic, setStatistic] = useState([]);

  useEffect(() => {
    let orders = user.orders.reverse().reduce((prev, curr) => {
      let prevIndexByDate = prev.findIndex((prevItem) =>
        prevItem.find(
          (prevItemValue) =>
            new Date(prevItemValue.created_at).getFullYear() ===
              new Date(curr.created_at).getFullYear() &&
            new Date(prevItemValue.created_at).getMonth() ===
              new Date(curr.created_at).getMonth()
        )
      );

      const { created_at, products } = curr;
      let orderPrice = products.reduce(
        (prevOrderPrice, currOrderProduct) =>
          prevOrderPrice +
          currOrderProduct.count * currOrderProduct.product_data.price,
        0
      );

      if (prevIndexByDate !== -1) {
        let newData = [...prev];
        newData[prevIndexByDate].push({ created_at, orderPrice });
        return [...newData];
      }
      return [...prev, [{ created_at, orderPrice }]];
    }, []);

    setStatistic(
      orders.reduce((prev, curr) => {
        const monthIncome = curr.reduce(
          (prevIncome, currIncome) => prevIncome + currIncome.orderPrice,
          0
        );
        return [
          ...prev,
          {
            timestamp: curr[0].created_at,
            monthIncome,
            ordersAmount: curr.length,
          },
        ];
      }, [])
    );
  }, [user]);

  return (
    <div id="order_wrap" className="order_wrap">
      <div className="order">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <h2>Statistic</h2>
        <table>
          <thead>
            <tr>
              <td>Месяц</td>
              <td>Количество заказов</td>
              <td>Общая прибыль</td>
            </tr>
          </thead>
          <tbody>
            {statistic.map(({ timestamp, monthIncome, ordersAmount }) => (
              <tr>
                <td>{`${new Date(timestamp).getMonth() + 1}.${new Date(
                  timestamp
                ).getFullYear()}`}</td>
                <td>{ordersAmount}</td>
                <td>{monthIncome} грн.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistic;
