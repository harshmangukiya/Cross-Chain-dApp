import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import ETHERC20Balance from "components/ETHERC20Balance";
import MaticERC20Balance from "components/MaticERC20Balance";
import BSCERC20Balance from "components/BSCERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import InchDex from "components/InchDex";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <InchDex chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <InchDex chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <InchDex chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <ETHERC20Balance chain="0x5"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <MaticERC20Balance chain="0x13881"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <BSCERC20Balance chain="0x61"/>
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20transfers">
            <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <ERC20Transfers chain="0x5"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <ERC20Transfers chain="0x13881"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <ERC20Transfers chain="0x61"/>
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/">
              <Redirect to="/wallet" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          Made with ❤️
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/harshmangukiya"
          >
            Harsh
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <svg width="60" height="38" viewBox="0 0 375 375" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path xmlns="http://www.w3.org/2000/svg" fill="#332C54" d="M 114.695312 251.242188 L 103.242188 295.207031 C 102.503906 298.039062 101.652344 300.835938 100.683594 303.597656 C 99.71875 306.359375 98.636719 309.078125 97.445312 311.75 C 96.257812 314.421875 94.957031 317.042969 93.550781 319.609375 C 92.144531 322.175781 90.632812 324.679688 89.019531 327.121094 C 87.40625 329.5625 85.699219 331.933594 83.890625 334.234375 C 82.082031 336.535156 80.179688 338.757812 78.191406 340.902344 C 76.199219 343.046875 74.125 345.105469 71.960938 347.082031 C 69.800781 349.054688 67.5625 350.9375 65.246094 352.726562 C 62.933594 354.515625 60.546875 356.207031 58.09375 357.800781 C 55.636719 359.394531 53.121094 360.882812 50.542969 362.269531 C 47.964844 363.65625 45.335938 364.933594 42.652344 366.105469 C 39.96875 367.273438 37.242188 368.332031 34.472656 369.277344 C 31.703125 370.222656 28.898438 371.054688 26.0625 371.769531 C 23.222656 372.484375 20.359375 373.082031 17.472656 373.558594 C 14.585938 374.039062 11.683594 374.398438 8.765625 374.640625 C 5.847656 374.878906 2.925781 375 0 375 L 44.636719 203.628906 C 47.265625 208.683594 50.34375 213.449219 53.871094 217.921875 C 55.703125 220.265625 57.648438 222.511719 59.707031 224.65625 C 61.765625 226.800781 63.925781 228.835938 66.191406 230.761719 C 68.457031 232.6875 70.816406 234.492188 73.265625 236.179688 C 75.714844 237.867188 78.242188 239.421875 80.851562 240.851562 C 83.457031 242.28125 86.128906 243.574219 88.871094 244.730469 C 91.609375 245.886719 94.398438 246.898438 97.242188 247.773438 C 100.085938 248.644531 102.964844 249.371094 105.878906 249.953125 C 108.796875 250.53125 111.734375 250.960938 114.695312 251.242188 Z M 271.75 79.808594 L 260.304688 123.75 C 263.273438 124.027344 266.21875 124.453125 269.140625 125.027344 C 272.0625 125.605469 274.949219 126.328125 277.800781 127.195312 C 280.648438 128.066406 283.449219 129.082031 286.195312 130.234375 C 288.941406 131.390625 291.621094 132.683594 294.238281 134.113281 C 296.851562 135.539062 299.386719 137.097656 301.84375 138.785156 C 304.300781 140.472656 306.664062 142.28125 308.933594 144.207031 C 311.207031 146.136719 313.375 148.175781 315.4375 150.324219 C 317.503906 152.472656 319.453125 154.722656 321.289062 157.070312 C 324.769531 161.480469 327.8125 166.175781 330.421875 171.152344 L 375 0 C 372.074219 0 369.152344 0.121094 366.234375 0.363281 C 363.316406 0.601562 360.414062 0.960938 357.527344 1.441406 C 354.640625 1.921875 351.777344 2.519531 348.941406 3.234375 C 346.101562 3.949219 343.296875 4.777344 340.527344 5.726562 C 337.757812 6.671875 335.03125 7.730469 332.347656 8.898438 C 329.664062 10.070312 327.035156 11.347656 324.457031 12.734375 C 321.878906 14.121094 319.363281 15.609375 316.910156 17.203125 C 314.453125 18.796875 312.070312 20.488281 309.753906 22.28125 C 307.4375 24.070312 305.199219 25.953125 303.039062 27.925781 C 300.878906 29.898438 298.800781 31.960938 296.808594 34.105469 C 294.820312 36.25 292.917969 38.472656 291.109375 40.773438 C 289.300781 43.074219 287.589844 45.449219 285.976562 47.890625 C 284.363281 50.332031 282.855469 52.835938 281.445312 55.402344 C 280.039062 57.96875 278.742188 60.589844 277.550781 63.261719 C 276.355469 65.933594 275.277344 68.652344 274.308594 71.414062 C 273.339844 74.175781 272.488281 76.972656 271.75 79.808594 Z M 254.40625 146.324219 C 253.640625 146.289062 252.863281 146.273438 252.089844 146.273438 L 142.046875 146.273438 L 148 123.367188 L 180.144531 0 C 177.214844 0 174.292969 0.121094 171.378906 0.359375 C 168.460938 0.601562 165.558594 0.960938 162.671875 1.441406 C 159.78125 1.917969 156.917969 2.515625 154.082031 3.230469 C 151.242188 3.945312 148.4375 4.777344 145.667969 5.722656 C 142.898438 6.667969 140.171875 7.726562 137.488281 8.894531 C 134.804688 10.066406 132.175781 11.34375 129.597656 12.730469 C 127.019531 14.117188 124.503906 15.605469 122.046875 17.199219 C 119.59375 18.792969 117.207031 20.484375 114.890625 22.277344 C 112.574219 24.066406 110.335938 25.949219 108.175781 27.921875 C 106.015625 29.898438 103.9375 31.957031 101.945312 34.101562 C 99.957031 36.246094 98.054688 38.46875 96.246094 40.769531 C 94.4375 43.074219 92.726562 45.445312 91.113281 47.886719 C 89.5 50.328125 87.992188 52.832031 86.582031 55.398438 C 85.175781 57.96875 83.875 60.585938 82.683594 63.261719 C 81.492188 65.933594 80.414062 68.652344 79.445312 71.414062 C 78.476562 74.175781 77.625 76.972656 76.886719 79.808594 L 65.542969 123.367188 L 59.574219 146.273438 L 59.328125 146.273438 C 58.972656 147.753906 58.671875 149.238281 58.425781 150.703125 C 51.617188 190.238281 80.824219 227.195312 120.570312 228.691406 C 121.394531 228.691406 122.21875 228.734375 123.054688 228.734375 L 232.96875 228.734375 L 227 251.640625 L 194.863281 375 C 197.789062 375 200.710938 374.878906 203.628906 374.636719 C 206.546875 374.398438 209.445312 374.035156 212.332031 373.558594 C 215.222656 373.078125 218.082031 372.480469 220.921875 371.765625 C 223.757812 371.050781 226.5625 370.21875 229.332031 369.273438 C 232.101562 368.328125 234.828125 367.269531 237.511719 366.101562 C 240.191406 364.929688 242.824219 363.652344 245.398438 362.265625 C 247.976562 360.878906 250.492188 359.390625 252.949219 357.796875 C 255.402344 356.203125 257.789062 354.511719 260.105469 352.722656 C 262.421875 350.933594 264.65625 349.050781 266.820312 347.078125 C 268.980469 345.105469 271.054688 343.046875 273.046875 340.902344 C 275.039062 338.757812 276.9375 336.535156 278.746094 334.230469 C 280.554688 331.929688 282.265625 329.558594 283.878906 327.117188 C 285.492188 324.675781 287.003906 322.171875 288.414062 319.609375 C 289.820312 317.042969 291.121094 314.421875 292.3125 311.75 C 293.503906 309.078125 294.582031 306.359375 295.550781 303.597656 C 296.519531 300.835938 297.375 298.039062 298.113281 295.207031 L 309.457031 251.640625 L 315.425781 228.734375 L 315.839844 228.734375 C 316.328125 226.703125 316.714844 224.671875 317.015625 222.640625 L 317.015625 222.570312 C 322.726562 183.65625 293.695312 147.699219 254.421875 146.324219 Z M 254.40625 146.324219"/>
    </svg>
  </div>
);

export default App;
