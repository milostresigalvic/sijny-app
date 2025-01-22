import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  news: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#c09400",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 55,
    paddingTop: 30,
  },
  title: {
    fontFamily: "RobotoRegular",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  postWrap: {
    paddingHorizontal: 4,
    paddingVertical: 20,
    width: "90%",
    //margin: "auto",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: -50,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 8,
  },
  postBoxText: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    color: "#333",
    fontWeight: 600,
    textAlign: "left",
  },
  postTitle: {
    fontSize: 17,
    fontWeight: 900,
    color: "#000",
  },
  postDate: {
    fontSize: 10,
    color: "#999999",
    marginTop: 10,
  },
});

export default styles;
