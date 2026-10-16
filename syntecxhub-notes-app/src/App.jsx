import { useState } from 'react';
import './App.css';

function App() {
	const [notes, setNotes] = useState([]);
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');

	function createNote(event) {
		event.preventDefault();

		if (!noteTitle.trim() && !noteContent.trim()) {
			return;
		}

		const newNote = {
			id: crypto.randomUUID(),
			title: noteTitle.trim() || 'Untitled Note',
			content: noteContent.trim(),
		};

		setNotes((currentNotes) => [...currentNotes, newNote]);

		setNoteTitle('');
		setNoteContent('');
	}

	function deleteNote(id) {
		setNotes((currentNotes) =>
			currentNotes.filter((note) => note.id !== id),
		);
	}

	return (
		<main className="notes-app">
			<h1>My Notes</h1>

			<form onSubmit={createNote} className="note-form">
				<input
					type="text"
					placeholder="Note title"
					value={noteTitle}
					onChange={(event) => setNoteTitle(event.target.value)}
				/>

				<textarea
					placeholder="Write your note..."
					value={noteContent}
					onChange={(event) => setNoteContent(event.target.value)}
				/>

				<button type="submit">Create Note</button>
			</form>

			<section className="notes-list">
				<h2>All Notes ({notes.length})</h2>

				{notes.length === 0 ? (
					<p className="empty-message">
						You haven't created any notes yet.
					</p>
				) : (
					<div className="notes-grid">
						{notes.map((note) => (
							<article className="note-card" key={note.id}>
								<h3>{note.title}</h3>
								<p>{note.content}</p>

								<button
									type="button"
									onClick={() => deleteNote(note.id)}>
									Delete
								</button>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
