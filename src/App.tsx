import "./App.css";
import XSSVulnerableComponent from "./components/XXSVulnerableComponent";
import CommandInjectionVulnerableComponent from "./components/CommandInjectionVulnerableComponent";
import InsecureDeserializationComponent from "./components/InsecureDeserializationComponent";
import SQLInjectionVulnerableComponent from "./components/SQLInjectionVulnerableComponent";
import HardCodedCredentialComponent from "./components/HardCodedCredentialComponent";

function App() {
  return (
    <>
      <CommandInjectionVulnerableComponent />
      <HardCodedCredentialComponent />
      <InsecureDeserializationComponent />
      <SQLInjectionVulnerableComponent />
      <XSSVulnerableComponent />
    </>
  );
}

export default App;
