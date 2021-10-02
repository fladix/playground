/**
 * The creation of multiple App function components makes possible to use a
 * single react application to exercise all the code course. Pretty handy.
 */
import './App.css';
import AppBasics from './components/1_AppBasics';
import AppHooksIntro from './components/2_AppHooks_Intro';
import AppHooksUseState from './components/3_AppHooks_UseState';
import AppHooksEvents from './components/4_AppHooks_Events';
import AppHooksEventsDelegation from './components/5_AppHooks_Event_Delegation';
import AppHooksCustomHook from './components/6_AppHooks_Custom_Hook';
import AppHooksOnChange from './components/7_AppHooks_Event_OnChange';
import AppHooksUseRef from './components/8_AppHooks_useRef';
import AppHooksForwardRef from './components/9_AppHooks_forwardRef';
import AppHooksUseEffect from './components/10_AppHooks_useEffect';
import AppHooksUseMemo from './components/11_AppHooks_useMemo';
import AppHooksUsePrevious from './components/12_AppHooks_usePrevious';

/* React entry point App Function Component (Top level component) */
function App() {
  /* Choose which top level App component to render */
  let theApp = 12;
  switch (theApp) {
    case 1:
      return <AppBasics />;
    case 2:
      return <AppHooksIntro />;
    case 3:
      return <AppHooksUseState />;
    case 4:
      return <AppHooksEvents />;
    case 5:
      return <AppHooksEventsDelegation />;
    case 6:
      return <AppHooksCustomHook />;
    case 7:
      return <AppHooksOnChange />;
    case 8:
      return <AppHooksUseRef />;
    case 9:
      return <AppHooksForwardRef />;
    case 10:
      return <AppHooksUseEffect />;
    case 11:
      return <AppHooksUseMemo />;
    case 12:
      return <AppHooksUsePrevious />;
    default:
      return <h1 className="App-header title">Hello World!</h1>;
  }
}

export default App;
