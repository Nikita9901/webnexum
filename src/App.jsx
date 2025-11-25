import WebNexumLanding from "./landing.jsx";
import { Analytics } from "@vercel/analytics/next"

function App() {

  return (
    <>
        <Analytics />
      <WebNexumLanding/>
    </>
  )
}

export default App
