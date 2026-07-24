"use client";

export default function Disclaimer() {
  return (
    <section className="w-full bg-[#fff] px-4 pt-4 pb-10 flex justify-center">
      <div className="w-full max-w-[1114px] px-[6.2px] sm:px-4 md:px-6 lg:px-12 xl:px-20 space-y-6 pt-[2px] mt-[-15px]">
        <h2 className="text-2xl sm:text-2xl md:text-[2rem] font-bold text-gray-900 text-center">
          Disclaimer
        </h2>

        <p className="text-sm text-gray-600 font-semibold text-center -mt-4 mb-2">
          Last updated: June 29, 2026
        </p>

        <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed font-medium text-left">
          <p>
            The content provided on{" "}
            <a
              href="https://yonoallgames.app/"
              className="text-blue-600 underline"
            >
              Yono All Games
            </a>{" "}
            is intended solely for general informational purposes. While we aim to ensure accuracy and relevance, we do not offer any warranties—express or implied—about the completeness, reliability, or suitability of the content.
          </p>

          <p>
            Yono All Games is not responsible for any losses or damages resulting from reliance on the information presented. All decisions based on the content of this website are made at your own risk.
          </p>

          <p>
            We do not provide legal, financial, or professional advice of any kind. You should consult with certified professionals before taking any action based on the materials or content presented on this site.
          </p>

          <p>
            External links or references to third-party applications, websites, or content are included for convenience. Yono All Games does not control or endorse such third-party sites and is not responsible for their content, practices, or availability.
          </p>

          <p>
            We strive to keep the website operational and its information accurate. However, we do not guarantee uninterrupted access or error-free content. Technical issues, outages, or content inaccuracies may occur without notice.
          </p>

          <p>
            Yono All Games and its team shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or misuse of this website or its services.
          </p>

          <p>
            All content, including app listings, brand names, and blog content, belongs to their respective owners. Any resemblance to other platforms or misuse is purely coincidental or unintentional.
          </p>

          <p>
            We reserve the right to update or change this Disclaimer at any time. Continued use of the site after updates implies your acceptance of the revised terms. Please revisit this page periodically for the latest version.
          </p>

          <p>
            If you have any questions or concerns regarding this Disclaimer, feel free to reach out to us:
          </p>
        </div>
      </div>
    </section>
  );
}