import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: "#fff", // Border color
    borderRadius: 50, // Makes the border circular
    paddingHorizontal: 7, // Space between the icon and the border
    alignItems: "center", // Centers the icon horizontally
    justifyContent: "center", // Centers the icon vertically
  },
  icon: {
    color: "#fff", // Icon color
  },
  mtButtonWrap: {
    width: "100%",
  },
  monthYear: {
    color: "#000",
    textAlign: "center",
    fontWeight: "800",
    alignSelf: "center",
    lineHeight: 15,
    fontSize: 12,
    marginTop: 0,
    alignSelf: "flex-start", // Aligns the Text to the top of its parent
  },
  arrowButton: {
    color: "#000",
    backgroundColor: "#1b7248",
    padding: 10,
    borderRadius: 5,
  },
  mtButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  testSection: {
    backgroundColor: "#f5f3f4",
    width: "96%",
    padding: 30,
    alignSelf: "center",
    marginTop: -23,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrowText: {
    color: "#fff",
    fontSize: 23,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 100,
    width: 30,
    alignSelf: "center",
    textAlign: "center",
    height: 30,
    lineHeight: 23,
    fontWeight: "200",
  },
  todayButton: {
    padding: 10,
    backgroundColor: "#001d3d",
    borderRadius: 5,
  },
  mpTimes: {
    padding: 15,
    backgroundColor: "#be6b03",
    borderRadius: 5,

    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 90,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  news: {
    backgroundColor: "#fff",
  },
  sectionSubheader: {},
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
    padding: 20,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 20,
    borderRadius: 5,
    elevation: 0,
  },
  postWrap: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: "#fff",
    maxWidth: "90%",
    alignSelf: "center",
    marginTop: -40,
    borderRadius: 5,
  },
  singlePostWrap: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: "#0000002b",
    maxWidth: "90%",
    alignSelf: "center",
    marginTop: -40,
    borderRadius: 5,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 0,
    borderRadius: 8,
    fontFamily: "RobotoRegular",
    elevation: 0,
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
    borderRadius: 5,
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
    fontWeight: "900",
    fontSize: 11,
    lineHeight: 11,
  },
});

export default styles;
