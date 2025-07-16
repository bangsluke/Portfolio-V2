// @ts-ignore
import GitHubCalendar from 'preact-github-calendar';

export default function GitHubContributions() {
  return (
    <section
      id="github-contributions"
      class="flex justify-center overflow-y-auto"
    >
      <GitHubCalendar username="bangsluke" />
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
          min-width: 100% !important;
        }
        .github-calendar__graph-label {
          fill: #fff !important;
        }
      `}</style>
    </section>
  );
}
