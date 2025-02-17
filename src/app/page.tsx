'use client';

import { useState } from 'react';
import Timer from '../components/organisms/Timer/Timer';

export default function Home() {
  const [isEditingMode, setIsEditingMode] = useState(false);
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen">
      <div
        className="flex gap-4 items-center justify-center"
        // onClick={() => setIsEditingMode(!isEditingMode)}
      >
        <Timer />
        {/* {isEditingMode ? <EditTimer /> : <Timer />} */}
      </div>
    </main>
  );
}
