import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateUserById } from '../store/user/asyncActions';
import * as yup from 'yup';


export interface IUpdateUserForm {
	name: string;
	about: string;
}

const yupSchema = yup.object({
	name: yup.string().min(3, 'Имя должно быть больше чем 3 символа').required('Введите псевдоним'),
	about: yup.string().max(350, 'Текст о себе не может быть больше чем 350 символов').required('Напишите что-то о себе')
});

interface IUpdateUserFormProps {
	id: string;
	setFormType: (param: 'update' | 'updatePhoto' | null) => void;
}

export const UpdateUserForm: React.FC<IUpdateUserFormProps> = ({id, setFormType}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IUpdateUserForm>({
		resolver: yupResolver(yupSchema)
	});

	const onSubmit = (data: IUpdateUserForm) => {
		dispatch(updateUserById({
			id: id,
			name: data.name,
			about: data.about
		}));

		setFormType(null);
	};

	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<Title>Обновить пользователя</Title>

			<InputsWrapper>
				<NameContainer>
					<Input {...register('name')}
						   placeholder="Введите псевдоним"
						   id="name_field"/>
					<Label htmlFor="name_field" error={!!errors.name}>
						{errors.name?.message ? errors.name?.message : `Псевдоним`}
					</Label>
				</NameContainer>

				<AboutContainer>
					<Textarea {...register('about')}
							  placeholder="Напишите что-то о себе"
							  aria-multiline
							  id="about_field"/>
					<Label htmlFor="about_field" error={!!errors.about}>
						{errors.about?.message ? errors.about?.message : `О себе`}
					</Label>
				</AboutContainer>
			</InputsWrapper>

			<SubmitButton type={'submit'}/>
		</Wrapper>
	);
};

const Wrapper = styled.form`
  width: 65%;
  margin-left: 5%;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

const NameContainer = styled(FieldContainer)`
  margin-bottom: 20px;
`;

const AboutContainer = styled(FieldContainer)`
  input {
    height: 100px;
  }
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

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px 20px;
  height: 110px;
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
    padding-top: 25px;
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