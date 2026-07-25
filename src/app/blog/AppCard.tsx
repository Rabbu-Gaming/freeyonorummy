import Link from "next/link";
import { GiftIcon, WalletSimpleIcon, CloudDownloadIcon, StarFilledIcon, StarOutlineIcon } from "../../components/styles/icons";

type AppData = {
  slug: string;
  image: string;
  signupBonus: string;
  downloadLink: string;
  minWithdraw: string;
  totalDownloads: number;
  rating: string;
  upcoming?: string;
};

export default function AppCard({ app }: { app: AppData }) {
  const name = app.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const downloadsDisplay = `${app.totalDownloads}M+`;
  const stars = parseFloat(app.rating) || 0;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  const isUpcoming = app.upcoming === "yes";

  const renderStars = () => (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <StarFilledIcon key={i} className="w-3 h-3 text-yellow-400" />
      ))}
      {hasHalf && (
        <div className="relative w-3 h-3">
          <StarOutlineIcon className="w-3 h-3 text-gray-300 absolute inset-0" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarFilledIcon className="w-3 h-3 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
        <StarOutlineIcon key={i} className="w-3 h-3 text-gray-300" />
      ))}
      <span className="text-[11px] font-semibold text-gray-500 ml-1">{app.rating}</span>
    </div>
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden my-6 sm:my-8">
      <div className="flex items-center gap-3.5 p-3.5 sm:p-4">
        <Link href={`/${app.slug}`} className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img src={app.image} alt={name} className="w-full h-full object-cover" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/${app.slug}`} className="block text-[15px] sm:text-base font-bold text-gray-900 leading-tight truncate">
            {name}
          </Link>
          <div className="mt-1">{renderStars()}</div>
        </div>

        {isUpcoming ? (
          <span className="flex-shrink-0 text-[11px] font-semibold text-gray-400 bg-gray-100 rounded-full px-3 py-1.5">
            Soon
          </span>
        ) : (
          <Link
            href={app.downloadLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-[12px] sm:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-2"
          >
            <CloudDownloadIcon width={14} height={14} />
            Download
          </Link>
        )}
      </div>

      <div className="grid grid-cols-3 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-100">
          <GiftIcon className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-[9px] uppercase tracking-wide text-gray-400 font-medium">Bonus</p>
          <p className="text-[12px] font-bold text-gray-800">{app.signupBonus}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-100">
          <WalletSimpleIcon className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-[9px] uppercase tracking-wide text-gray-400 font-medium">Withdraw</p>
          <p className="text-[12px] font-bold text-gray-800">{app.minWithdraw}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-3">
          <CloudDownloadIcon width={14} height={14} className="text-gray-400" />
          <p className="text-[9px] uppercase tracking-wide text-gray-400 font-medium">Downloads</p>
          <p className="text-[12px] font-bold text-gray-800">{downloadsDisplay}</p>
        </div>
      </div>
    </div>
  );
}