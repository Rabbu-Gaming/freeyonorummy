"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CloudDownloadIcon } from "../../components/styles/icons";

export default function FloatButton({ appName, downloadLink, targetId }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const target = document.getElementById(targetId);
    targetRef.current = target;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3"
        >
          <div className="max-w-[1020px] mx-auto flex justify-center">
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)" }}
              className="w-full sm:w-fit flex items-center justify-center gap-2 text-emerald-950 text-[13px] sm:text-[14px] font-bold py-2.5 px-6 rounded-2xl shadow-2xl"
            >
              <CloudDownloadIcon className="w-4 h-4 shrink-0" />
              <span>Download {appName} Apk</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}