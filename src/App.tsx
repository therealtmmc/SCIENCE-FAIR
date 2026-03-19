/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Description } from "./pages/About/Description";
import { Components } from "./pages/About/Components";
import { Significance } from "./pages/About/Significance";
import { Researchers } from "./pages/Researchers";
import { Games } from "./pages/Games";
import { GamesMenu } from "./pages/Games/GamesMenu";
import { OutFire } from "./pages/Games/OutFire";
import { GuessOrFire } from "./pages/Games/GuessOrFire";
import { HotButton } from "./pages/Games/HotButton";
import { FlamingNotes } from "./pages/Games/FlamingNotes";
import { FlamingNotesQR } from "./pages/Games/FlamingNotesQR";
import { SharedNote } from "./pages/Games/SharedNote";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />}>
            <Route index element={<Description />} />
            <Route path="components" element={<Components />} />
            <Route path="significance" element={<Significance />} />
          </Route>
          <Route path="researchers" element={<Researchers />} />
          <Route path="games" element={<Games />}>
            <Route index element={<GamesMenu />} />
            <Route path="out-fire" element={<OutFire />} />
            <Route path="guess-or-fire" element={<GuessOrFire />} />
            <Route path="hot-button" element={<HotButton />} />
            <Route path="flaming-notes" element={<FlamingNotes />} />
          </Route>
        </Route>
        <Route path="/flaming-notes/view/:id" element={<SharedNote />} />
        <Route path="/flaming-notes/qr/:encodedNote" element={<FlamingNotesQR />} />
      </Routes>
    </BrowserRouter>
  );
}
