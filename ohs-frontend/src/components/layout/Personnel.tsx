import React from 'react';
import Select from 'react-select';
import styles from '../../styles/Personnel.module.scss';
import UsePersonnel from '../../hooks/UsePersonnel';
import UsePersonnelStatusSelect from '../../hooks/UsePersonnelSelect';

function PersonnelStatus(): React.ReactElement {
  const { members, summary } = UsePersonnel({ id: 1 });
  const { options, defaultValue, selectStyle } = UsePersonnelStatusSelect();

  // 약장 생성 함수
  const rank = (repeat: number) => {
    const rankStack: React.ReactElement[] = [];
    for (let i = 0; i < 4; i++) {
      if (4 - i <= repeat) {
        rankStack.push(<div key={'rank' + i} className={styles.ranked}></div>);
      } else {
        rankStack.push(<div key={'unRank' + i} className={styles.unRank}></div>);
      }
      if (i < 3) {
        rankStack.push(<div key={i} className={styles.rankLine}></div>);
      }
    }
    return rankStack;
  };

  // 생활관 내 자리배치 생성 함수
  const dormitorySeat = () => {
    const seats: React.ReactElement[] = [];
    for (let i = 0, j = members.length; i < 8; i++) {
      if (i < j) {
        seats.push(
          <div key={i} className={styles.person}>
            <div className={styles.box}>
              <div className={styles.rank}>{rank(members[i].rank)}</div>
            </div>
            <div className={styles.box}>{members[i].name}</div>
            <div className={styles.selectBox}>
              <Select defaultValue={defaultValue(members[i].status)} options={options} />
            </div>
          </div>,
        );
      } else {
        seats.push(
          <div key={i} className={styles.person}>
            <div className={styles.box}></div>
            <div className={styles.box}>공석</div>
            <div className={styles.selectBox}></div>
          </div>,
        );
      }
    }
    return seats;
  };

  // 생활관 내 자리배치 생성 함수
  const dormitory = () => {
    return (
      <div className={styles.dormitory}>
        {/* 생활관 정보를 가져와서 출력하도록 변경예정 */}
        <h2>1 생활관 인원현황</h2>
        {dormitorySeat()}
      </div>
    );
  };

  // 총원, 현재원, 열외원 출력 함수
  const status = () => {
    return (
      <label className={styles.status}>
        총원 {summary?.total} / 현재원 {summary?.current} / 열외 {summary?.absence}
      </label>
    );
  };

  // 열외사유 출력 함수
  const absenceStatus = () => {
    return (
      <div className={styles.absence}>
        <label>열외사유</label>
        <table>
          <thead>
            <tr>
              {summary?.absence_reasons.map((element, idx) => {
                return <th key={idx}>{element[0]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {summary?.absence_reasons.map((element, idx) => {
                return <td key={idx}>{element[1]}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.personnelStatus}>
      {dormitory()}
      {status()}
      {absenceStatus()}
    </div>
  );
}

export default PersonnelStatus;
