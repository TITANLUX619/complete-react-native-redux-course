import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	EMPLOYEE_PROP_CHANGED,
	EMPLOYEE_CREATED,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEE_UPDATE_SUCCESS
} from './types';

export const employeePropChanged = ({ prop, value }) => ({
	type: EMPLOYEE_PROP_CHANGED,
	payload: { prop, value }
});

export const employeeCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();

	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATED });
				Actions.employeeList({ type: 'reset' });
			});
	};
};

export const employeesFetch = () => {
	const { currentUser } = firebase.auth();

	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const employeeUpdate = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();

	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_UPDATE_SUCCESS });
				Actions.employeeList({ type: 'reset' });
			});
	};
};

export const employeeDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
				Actions.employeeList({ type: 'reset' });
			});
	};
};
