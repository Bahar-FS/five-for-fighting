import { useRef, useState } from 'react';
import styles from '../styles/Home.module.scss';
import Accordion from './accordion';
import Modal from './modal';
import Indicator from './indicator';

type RoadmapType = {
  indicator: string;
  weeks: Array<WeekType>;
};

type WeekType = {
  start: string;
  end: string;
};

type AchievementType = {
  week: number | undefined;
  description: string;
};

type ChallengeType = {
  week: number | undefined;
  description: string;
};

type DeliverableType = {
  description: string;
};

const Roadmap: React.FC<RoadmapType> = ({ indicator,weeks }) => {
  const [achievements, setAchievements] = useState<Array<AchievementType>>([]);
  const [challenges, setChallenges] = useState<Array<ChallengeType>>([]);
  const [deliverables, setDeliverables] = useState<Array<DeliverableType>>([]);
  const [is_modal_visible, setIsModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [active_week, setActiveWeek] = useState<number | undefined>();
  const [current_achievement, setCurrentAchievement] = useState<string>('');
  const [current_challenge, setCurrentChallenge] = useState<string>('');
  const [current_deliverable, setCurrentDeliverable] = useState<string>('');

  const openModal = (title, week = 0) => {
    setIsModalVisible(true);
    setTitle(title);
    setActiveWeek(week);
  };

  const createAchievement = (e) => {
    if (e.keyCode === 13) {
      setAchievements([
        ...achievements,
        { week: active_week, description: e.target.value },
      ]);
      setCurrentAchievement('');
    }
  };

  const createChallenge = (e) => {
    if (e.keyCode === 13) {
      setChallenges([
        ...challenges,
        { week: active_week, description: e.target.value },
      ]);
      setCurrentChallenge('');
    }
  };

  const createDeliverable = (e) => {
    if (e.keyCode === 13) {
      setDeliverables([...deliverables, { description: e.target.value }]);
      setCurrentDeliverable('');
    }
  };

  const getAchievements = (week = active_week) => {
    return achievements
      .filter((achievement) => achievement.week === week)
      .map((achievement, idx) => <li key={idx}>{achievement.description}</li>);
  };

  const getChallenges = (week = active_week) => {
    return challenges
      .filter((challenge) => challenge.week === week)
      .map((challenge, idx) => <li key={idx}>{challenge.description}</li>);
  };

  const getDeliverables = () => {
    return deliverables.map((deliverable, idx) => (
      <li key={idx}>{deliverable.description}</li>
    ));
  };

  const ref = useRef();

  return (
    <div>
      <button
        className={styles['export-btn']}
        onClick={async () => {
          const { exportComponentAsPNG } = await import(
            'react-component-export-image'
          );
          exportComponentAsPNG(ref);
        }}
      >
        Download as PNG
      </button>
      <Modal
        title={title}
        onClose={() => setIsModalVisible(false)}
        is_visible={is_modal_visible}
      >
        {active_week === 0 ? (
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

      <div className={styles.roadmap} ref={ref}>
        {weeks?.map((week, index) => (
          <div
            key={index}
            className={`${styles.week} ${styles[`week${index + 1}`]}`}
          >
            <Indicator
              title={`Week ${index + 1} (${week.start} - ${week.end})`}
              onClick={() => {
                const title = `Week ${index + 1} (${week.start} - ${week.end})`;
                openModal(title, index + 1);
              }}
              indicator={indicator}
            />
            <div>
              <div className={styles['achievement-label']}>Achievements</div>
              <ul>{getAchievements(index + 1)}</ul>
            </div>
            <div>
              <div className={styles['challenge-label']}>Challenges</div>
              <ul>{getChallenges(index + 1)}</ul>
            </div>
          </div>
        ))}
        {weeks.length > 0 && (
          <div className={`${styles.week} ${styles.deliverable}`}>
            <Indicator
              title="Coming soon"
              onClick={() => openModal('Coming soon')}
              indicator={indicator}
            />
            <ul>{getDeliverables()}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
