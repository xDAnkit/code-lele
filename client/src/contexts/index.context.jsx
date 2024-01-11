import { LanguageProvider } from "./languages.context";

// Create a function to dynamically compose context providers
const composeProviders = (providers, children) => {
  return providers.reduceRight((child, ContextProvider) => {
    return <ContextProvider>{child}</ContextProvider>;
  }, children);
};

// Export the composed provider
const MainContextProvider = ({ children }) => {
  const providerList = [LanguageProvider];
  return composeProviders(providerList, children);
};

export default MainContextProvider;
