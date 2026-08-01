/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Page components
import { Hero } from './components/sections/Hero';
import { Storytelling } from './components/sections/Storytelling';
import { AboutNHEBrief } from './components/sections/AboutNHEBrief';
import { ProgramOverview } from './components/sections/ProgramOverview';
import { ImpactTarget } from './components/sections/ImpactTarget';
import { Quote } from './components/sections/Quote';
import { Cta } from './components/sections/Cta';

// Sub-pages detail components
import { TentangPage } from './components/sections/TentangPage';
import { ProgramPage } from './components/sections/ProgramPage';
import { RelawanPage } from './components/sections/RelawanPage';
import { KontakPage } from './components/sections/KontakPage';

export default function App() {
  return(
    <>
      <h1>Bikin saja website sendiri cuyyy !!</h1>
    </>
  )
}
