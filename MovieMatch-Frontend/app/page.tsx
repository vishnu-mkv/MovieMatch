String.prototype.toTitleCase = function (this: string): string {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

import { getDashboardData } from "@/services/movies";
import MovieContainer from "@/components/MovieContainer";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main>
      {data.map((section) => {
        return (
          <MovieContainer
            movies={section.movies}
            title={{ title: section.title }}
            key={`section--${section.title}`}
          />
        );
      })}
    </main>
  );
}
