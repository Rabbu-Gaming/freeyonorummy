"use client";

export default function Disclaimer() {
  return (
    <section className="w-full bg-[#fff] px-4 pt-4 pb-10 flex justify-center">
      <div className="w-full max-w-[1114px] px-[6.2px] sm:px-4 md:px-6 lg:px-12 xl:px-20 space-y-6 pt-[2px] mt-[-15px]">
        <h2 className="text-2xl sm:text-2xl md:text-[2rem] font-bold text-gray-900 text-center">
          Disclaimer
        </h2>

        <p className="text-sm text-gray-600 font-semibold text-center -mt-4 mb-2">
          Last updated: July 25, 2026
        </p>

        <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed font-medium text-left">
          <p>
            The information provided on{" "}
            <a
              href="https://freeyonorummy.com/"
              className="text-blue-600 underline"
            >
              Free Yono Rummy
            </a>{" "}
            is for general informational purposes only. While we make every effort to keep the content accurate and up to date, we do not guarantee its completeness, reliability, or suitability for any specific purpose.
          </p>

          <p>
            Free Yono Rummy is not liable for any loss or damage that may arise from using the information on this website. All decisions made based on our content are at your own risk.
          </p>

          <p>
            We do not provide any legal, financial, or professional advice. Please consult qualified professionals before making any decisions related to real-money gaming or financial matters.
          </p>

          <p>
            Links to external websites or third-party apps are provided for convenience only. Free Yono Rummy does not control, endorse, or take responsibility for the content, privacy policies, or practices of any external platforms.
          </p>

          <p>
            We work hard to keep the site running smoothly and the information current. However, we cannot guarantee uninterrupted access or completely error-free content at all times.
          </p>

          <p>
            Free Yono Rummy and its team shall not be held responsible for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website.
          </p>

          <p>
            All app names, logos, and trademarks belong to their respective owners. Any similarity to other platforms is coincidental and unintentional.
          </p>

          <p>
            We reserve the right to modify or update this Disclaimer at any time without prior notice. Your continued use of the website after any changes means you accept the updated terms. Please check this page regularly for the latest version.
          </p>

          <p>
            If you have any questions or concerns about this Disclaimer, feel free to contact us.
          </p>
        </div>
      </div>
    </section>
  );
}