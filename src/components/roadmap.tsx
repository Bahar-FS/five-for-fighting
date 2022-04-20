import { useState } from 'react';
import Accordion from '../components/accordion';
import Modal from '../components/modal';
import Indicator from '../components/indicator';
import styles from '../styles/Home.module.scss';

type RoadmapType = {
  weeks: Array<WeekType>;
};

type WeekType = {
  from: string;
  to: string;
};

type AchievementType = {
  week: string | number;
  description: string;
};

type ChallengeType = {
  week: string | number;
  description: string;
};

type DeliverableType = {
  description: string;
};

const Roadmap: React.FC<RoadmapType> = ({ weeks }) => {
  const [achievements, setAchievements] = useState<Array<AchievementType>>([]);
  const [challenges, setChallenges] = useState<Array<ChallengeType>>([]);
  const [deliverables, setDeliverables] = useState<Array<DeliverableType>>([]);
  const [is_modal_visible, setIsModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [active_week, setActiveWeek] = useState<string | number>('');
  const [current_achievement, setCurrentAchievement] = useState<string>('');
  const [current_challenge, setCurrentChallenge] = useState<string>('');
  const [current_deliverable, setCurrentDeliverable] = useState<string>('');

  const openModal = (title, week: string | number = '0') => {
    setIsModalVisible(true);
    setTitle(title);
    setActiveWeek(week);
  };

  const createAchievement = (e) => {
    if (e.keyCode === 13) {
      setAchievements([
        { week: active_week, description: e.target.value },
        ...achievements,
      ]);
      setCurrentAchievement('');
    }
  };

  const createChallenge = (e) => {
    if (e.keyCode === 13) {
      setChallenges([
        { week: active_week, description: e.target.value },
        ...challenges,
      ]);
      setCurrentChallenge('');
    }
  };

  const createDeliverable = (e) => {
    if (e.keyCode === 13) {
      setDeliverables([{ description: e.target.value }, ...deliverables]);
      setCurrentDeliverable('');
    }
  };

  const getAchievements = () => {
    return achievements
      .filter((achievement) => achievement.week === active_week)
      .map((achievement, idx) => <li key={idx}>{achievement.description}</li>);
  };

  const getChallenges = () => {
    return challenges
      .filter((challenge) => challenge.week === active_week)
      .map((challenge, idx) => <li key={idx}>{challenge.description}</li>);
  };

  const getDeliverables = () => {
    return deliverables.map((deliverable, idx) => (
      <li key={idx}>{deliverable.description}</li>
    ));
  };

  return (
    <div>
      <Modal
        title={title}
        onClose={() => setIsModalVisible(false)}
        is_visible={is_modal_visible}
      >
        {active_week === '0' ? (
          <Accordion title="Deliverables">
            <ul>{getDeliverables()}</ul>
            <textarea
              value={current_deliverable}
              onChange={(e) => {
                setCurrentDeliverable(e.target.value);
              }}
              onKeyDown={(e) => createDeliverable(e)}
              placeholder="Enter deliverables here..."
            />
          </Accordion>
        ) : (
          <>
            <Accordion title="Achievements">
              <ul>{getAchievements()}</ul>
              <textarea
                value={current_achievement}
                onChange={(e) => {
                  setCurrentAchievement(e.target.value);
                }}
                onKeyDown={(e) => createAchievement(e)}
                placeholder="Enter achievements here..."
              />
            </Accordion>
            <Accordion title="Challenges">
              <ul>{getChallenges()}</ul>
              <textarea
                value={current_challenge}
                onChange={(e) => {
                  setCurrentChallenge(e.target.value);
                }}
                onKeyDown={(e) => createChallenge(e)}
                placeholder="Enter challenges here..."
              />
            </Accordion>
          </>
        )}
      </Modal>
      <div className={styles.roadmap}>
        {weeks?.map((week, index) => (
          <div
            key={index}
            className={`${styles.week} ${styles[`week${index + 1}`]}`}
          >
            <Indicator
              title={`Week ${index + 1} (${week.from} - ${week.to})`}
              onClick={() => {
                const title = `Week ${index + 1} (${week.from} - ${week.to})`;
                openModal(title, index + 1);
              }}
            />
          </div>
        ))}
        <div className={`${styles.week} ${styles.deliverable}`}>
          <Indicator
            title="Coming soon"
            onClick={() => openModal('Coming soon')}
          />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
