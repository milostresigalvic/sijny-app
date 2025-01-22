import { StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  sahifaimage: {
    width: 26,
    height: 26,
    marginTop: 0,
  },

  logoWrap: {
    borderBottomWidth: 2,
    width: "100%",
    borderColor: "#001d3d",
    paddingTop: 0,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  logo: {
    width: wp("100%"),
    height: hp("7%"),
    alignSelf: "center",
    marginBottom: 18,
    padding: 0,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  boxSectionWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  boxSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    width: "90%",
  },
  box: {
    width: "23%", // Slightly less than 25% to account for margins
    backgroundColor: "#bf9300",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Add some bottom margin for spacing between rows
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15,
    // iOS shadow properties
    shadowColor: "#bababa",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    // Android shadow properties
    elevation: 5,
  },
  boxContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontFamily: "RobotoRegular",
    marginTop: 0,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: 9,
    lineHeight: 9,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  postDate: {
    fontSize: 13,
    color: "#999999",
    marginTop: 2,
  },
  stepContainer: {
    marginBottom: 8,
  },
  reactLogo: {
    height: 79,
    width: 130,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    backgroundColor: "#fff",
    borderBottomColor: "#278c27",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
  },
  eventswrap: {
    paddingBottom: 0,
    paddingTop: 3,
    paddingVertical: 1,
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    paddingBottom: 25,
    paddingLeft: 1,
    paddingRight: 1,
    marginTop: 0,
    marginBottom: 40,
    // iOS shadow properties
    shadowColor: "#aeaeae", // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow is evenly distributed
    shadowOpacity: 0.9, // Shadow opacity
    shadowRadius: 20, // Increases shadow spread
    // Android shadow properties
    elevation: 20, // Adds uniform shadow on Android
  },
  news: {
    paddingBottom: 0,
    paddingTop: 3,
    paddingVertical: 1,
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    marginBottom: 15,
    paddingLeft: 1,
    paddingRight: 1,
    marginTop: 10,
    // iOS shadow properties
    shadowColor: "#aeaeae", // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow is evenly distributed
    shadowOpacity: 0.9, // Shadow opacity
    shadowRadius: 20, // Increases shadow spread
    // Android shadow properties
    elevation: 20, // Adds uniform shadow on Android
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#0000ff",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bannerWrap: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  banner: {
    width: "95%",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollContainer: {
    marginBottom: 60,
  },
  title: {
    backgroundColor: "#333333",
    fontFamily: "RobotoBold",
    lineHeight: 18,
    width: "100%",
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 17,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 17,
    borderRadius: 5,
    elevation: 0,
    fontWeight: 400,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  newsText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 24,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 0,
    borderRadius: 8,
    fontFamily: "RobotoRegular",
    elevation: 0,
    textAlign: "left",
    paddingLeft: 15,
    paddingRight: 15,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#333",
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#333",
    paddingLeft: 15,
    marginTop: 20,
  },
  noevents: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 18,
  },
  eventDate: {
    fontSize: 13,
    color: "#999999",
    marginTop: 2,
    paddingLeft: 15,
  },
  postDescription: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  icon: {
    marginTop: 0,
    height: 51,
  },
  iconText: {
    fontSize: 16,
    fontFamily: "RobotoBold",
    color: "#fff",
    fontWeight: 900,
  },
});
