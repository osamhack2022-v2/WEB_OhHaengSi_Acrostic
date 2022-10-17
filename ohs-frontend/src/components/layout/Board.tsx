import React, { useState } from 'react';
import styles from '../../styles/Board.module.scss';
import UseBoard from '../../hooks/UseBoard';
import { dateYMDFormat } from '../../utils/Date';

function Board(): React.ReactElement {
  const { items, content, getContent } = UseBoard({ date: dateYMDFormat });
  const [select, setSelect] = useState(-1);
  return (
    <div className={styles.board}>
      <h2>전파사항</h2>
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <tr
                  key={idx}
                  onClick={() => {
                    idx === select ? setSelect(-1) : (setSelect(idx), getContent(idx));
                  }}>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.writer.name}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>
                </tr>
                {idx === select ? (
                  <tr>
                    <td colSpan={4}>{content}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
