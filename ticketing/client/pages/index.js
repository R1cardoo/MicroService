import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("LAnding Page");
  // console.log(context); // 这里有header.host 和 cookie
  const client = buildClient(context);
  const response = await client.get("/api/users/currentuser");
  return response.data;
};

export default LandingPage;
