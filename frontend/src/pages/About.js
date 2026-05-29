import React from "react";
import {
  Target, Globe, Users, Library, MapPin, Mail, Phone, ArrowRight,
  Star, Award, Trophy, BookOpen, Zap, Info,
} from "lucide-react";
import Shell from "../components/Shell";
import { Card, Button, SectionHeading, PageHeader, Reveal } from "../components/ui";
import useAuth from "../hooks/useAuth";

const MAP_URL =
  "https://www.google.com/maps/place/DA-IICT/@23.1889152,72.6278185,17z/data=!4m6!3m5!1s0x395c2a3c9618d2c5:0xc54de484f986b1fa!8m2!3d23.188537!4d72.6289155!16zL20vMDIzc2g3";

const VISION =
  "To create a global learning ecosystem where every learner can unlock their full potential through engaging, interactive, and personalized quiz experiences.";
const MISSION =
  "To make great education accessible to everyone by building quiz tools that make teaching simpler and learning more rewarding.";

const StatCard = ({ icon: Icon, value, label, points }) => (
  <Card className="p-8">
    <div className="flex items-center justify-between">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-6 w-6" />
      </span>
      <div className="text-right">
        <p className="font-display text-4xl font-bold text-white">{value}</p>
        <p className="text-sm font-medium text-brand">{label}</p>
      </div>
    </div>
    <ul className="mt-6 space-y-3">
      {points.map(({ icon: PointIcon, text }) => (
        <li key={text} className="flex items-center gap-3 text-sm text-slate-300">
          <PointIcon className="h-4 w-4 shrink-0 text-brand" />
          {text}
        </li>
      ))}
    </ul>
  </Card>
);

const About = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Shell isLoggedIn={!!isLoggedIn} loading={isLoggedIn === null}>
      <Reveal>
        <PageHeader
          badge="About us"
          badgeIcon={Info}
          title="About Quiz Master"
          subtitle="We believe learning should be engaging — an interactive space where knowledge is explored, skills are sharpened, and goals are reached."
        />
      </Reveal>

      {/* Vision & Mission */}
      <section className="section-gap">
          <SectionHeading icon={Target} title="Vision & mission" center />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Our vision</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{VISION}</p>
            </Card>
            <Card className="p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                <Globe className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Our mission</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{MISSION}</p>
            </Card>
          </div>
        </section>

        {/* Impact */}
        <section className="section-gap">
          <SectionHeading icon={Trophy} title="Our impact" subtitle="Trusted by learners and educators." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <StatCard
              icon={Users}
              value="300+"
              label="Expert instructors"
              points={[
                { icon: Star, text: "Trusted by education professionals" },
                { icon: Award, text: "Creating engaging learning experiences" },
                { icon: Trophy, text: "Guiding students to academic success" },
              ]}
            />
            <StatCard
              icon={Library}
              value="300+"
              label="Interactive quizzes"
              points={[
                { icon: BookOpen, text: "Covering diverse academic subjects" },
                { icon: Zap, text: "Multiple engaging question formats" },
                { icon: Target, text: "Adaptive difficulty levels" },
              ]}
            />
          </div>
        </section>

        {/* Contact */}
        <section className="section-gap">
          <SectionHeading icon={Mail} title="Get in touch" subtitle="We're here to help you every step of the way." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Headquarters</h3>
              </div>
              <p className="mt-4 leading-relaxed text-slate-400">
                DAIICT-campus, near Reliance Cross Rd, Gandhinagar, Gujarat 382007
              </p>
              <Button
                as="a" href={MAP_URL} target="_blank" rel="noopener noreferrer"
                variant="outline" size="sm" className="mt-5"
              >
                View on map <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Contact info</h3>
              </div>
              <div className="mt-4 space-y-3">
                <a
                  href="mailto:support@quizmaster.com"
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-slate-300 transition-colors hover:border-brand/40 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" /> support@quizmaster.com
                </a>
                <a
                  href="tel:+917990377408"
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-slate-300 transition-colors hover:border-brand/40 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand" /> (+91) 7990377408
                </a>
              </div>
            </Card>
          </div>
        </section>
    </Shell>
  );
};

export default About;
