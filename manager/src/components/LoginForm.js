import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
	onEmailChange(text) {
		//Call to emailChanged ACTION-CREATOR
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		//Call to passwordChanged ACTION-CREATOR
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button customOnPress={this.onButtonPress.bind(this)}>Login</Button>;
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>{this.props.error}</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						placeholder="user@gmail.com"
						label="Email"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						secureTextEntry
						placeholder="password"
						label="Password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				{this.renderError()}

				<CardSection>{this.renderButton()}</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = state => ({
	email: state.auth.email,
	password: state.auth.password,
  error: state.auth.error,
  loading: state.auth.loading
});

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default connect(
	mapStateToProps,
	{ emailChanged, passwordChanged, loginUser }
)(LoginForm);
