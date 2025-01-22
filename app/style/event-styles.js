import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  monthYear: {
    color: "#fff",
    textAlign: "center",
    //margin: "auto",
    alignSelf: "center",
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
    backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#1b7248",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 70,
    paddingTop: 10,
  },
  eventsheaderWrap: {
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 3, height: 3 }, // Shadow offset
    shadowOpacity: 0.3, // Lower the opacity for a softer shadow
    shadowRadius: 5, // Shadow blur
    elevation: 5, // Android shadow
    backgroundColor: "#fff", // Ensure a background color for shadow to render properly
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  eventContentWrap: {
    marginTop: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 3, height: 3 }, // Shadow offset
    shadowOpacity: 0.3, // Lower the opacity for a softer shadow
    shadowRadius: 5, // Shadow blur
    elevation: 5, // Android shadow
    backgroundColor: "#fff", // Ensure a background color for shadow to render properly
    paddingVertical: 20,
    paddingTop: 0,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  eventContent: {
    paddingBottom: 0,
    width: "95%",
    alignSelf: "center",
    marginTop: -40,
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
    elevation: 0,
  },
  postWrap: {
    paddingTop: 0,
    backgroundColor: "#fff",
    maxWidth: "90%",
    //margin: "auto",
    alignSelf: "center",
    marginTop: -40,
    borderRadius: 5,
  },
  singlePostWrap: {
    paddingTop: 0,
    backgroundColor: "#0000002b",
    maxWidth: "90%",
    //margin: "auto",
    alignSelf: "center",
    marginTop: -40,
    position: "relative",
    bottom: 40,
    borderRadius: 5,
  },
  eventsWrap: {
    backgroundColor: "#0000002b",
    maxWidth: "90%",
    //margin: "auto",
    alignSelf: "center",
    marginTop: -40,
    borderRadius: 5,
  },
  eventsItem: {
    marginBottom: 10,
    backgroundColor: "#ffffff",

    paddingTop: 0,
    borderRadius: 8,
    fontFamily: "RobotoRegular",
    elevation: 1,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 3, height: 3 }, // Shadow offset
    shadowOpacity: 0.3, // Lower the opacity for a softer shadow
    shadowRadius: 5, // Shadow blur
    elevation: 5, // Android shadow
    borderRadius: 8,
    fontFamily: "RobotoRegular",
  },
  singlePostContent: {
    backgroundColor: "#fff",

    textAlign: "left",
  },
  singlePostTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#000",
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
  },
  postImage: {
    width: "100%",
    height: "200",
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 18,
    color: "#333333",
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#333333",
    marginTop: 10,
  },
  boxText: {
    fontFamily: "RobotoRegular",
    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1,
  },
});

export default styles;
