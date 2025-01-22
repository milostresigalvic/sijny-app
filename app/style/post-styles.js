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
  sectionHeader: {
    backgroundColor: "#c09400",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "RobotoRegular",
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
  singlePostWrap: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 0,
  },
  singlePostTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  singlePostDate: {
    fontSize: 12,
    color: "#989898",
    fontWeight: 200,
  },
  singlePostTitleDateWrap: {
    fontSize: 25,
    fontWeight: 500,
    color: "#000",
    marginBottom: 10,
    backgroundColor: "#fff",
    marginTop: -50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    // Android elevation property
    elevation: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 5,
  },
  singlePostContentDateWrap: {
    fontSize: 25,
    fontWeight: 500,
    color: "#000",
    marginBottom: 10,
    backgroundColor: "#fff",
    marginTop: -50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    // Android elevation property
    elevation: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginTop: 2,
  },
  singlePostContent: {
    backgroundColor: "#fff",
    padding: 10,
    textAlign: "left",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    // Android elevation property
    elevation: 10,
    padding: 20,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default styles;
