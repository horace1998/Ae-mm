/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SYNKProvider } from "./lib/Store";
import WelcomeScreen from "./lib/WelcomeScreen";
import AppLayout from "./lib/AppLayout";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [welcomeDone, setWelcomeDone] = useState(false);

  return (
    <SYNKProvider>
      <AnimatePresence mode="wait">
        {!welcomeDone ? (
          <WelcomeScreen key="welcome" onComplete={() => setWelcomeDone(true)} />
        ) : (
          <AppLayout key="app" />
        )}
      </AnimatePresence>
    </SYNKProvider>
  );
}
