/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './Form.module.css';

const Form = forwardRef(function Form(
	{ handleForm, characterCount, setCharacterCount },
	ref,
) {
	const author = useRef(null);
	const message = useRef(null);

	useImperativeHandle(ref, () => ({
		getAuthorValue: () => author.current.value,
		getMessageValue: () => message.current.value,
		clearFields: () => {
			author.current.value = '';
			message.current.value = '';
		},
	}));

	const handleCount = () => {
		const remaining = 150 - message.current.value.length;
		setCharacterCount(remaining);
	};

	return (
		<form
			onSubmit={handleForm}
			className={styles.form}
		>
			<fieldset>
				<legend>Leave a comment..</legend>
				<div className={styles.inputField}>
					<label htmlFor="author">Name</label>
					<input
						type="text"
						id="author"
						name="author"
						ref={author}
						required
					/>
				</div>
				<div className={styles.inputField}>
					<label htmlFor="message">Message</label>
					<textarea
						type="text"
						name="message"
						id="message"
						ref={message}
						cols="30"
						rows="5"
						onChange={handleCount}
						minLength={3}
						maxLength={150}
						aria-describedby="character-count"
						required
					/>
					<p id="character-count">Remaining characters: {characterCount}</p>
				</div>
			</fieldset>

			<button
				type="submit"
				className={styles.submit}
			>
				Submit
			</button>
		</form>
	);
});

export default Form;
