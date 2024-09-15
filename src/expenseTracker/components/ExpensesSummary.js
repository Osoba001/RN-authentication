import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../shared/Colors";

const ExpensesSummary = ({ expenses, periodName }) => {
  const expesesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expesesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    background: Colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: Colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
