import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from "../components/Profile";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import styles from "../styles/pages/Home.module.css";
import { ChallangeBox } from "../components/ChallangeBox";
import { CoutdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengesContext";
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CoutdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallangeBox />
            </div>
          </section>
        </CoutdownProvider>
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //chamada api
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
