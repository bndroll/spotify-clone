import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/store';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { singIn } from '../store/auth/asyncActions';


export interface ILoginForm {
	email: string;
	password: string;
}

const yupSchema = yup.object({
	email: yup.string().email('Неверный email').required('Введите почту'),
	password: yup.string().required('Введите пароль')
});

interface ILoginFormProps {
	setShowErrorMessage: (param: boolean) => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({setShowErrorMessage}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
		resolver: yupResolver(yupSchema)
	});

	useEffect(() => {
		return () => {
			setShowErrorMessage(false);
		};
	}, []);

	const onSubmit = (data: ILoginForm) => {
		dispatch(singIn(data));
	};

	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<InputsWrapper>
				<EmailContainer>
					<Input {...register('email')}
						   placeholder="Введите почту"
						   id="email_field"/>
					<Label htmlFor="email_field" error={!!errors.email}>
						{errors.email?.message ? errors.email?.message : `Почта`}
					</Label>
				</EmailContainer>

				<PasswordContainer>
					<Input {...register('password')}
						   placeholder="Введите пароль"
						   id="password_field"/>
					<Label htmlFor="password_field" error={!!errors.password}>
						{errors.password?.message ? errors.password?.message : `Пароль`}
					</Label>
				</PasswordContainer>
			</InputsWrapper>

			<SubmitButton type={'submit'}/>
		</Wrapper>
	);
};

const Wrapper = styled.form`
  width: 65%;
`;

const InputsWrapper = styled.div`
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(2, 1fr);
  grid-template-areas: "email email" "password ." ". ." ". .";
  grid-gap: 15px;
`;

const FieldContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

const EmailContainer = styled(FieldContainer)`
  grid-area: email;
`;

const PasswordContainer = styled(FieldContainer)`
  grid-area: password;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px 20px;
  height: 60px;
  background: #ffffff;
  font-size: 15px;
  line-height: 1.25;
  border-width: 0;
  border-radius: 6px;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: transparent;
  }

  &:focus, &:not(:placeholder-shown) {
    padding-top: 20px;
    padding-bottom: 10px;
  }

  &:focus ~ Label, &:not(:placeholder-shown) ~ Label {
    opacity: .5;
    transform: scale(.85) translateY(-13px);
  }
`;

interface ILabelProps {
	error: boolean;
}

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 21px 22px;
  pointer-events: none;
  font-weight: 500;
  color: ${(props: ILabelProps) => (props.error ? '#fa4c4c' : '#777777')};
  border: 1px solid transparent;
  font-size: 15px;
  transform-origin: 0 0;
  transition: opacity .15s ease-in-out, transform .15s ease-in-out;
`;

const SubmitButton = styled.input`
  display: inline-block;
  background-color: #32be58;
  padding: 12px 30px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
  margin-right: 25px;
  margin-top: 35px;
  transition: all .1s linear;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #2ea84e;
    color: #ffffff;
  }

  &:active {
    background-color: #259845;
    transform: translateY(2px);
  }
`;