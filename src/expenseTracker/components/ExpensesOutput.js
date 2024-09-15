import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Colors } from "../../shared/Colors";

const ExpensesOutput = ({ expenses, expensesperiodName, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length > 0) content = <ExpensesList expenses={expenses} />;
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesperiodName} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: Colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
