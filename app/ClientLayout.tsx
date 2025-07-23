"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    // Check for the presence of the test-completed-flag element
    const checkFlag = () => {
      setTestCompleted(!!document.getElementById("test-completed-flag"));
    };
    checkFlag();
    const observer = new MutationObserver(checkFlag);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const hideNavbar = pathname.startsWith("/mock/") && !testCompleted && !pathname.endsWith("/results");
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
} 