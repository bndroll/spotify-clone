import React from 'react';
import * as yup from 'yup';
import { useAppDispatch } from '../store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styled from 'styled-components';
import { createTrackAndAddToAlbum } from '../store/album/asyncActions';


export interface ICreateAlbumTrackForm {
	audio: FileList;
	title: string;
}

const yupSchema = yup.object({
	audio: yup.mixed().test('required', 'Вставьте аудио', value => value && value.length),
	title: yup.string().required('Введите название')
});

interface ICreateAlbumTrackFormProps {
	id: string;
	setShowForm: (param: boolean) => void;
}

export const CreateAlbumTrackForm: React.FC<ICreateAlbumTrackFormProps> = ({id, setShowForm}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<ICreateAlbumTrackForm>({
		resolver: yupResolver(yupSchema)
	});

	const onSubmit = (data: ICreateAlbumTrackForm) => {
		dispatch(createTrackAndAddToAlbum({
			id: id,
			title: data.title,
			audioFile: data.audio[0]
		}));

		setShowForm(false);
	};

	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<InputsWrapper>
				<NameContainer>
					<TextInput {...register('title')}
							   placeholder="Введите название"
							   id="title_field"/>
					<TextLabel htmlFor="title_field" error={!!errors.title}>
						{errors.title?.message ? errors.title?.message : `Название`}
					</TextLabel>
				</NameContainer>

				<NameContainer>
					<Input {...register('audio')}
						   type={'file'}
						   placeholder="Вставьте аудио"
						   id="audio_field"/>
					<Label htmlFor="audio_field">
						<LabelImage>
							<svg width="25" height="25" viewBox="0 0 30 30" fill="#ffffff"
								 xmlns="http://www.w3.org/2000/svg">
								<path d="M13.75 18.75H16.25V11.25H20L15 5L10 11.25H13.75V18.75Z"/>
								<path
									d="M25 22.5H5V13.75H2.5V22.5C2.5 23.8788 3.62125 25 5 25H25C26.3787 25 27.5 23.8788 27.5 22.5V13.75H25V22.5Z"/>
							</svg>
						</LabelImage>
						<LabelInfo>Аудио</LabelInfo>
					</Label>
					<InputError
						error={!!errors.audio?.message}>{errors.audio?.message && errors.audio?.message}</InputError>
				</NameContainer>
			</InputsWrapper>

			<SubmitButton type={'submit'}/>
		</Wrapper>
	);
};

const Wrapper = styled.form`
  width: 100%;
  position: relative;
  margin: 30px 0 50px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const NameContainer = styled(FieldContainer)`
`;

const TextInput = styled.input`
  display: block;
  width: 50%;
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
    opacity: .7;
    transform: scale(.85) translateY(-13px);
  }
`;

const Input = styled.input`
  opacity: 0;
  top: -1000px;
  position: absolute;
`;

interface ITextLabelProps {
	error: boolean;
}

const TextLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 21px 22px;
  pointer-events: none;
  font-weight: 500;
  color: ${(props: ITextLabelProps) => (props.error ? '#fa4c4c' : '#777777')};
  border: 1px solid transparent;
  font-size: 15px;
  transform-origin: 0 0;
  transition: opacity .15s ease-in-out, transform .15s ease-in-out;
`;

const Label = styled.label`
  width: 250px;
  background: transparent;
  border: 2px solid #32be58;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  cursor: pointer;
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

interface InputErrorProps {
	error: boolean;
}

const InputError = styled.div`
  position: absolute;
  left: 290px;
  bottom: 15px;
  color: #ff6060;

  ${(props: InputErrorProps) => (props.error && `
  border-radius: 10px;
  border: 1px dashed #ff6060;
  padding: 10px 30px;
  `)}
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