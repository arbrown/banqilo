# banqilo
Banqilo is a simple elo system for tracking rankings in ban qi.  Currently it implements a rudimentary [elo](https://en.wikipedia.org/wiki/Elo_rating_system) ranking system for comparing the perceived skill of two players.

Nothing  about banqilo is specific to ban qi, and the system could easily be adapted for use with other games.

Currently, banqilo uses a [K-factor](https://en.wikipedia.org/wiki/Elo_rating_system#Most_accurate_K-factor) of 15, since that is what [FIDE](https://en.wikipedia.org/wiki/FIDE) uses for (most) chess players below the grandmaster rank.  This factor causes scores to move very slowly, however, and could be adjusted in general, or with a little tweaking, for the first 30 or so games (like FIDE does) so that ratings can jump around a little bit more.
