import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#1b7248",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 70,
    paddingTop: 10,
    shadowColor: "transparent", // No shadow color
    shadowOffset: { width: 0, height: 0 }, // No shadow offset
    shadowOpacity: 0, // No shadow opacity
    shadowRadius: 0, // No shadow radius
    elevation: 0, // Disable elevation
  },
  youtubewrapIN: {
    width: 305,
    padding: 10,
    //margin: "auto",
    alignSelf: "center",
  },
  title: {
    fontFamily: "RobotoRegular",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    padding: 10,
    marginBottom: 3,
    marginTop: 15,
    fontSize: 26,
    borderRadius: 5,
    elevation: 0,
  },
  subtitle: {
    color: "#fff",
    fontFamily: "RobotoRegular",
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },

  youbutetitle: {
    textAlign: "center",
    color: "#000",
    marginTop: 5,
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.15,
    marginBottom: 20,
  },
  youtubeIcon: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
  },
  youtubeText: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#fff",
  },
  youtubeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f50602",
    padding: 10,
    borderRadius: 2,
  },
  youtubewrap: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "95%",
    margin: "auto",
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    marginTop: -50,
  },
});
export default styles;
