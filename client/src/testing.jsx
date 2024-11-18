export default function EnvTest() {
  console.log("Domain:", import.meta.env.VITE_AUTH_DOMAIN);
  console.log("Client ID:", import.meta.env.VITE_AUTH_CLIENT_ID);
  return <div>Check the console for environment variables.</div>;
}
