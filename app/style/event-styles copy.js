import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  monthYear: {
    color: "#fff",
    textAlign: "center",
    margin: "auto",
  },
  todayButton: {
    backgroundColor: "#1e7248",
    padding: 10,
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  news: {
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#1b7248",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: "30px",
    paddingTop: "10px",
  },
  title: {
    fontFamily: "RobotoRegular",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 24,
    borderRadius: 5,
    elevation: 2,
  },
  postWrap: {
    padding: "20px",
    paddingTop: 0,
    backgroundColor: "#fff",
    maxWidth: "90%",
    margin: "auto",
    marginTop: "-40px",
    borderRadius: "5px",
  },
  singlePostWrap: {
    padding: "10px",
    paddingTop: 0,
    backgroundColor: "#0000002b",
    maxWidth: "90%",
    margin: "auto",
    marginTop: "-40px",
    borderRadius: "5px",
  },
  eventsWrap: {
    padding: "5px",
    backgroundColor: "#0000002b",
    maxWidth: "90%",
    margin: "auto",
    marginTop: "-40px",
    borderRadius: "5px",
  },
  eventsItem: {
    marginBottom: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    paddingTop: 0,
    borderRadius: 8,
    fontFamily: "RobotoRegular",
    elevation: 1,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 0,
    borderRadius: 8,
    fontFamily: "RobotoRegular",
    elevation: 1,
  },
  singlePostContent: {
    backgroundColor: "#fff",
    padding: 20,
    textAlign: "left",
  },
  singlePostTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: "5px",
    padding: 10,
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  postDate: {
    fontSize: 12,
    color: "#999999",
    marginTop: 10,
  },
  boxText: {
    fontFamily: "RobotoRegular",
    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "1em",
  },
});

export default styles;
