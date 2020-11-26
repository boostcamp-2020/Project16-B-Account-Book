import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import color from '../../../../public/color';

const UserMenuDropDownWrapper = styled.div`
	top: 15px;
	right: 15px;
	position: absolute;
	width: 200px;
	font-size: 13px;
	text-align: center;
	background-color: white;
	color: ${color.fontLightBold};
	border: 1px solid ${color.line};
	box-shadow: ${color.boxShadow};
	.dropdown-option {
		height: 40px;
		line-height: 40px;
		&:last-child {
			border-top: 1px solid ${color.line};
		}
	}
`;

const UserMenuDropDown = ({ setUserMenu }) => {
	const ref = useRef();

	useEffect(() => {
		const clickBody = (e) => {
			if (ref.current && ref.current.contains(e.target)) return;
			setUserMenu(false);
		};
		document.body.addEventListener('click', clickBody);

		return () => {
			document.body.removeEventListener('click', clickBody);
		};
	}, []);

	return (
		<>
			<UserMenuDropDownWrapper ref={ref}>
				<div className="dropdown-option">정보수정</div>
				<div className="dropdown-option">로그아웃</div>
			</UserMenuDropDownWrapper>
		</>
	);
};

export default UserMenuDropDown;
