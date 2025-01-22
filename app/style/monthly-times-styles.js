import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonWrap: {
    paddingBottom: 85,
    backgroundColor: "#1b7248",
    width: "100%",
  },
  todayButtonText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 18,
  },
  timesWrap: {
    width: "100%",

    backgroundColor: "#fff",
    marginTop: 15,
    maxWidth: "90%",
    borderRadius: 15,

    paddingBottom: 0,
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    marginBottom: 20,
    // iOS shadow properties
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow is evenly distributed
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 10, // Increases shadow spread
    // Android shadow properties
    elevation: 10, // Adds uniform shadow on Android
  },
  mtButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  dateAndEvent: {
    textAlign: "center",
    paddingRight: 40,
    width: "50%",
  },
  dateAndEventText: {
    color: "#fff",
    fontSize: 15,
  },
  callendar: {
    width: "95%",
    marginTop: -55,
  },

  sectionHeaderWrap: {
    paddingBottom: 60,
    paddingTop: 20,
    backgroundColor: "#1b7248",
    width: "100%",
  },
  sectionSubHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: "#f5f3f4",
    padding: 20,
    width: "100%",
  },
  sectionSubHeaderWrap: {
    padding: 0,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000", // Boja senke
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 5,
    marginVertical: 40,
    paddingBottom: 55,
  },
  monthYear: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    //margin: "auto",
    alignSelf: "center",
    backgroundColor: "#eeeeee",
    width: "100%",
  },
  arrowText: {
    color: "#fff",
    fontSize: 33,
    margin: 10,
  },
  todayButtonPressable: {
    backgroundColor: "#1b7248",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  todayButton: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#07693a",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    borderRadius: 5,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  sectionContent: {
    paddingBottom: 85,
    backgroundColor: "#1b7248",
    width: "100%",
  },
  sectionHeader: {
    backgroundColor: "#1b7248",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
  title: {
    fontFamily: "RobotoRegular",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    paddingTop: 2,
    marginBottom: 0,
    marginTop: 15,
    fontSize: 22,
    borderRadius: 5,
    elevation: 0,
    fontWeight: 600,
  },
});

export default styles;
