import React, { useEffect, useMemo, useState } from "react";
import { Trophy, Crown, Medal, Award, Search, Users } from "lucide-react";
import Shell from "../components/Shell";
import { Card, Badge, Select, Input, FieldLabel, SectionHeading, PageHeader, Reveal, cx } from "../components/ui";
import { apiFetch } from "../config/api";
import { CLASS_OPTIONS } from "../config/constants";

const RankBadge = ({ rank }) => {
  if (rank === 1)
    return (
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-brand">
        <Crown className="h-5 w-5" />
      </span>
    );
  if (rank === 2)
    return (
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-muted">
        <Medal className="h-5 w-5" />
      </span>
    );
  if (rank === 3)
    return (
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/15 text-orange-300">
        <Award className="h-5 w-5" />
      </span>
    );
  return (
    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line text-sm font-bold text-muted">
      #{rank}
    </span>
  );
};

const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    apiFetch("/leaderboard")
      .then((data) => {
        if (!active) return;
        if (data?.success) setRows(data.data || []);
        else setError("No leaderboard data available.");
      })
      .catch((err) => active && setError(err.message || "Failed to load leaderboard."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const sorted = [...rows].sort((a, b) => b.accuracy - a.accuracy);
    return sorted.filter(
      (s) =>
        (selectedStandard === "" || s.classname === selectedStandard) &&
        (searchTerm === "" || s.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [rows, selectedStandard, searchTerm]);

  return (
    <Shell isLoggedIn loading={loading}>
      <Reveal>
        <PageHeader
          badge="Leaderboard"
          badgeIcon={Trophy}
          title="Top performers"
          subtitle="See who's leading by accuracy across each class and celebrate the best."
        />
      </Reveal>

      <div className="section-gap">
        <Card className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Select
              label="Class" icon={Users} value={selectedStandard}
              onChange={setSelectedStandard} options={CLASS_OPTIONS}
              placeholder="Select a class"
            />
            <div>
              <FieldLabel icon={Search}>Search champion</FieldLabel>
              <Input
                icon={Search} value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username"
              />
            </div>
          </div>
        </Card>

        {error ? (
          <Card className="mt-12 flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-300">
              <Trophy className="h-7 w-7" />
            </span>
            <p className="font-medium text-fg">{error}</p>
          </Card>
        ) : !selectedStandard ? (
          <Card className="mt-12 flex flex-col items-center gap-3 px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Users className="h-8 w-8" />
            </span>
            <p className="text-lg font-semibold text-fg">Pick a class to view champions</p>
            <p className="max-w-md text-sm text-muted">
              Choose a class above to see its ranked leaderboard.
            </p>
          </Card>
        ) : filtered.length > 0 ? (
          <section className="mt-12">
            <SectionHeading icon={Trophy} title="Class champions" subtitle={`Class: ${selectedStandard}`} />

            {/* Podium for top 3 */}
            {filtered.length >= 3 && (
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
                {[1, 0, 2].map((idx) => {
                  const s = filtered[idx];
                  const rank = idx + 1;
                  const heights = { 0: "h-28 sm:h-36", 1: "h-20 sm:h-28", 2: "h-16 sm:h-24" };
                  return (
                    <div key={idx} className="flex flex-col items-center justify-end">
                      <div className="relative">
                        <img
                          src={s.profilePicture || "/assets/logo.png"}
                          alt=""
                          className={cx(
                            "rounded-full border-2 object-cover",
                            rank === 1 ? "h-16 w-16 border-brand" : "h-12 w-12 border-line"
                          )}
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2"><RankBadge rank={rank} /></span>
                      </div>
                      <p className="mt-4 truncate text-center text-sm font-semibold text-fg">{s.username}</p>
                      <Badge tone="brand" className="mt-1">{s.accuracy}%</Badge>
                      <div className={cx("mt-3 w-full rounded-t-xl border border-b-0 border-line bg-primary/10", heights[idx])} />
                    </div>
                  );
                })}
              </div>
            )}

            <Card className="mt-8 overflow-hidden">
              <div className="hidden grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-line px-6 py-3 text-xs uppercase tracking-wide text-muted sm:grid">
                <span>Rank</span>
                <span>Champion</span>
                <span className="text-right">Quizzes</span>
                <span className="text-right">Accuracy</span>
              </div>
              <ul className="divide-y divide-line">
                {filtered.map((s, i) => {
                  const rank = i + 1;
                  return (
                    <li
                      key={s.username + i}
                      className={cx(
                        "grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-surface2 sm:grid-cols-[auto_1fr_auto_auto]",
                        rank <= 3 && "bg-brand/[0.04]"
                      )}
                    >
                      <RankBadge rank={rank} />
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={s.profilePicture || "/assets/logo.png"}
                          alt=""
                          className="h-11 w-11 shrink-0 rounded-full border border-line object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-fg">{s.username}</p>
                          <p className="truncate text-xs text-subtle">{s.classname}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-fg">{s.totalQuizzesGiven}</p>
                        <p className="text-xs text-subtle">completed</p>
                      </div>
                      <div className="hidden text-right sm:block">
                        <Badge tone="brand">{s.accuracy}%</Badge>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>
        ) : (
          <Card className="mt-12 flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Search className="h-7 w-7" />
            </span>
            <p className="font-medium text-fg">No champions found</p>
            <p className="max-w-md text-sm text-muted">
              {searchTerm
                ? `No students match "${searchTerm}" in ${selectedStandard}.`
                : `No leaderboard data for ${selectedStandard} yet — be the first to take a quiz!`}
            </p>
          </Card>
        )}
      </div>
    </Shell>
  );
};

export default Leaderboard;
