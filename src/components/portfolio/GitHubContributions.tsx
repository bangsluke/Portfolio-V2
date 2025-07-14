// @ts-ignore
import GitHubCalendar from 'preact-github-calendar';

export default function GitHubContributions() {
  return (
    <section id="github-contributions" class="scroll-m-16 px-8 max-sm:px-4 py-8">
      <div class="mx-auto mb-4 w-full max-w-7xl rounded-2xl bg-linear-to-r from-mint-300 dark:from-mint-600 to-mint-50 dark:to-mint-200/5 hover:to-mint-300/30 dark:hover:to-mint-600/30 p-[.2rem]">
        <div class="group relative z-0 flex h-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-tr from-riptide-100 to-white p-8 transition-all hover:shadow-[0_10px_50px_rgba(13,188,130,0.2)] dark:bg-linear-to-r dark:from-mint-950 dark:to-zinc-950 dark:overflow-hidden dark:before:bg-[radial-gradient(circle,rgba(13,188,130)_0,rgba(1,45,34)_100%)] before:bg-[radial-gradient(circle,rgba(95,255,202)_0,rgba(144,253,210)_100%)] before:absolute before:left-1/2 before:top-1/2 before:h-[40%] before:aspect-square before:rounded-full before:blur-3xl before:opacity-80 before:-z-10 before:transition hover:before:animate-pulse before:-translate-x-1/2 before:-translate-y-1/2">
          <div class="z-10 text-center">
            <h3 class="mb-6 text-2xl font-bold text-black dark:text-white">GitHub Contributions</h3>
            <div class="flex justify-center">
              <GitHubCalendar username="bangsluke" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        #github-contributions * {
          color: #fff !important;
        }
        .github-calendar__graph-footer {
          display: none !important;
        }
        .github-calendar__footer {
          font-size: 8px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 20px !important;
        }
        .github-calendar__graph {
          width: 80vw !important;
        }
        .github-calendar__graph-label {
          fill: #fff !important;
        }
      `}</style>
    </section>
  );
}