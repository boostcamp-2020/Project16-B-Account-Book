import LoginForm from '../presentational/LoginForm';

import { useDispatch } from 'react-redux';

import { loader } from '../../slice';

const LoginFormContainer = () => {
	const dispatch = useDispatch();

	const handleClick = ({ test }) => {
		dispatch(loader({ test }));
	};

	return (
		<>
			<div>LoginFormContainer</div>
			<LoginForm onClick={handleClick} />
		</>
	);
};

export default LoginFormContainer;
