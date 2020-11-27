import DashboardPieChart from './DashboardPieChart';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid #ddd;
  width: fit-content;
`;

const DashboardGraph = ({ transactions }) => {
  return (
    <>
      <StyledDiv>
        <div>분류별 지출</div>
        <DashboardPieChart transactions={transactions} />
      </StyledDiv>
    </>
  );
};

export default DashboardGraph;
