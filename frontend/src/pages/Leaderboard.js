import React, { useEffect, useMemo, useState } from "react";
import { Trophy, Crown, Medal, Award, Search, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Card, Badge, Select, Input, FieldLabel, SectionHeading, cx } from "../components/ui";
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
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-slate-300">
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
    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-sm font-bold text-slate-300">
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
    <div className="app-bg">
      <Navbar isLoggedIn />

      <main className="mx-auto max-w-content px-5 pb-20 pt-28 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="brand">
            <Trophy className="h-3.5 w-3.5" /> Leaderboard
          </Badge>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Top performers</h1>
          <p className="mt-3 text-slate-400">
            See who's leading by accuracy across each class and celebrate the best.
          </p>
        </div>

        <Card className="mt-10 p-6">
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
            <p className="font-medium text-white">{error}</p>
          </Card>
        ) : !selectedStandard ? (
          <Card className="mt-12 flex flex-col items-center gap-3 px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Users className="h-8 w-8" />
            </span>
            <p className="text-lg font-semibold text-white">Pick a class to view champions</p>
            <p className="max-w-md text-sm text-slate-400">
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
                            rank === 1 ? "h-16 w-16 border-brand" : "h-12 w-12 border-white/20"
                          )}
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2"><RankBadge rank={rank} /></span>
                      </div>
                      <p className="mt-4 truncate text-center text-sm font-semibold text-white">{s.username}</p>
                      <Badge tone="brand" className="mt-1">{s.accuracy}%</Badge>
                      <div className={cx("mt-3 w-full rounded-t-xl border border-b-0 border-white/10 bg-gradient-to-t from-brand/5 to-brand/15", heights[idx])} />
                    </div>
                  );
                })}
              </div>
            )}

            <Card className="mt-8 overflow-hidden">
              <div className="hidden grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-white/10 px-6 py-3 text-xs uppercase tracking-wide text-slate-400 sm:grid">
                <span>Rank</span>
                <span>Champion</span>
                <span className="text-right">Quizzes</span>
                <span className="text-right">Accuracy</span>
              </div>
              <ul className="divide-y divide-white/5">
                {filtered.map((s, i) => {
                  const rank = i + 1;
                  return (
                    <li
                      key={s.username + i}
                      className={cx(
                        "grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[auto_1fr_auto_auto]",
                        rank <= 3 && "bg-brand/[0.04]"
                      )}
                    >
                      <RankBadge rank={rank} />
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={s.profilePicture || "/assets/logo.png"}
                          alt=""
                          className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">{s.username}</p>
                          <p className="truncate text-xs text-slate-500">{s.classname}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{s.totalQuizzesGiven}</p>
                        <p className="text-xs text-slate-500">completed</p>
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
            <p className="font-medium text-white">No champions found</p>
            <p className="max-w-md text-sm text-slate-400">
              {searchTerm
                ? `No students match "${searchTerm}" in ${selectedStandard}.`
                : `No leaderboard data for ${selectedStandard} yet — be the first to take a quiz!`}
            </p>
          </Card>
        )}
      </main>

      <Footer isLoggedIn />
      <Loading isLoading={loading} />
    </div>
  );
};

export default Leaderboard;
