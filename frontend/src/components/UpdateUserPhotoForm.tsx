import React, { ChangeEvent, useRef } from 'react';
import { updateUserPhotoById } from '../store/user/asyncActions';
import { useAppDispatch } from '../store/store';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';


export interface IUpdateUserPhotoForm {
	file: FileList;
}

const yupSchema = yup.object({
	file: yup.mixed().test('required', 'Вставьте фото', value => value && value.length)
});

interface IUpdateUserPhotoFormProps {
	id: string;
	setFormType: (param: 'update' | 'updatePhoto' | null) => void;
}

export const UpdateUserPhotoForm: React.FC<IUpdateUserPhotoFormProps> = ({id, setFormType}) => {
	const dispatch = useAppDispatch();
	const imgRef = useRef<HTMLImageElement | null>(null);
	const {register, handleSubmit, formState: {errors}} = useForm<IUpdateUserPhotoForm>({
		resolver: yupResolver(yupSchema)
	});

	const changeFileInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (event) => {
				if (imgRef.current)
					imgRef.current.src = event.target?.result || logo;
			};

			reader.readAsDataURL(file);
		}
	};

	const onSubmit = (data: IUpdateUserPhotoForm) => {
		dispatch(updateUserPhotoById({
			id: id,
			file: data.file[0]
		}));

		setFormType(null);
	};

	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<Title>Обновить фото пользователя</Title>

			<InputsWrapper>
				<NameContainer>
					<Input {...register('file')}
						   type={'file'}
						   name={'file'}
						   placeholder="Введите псевдоним"
						   onChange={changeFileInputHandler}
						   id="file_field"/>
					<Label htmlFor="file_field">
						<LabelImage>
							<svg width="25" height="25" viewBox="0 0 30 30" fill="#ffffff"
								 xmlns="http://www.w3.org/2000/svg">
								<path d="M13.75 18.75H16.25V11.25H20L15 5L10 11.25H13.75V18.75Z"/>
								<path
									d="M25 22.5H5V13.75H2.5V22.5C2.5 23.8788 3.62125 25 5 25H25C26.3787 25 27.5 23.8788 27.5 22.5V13.75H25V22.5Z"/>
							</svg>
						</LabelImage>
						<LabelInfo>Выберите файл</LabelInfo>
					</Label>
					<InputError>{errors.file?.message && errors.file?.message}</InputError>
				</NameContainer>

				<Delimiter/>

				<Image src={logo} ref={imgRef} width="300" height="300" alt={'new profile photo'}/>
			</InputsWrapper>

			<SubmitButton type={'submit'}/>
		</Wrapper>
	);
};

const Wrapper = styled.form`
  width: 53%;
  margin-bottom: 50px;
  margin-left: 5%;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FieldContainer = styled.div`
  position: relative;
`;

const NameContainer = styled(FieldContainer)`
`;

const AboutContainer = styled(FieldContainer)`
  input {
    height: 100px;
  }
`;

const Input = styled.input`
  opacity: 0;
  top: -1000px;
  position: absolute;
`;

const Label = styled.label`
  width: 100%;
  max-width: 250px;
  background: transparent;
  border: 2px solid #32be58;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
`;

const LabelImage = styled.span`
  height: 45px;
  width: 50px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #fff;
`;

const LabelInfo = styled.span`
  color: #ffffff;
  line-height: 1;
  margin-top: 1px;
  margin-right: 10px;
`;

const InputError = styled.div`
  position: absolute;
  left: 5px;
  top: -35%;
  color: #ff6060;
`;

const Delimiter = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.21);
`;

const Image = styled.img`

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