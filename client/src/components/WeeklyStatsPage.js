import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_EXERCISE_COUNTS = gql`
  query GetExerciseCounts {
    exerciseCounts {
      exerciseType
      count
    }
    totalExerciseTime
  }
`;

const WeeklyStatsPage = () => {
  const { loading, error, data } = useQuery(GET_EXERCISE_COUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred while fetching exercise counts</p>;

  const { exerciseCounts, totalExerciseTime } = data;

  return (
    <div>
      <h2>Weekly Stats</h2>

      <h3>Exercise Counts</h3>
      <table>
        <thead>
          <tr>
            <th>Exercise Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {exerciseCounts.map(({ exerciseType, count }) => (
            <tr key={exerciseType}>
              <td>{exerciseType}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Exercise Time: {totalExerciseTime} minutes</p>
    </div>
  );
};

export default WeeklyStatsPage;
