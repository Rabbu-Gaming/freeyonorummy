import Link from "next/link";

type BlogMeta = {
  title: string;
  slug: string;
  date: string;
  description?: string;
  coverImage?: string;
};

type AppData = {
  slug: string;
  name: string;
  image: string;
  signupBonus: string;
  minWithdraw: string;
  rating: string;
  upcoming?: string;
};

type Props = {
  blogs: BlogMeta[];
  variant: "desktop" | "mobile";
  apps?: AppData[];
};

function DownloadButton({ upcoming }: { upcoming?: string }) {
  if (upcoming === "yes") {
    return (
      <div className="flex items-center gap-0.5 rounded-full bg-white border-2 border-[#19692c] text-[#19692c] font-bold px-2 py-[4px] text-[9px] whitespace-nowrap">
        Coming Soon
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-white border-2 border-[#19692c] shadow-[0_0_6px_rgba(25,105,44,0.5)] text-[#19692c] font-bold px-2 py-[4px] text-[9px] whitespace-nowrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z" />
      </svg>
      Download
    </div>
  );
}

function AppRow({ app, index }: { app: AppData; index: number }) {
  return (
    <Link
      href={`/${app.slug}`}
      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300/50 rounded-xl shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 text-sm font-semibold text-gray-600 text-right flex-shrink-0">
          {index + 1}.
        </div>
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src={app.image}
            alt={`${app.name} – download bonus ₹${app.signupBonus || "N/A"}`}
            width={48}
            height={48}
            loading="lazy"
            className="w-full h-full object-contain rounded-[10px]"
          />
        </div>
        <div className="text-left min-w-0">
          <h3 className="font-bold text-gray-900 text-xs">{app.name}</h3>
          <div className="flex flex-col items-start mt-1 gap-[3px]">
            {app.signupBonus && (
              <span className="inline-flex items-center gap-0.5 bg-red-50 text-red-700 font-bold text-[9px] px-1.5 py-[2px] rounded-full border border-red-100 whitespace-nowrap">
                🎁 Bonus: {app.signupBonus}
              </span>
            )}
            {app.minWithdraw && (
              <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 font-semibold text-[9px] px-1.5 py-[2px] rounded-full border border-green-100 whitespace-nowrap">
                💸 Min: {app.minWithdraw}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="ml-2 flex-shrink-0">
        <DownloadButton upcoming={app.upcoming} />
      </div>
    </Link>
  );
}

export default function RelatedBlogs({ blogs, variant, apps = [] }: Props) {
  const filteredApps = apps.filter((app) => app.upcoming !== "yes");

  if (blogs.length === 0 && filteredApps.length === 0) return null;

  if (variant === "mobile") {
    return (
      <>
        {blogs.length > 0 && (
          <div className="mt-12 lg:hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500" />
              <h2 className="text-[17px] font-bold text-gray-900">Related Blogs</h2>
            </div>
            <div className="flex flex-col gap-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="flex gap-3 items-start bg-white border border-gray-100 rounded-xl shadow-sm p-3 hover:shadow-md hover:border-gray-200 transition-all duration-200"
                >
                  {blog.coverImage && (
                    <div className="w-[80px] h-[60px] flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        width={80}
                        height={60}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    {blog.date && (
                      <p className="mt-1 text-[11px] text-gray-500 font-medium">
                        {new Date(blog.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredApps.length > 0 && (
          <div className="mt-10 lg:hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500" />
              <h2 className="text-[17px] font-bold text-gray-900">Related Apps</h2>
            </div>
            <div className="flex flex-col gap-1.5">
              {filteredApps.map((app, index) => (
                <AppRow key={app.slug} app={app} index={index} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <aside className="hidden lg:block lg:w-80 shrink-0 lg:ml-6">
      <style>{`
        .related-scroll::-webkit-scrollbar { width: 4px; }
        .related-scroll::-webkit-scrollbar-track { background: transparent; }
        .related-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 999px; }
        .related-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; border-radius: 999px; }
        .related-scroll { scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
      `}</style>
      <div
        className="related-scroll sticky top-[80px] flex flex-col gap-5"
        style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
      >
        {blogs.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Related Blogs</h3>
            <div className="space-y-5">
              {blogs.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`} className="flex gap-3 group">
                  {blog.coverImage && (
                    <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                      {blog.title}
                    </h4>
                    {blog.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(blog.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredApps.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Related Apps</h3>
            <div className="flex flex-col gap-1.5">
              {filteredApps.map((app, index) => (
                <AppRow key={app.slug} app={app} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}