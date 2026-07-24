function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="M9 12.5 11 14.5 15.5 9.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}

export default function DisclaimerPage() {
  const bannedStates = ["Andhra Pradesh", "Sikkim", "Nagaland", "Assam", "Arunachal Pradesh", "Tamil Nadu", "Odisha", "Telangana"];
  const bannedList = bannedStates.join(", ");

  return (
    <section className="w-full bg-white px-4 pt-0 pb-6 flex justify-center">
      <div className="relative w-full max-w-[900px] rounded-[18px] border border-green-200 bg-gradient-to-br from-green-50 to-white px-5 py-5 sm:px-7 sm:py-6 overflow-hidden">
        <div className="absolute -right-8 -top-12 w-36 h-36 rounded-full bg-green-100/50"></div>
        <div className="absolute -left-10 -bottom-14 w-32 h-32 rounded-full bg-green-100/40"></div>

        <div className="relative flex items-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white shrink-0 shadow-[0_2px_6px_rgba(21,128,61,0.25)]">
            <ShieldIcon />
          </span>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wide text-green-900 leading-none">
              Disclaimer
            </p>
            <p className="text-[10.5px] text-green-700/80 font-medium mt-1">
              Please read before you play
            </p>
          </div>
        </div>

        <div className="relative bg-white/70 border border-green-200 rounded-[10px] px-4 py-4">
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <BookIcon />
            </span>
            <div className="text-[12px] text-gray-600 leading-relaxed space-y-3">
              <p>
                Free Yono Rummy acts purely as an information source and holds no responsibility for how the listed apps function. Rummy can become habit-forming and carries genuine financial risk, so please play with caution. This platform is reserved strictly for users aged <span className="text-green-700 font-semibold">18 and above</span>.
              </p>
              <p>
                For complete details, review our full <a href="/disclaimer" className="text-green-700 font-semibold underline hover:text-green-800">Disclaimer</a> page along with the individual disclaimer published on every app listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}